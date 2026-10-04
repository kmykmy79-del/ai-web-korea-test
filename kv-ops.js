/* 데이터 동기화 도우미 — 브라우저(app.js)와 서버(server.js)가 함께 씁니다.
 * 값 전체를 덮어쓰지 않고 '바뀐 부분'만 주고받아, 여러 사람이 동시에 투표·신청해도 서로 지워지지 않게 합니다.
 *   diff(이전 값, 새 값)  → 바뀐 부분 목록(ops)
 *   apply(현재 값, ops)   → ops를 반영한 새 값
 * op 종류: set(값 넣기) · del(지우기) · append(목록 끝에 추가) · prepend(목록 앞에 추가)
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.KVOps = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var BAD_KEYS = { __proto__: 1, constructor: 1, prototype: 1 };

  function isObj(v) { return v !== null && typeof v === "object" && !Array.isArray(v); }
  function same(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  function copy(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }

  function diff(a, b, path, out) {
    path = path || [];
    out = out || [];
    if (same(a, b)) return out;
    // 객체: 키마다 내려가며 비교 (이전 값이 없으면 빈 객체로 봄)
    if (isObj(b) && (isObj(a) || a === undefined || a === null)) {
      var aa = isObj(a) ? a : {};
      Object.keys(b).forEach(function (k) { diff(aa[k], b[k], path.concat([k]), out); });
      Object.keys(aa).forEach(function (k) { if (!(k in b)) out.push({ op: "del", path: path.concat([k]) }); });
      return out;
    }
    // 목록: 뒤에 붙였거나 앞에 붙인 경우만 따로 보냄 (이전 값이 없으면 빈 목록으로 봄)
    if (Array.isArray(b) && (Array.isArray(a) || a === undefined || a === null)) {
      var arr = Array.isArray(a) ? a : [];
      if (b.length >= arr.length && same(arr, b.slice(0, arr.length))) {
        if (b.length > arr.length) out.push({ op: "append", path: path, items: b.slice(arr.length) });
        return out;
      }
      if (b.length > arr.length && same(arr, b.slice(b.length - arr.length))) {
        out.push({ op: "prepend", path: path, items: b.slice(0, b.length - arr.length) });
        return out;
      }
    }
    out.push({ op: "set", path: path, value: b === undefined ? null : copy(b) });
    return out;
  }

  function validPath(p) {
    if (!Array.isArray(p)) return false;
    for (var i = 0; i < p.length; i++) {
      if (typeof p[i] !== "string" && typeof p[i] !== "number") return false;
      if (BAD_KEYS[String(p[i])]) return false;
    }
    return true;
  }

  function apply(doc, ops) {
    var box = { v: copy(doc) };
    (ops || []).forEach(function (o) {
      if (!o || !validPath(o.path)) throw new Error("잘못된 경로");
      var p = ["v"].concat(o.path.map(String));
      var parent = box;
      for (var i = 0; i < p.length - 1; i++) {
        if (!isObj(parent[p[i]])) parent[p[i]] = {};
        parent = parent[p[i]];
      }
      var last = p[p.length - 1];
      var cur = Array.isArray(parent[last]) ? parent[last] : [];
      if (o.op === "set") parent[last] = copy(o.value);
      else if (o.op === "del") delete parent[last];
      else if (o.op === "append") parent[last] = cur.concat(copy(o.items) || []);
      else if (o.op === "prepend") parent[last] = (copy(o.items) || []).concat(cur);
      else throw new Error("알 수 없는 op: " + o.op);
    });
    return box.v === undefined ? null : box.v;
  }

  return { diff: diff, apply: apply, copy: copy, same: same, validPath: validPath };
});
