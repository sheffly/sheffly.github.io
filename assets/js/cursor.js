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
  // particle mix: dots, plusses, filled pixel hearts, outline pixel hearts
  var lastSparkle = 0;

  function spawnSparkle(x, y) {
    var el = document.createElement("div");
    var roll = Math.random();
    var kind = roll < 0.22 ? "dot"
             : roll < 0.52 ? "plus"
             : roll < 0.80 ? "heart"
             : "heart-outline";

    var size;
    if (kind === "dot") {
      size = 2 + Math.round(Math.random() * 2);
    } else if (kind === "plus") {
      size = 6 + Math.round(Math.random() * 5);
    } else {
      size = 9 + Math.round(Math.random() * 5);   // hearts need room to read
    }

    el.className = "cursor-sparkle cursor-sparkle--" + kind;
    el.style.width = size + "px";
    // the pixel heart art is 8x7, so don't squash it into a square
    el.style.height = (kind.indexOf("heart") === 0
      ? Math.round(size * 7 / 8)
      : size) + "px";
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

  var MOVE_EVENT = window.PointerEvent ? "pointermove" : "mousemove";

  document.addEventListener(MOVE_EVENT, function (e) {
    if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
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

  window.addEventListener("blur", function () {
    var el = document.activeElement;
    if (el && el.tagName === "IFRAME") {
      cursor.style.display = "none";
      document.documentElement.classList.remove("cute-cursor-active");
    }
  });

  window.addEventListener("focus", function () {
    document.documentElement.classList.add("cute-cursor-active");
  });
})();
