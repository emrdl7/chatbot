const selector = document.getElementById("themeSelector");

selector.addEventListener("change", (e) => {
  const selectedTheme = e.target.value;
  const body = document.body;

  // 기존 테마 클래스 제거
  body.classList.remove("theme1", "theme2", "theme3", "theme4");

  // 새 테마 클래스 추가
  body.classList.add(selectedTheme);
});
