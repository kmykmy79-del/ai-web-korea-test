/* 디지털 교육 사이트 서버 (Railway에서 실행)
 * · 사이트 파일(index.html 등)을 그대로 보여 주고
 * · 사이트에서 생긴 데이터(투표·수강 신청·출석·과제 제출·명단·관리자 수정)를 Postgres에 저장합니다.
 *
 * 필요한 환경 변수
 *   DATABASE_URL  Railway Postgres 연결 주소 (Railway가 자동으로 넣어 줌)
 *   PORT          서버 포트 (없으면 8080)
 *   PGSSL=1       외부(공개) 주소로 DB에 접속할 때만 지정
 *   DRIVE_SCRIPT_URL, DRIVE_SECRET  과제 파일을 구글 드라이브에 저장할 때 (drive-upload.gs 참고)
 * DATABASE_URL이 없으면 메모리에만 저장합니다(재시작하면 사라짐 — 시험용).
 */
"use strict";

const path = require("path");
const fs = require("fs");
const vm = require("vm");
const crypto = require("crypto");
const KV = require("./kv-ops.js");

/* ── 저장하는 데이터 종류 ───────────────────────────────── */
// 모든 방문자가 함께 쓰는 데이터만 서버에 저장합니다. (로그인 상태·팝업 숨김 같은 개인 설정은 각자 브라우저에)
const SHARED = ["config", "pollVotes", "applications", "attendance", "submissions", "roster"];
const ADMIN_DAYS = 7;

function sha256(text) { return crypto.createHash("sha256").update(String(text), "utf8").digest("hex"); }
function hashSecret(s) { return sha256("kucourse|" + s); } // app.js의 hashSecret과 같은 방식

/* ── 권한 규칙 (순수 함수: 시험하기 쉽게 분리) ──────────── */
const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

// 관리자가 아닌 사람이 보낼 수 있는 변경만 허용합니다.
function checkOps(key, ops, isAdmin) {
  if (!Array.isArray(ops) || !ops.length) return "변경 내용이 없습니다.";
  if (ops.length > 200) return "한 번에 너무 많이 바꾸려고 합니다.";
  for (const o of ops) if (!o || !KV.validPath(o.path)) return "잘못된 경로입니다.";
  if (isAdmin) return null;
  const all = (fn) => ops.every(fn);
  switch (key) {
    case "pollVotes": // { 설문 id: { 참여자: 보기 번호 } } — 한 칸씩 넣거나 지우기
      return all((o) => o.path.length === 2 && (o.op === "del" || (o.op === "set" && Number.isInteger(o.value) && o.value >= 0 && o.value < 100)))
        ? null : "투표 형식이 맞지 않습니다.";
    case "applications": // 신청서는 목록 끝에 추가만
      return all((o) => o.op === "append" && o.path.length === 0 && Array.isArray(o.items) && o.items.length <= 5 && o.items.every(isObj))
        ? null : "신청서는 추가만 할 수 있습니다.";
    case "attendance": // { 학번: { 주차: 시각 } } — 출석 시각 넣기만
      return all((o) => o.op === "set" && o.path.length === 2 && typeof o.value === "number")
        ? null : "출석 형식이 맞지 않습니다.";
    case "submissions": // { 학번: [제출 기록…] } — 기록 추가만
      return all((o) => (o.op === "prepend" || o.op === "append") && o.path.length === 1 && Array.isArray(o.items) && o.items.length <= 5 && o.items.every(isObj))
        ? null : "제출 기록은 추가만 할 수 있습니다.";
    default: // config, roster
      return "관리자만 바꿀 수 있습니다.";
  }
}

// 관리자가 아니면 다른 사람의 개인 기록은 빼고 보냅니다.
function redact(data, isAdmin, student) {
  if (isAdmin) return data;
  const out = {};
  out.config = data.config == null ? null : data.config;
  out.pollVotes = data.pollVotes == null ? {} : data.pollVotes;
  out.applications = []; // 신청 내역은 관리자만
  out.roster = null;     // 명단은 관리자만
  const pick = (all) => {
    const o = {};
    if (student && isObj(all) && all[student] !== undefined) o[student] = all[student];
    return o;
  };
  out.attendance = pick(data.attendance);
  out.submissions = pick(data.submissions);
  return out;
}

/* ── 관리자 비밀번호: config.js의 지문(해시), 관리자 화면에서 바꿨으면 그 값 ── */
function fileConfig() {
  try {
    const code = fs.readFileSync(path.join(__dirname, "config.js"), "utf8");
    const sandbox = { window: {} };
    vm.runInNewContext(code, sandbox, { timeout: 1000 });
    return sandbox.window.SITE_CONFIG || {};
  } catch (e) {
    console.error("config.js를 읽지 못했습니다:", e.message);
    return {};
  }
}
function adminHash(savedConfig, fileCfg) {
  const fromSaved = savedConfig && savedConfig.data && savedConfig.data.admin && savedConfig.data.admin.passwordHash;
  return fromSaved || (fileCfg.admin && fileCfg.admin.passwordHash) || "";
}

/* ── 저장소: Postgres (없으면 메모리) ───────────────────── */
function makeDb() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL이 없어 메모리에 저장합니다. (재시작하면 사라짐)");
    const kv = new Map(), sessions = new Map(), log = [];
    return {
      kind: "memory",
      async init() {},
      async getAll(keys) { const o = {}; keys.forEach((k) => { if (kv.has(k)) o[k] = KV.copy(kv.get(k)); }); return o; },
      async get(key) { return kv.has(key) ? KV.copy(kv.get(key)) : null; },
      async update(key, ops, actor) { kv.set(key, KV.apply(kv.get(key), ops)); log.push({ key, ops, actor }); },
      async addSession(token, until) { sessions.set(token, until); },
      async checkSession(token) { const u = sessions.get(token); return !!(u && u > Date.now()); },
      async dropSession(token) { sessions.delete(token); },
    };
  }
  const { Pool } = require("pg");
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSL === "1" ? { rejectUnauthorized: false } : false,
    max: 5,
  });
  return {
    kind: "postgres",
    async init() {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS kv_store (
          key        text PRIMARY KEY,
          value      jsonb,
          updated_at timestamptz NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS kv_log (
          id         bigserial PRIMARY KEY,
          key        text NOT NULL,
          ops        jsonb NOT NULL,
          actor      text,
          created_at timestamptz NOT NULL DEFAULT now()
        );
        CREATE TABLE IF NOT EXISTS admin_sessions (
          token      text PRIMARY KEY,
          expires_at timestamptz NOT NULL
        );`);
    },
    async getAll(keys) {
      const r = await pool.query("SELECT key, value FROM kv_store WHERE key = ANY($1)", [keys]);
      const o = {};
      r.rows.forEach((row) => { o[row.key] = row.value; });
      return o;
    },
    async get(key) {
      const r = await pool.query("SELECT value FROM kv_store WHERE key = $1", [key]);
      return r.rows.length ? r.rows[0].value : null;
    },
    // 같은 데이터를 동시에 바꿔도 순서대로 반영되도록 행을 잠그고 바꿉니다.
    async update(key, ops, actor) {
      const c = await pool.connect();
      try {
        await c.query("BEGIN");
        await c.query("INSERT INTO kv_store (key, value) VALUES ($1, NULL) ON CONFLICT (key) DO NOTHING", [key]);
        const r = await c.query("SELECT value FROM kv_store WHERE key = $1 FOR UPDATE", [key]);
        const next = KV.apply(r.rows[0].value, ops);
        await c.query("UPDATE kv_store SET value = $2, updated_at = now() WHERE key = $1", [key, JSON.stringify(next)]);
        await c.query("INSERT INTO kv_log (key, ops, actor) VALUES ($1, $2, $3)", [key, JSON.stringify(ops), actor]);
        await c.query("COMMIT");
      } catch (e) {
        await c.query("ROLLBACK").catch(() => {});
        throw e;
      } finally {
        c.release();
      }
    },
    async addSession(token, until) {
      await pool.query("DELETE FROM admin_sessions WHERE expires_at < now()");
      await pool.query("INSERT INTO admin_sessions (token, expires_at) VALUES ($1, to_timestamp($2 / 1000.0))", [token, until]);
    },
    async checkSession(token) {
      const r = await pool.query("SELECT 1 FROM admin_sessions WHERE token = $1 AND expires_at > now()", [token]);
      return r.rows.length > 0;
    },
    async dropSession(token) { await pool.query("DELETE FROM admin_sessions WHERE token = $1", [token]); },
  };
}

/* ── 서버 ───────────────────────────────────────────────── */
function start() {
  const express = require("express");
  const db = makeDb();
  const FILE_CFG = fileConfig();
  const app = express();
  app.disable("x-powered-by");

  /* ── 과제 파일 → 구글 드라이브 (학생별 폴더) ──
   * 구글 Apps Script 웹 앱(drive-upload.gs)으로 파일을 넘기면, 교수자 드라이브의
   * "디지털 교육 과제 제출 / 이름_학번" 폴더에 저장됩니다.
   *   DRIVE_SCRIPT_URL  Apps Script 웹 앱 주소 (https://script.google.com/macros/s/…/exec)
   *   DRIVE_SECRET      Apps Script의 SECRET과 같은 값 */
  const DRIVE_URL = process.env.DRIVE_SCRIPT_URL || "", DRIVE_SECRET = process.env.DRIVE_SECRET || "";
  const MAX_FILE_MB = 20;
  // 명단(없으면 수강 신청서)에 있는 학번·이름인지 확인합니다. 둘 다 비어 있으면 통과.
  async function knownStudent(id, name) {
    const all = await db.getAll(["roster", "applications"]);
    const roster = Array.isArray(all.roster) ? all.roster : [];
    if (roster.length) return roster.some((r) => r && r.id === id && String(r.name).trim() === name);
    const apps = Array.isArray(all.applications) ? all.applications : [];
    if (apps.length) return apps.some((a) => a && String(a.studentId).trim() === id && String(a.name).trim() === name && !a.excluded);
    return true;
  }
  app.post("/api/submit-file", express.json({ limit: Math.ceil(MAX_FILE_MB * 1.4) + 1 + "mb" }), async (req, res) => {
    if (!DRIVE_URL || !DRIVE_SECRET) return fail(res, 503, "구글 드라이브 저장이 아직 연결되지 않았습니다.");
    try {
      const b = req.body || {};
      const id = String(b.id || "").trim(), name = String(b.name || "").trim().slice(0, 40);
      const week = Number(b.week);
      const fileName = String(b.fileName || "").replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_").slice(0, 120);
      const data = String(b.data || "");
      if (!/^\d{10}$/.test(id) || !name || !Number.isInteger(week) || week < 1 || week > 99 || !fileName || !data) return fail(res, 400, "제출 정보가 올바르지 않습니다.");
      if (data.length * 0.75 > MAX_FILE_MB * 1024 * 1024) return fail(res, 413, "파일이 너무 큽니다. (최대 " + MAX_FILE_MB + "MB)");
      if (!(await knownStudent(id, name))) return fail(res, 403, "수강생 명단에 없는 학번·이름입니다.");
      const r = await fetch(DRIVE_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          secret: DRIVE_SECRET, id, name, week,
          title: String(b.title || "").slice(0, 100),
          fileName, mime: String(b.mime || "application/octet-stream").slice(0, 100), data,
        }),
        redirect: "follow",
      });
      const text = await r.text();
      let j = null;
      try { j = JSON.parse(text); } catch (e) { /* 아래에서 처리 */ }
      if (!j || !j.ok) {
        console.error("드라이브 저장 실패:", r.status, text.slice(0, 300));
        return fail(res, 502, "구글 드라이브에 저장하지 못했습니다." + (j && j.error ? " (" + j.error + ")" : ""));
      }
      res.json({ ok: true, url: j.url, folderUrl: j.folderUrl, fileName: j.fileName });
    } catch (e) {
      console.error(e);
      fail(res, 500, "파일을 저장하지 못했습니다.");
    }
  });

  app.use(express.json({ limit: "300kb" }));

  const tokenOf = (req) => String(req.get("X-Admin-Token") || "").slice(0, 100);
  async function isAdmin(req) {
    const t = tokenOf(req);
    return t.length >= 32 ? db.checkSession(t) : false;
  }
  const fail = (res, code, msg) => res.status(code).json({ ok: false, error: msg });

  app.get("/api/health", (req, res) => res.json({ ok: true, db: db.kind, drive: !!(DRIVE_URL && DRIVE_SECRET) }));

  // 과제 제출 창에 보여 줄 내 인적사항(학과·학년) — 학번과 이름이 함께 맞을 때만
  app.get("/api/me", async (req, res) => {
    try {
      const id = String(req.query.id || "").trim(), name = String(req.query.name || "").trim();
      res.set("Cache-Control", "no-store");
      if (!/^\d{10}$/.test(id) || !name) return res.json({ ok: true, me: null });
      const all = await db.getAll(["roster", "applications"]);
      const apps = (Array.isArray(all.applications) ? all.applications : [])
        .filter((a) => a && String(a.studentId).trim() === id && String(a.name).trim() === name);
      const r = (Array.isArray(all.roster) ? all.roster : []).find((x) => x && x.id === id && String(x.name).trim() === name) || {};
      const a = apps[apps.length - 1] || {};
      res.json({ ok: true, me: { department: a.department || r.department || "", grade: a.grade || r.grade || "" } });
    } catch (e) {
      console.error(e);
      fail(res, 500, "정보를 불러오지 못했습니다.");
    }
  });

  // 사이트가 처음 열릴 때 함께 쓰는 데이터를 한 번에 받아 갑니다.
  app.get("/api/state", async (req, res) => {
    try {
      const want = String(req.query.keys || "").split(",").filter((k) => SHARED.includes(k));
      const keys = want.length ? want : SHARED;
      const admin = await isAdmin(req);
      const student = String(req.query.student || "").slice(0, 40);
      const data = redact(await db.getAll(SHARED), admin, student);
      const out = {};
      keys.forEach((k) => { out[k] = data[k] === undefined ? null : data[k]; });
      res.set("Cache-Control", "no-store");
      res.json({ ok: true, admin, data: out });
    } catch (e) {
      console.error(e);
      fail(res, 500, "데이터를 불러오지 못했습니다.");
    }
  });

  // 바뀐 부분만 받아 저장합니다.
  app.post("/api/kv/:key", async (req, res) => {
    const key = req.params.key;
    if (!SHARED.includes(key)) return fail(res, 404, "저장할 수 없는 항목입니다.");
    try {
      const admin = await isAdmin(req);
      const ops = req.body && req.body.ops;
      const why = checkOps(key, ops, admin);
      if (why) return fail(res, admin ? 400 : 403, why);
      await db.update(key, ops, admin ? "admin" : "visitor");
      res.json({ ok: true });
    } catch (e) {
      console.error(e);
      fail(res, 500, "저장하지 못했습니다.");
    }
  });

  // 관리자 로그인: 비밀번호를 확인하고 7일짜리 표(토큰)를 줍니다.
  const tries = new Map(); // IP별 실패 횟수 (5번 틀리면 1분 잠금)
  app.post("/api/admin/login", async (req, res) => {
    try {
      const ip = req.ip || "?";
      const t = tries.get(ip) || { n: 0, until: 0 };
      if (Date.now() < t.until) return fail(res, 429, "여러 번 틀렸습니다. 잠시 뒤 다시 시도해 주세요.");
      const pw = String((req.body && req.body.password) || "");
      const saved = await db.get("config");
      const hash = adminHash(saved, FILE_CFG);
      if (hash && hashSecret(pw) !== hash) {
        t.n += 1;
        if (t.n >= 5) { t.n = 0; t.until = Date.now() + 60000; }
        tries.set(ip, t);
        return fail(res, 401, "비밀번호가 맞지 않습니다.");
      }
      tries.delete(ip);
      const token = crypto.randomBytes(24).toString("hex");
      await db.addSession(token, Date.now() + ADMIN_DAYS * 86400000);
      res.json({ ok: true, token });
    } catch (e) {
      console.error(e);
      fail(res, 500, "로그인하지 못했습니다.");
    }
  });
  app.post("/api/admin/logout", async (req, res) => {
    try { await db.dropSession(tokenOf(req)); } catch (e) { /* 무시 */ }
    res.json({ ok: true });
  });
  app.use("/api", (req, res) => fail(res, 404, "없는 주소입니다."));

  // 서버 코드·설정 파일은 보여 주지 않습니다.
  app.use((req, res, next) => {
    if (/^\/(server\.js|drive-upload\.gs|package(-lock)?\.json|node_modules|\.git|\.claude|\.railway)/i.test(req.path)) return res.status(404).end();
    next();
  });
  // 페이지(html)는 매번 새로 받게 하고, js·css·이미지는 1시간 보관 (파일 주소 끝 ?v= 숫자로 새로 받게 함)
  app.use(express.static(__dirname, {
    dotfiles: "ignore", index: "index.html", maxAge: "1h",
    setHeaders: (res, file) => { if (file.endsWith(".html")) res.setHeader("Cache-Control", "no-cache"); },
  }));

  const port = Number(process.env.PORT) || 8080;
  db.init()
    .then(() => {
      app.listen(port, () => console.log(`디지털 교육 서버 시작: 포트 ${port}, 저장소 ${db.kind}`));
    })
    .catch((e) => {
      console.error("데이터베이스를 준비하지 못했습니다:", e);
      process.exit(1);
    });
}

module.exports = { checkOps, redact, adminHash, hashSecret, SHARED };
if (require.main === module) start();
