theming

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

accent hot pink (`--pink:
#ff2d95` in punk.css) 
off-white body text w near-black panels for contrast.
headers in Permanent Marker


```css
--pink: #ff2d95;
```


- **ticker bar** (scrolling text at the very top)  text in
  `_includes/header.html`, // delete the `.ticker` block there to
  remove it entirely.
footer `_includes/footer.html`,
 `<p class="blink">` line in
  `_includes/footer.html`.
 bottom of `_includes/footer.html` in `.badge-row` div.
 `punk.css`, the
  `nth-child` r
