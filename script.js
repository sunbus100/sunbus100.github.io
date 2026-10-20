(function () {
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");

  function setTheme(theme) {
    root.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    if (toggle) {
      toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  if (toggle) {
    setTheme(root.dataset.theme || "light");
    toggle.addEventListener("click", function () {
      setTheme(root.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  // Seven-segment display for the visitor counter filled in by busuanzi.
  var LED_SEGMENTS = {
    "0": "abcdef",
    "1": "bc",
    "2": "abdeg",
    "3": "abcdg",
    "4": "bcfg",
    "5": "acdfg",
    "6": "acdefg",
    "7": "abc",
    "8": "abcdefg",
    "9": "abcdfg",
    "-": "g"
  };
  var LED_MIN_DIGITS = 6;

  function renderLed(display, value) {
    var digits = String(value || "").replace(/\D/g, "");
    while (digits.length < LED_MIN_DIGITS) {
      digits = (value ? "0" : "-") + digits;
    }
    display.textContent = "";
    digits.split("").forEach(function (ch) {
      var digit = document.createElement("span");
      digit.className = "led-digit";
      "abcdefg".split("").forEach(function (name) {
        var seg = document.createElement("span");
        seg.className = "led-seg led-seg-" + name;
        if (LED_SEGMENTS[ch].indexOf(name) !== -1) {
          seg.className += " is-on";
        }
        digit.appendChild(seg);
      });
      display.appendChild(digit);
    });
  }

  document.querySelectorAll("[data-led-for]").forEach(function (display) {
    var source = document.getElementById(display.getAttribute("data-led-for"));
    if (!source) {
      return;
    }
    var update = function () {
      renderLed(display, source.textContent.trim());
    };
    update();
    new MutationObserver(update).observe(source, { childList: true, characterData: true, subtree: true });
  });
})();
