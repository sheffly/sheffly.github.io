/* seamless header ticker — same idea as the "clone enough copies to
   outrun the viewport" marquee trick (see e.g.
   https://codepen.io/alexberkowitz/pen/wveLEBL), redone in plain JS.

   .ticker-track holds one real .ticker-text span (the source string)
   plus an empty .ticker-copies box. on load (and on resize) we clone
   .ticker-text into .ticker-copies enough times to cover the widest
   the viewport can get, plus one extra for safety. because the clones
   are appended via the DOM — not typed into the HTML by hand — there
   are no stray whitespace text nodes between them, so N identical-
   width copies sit perfectly flush against each other with zero gap.

   .ticker-track is then animated with translateX(-100%): since its
   total width is always an exact multiple of one copy's width, moving
   it by its own full width leaves the pattern looking identical to
   where it started — an infinite loop with no seam and no pause.

   --ticker-duration and --ticker-steps are recomputed every time too,
   from the *total* track width, so the scroll speed (px/sec) and the
   "choppiness" (px per stepped jump) both stay constant regardless of
   viewport width or how many copies that ends up needing. */
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

  var PX_PER_SEC = 55;  // constant scroll speed
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
