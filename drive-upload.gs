/* 디지털 교육 — 과제 파일을 구글 드라이브에 저장하는 Apps Script 웹 앱
 *
 * 설치 (한 번만)
 *   1. https://script.google.com → 새 프로젝트 → 이 내용을 통째로 붙여 넣기
 *   2. 아래 SECRET 값을 Railway의 DRIVE_SECRET과 같게 적기
 *   3. 배포 → 새 배포 → 유형: 웹 앱
 *        다음 사용자 인증 정보로 실행: 나
 *        액세스 권한이 있는 사용자: 모든 사용자
 *      → 권한 승인 → 나온 웹 앱 URL(…/exec)을 Railway의 DRIVE_SCRIPT_URL에 넣기
 *
 * 저장 위치: 내 드라이브 / 디지털 교육 과제 제출 / 이름_학번 / "3주차_과제제목_원본파일명"
 */
var SECRET = "여기에_DRIVE_SECRET과_같은_값";
var ROOT_NAME = "디지털 교육 과제 제출";

function doPost(e) {
  try {
    var b = JSON.parse(e.postData.contents);
    if (!SECRET || b.secret !== SECRET) return out({ ok: false, error: "인증 실패" });

    var root = folder(DriveApp.getRootFolder(), ROOT_NAME);
    var mine = folder(root, clean(b.name) + "_" + clean(b.id));
    var stamp = Utilities.formatDate(new Date(), "Asia/Seoul", "yyyyMMdd-HHmm");
    var name = b.week + "주차_" + (b.title ? clean(b.title) + "_" : "") + stamp + "_" + clean(b.fileName);

    var blob = Utilities.newBlob(Utilities.base64Decode(b.data), b.mime || "application/octet-stream", name);
    var file = mine.createFile(blob);
    file.setDescription(b.name + " (" + b.id + ") · " + b.week + "주차 과제 · " + stamp);
    return out({ ok: true, url: file.getUrl(), folderUrl: mine.getUrl(), fileName: name });
  } catch (err) {
    return out({ ok: false, error: String(err && err.message || err) });
  }
}

// 같은 이름의 폴더가 있으면 그 폴더, 없으면 새로 만듭니다.
function folder(parent, name) {
  var it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}
function clean(s) { return String(s || "").replace(/[\\/:*?"<>|]/g, "_").trim().slice(0, 80); }
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
