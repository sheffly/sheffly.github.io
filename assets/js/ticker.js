/* header ticker, bastardized version based off of this approach (codepen.io/alexberkowitz/pen/wveLEBL). */
(function () {
  "use strict";

  var track = document.querySelector(".ticker-track");
  if (!track) return;

  var template = track.querySelector(".ticker-text");
  var copiesBox = track.querySelector(".ticker-copies");
  if (!template || !copiesBox) return;

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var PX_PER_SEC = 45; 
  var PX_PER_STEP = 5;  

  function build() {
    copiesBox.innerHTML = "";

    var itemWidth = template.getBoundingClientRect().width;
    if (!itemWidth) return;

    var need = Math.ceil(window.innerWidth / itemWidth) + 1;
    for (var i = 0; i < need; i++) {
      copiesBox.appendChild(template.cloneNode(true));
    }

    var totalWidth = itemWidth * (need + 1); 
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
