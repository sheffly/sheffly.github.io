/* animated heart cursor — progressive enhancement on top of the
   static css cursor in punk.css. skips itself on touch devices and
   for anyone with reduced-motion set; the plain css cursor rules
   stay in effect for them instead. */
(function () {
  "use strict";

  if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var cursor = document.createElement("div");
  cursor.id = "cute-cursor";
  document.body.appendChild(cursor);
  document.documentElement.classList.add("cute-cursor-active");

  // hotspot coordinates from the original .cur files, scaled 1.5x to
  // match the 48px display size (originals are 32px, hotspots 0,0
  // and 6,0).
  var HOTSPOT = { x: 0, y: 0 };
  var LINK_HOTSPOT = { x: 9, y: 0 };

  var isLink = false;

  function move(x, y) {
    var h = isLink ? LINK_HOTSPOT : HOTSPOT;
    cursor.style.transform = "translate(" + (x - h.x) + "px, " + (y - h.y) + "px)";
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
  }, { passive: true });

  document.addEventListener("mouseleave", function () {
    cursor.style.display = "none";
  });

  document.addEventListener("mouseenter", function (e) {
    cursor.style.display = "block";
    move(e.clientX, e.clientY);
  });
})();
