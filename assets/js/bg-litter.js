/* repeats the glitter band down the page, however long the page is.
   alternate bands get mirrored so it doesn't read as an obvious loop. */
(function () {
  "use strict";

  var layer = document.querySelector(".bg-litter");
  if (!layer) return;

  var first = layer.querySelector(".bg-litter-band");
  if (!first) return;

  var MAX_BANDS = 14;   // sanity cap on very long pages

  function fill() {
    // desktop only -- if the layer is hidden there's nothing to lay out
    if (getComputedStyle(layer).display === "none") return;

    var band = Math.round(window.innerHeight * 1.5);
    var docH = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    var want = Math.min(Math.ceil(docH / band), MAX_BANDS);

    var have = layer.querySelectorAll(".bg-litter-band").length;

    for (var i = have; i < want; i++) {
      var copy = first.cloneNode(true);
      copy.classList.toggle("bg-litter-band--flip", i % 2 === 1);
      layer.appendChild(copy);
    }

    // (re)position every band for the current viewport height
    Array.prototype.forEach.call(
      layer.querySelectorAll(".bg-litter-band"),
      function (el, i) { el.style.top = i * band + "px"; }
    );
  }

  fill();
  window.addEventListener("load", fill);

  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(fill, 200);
  });
})();
