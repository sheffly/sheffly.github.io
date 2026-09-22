/* posts as little windows, bc im soooo clever */
(function () {
  "use strict";

  var layer = document.getElementById("ms-window-layer");
  var data = document.getElementById("ms-window-data");
  if (!layer || !data) return;

  var sources = {};
  Array.prototype.forEach.call(data.querySelectorAll(".ms-window-src"), function (tpl) {
    sources[tpl.getAttribute("data-window-id")] = tpl;
  });

  var open = {};        // id -> window element
  var stack = [];       // open windows, back to front
  var topZ = 1000;
  var opened = 0;       // cascade offset

  function isSmallScreen() {
    return window.matchMedia && window.matchMedia("(max-width: 720px)").matches;
  }

  function bringToFront(win) {
    var at = stack.indexOf(win);
    if (at !== -1) stack.splice(at, 1);
    stack.push(win);

    topZ += 1;
    win.style.zIndex = topZ;
    stack.forEach(function (el) {
      el.classList.toggle("is-front", el === win);
    });
  }

  function closeWindow(win) {
    var id = win.getAttribute("data-window-key");
    delete open[id];
    var at = stack.indexOf(win);
    if (at !== -1) stack.splice(at, 1);
    win.remove();
    if (stack.length) bringToFront(stack[stack.length - 1]);
  }

  function startDrag(win, bar) {
    bar.addEventListener("pointerdown", function (e) {
      if (isSmallScreen()) return;                       // full-width on phones
      if (e.target && e.target.closest && e.target.closest(".ms-window-close")) return;
      if (e.button !== 0 && e.pointerType === "mouse") return;

      bringToFront(win);

      var rect = win.getBoundingClientRect();
      var offsetX = e.clientX - rect.left;
      var offsetY = e.clientY - rect.top;

      function onMove(ev) {
        var x = ev.clientX - offsetX;
        var y = ev.clientY - offsetY;
        var maxX = window.innerWidth - 80;
        var maxY = window.innerHeight - 40;
        win.style.left = Math.min(Math.max(x, 80 - rect.width), maxX) + "px";
        win.style.top = Math.min(Math.max(y, 0), maxY) + "px";
      }

      function onUp() {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        bar.classList.remove("is-dragging");
      }

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      bar.classList.add("is-dragging");
    });
  }

  function openWindow(id) {
    if (open[id]) {           // already open -> just raise it
      bringToFront(open[id]);
      open[id].focus();
      return;
    }

    var tpl = sources[id];
    if (!tpl) return;

    var title = tpl.getAttribute("data-window-title") || "untitled";
    var date = tpl.getAttribute("data-window-date") || "";
    var url = tpl.getAttribute("data-window-url") || "#";

    var win = document.createElement("div");
    win.className = "ms-window";
    win.setAttribute("data-window-key", id);
    win.setAttribute("role", "dialog");
    win.setAttribute("aria-label", title);
    win.tabIndex = -1;

    var bar = document.createElement("div");
    bar.className = "ms-window-bar";

    var barTitle = document.createElement("span");
    barTitle.className = "ms-window-title";
    barTitle.textContent = title;

    var closeBtn = document.createElement("button");
    closeBtn.className = "ms-window-close";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "close " + title);
    closeBtn.innerHTML = "&#10005;";

    bar.appendChild(barTitle);
    bar.appendChild(closeBtn);

    var toolbar = document.createElement("div");
    toolbar.className = "ms-window-toolbar";

    var dateEl = document.createElement("span");
    dateEl.className = "ms-window-date";
    dateEl.textContent = date;

    var link = document.createElement("a");
    link.className = "ms-window-link";
    link.href = url;
    link.innerHTML = "open full post &rarr;";

    toolbar.appendChild(dateEl);
    toolbar.appendChild(link);

    var body = document.createElement("div");
    body.className = "ms-window-body";
    body.appendChild(tpl.content.cloneNode(true));

    win.appendChild(bar);
    win.appendChild(toolbar);
    win.appendChild(body);

    if (!isSmallScreen()) {
      var step = (opened % 6) * 26;
      win.style.left = Math.max(16, Math.round(window.innerWidth * 0.5 - 330) + step) + "px";
      win.style.top = 64 + step + "px";
    }
    opened += 1;

    layer.appendChild(win);
    open[id] = win;
    bringToFront(win);

    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeWindow(win);
    });
    win.addEventListener("pointerdown", function () { bringToFront(win); });
    startDrag(win, bar);

    win.focus();
  }

  // any link carrying data-window-id opens a window instead of navigating
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest ? e.target.closest("[data-window-id]") : null;
    if (!trigger) return;
    if (trigger.closest("#ms-window-layer")) return;   // links inside windows behave normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;  // let cmd-click open the real page

    var id = trigger.getAttribute("data-window-id");
    if (!sources[id]) return;                          // no source -> fall through to the real page

    e.preventDefault();
    openWindow(id);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!stack.length) return;
    closeWindow(stack[stack.length - 1]);
  });
})();
