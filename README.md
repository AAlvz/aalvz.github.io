# aalvz.github.io

Alfonso Álvarez's personal site: a clickable terminal plus plain pages. It's built with Jekyll and served by GitHub Pages, so pushing to `master` publishes it.

## Structure

| Path | What |
|------|------|
| `index.html` | Home: interactive terminal, command chips, "how to use" panel |
| `assets/js/terminal.js` | Terminal commands, tab completion, history, hardcoded plain-English replies |
| `assets/css/site.css` | All styles (dark/light tokens, mobile) |
| `_data/profile.yml` | **Single source of truth** for bio, Big 5, skills, management, books, manifesto, Life Framework, projects, links. Used by the pages and by the terminal via `/profile.json` |
| `_pages/<category>/<note>.md` | Blog notes. Paths never move, so old URLs (`/_pages/<category>/<note>/`) keep working |
| `blog/`, `about/`, `manifesto/`, `contact/` | Plain pages. `projects/` just redirects to the dashboard (tribu-dash.web.app) |
| `assets/img/` | Images (Life Framework original, Spanish) |
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

On c1 (macOS), without Docker. Jekyll lives in a private gem folder, and Homebrew's bundled Ruby runs it:

```bash
# one-time install
R=/opt/homebrew/Library/Homebrew/vendor/portable-ruby/current/bin
GEM_HOME=$HOME/.local/share/gems-aalvz $R/gem install jekyll webrick kramdown-parser-gfm --no-document

# build (after every change)
GEM_HOME=$HOME/.local/share/gems-aalvz JEKYLL_NO_BUNDLER_REQUIRE=true PATH=$R:$PATH \
  $HOME/.local/share/gems-aalvz/bin/jekyll build

# serve _site in the background → http://localhost:4000
python3 -m http.server 4000 --bind 0.0.0.0 --directory _site >/dev/null 2>&1 &
```

Or with Docker:

```bash
docker run --rm -it -p 4000:4000 -v "$PWD":/srv -v aalvz-gems:/usr/local/bundle -w /srv ruby:3.3 \
  sh -c "bundle install && bundle exec jekyll serve --host 0.0.0.0 --force_polling"
```

Gotcha: in `_data/profile.yml`, quote any list item that contains `": "`. Otherwise YAML turns it into a hash, and the page renders `{"…"=>"…"}`.

## Publishing

Work on a branch (e.g. `terminal-v1`), preview locally, then fast-forward `master` and push. GitHub Pages rebuilds in about a minute.

## Roadmap

- **Phase 2:** polish, projects synced from the dashboard data, more themes.
- **Phase 3:** `ask`, an AI that answers questions about Alfonso and his writing (needs a small backend for the API key).
