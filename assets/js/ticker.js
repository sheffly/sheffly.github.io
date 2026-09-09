/* header ticker, clone-to-fill approach (codepen.io/alexberkowitz/pen/wveLEBL).

   .ticker-track holds one .ticker-text span plus an empty
   .ticker-copies box. on load and resize, clone .ticker-text into
   .ticker-copies enough times to cover the viewport plus one extra.
   clones are appended via the DOM, so there's no whitespace between
   them and the copies sit flush with zero gap.

   .ticker-track animates with translateX(-100%). its total width is
   always a multiple of one copy's width, so moving it by its own
   width loops with no seam.

   --ticker-duration and --ticker-steps are recomputed from the total
   track width each time, so scroll speed and step size stay constant
   regardless of viewport width or copy count. */
(function () {
  "use strict";

  var track = document.querySelector(".ticker-track");
  if (!track) return;

  var template = track.querySelector(".ticker-text");
  var copiesBox = track.querySelector(".ticker-copies");
  if (!template || !copiesBox) return;

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return; // static single copy, no animation, no extra clones needed
  }

  var PX_PER_SEC = 45;  // constant scroll speed
  var PX_PER_STEP = 5;  // constant jump size -> constant "choppiness"

  function build() {
    copiesBox.innerHTML = "";

    var itemWidth = template.getBoundingClientRect().width;
    if (!itemWidth) return;

    var need = Math.ceil(window.innerWidth / itemWidth) + 1;
    for (var i = 0; i < need; i++) {
      copiesBox.appendChild(template.cloneNode(true));
    }

    var totalWidth = itemWidth * (need + 1); // template + its clones
    var duration = totalWidth / PX_PER_SEC;
    var steps = Math.max(1, Math.round(totalWidth / PX_PER_STEP));

    track.style.setProperty("--ticker-duration", duration.toFixed(2) + "s");
    track.style.setProperty("--ticker-steps", steps);
  }

  build();

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  });
})();
