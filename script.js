const selector = document.getElementById("themeSelector");
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

let userPreference = localStorage.getItem("themePreference") || "system";
selector.value = userPreference;

function applyTheme() {
  const body = document.body;
  body.className = ""; // 모든 클래스 제거

  if (userPreference === "system") {
    const isDark = mediaQuery.matches;
    body.classList.add(isDark ? "theme1" : "theme2");
  } else {
    body.classList.add(userPreference); // theme1 ~ theme4
  }
}

// 시스템 테마 변경될 때만 반응 (자동 모드일 때만)
mediaQuery.addEventListener("change", () => {
  if (userPreference === "system") {
    applyTheme();
  }
});

// 사용자 수동 변경
selector.addEventListener("change", (e) => {
  userPreference = e.target.value;
  localStorage.setItem("themePreference", userPreference);
  applyTheme();
});

// 초기 실행
applyTheme();

let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  function (e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault(); // 더블탭 확대 방지
    }
    lastTouchEnd = now;
  },
  false
);

document.querySelectorAll(".ex p").forEach((p) => {
  p.addEventListener("click", () => {
    const textarea = document.querySelector(".chat-form textarea");
    if (textarea) {
      const cleanText = p.textContent.replace(/\s+/g, " ").trim();
      textarea.value = cleanText;
      textarea.focus();
    }
  });
});

const box = document.getElementById("questionBox");
const toggleBtn = document.getElementById("toggleButton");

toggleBtn.addEventListener("click", () => {
  box.classList.toggle("expanded");
  toggleBtn.textContent = box.classList.contains("expanded")
    ? "접기"
    : "전체보기";
});
