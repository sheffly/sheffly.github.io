# maximalist / punk / old-internet override

drop every file in this zip into your existing repo, same paths,
overwriting nothing you've already written (`_config.yml`, `Gemfile`,
`about.md`, `index.md`, `_posts/`, etc. all stay as they are). jekyll
uses these files instead of minima's built-in ones because they live
at the same paths inside your own repo — no theme fork, no gem
changes needed.

what's in here:

```
_includes/head.html      <title>, meta, loads the stylesheet + font
_includes/header.html    scrolling ticker bar, title, nav
_includes/footer.html    hit counter, badge row, blinking footer note
_layouts/default.html    the page shell (header + content + footer)
_layouts/home.html       the post list on the home page
_layouts/post.html       individual post pages
_layouts/page.html       about page etc.
404.html
assets/css/punk.css      all of the styling, one file
```

## the palette / vibe

black background with a diagonal stripe texture, hot pink (`--pink:
#ff2d95` in punk.css) as the one loud accent, off-white body text on
near-black panels for contrast. headers in a marker-scrawl font
(Permanent Marker), nav/meta/badges in monospace (Space Mono), body
copy in Verdana — an actual "web safe" font from the era this is
riffing on, and still one of the most legible fonts around.

to change the pink to something else, it's the one color variable at
the top of `punk.css`:

```css
--pink: #ff2d95;
```

## the loud bits, and how to turn each one off

- **ticker bar** (scrolling text at the very top) — edit the text in
  `_includes/header.html`, or delete the `.ticker` block there to
  remove it entirely.
- **hit counter** — just a static number in `_includes/footer.html`,
  edit or delete the `<div class="hit-counter">` line.
- **blinking footer text** — the `<p class="blink">` line in
  `_includes/footer.html`. it already turns itself off for anyone
  with reduced-motion enabled; delete the line to remove it for
  everyone.
- **badge row** — the four placeholder 88x31-style badges at the
  bottom of `_includes/footer.html`. swap the text/links, add more,
  or delete the whole `.badge-row` div.
- **rotation on post list items / tags** — in `punk.css`, the
  `nth-child` rules under "post list" and "tags / badges". delete
  those rules to make everything sit flush instead of tilted.
