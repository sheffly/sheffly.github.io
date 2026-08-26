/* drives every .ipod-nano widget on the page. each instance is fully
   self-contained (its own <audio>, its own controls) so you can drop
   more than one on a page without them fighting over state. */
(function () {
  "use strict";

  function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function setUp(root) {
    var audio = root.querySelector('[data-role="audio"]');
    var playBtn = root.querySelector('[data-role="playpause"]');
    var glyph = root.querySelector('[data-role="glyph"]');
    var fill = root.querySelector('[data-role="fill"]');
    var seekTrack = root.querySelector('[data-role="seek"]');
    var elapsedEl = root.querySelector('[data-role="elapsed"]');
    var durationEl = root.querySelector('[data-role="duration"]');
    var prevBtn = root.querySelector('[data-role="prev"]');
    var nextBtn = root.querySelector('[data-role="next"]');
    var menuBtn = root.querySelector('[data-role="menu"]');

    if (!audio) return;

    function updatePlayState() {
      var playing = !audio.paused && !audio.ended;
      root.classList.toggle("is-playing", playing);
      if (glyph) glyph.innerHTML = playing ? "&#10073;&#10073;" : "&#9654;";
    }

    function togglePlay() {
      if (audio.paused) {
        audio.play().catch(function () {
          /* browser blocked it (no user gesture yet, etc) — silently
             ignore, the button just won't visually flip to playing */
        });
      } else {
        audio.pause();
      }
    }

    playBtn && playBtn.addEventListener("click", togglePlay);
    audio.addEventListener("play", updatePlayState);
    audio.addEventListener("pause", updatePlayState);
    audio.addEventListener("ended", updatePlayState);

    audio.addEventListener("loadedmetadata", function () {
      if (durationEl) durationEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", function () {
      if (elapsedEl) elapsedEl.textContent = formatTime(audio.currentTime);
      if (fill && audio.duration) {
        fill.style.width = (audio.currentTime / audio.duration * 100) + "%";
      }
    });

    seekTrack && seekTrack.addEventListener("click", function (e) {
      if (!audio.duration) return;
      var rect = seekTrack.getBoundingClientRect();
      var ratio = (e.clientX - rect.left) / rect.width;
      ratio = Math.min(1, Math.max(0, ratio));
      audio.currentTime = ratio * audio.duration;
    });

    prevBtn && prevBtn.addEventListener("click", function () {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    nextBtn && nextBtn.addEventListener("click", function () {
      if (audio.duration) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
      }
    });

    menuBtn && menuBtn.addEventListener("click", function () {
      audio.currentTime = 0;
    });
  }

  document.querySelectorAll(".ipod-nano").forEach(setUp);
})();
