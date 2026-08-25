# blog

a plain jekyll blog for github pages, using the default `minima` theme —
no custom styling, no extras. this is the same setup you'd get creating
a new Pages site from scratch.

## quick start

1. create a new repo on your (anonymous) github account — either
   `yourusername.github.io` (site lives at the root) or any other name
   (site lives at `/reponame`, and you'll need to set `baseurl` below).
2. push everything in this folder to that repo.
3. in the repo's **Settings → Pages**, set the source to the `main`
   branch (root). GitHub builds and hosts it automatically.
4. edit `_config.yml`: set `title`, `description`, `url` (your pages
   url, once you know it), and `baseurl` (only if your repo isn't
   `username.github.io`).
5. delete or rewrite `_posts/2026-08-25-welcome.md`, and rewrite
   `about.md`.
6. commit with an email that isn't your real one, if anonymity matters
   to you — github pages publishes your commit history.

## previewing locally (optional)

not required — GitHub builds it for you — but if you want to see
changes before pushing:

```
bundle install
bundle exec jekyll serve
```

then open `http://localhost:4000`.

## writing posts

add a markdown file to `_posts/`, named `YYYY-MM-DD-your-title.md`:

```markdown
---
layout: post
title: "a title"
---

your post, in markdown.
```

## changing how it looks, later

if you ever want to reskin it, minima's own templates/css can be
overridden by adding files with matching paths (e.g. `_sass/minima/`
or `_layouts/`) to this repo — you don't need to fork the theme. or
just ask for a different theme built from scratch.

## a couple of anonymity notes

worth a skim before you post anything real — also in `about.md`:

- strip exif data from photos before uploading (gps + device info)
- use a throwaway git commit email, not your real one
- reusing an avatar, banner, or writing voice from another account can
  link the two

not legal advice, just the stuff people forget.
