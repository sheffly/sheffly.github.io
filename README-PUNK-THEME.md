theming

```
_includes/head.html             <title>, meta, loads the stylesheet + font
_includes/header.html           scrolling ticker bar + the pipe nav (home | about | tags | rss | guestbook)
_includes/profile-module.html   the profile card: flying crow, site title, status + info rows. every page.
_includes/sidebar.html          left column: ipod (home only), hit counter, badges, credits, copyright
_includes/post-windows.html     hidden post bodies + the layer the draggable windows get drawn into (home only)
_includes/ipod-player.html      the nano itself
_includes/footer.html           UNUSED now — everything in it moved to sidebar.html
_includes/crow-perch.html       UNUSED now — the old perched corner crow, kept in case you want it back
_layouts/default.html           page shell: header, profile card, sidebar + main column
_layouts/home.html              top 8, latest entries, guestbook
_layouts/post.html              individual post pages
_layouts/page.html              about, tags
404.html
```

accent hot pink (`--pink: #ff2d95` in punk.css)
off-white body text w near-black panels for contrast.
headers in Doto, labels/meta in Space Mono, body in Verdana

```css
--pink: #ff2d95;
```

- **ticker bar** (scrolling text at the very top) text lives in
  `_includes/header.html` — delete the `.ticker` block there to remove it entirely.
- **hit counter / blink line / badges / credits** are all in
  `_includes/sidebar.html` now, not the footer.
- **badges** are the `.badge-row` div in `_includes/sidebar.html`.
- **the crow** is a 4-frame flying sprite (`assets/images/crow-flying.png`,
  laid out up / mid / down / mid). speed + size are the `.ms-crow-flying`
  rule in punk.css. the sky behind it is `assets/images/profile-sky-bg.png`.
- **now playing** track is set once in `_config.yml` under `now_playing:` and
  feeds both the ipod and the profile card's row.
- **post windows**: any link with `data-window-id="post-<slug>"` opens that post
  as a draggable window instead of navigating. logic in `assets/js/post-windows.js`,
  looks in `assets/css/punk.css` under "posts as draggable windows".
- **guestbook** is giscus, configured in `_layouts/home.html`. its colors/fonts/cursor
  come from `assets/css/giscus-theme.css`, which giscus loads inside its iframe.
  to edit or delete a comment you go to the GitHub discussion itself — giscus's
  widget doesn't do it in place.
- **tags page** is `tags.html` — one dashed row per tag, post titles comma-separated.
  styles are `.ms-tagrow*` in punk.css.
- **the rss feed** is hand-rolled in `feed.xml` (not jekyll-feed). the nav's "rss"
  points at `feed.html` (`/feed/`), which fetches feed.xml and prints its source
  recolored — `assets/js/feed-view.js` does the highlighting, `.ms-xml .x-*` in
  punk.css sets the colors. the raw feed.xml is left plain for feed readers; the
  browser's own raw-XML view can't be styled from a site.
