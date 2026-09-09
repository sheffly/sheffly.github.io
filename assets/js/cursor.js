/* cursor duh? */
(function () {
  "use strict";

  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var cursor = document.createElement("div");
  cursor.id = "cute-cursor";
  document.body.appendChild(cursor);
  document.documentElement.classList.add("cute-cursor-active");

  var HOTSPOT = { x: 0, y: 0 };
  var LINK_HOTSPOT = { x: 9, y: 0 };

  var isLink = false;

  function move(x, y) {
    var h = isLink ? LINK_HOTSPOT : HOTSPOT;
    cursor.style.transform = "translate(" + (x - h.x) + "px, " + (y - h.y) + "px)";
  }

  // pixel sparkle trail spawn code
  var SPARKLE_COLORS = ["#ffb3da", "#ffffff", "#ffd9ec"]; // pastel pink / white / light pink
  var SPARKLE_INTERVAL = 45;
  var DOT_CHANCE = 0.3; // a liquid 3/10 of particles are dots
  var lastSparkle = 0;

  function spawnSparkle(x, y) {
    var el = document.createElement("div");
    var isDot = Math.random() < DOT_CHANCE;
    var size = isDot
      ? 2 + Math.round(Math.random() * 2)   
      : 6 + Math.round(Math.random() * 5);  

    el.className = "cursor-sparkle " + (isDot ? "cursor-sparkle--dot" : "cursor-sparkle--plus");
    el.style.width = size + "px";
    el.style.height = size + "px";
    el.style.background = SPARKLE_COLORS[(Math.random() * SPARKLE_COLORS.length) | 0];
    el.style.setProperty("--sx", x + "px");
    el.style.setProperty("--sy", y + "px");
    el.style.setProperty("--sdx", (Math.random() * 24 - 12).toFixed(1) + "px");
    document.body.appendChild(el);
    var cleanup = function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    };
    el.addEventListener("animationend", cleanup);
    setTimeout(cleanup, 1200); // safety net
  }

  document.addEventListener("mousemove", function (e) {
    cursor.style.display = "block";
    var target = e.target;
    var link = target && target.closest
      ? target.closest("a, button, .tag, input[type=submit], input[type=button]")
      : null;
    isLink = !!link;
    cursor.classList.toggle("is-link", isLink);
    move(e.clientX, e.clientY);

    var now = window.performance && performance.now ? performance.now() : Date.now();
    if (now - lastSparkle > SPARKLE_INTERVAL) {
      lastSparkle = now;
      spawnSparkle(e.clientX, e.clientY);
    }
  }, { passive: true });

  document.addEventListener("mouseleave", function () {
    cursor.style.display = "none";
  });

  document.addEventListener("mouseenter", function (e) {
    cursor.style.display = "block";
    move(e.clientX, e.clientY);
  });
})();
