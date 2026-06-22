(function () {
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  var icon = document.querySelector(".theme-icon");
  var cvLink = document.getElementById("cv-link");
  var cvPath = "assets/Ziqi_Liu_CV.pdf";

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    if (toggle) {
      toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
    if (icon) {
      icon.textContent = theme === "dark" ? "☀" : "☾";
    }
  }

  if (toggle) {
    setTheme(root.dataset.theme || "light");
    toggle.addEventListener("click", function () {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  if (cvLink) {
    fetch(cvPath, { method: "HEAD" })
      .then(function (response) {
        if (!response.ok) {
          return;
        }
        cvLink.href = cvPath;
        cvLink.hidden = false;
      })
      .catch(function () {
        cvLink.hidden = true;
      });
  }

})();
