/* prints feed.xml's actual source, in the site's colors */
(function () {
  "use strict";

  var box = document.getElementById("ms-feed-source");
  if (!box) return;

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function span(cls, s) {
    return '<span class="x-' + cls + '">' + esc(s) + "</span>";
  }

  function markup(tok) {
    if (tok.indexOf("<!--") === 0) return span("comment", tok);
    if (tok.indexOf("<?") === 0) return span("decl", tok);

    var m = tok.match(/^<(\/?)([A-Za-z_][\w:.-]*)([\s\S]*?)(\/?)>$/);
    if (!m) return esc(tok);

    var out = span("punct", "<" + m[1]) + span("tag", m[2]);

    out += m[3].replace(
      /([A-Za-z_][\w:.-]*)(\s*=\s*)("[^"]*"|'[^']*')/g,
      function (_, name, eq, val) {
        return span("attr", name) + span("punct", eq) + span("val", val);
      }
    );

    return out + span("punct", m[4] + ">");
  }

  function highlight(xml) {
    var re = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<\/?[A-Za-z_][\w:.-]*(?:[^<>]*?)?\/?>/g;
    var out = "";
    var last = 0;
    var m;

    while ((m = re.exec(xml)) !== null) {
      if (m.index > last) out += span("text", xml.slice(last, m.index));
      out += markup(m[0]);
      last = m.index + m[0].length;
    }
    if (last < xml.length) out += span("text", xml.slice(last));
    return out;
  }

  fetch(box.getAttribute("data-src"), { credentials: "same-origin" })
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    })
    .then(function (xml) {
      box.innerHTML = highlight(xml);
    })
    .catch(function () {
      box.textContent = "couldn't load the feed just now -- the raw file link below still works.";
    });
})();
