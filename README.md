# aalvz.github.io

Alfonso Álvarez's personal site: a clickable terminal plus plain pages. It's built with Jekyll and served by GitHub Pages, so pushing to `master` publishes it.

## Structure

| Path | What |
|------|------|
| `index.html` | Home: interactive terminal, command chips, "how to use" panel |
| `assets/js/terminal.js` | Terminal commands, tab completion, history, hardcoded plain-English replies |
| `assets/css/site.css` | All styles (dark/light tokens, mobile) |
| `_data/profile.yml` | **Single source of truth** for bio, Big 5, skills, projects, links. Used by the pages and by the terminal via `/profile.json` |
| `_pages/<category>/<note>.md` | Blog notes. Paths never move, so old URLs (`/_pages/<category>/<note>/`) keep working |
| `blog/`, `about/`, `projects/`, `contact/` | Plain pages |
| `posts.json` | Generated index of notes, used by `ls` and `cat` in the terminal |
| `_pending/` | Unpublished drafts (underscore dir, never built) |

## Add a blog post

Create `_pages/<category>/<name>.md` with this front matter:

```yaml
---
resource: true
categories: [DevOps]      # must be in category-list in _config.yml
title: My post
description: One line
date: 2026-09-26
---
```

It appears on `/blog/` and in the terminal (`ls blog/devops`, `cat devops/<name>`).

## Preview locally

```bash
docker run --rm -it -p 4000:4000 -v "$PWD":/srv -v aalvz-gems:/usr/local/bundle -w /srv ruby:3.3 \
  sh -c "bundle install && bundle exec jekyll serve --host 0.0.0.0 --force_polling"
# → http://localhost:4000
```

## Roadmap

- **Phase 2:** polish, projects synced from the dashboard data, more themes.
- **Phase 3:** `ask`, an AI that answers questions about Alfonso and his writing (needs a small backend for the API key).
