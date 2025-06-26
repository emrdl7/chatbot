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

// toggleBtn.addEventListener("click", () => {
//   box.classList.toggle("expanded");
//   toggleBtn.textContent = box.classList.contains("expanded")
//     ? "접기"
//     : "전체보기";
// });
