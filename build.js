const fs = require("fs");
const path = require("path");
const sass = require("sass");

const INPUT_HTML = "input.html";
const INPUT_SCSS = "style.scss";
const INPUT_JS = "script.js";
const OUTPUT_HTML = "chatbot.html";

function build() {
  try {
    const htmlTemplate = fs.readFileSync(INPUT_HTML, "utf8");
    const jsCode = fs.readFileSync(INPUT_JS, "utf8");
    const scssResult = sass.compile(INPUT_SCSS, { style: "compressed" });

    const finalHTML = htmlTemplate
      .replace("<!-- INJECT:STYLE -->", `<style>\n${scssResult.css}\n</style>`)
      .replace("<!-- INJECT:SCRIPT -->", `<script>\n${jsCode}\n</script>`);

    fs.writeFileSync(OUTPUT_HTML, finalHTML);
    console.log(
      `✅ ${new Date().toLocaleTimeString()} - ${OUTPUT_HTML} 빌드 완료`
    );
  } catch (err) {
    console.error("❌ 빌드 실패:", err.message);
  }
}

// 최초 1회 빌드
build();

// Watch 모드
[INPUT_HTML, INPUT_SCSS, INPUT_JS].forEach((file) => {
  fs.watchFile(file, { interval: 300 }, (curr, prev) => {
    if (curr.mtime !== prev.mtime) {
      console.log(`🔄 변경 감지: ${file}`);
      build();
    }
  });
});

console.log("👀 Watch 모드 실행 중... 파일을 수정하면 자동 빌드됩니다.");
