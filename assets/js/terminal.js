(function () {
  'use strict';

  var out = document.getElementById('term-out');
  var input = document.getElementById('term-input');
  var form = document.getElementById('term-form');
  var screen = document.getElementById('term-screen');
  var chips = document.getElementById('chips');
  var howto = document.getElementById('howto');
  if (!out || !input) return;

  var PROMPT = '<span class="p-user">alfonso@aalvz</span>:<span class="p-path">~</span>$ ';
  var history = [];
  var hIdx = 0;
  var busy = false;
  var posts = [];
  var profile = null;

  var ready = Promise.all([
    fetch('/posts.json').then(function (r) { return r.json(); }).then(function (d) { posts = d; }).catch(function () {}),
    fetch('/profile.json').then(function (r) { return r.json(); }).then(function (d) { profile = d; }).catch(function () {})
  ]);

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function cmd(c, label) { return '<button type="button" class="cmd" data-run="' + esc(c) + '">' + esc(label || c) + '</button>'; }
  function link(url, label) {
    var ext = /^https?:/.test(url);
    return '<a href="' + esc(url) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(label || url) + (ext ? ' ↗' : '') + '</a>';
  }
  function print(html, cls) {
    var d = document.createElement('div');
    if (cls) d.className = cls;
    d.innerHTML = html;
    out.appendChild(d);
    screen.scrollTop = screen.scrollHeight;
    return d;
  }
  function blank() { print(' '); }
  function tryNext(list) {
    print('<span class="dim">Try next:</span> ' + list.map(function (c) { return cmd(c); }).join('  '));
  }
  function track(name) {
    try { if (window.gtag) gtag('event', 'terminal_command', { command: name }); } catch (e) {}
  }
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function catSlug(c) { return String(c).toLowerCase(); }
  function categories() {
    var seen = {}, list = [];
    posts.forEach(function (p) {
      (p.categories || []).forEach(function (c) {
        var k = catSlug(c);
        if (!seen[k]) { seen[k] = { name: c, slug: k, items: [] }; list.push(seen[k]); }
        seen[k].items.push(p);
      });
    });
    return list;
  }
  function findPost(q) {
    q = String(q || '').toLowerCase().replace(/^blog\//, '').replace(/\/$/, '');
    var exact = posts.filter(function (p) { return p.slug.toLowerCase() === q; });
    if (exact.length) return exact;
    var base = posts.filter(function (p) { return p.slug.toLowerCase().split('/').pop() === q; });
    if (base.length) return base;
    return posts.filter(function (p) { return p.slug.toLowerCase().indexOf(q) !== -1 || p.title.toLowerCase().indexOf(q) !== -1; });
  }

  var SECTIONS = { blog: '/blog/', about: '/about/', projects: 'https://tribu-dash.web.app', contact: '/contact/', home: '/' };
  var EXTERNAL = {
    dashboard: 'https://tribu-dash.web.app',
    github: 'https://github.com/AAlvz',
    linkedin: 'https://www.linkedin.com/in/aalvz',
    yc: 'https://www.ycombinator.com/cofounder-matching',
    medium: 'https://medium.com/@alfonso_17637'
  };

  // ---------- commands ----------
  var HELP = [
    ['Get to know me', [['whoami', 'the one-line version'], ['about', 'bio, and how I work'], ['management', 'how I lead teams'], ['life', 'my life framework'], ['big5', 'my personality profile'], ['skills', 'what I work with'], ['books', 'books that shaped me'], ['offline', 'music, languages, economics'], ['cofounder', 'what I\'m looking for']]],
    ['See my work', [['projects', 'what I\'m building now'], ['blog', 'notes and cheat sheets'], ['cat <post>', 'read a post right here'], ['dashboard', 'live project status']]],
    ['Go somewhere', [['open <page>', 'open blog, about, projects, contact'], ['contact', 'where to reach me'], ['github', 'my GitHub'], ['linkedin', 'my LinkedIn']]],
    ['Terminal basics', [['tutorial', 'how this terminal works'], ['history', 'commands you ran'], ['theme', 'switch light / dark'], ['clear', 'wipe the screen']]]
  ];

  var C = {
    help: function () {
      print('<span class="h">Commands you can run</span>  <span class="dim">(click any of them, or type it)</span>');
      HELP.forEach(function (g) {
        blank();
        print('<span class="ok">' + esc(g[0]) + '</span>');
        print('<div class="grid">' + g[1].map(function (r) {
          var name = r[0].split(' ')[0];
          var shown = r[0].indexOf('<') !== -1 ? cmd(name, r[0]) : cmd(r[0]);
          return '<span>  ' + shown + '</span><span class="dim">' + esc(r[1]) + '</span>';
        }).join('') + '</div>');
      });
      blank();
      print('<span class="dim">You can also ask in plain English, e.g.</span> ' + cmd('what do you do?') + ' <span class="dim">or</span> ' + cmd('are you hiring?'));
    },

    whoami: function () {
      var p = profile || {};
      print('<span class="h">' + esc(p.name || 'Alfonso Álvarez') + '</span>');
      print(esc(p.tagline || ''));
      print('<span class="dim">Platform & AI-ops engineer by day · builder of ventures · terminal-first · Mexico</span>');
      tryNext(['about', 'projects', 'big5']);
    },

    about: function () {
      var p = profile || {};
      (p.bio || []).forEach(function (b) { print(esc(b)); blank(); });
      print('<span class="h">How I work</span>');
      (p.how_i_work || []).forEach(function (w) { print('  <span class="ok">▸</span> ' + esc(w)); });
      blank();
      print('Full page: ' + link('/about/', 'aalvz.github.io/about'));
      tryNext(['big5', 'skills', 'cofounder']);
    },

    big5: function () {
      var b = (profile && profile.big5) || { traits: [] };
      print('<span class="h">Big 5 personality</span>');
      blank();
      b.traits.forEach(function (t) {
        var n = Math.round(t.score / 5);
        var bar = '<span class="bar" style="color:' + esc(t.color) + '">' + '█'.repeat(n) + '</span><span class="bar dim">' + '░'.repeat(20 - n) + '</span>';
        print('<span class="h">' + esc((t.name + '                  ').slice(0, 18)) + '</span>' + bar + ' <span class="dim">' + t.score + '</span>');
        print('<span class="dim">  ' + esc(t.meaning) + '</span>');
      });
      blank();
      print('What is the Big 5? ' + link(b.test_url, 'bettertogetherframework.org/big5') + '  ·  Visual version: ' + link('/about/#big5', 'about page'));
      tryNext(['about', 'skills']);
    },

    management: function () {
      var m = (profile && profile.management) || { experience: [], principles: [] };
      print('<span class="h">Leading teams</span>');
      print(esc(m.intro || ''));
      blank();
      (m.experience || []).forEach(function (e) { print('  <span class="ok">▸</span> ' + esc(e)); });
      blank();
      print('<span class="h">What I believe about managing people</span>');
      (m.principles || []).forEach(function (p) { print('  <span class="ok">' + esc(p.head) + '</span> ' + esc(p.text)); });
      blank();
      print('<span class="dim">' + esc(m.research || '') + '</span>');
      print('The framework: ' + link('https://bettertogetherframework.org', 'bettertogetherframework.org') + '  ·  Full page: ' + link('/about/#management', 'about'));
      tryNext(['books', 'big5', 'projects']);
    },

    books: function () {
      var g = (profile && profile.books) || [];
      print('<span class="h">Bookshelf</span>  <span class="dim">books and authors that shaped how I build, lead and think</span>');
      g.forEach(function (x) {
        blank();
        print('<span class="ok">' + esc(x.area) + '</span>' + (x.note ? '  <span class="dim">' + esc(x.note) + '</span>' : ''));
        x.items.forEach(function (b) { print('  ' + esc(b.title) + (b.author ? '  <span class="dim">· ' + esc(b.author) + '</span>' : '')); });
      });
      blank();
      print('Full page: ' + link('/about/#books', 'about'));
      tryNext(['management', 'offline', 'blog']);
    },

    life: function () {
      var l = (profile && profile.life) || null;
      if (!l) return;
      print('<span class="h">' + esc(l.name) + '</span>  <span class="dim">' + esc(l.tagline) + '</span>');
      print(esc(l.intro));
      blank();
      print('<span class="ok">Principles</span>  ' + l.principles.map(esc).join(' · '));
      blank();
      l.few.forEach(function (x) { print('  <span class="h">' + esc(x.letter) + '</span> <span class="ok">' + esc(x.name) + '</span>  ' + esc(x.text)); });
      blank();
      print('<span class="ok">Goals</span>    ' + l.goals.map(esc).join(' · '));
      print('<span class="ok">Systems</span>  ' + l.systems.map(esc).join(' · '));
      blank();
      print('<span class="ok">Check-in</span>');
      l.checkin.forEach(function (q, i) { print('  ' + (i + 1) + '. ' + esc(q)); });
      blank();
      print('<span class="dim">' + esc(l.closing) + '</span>  ' + link('/about/#life', 'visual version'));
      tryNext(['management', 'books', 'big5']);
    },

    offline: function () {
      var o = (profile && profile.offkeyboard) || [];
      print('<span class="h">Off the keyboard</span>');
      print('<div class="grid">' + o.map(function (x) {
        return '<span class="ok">' + esc(x.label) + '</span><span>' + esc(x.text) + '</span>';
      }).join('') + '</div>');
      tryNext(['books', 'big5', 'about']);
    },

    skills: function () {
      var s = (profile && profile.skills) || [];
      print('<div class="grid">' + s.map(function (x) {
        return '<span class="ok">' + esc(x.area) + '</span><span>' + esc(x.items) + '</span>';
      }).join('') + '</div>');
      tryNext(['projects', 'about']);
    },

    projects: function () {
      var p = (profile && profile.projects) || [];
      print('<span class="h">What I\'m building</span>');
      blank();
      p.forEach(function (x) {
        print('<span class="ok">■</span> <span class="h">' + esc(x.name) + '</span>  <span class="dim">[' + esc(x.phase) + ']</span>');
        print('  ' + esc(x.pitch) + '  ' + link(x.url, 'visit'));
      });
      blank();
      print('Live metrics, goals and what\'s next: ' + link(EXTERNAL.dashboard, 'projects dashboard'));
      tryNext(['cofounder', 'blog', 'contact']);
    },

    blog: function () {
      C.ls(['blog']);
      print('<span class="dim">Tip: prefer a normal page?</span> ' + cmd('open blog'));
    },

    ls: function (args) {
      var target = (args[0] || '').replace(/^~\/?/, '').replace(/\/$/, '').toLowerCase();
      if (!target) {
        print('<div class="grid"><span>' + cmd('ls blog', 'blog/') + '</span><span class="dim">' + posts.length + ' notes</span><span>' + cmd('about', 'about') + '</span><span class="dim">who I am</span><span>' + cmd('projects', 'projects') + '</span><span class="dim">what I\'m building</span><span>' + cmd('contact', 'contact') + '</span><span class="dim">how to reach me</span></div>');
        return;
      }
      if (target === 'blog') {
        print('<span class="h">blog/</span>  <span class="dim">(click a folder to list its posts)</span>');
        print('<div class="grid">' + categories().map(function (c) {
          return '<span>  ' + cmd('ls blog/' + c.slug, c.slug + '/') + '</span><span class="dim">' + c.items.length + ' post' + (c.items.length > 1 ? 's' : '') + '</span>';
        }).join('') + '</div>');
        return;
      }
      var m = target.match(/^blog\/(.+)$/) || [null, target];
      var cat = categories().filter(function (c) { return c.slug === m[1]; })[0];
      if (cat) {
        print('<span class="h">blog/' + esc(cat.slug) + '/</span>  <span class="dim">(click to read)</span>');
        print('<div class="grid">' + cat.items.map(function (p) {
          return '<span>  ' + cmd('cat ' + p.slug, p.slug.split('/').pop()) + '</span><span class="dim">' + esc(p.title) + (p.date ? ' · ' + p.date.slice(0, 4) : '') + '</span>';
        }).join('') + '</div>');
        return;
      }
      print('<span class="warn">ls: ' + esc(args[0]) + ': no such folder.</span> Try ' + cmd('ls blog'));
    },

    cd: function (args) {
      if (!args[0] || args[0] === '~') { print('<span class="dim">You\'re home already.</span>'); return; }
      C.ls(args);
      print('<span class="dim">(this terminal stays put. Use</span> ' + cmd('open ' + args[0].replace(/\/.*/, '')) + ' <span class="dim">to go to a page)</span>');
    },

    cat: function (args) {
      if (!args[0]) { print('Usage: <span class="ok">cat &lt;post&gt;</span>. Pick one from ' + cmd('ls blog')); return; }
      var found = findPost(args.join(' '));
      if (!found.length) { print('<span class="warn">cat: ' + esc(args.join(' ')) + ': not found.</span> Browse with ' + cmd('ls blog')); return; }
      if (found.length > 1) {
        print('Several posts match. Which one?');
        found.slice(0, 12).forEach(function (p) { print('  ' + cmd('cat ' + p.slug, p.slug) + ' <span class="dim">' + esc(p.title) + '</span>'); });
        return;
      }
      var p = found[0];
      var holder = print('<span class="dim">loading ' + esc(p.slug) + '…</span>');
      return fetch(p.url).then(function (r) { return r.text(); }).then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var body = doc.querySelector('[data-post-body]');
        holder.innerHTML = '<span class="h">' + esc(p.title) + '</span>' + (p.date ? ' <span class="dim">· ' + esc(p.date) + '</span>' : '') +
          (p.description ? '\n<span class="dim">' + esc(p.description) + '</span>' : '');
        var art = print('', 'article');
        art.innerHTML = body ? body.innerHTML : '<p>Could not load the post body.</p>';
        print('Read it as a normal page: ' + link(p.url, p.url));
      }).catch(function () {
        holder.innerHTML = '<span class="warn">Could not load it here.</span> Open ' + link(p.url, p.url);
      });
    },

    open: function (args) {
      var t = (args[0] || '').toLowerCase().replace(/\/$/, '');
      if (!t) { print('Usage: <span class="ok">open &lt;page&gt;</span>. Pages: ' + Object.keys(SECTIONS).concat(Object.keys(EXTERNAL)).map(function (k) { return cmd('open ' + k, k); }).join(' ')); return; }
      if (SECTIONS[t]) { print('<span class="ok">→</span> opening ' + esc(t) + '…'); setTimeout(function () { location.href = SECTIONS[t]; }, 350); return; }
      if (EXTERNAL[t]) { print('<span class="ok">→</span> ' + link(EXTERNAL[t], EXTERNAL[t])); window.open(EXTERNAL[t], '_blank', 'noopener'); return; }
      var found = findPost(t);
      if (found.length === 1) { print('<span class="ok">→</span> opening ' + esc(found[0].title) + '…'); setTimeout(function () { location.href = found[0].url; }, 350); return; }
      print('<span class="warn">open: don\'t know "' + esc(t) + '".</span> Try ' + cmd('open'));
    },

    contact: function () {
      print('<span class="h">Let\'s talk.</span> LinkedIn is the fastest way to reach me.');
      blank();
      ((profile && profile.links) || []).forEach(function (l) { print('  ' + link(l.url, l.label)); });
      tryNext(['cofounder', 'projects']);
    },

    cofounder: function () {
      print('<span class="h">Looking for a co-founder</span>');
      print(esc((profile && profile.cofounder) || ''));
      blank();
      print(link(EXTERNAL.linkedin, 'Message me on LinkedIn') + '   ' + link(EXTERNAL.yc, 'YC Co-founder Matching'));
      tryNext(['projects', 'big5']);
    },

    dashboard: function () { C.open(['dashboard']); },
    github: function () { C.open(['github']); },
    linkedin: function () { C.open(['linkedin']); },

    tutorial: function () {
      print('<span class="h">How to use this terminal</span>');
      print('  <span class="ok">1.</span> Click any underlined command. It types itself, so you see what it looks like.');
      print('  <span class="ok">2.</span> Or type a command, like ' + cmd('help') + ', and press <b>Enter</b>.');
      print('  <span class="ok">3.</span> <b>Tab</b> auto-completes: type <i>pro</i> then Tab.');
      print('  <span class="ok">4.</span> <b>↑ / ↓</b> go back through what you already ran.');
      print('  <span class="ok">5.</span> ' + cmd('clear') + ' (or Ctrl+L) wipes the screen.');
      print('  <span class="ok">6.</span> Plain questions work too: ' + cmd('what do you do?'));
      if (howto) howto.open = true;
    },

    history: function () {
      if (!history.length) { print('<span class="dim">Nothing yet.</span>'); return; }
      history.forEach(function (h, i) { print('<span class="dim">' + String(i + 1).padStart(3, ' ') + '</span>  ' + cmd(h)); });
    },

    theme: function (args) {
      var next = window.toggleTheme ? window.toggleTheme(args[0] === 'dark' || args[0] === 'light' ? args[0] : undefined) : null;
      print('Theme: <span class="ok">' + esc(next || 'unchanged') + '</span>  <span class="dim">(</span>' + cmd('theme dark') + ' <span class="dim">/</span> ' + cmd('theme light') + '<span class="dim">)</span>');
    },

    clear: function () { out.innerHTML = ''; },
    pwd: function () { print('/home/alfonso'); },
    date: function () { print(new Date().toString()); },
    echo: function (args) { print(esc(args.join(' '))); },
    ask: function (args) {
      if (args.length) { answer(args.join(' ')); return; }
      print('<span class="ok">AI answers are coming in a future version.</span> For now I understand simple questions, like ' + cmd('what do you do?') + ' or ' + cmd('why a terminal?'));
    },
    sudo: function (args) {
      if (/hire/.test(args.join(' '))) { print('<span class="ok">[sudo] permission granted.</span> Great choice.'); C.contact(); return; }
      print('<span class="warn">Nice try.</span> The only sudo command here is ' + cmd('sudo hire alfonso'));
    },
    exit: function () {
      print('There\'s no escape. Just kidding: ' + ['blog', 'about', 'projects', 'contact'].map(function (s) { return link(SECTIONS[s], s); }).join('  '));
    }
  };
  C.cv = C.skills;
  C.leadership = C.management;
  C.framework = C.life;
  C.values = C.life;
  C.library = C.books;
  C.reading = C.books;
  C.hobbies = C.offline;
  C.music = C.offline;
  C.man = C.help;
  C.guide = C.tutorial;
  C.cls = C.clear;
  C.hire = function () { answer('hire'); };

  // ---------- plain-English replies (hardcoded until the AI phase) ----------
  var REPLIES = [
    [/\b(hi|hello|hey|hola|yo)\b/, function () { print('Hey! 👋 I\'m Alfonso. Click ' + cmd('help') + ' to see what I can show you, or ask me something.'); }],
    [/co-?found|partner up|start (a|something) together/, function () { C.cofounder(); }],
    [/\bhir(e|ing)\b|consult|freelanc|\bjob\b|work with (you|alfonso)|available/, function () {
      print('I\'m open to interesting conversations: consulting on platform/DevOps/AI-ops, and co-founding.');
      C.contact();
    }],
    [/what (do|does) (you|alfonso) do|who (are you|is alfonso)|what.*your job|tell me about (you|yourself)/, function () { C.whoami(); }],
    [/terminal|emacs|why (a|this|the) (site|website|terminal)/, function () {
      print('Because that\'s where I live. Emacs + tmux + Claude Code is my whole workflow, so it felt honest to make the site feel the same.');
      print('<span class="dim">And the buttons are there so nobody has to learn commands to use it.</span>');
      tryNext(['tutorial', 'about']);
    }],
    [/\blife\b|values|purpose|intention|what matters|priorit/, function () { C.life(); }],
    [/manag|lead(er|ing)?\b|\bteams?\b|people|feedback|psycholog|culture/, function () { C.management(); }],
    [/\bbooks?\b|author|reading list|recommend|economic|hayek|mises|adam smith|phoenix project/, function () { C.books(); }],
    [/music|drum|guitar|bass|piano|instrument|hobb|free time|language|italian|german|japanese|smash/, function () { C.offline(); }],
    [/machine learning|\bml\b|statistic|neural|regression|data scien|\bmodels?\b/, function () {
      print('I studied data science and machine learning with MIT Professional Education: statistics, Gaussian methods, linear regression up to neural networks.');
      print('I\'ve built models, put them in production and tuned them. These days most of my AI work is with Claude.');
      tryNext(['skills', 'projects']);
    }],
    [/project|building|startup|venture|product|tribu/, function () { C.projects(); }],
    [/big ?5|big five|personality|ocean/, function () { C.big5(); }],
    [/contact|e-?mail|reach|linkedin|talk to|get in touch/, function () { C.contact(); }],
    [/blog|post|article|writ|read/, function () { C.blog(); }],
    [/skill|stack|tech|know how|experience/, function () { C.skills(); }],
    [/\bai\b|chat ?gpt|claude|\bllm\b/, function () { C.ask([]); }]
  ];
  function answer(text) {
    var t = text.toLowerCase();
    for (var i = 0; i < REPLIES.length; i++) {
      if (REPLIES[i][0].test(t)) { REPLIES[i][1](); return true; }
    }
    print('Hmm, I don\'t know that one yet. <span class="ok">AI answers are coming soon.</span> For now, try:');
    print('  ' + ['whoami', 'projects', 'blog', 'contact', 'help'].map(function (c) { return cmd(c); }).join('  '));
    return false;
  }

  // ---------- run ----------
  function execute(raw) {
    var line = raw.trim();
    print(PROMPT + esc(line), 'echo');
    if (!line) return Promise.resolve();
    history.push(line);
    hIdx = history.length;
    var parts = line.split(/\s+/);
    var name = parts[0].toLowerCase();
    return ready.then(function () {
      if (Object.prototype.hasOwnProperty.call(C, name) && !/[?]/.test(line)) {
        track(name);
        return C[name](parts.slice(1));
      }
      track('free_text');
      answer(line);
    });
  }

  function typeAndRun(text) {
    if (busy) return;
    busy = true;
    setChips(true);
    input.value = '';
    var i = 0;
    var step = Math.max(12, Math.min(40, 450 / text.length));
    (function tick() {
      if (i < text.length) { input.value += text[i++]; setTimeout(tick, step); return; }
      setTimeout(function () {
        input.value = '';
        Promise.resolve(execute(text)).then(done, done);
      }, 120);
    })();
    function done() { busy = false; setChips(false); }
  }
  function setChips(dis) {
    if (!chips) return;
    Array.prototype.forEach.call(chips.querySelectorAll('button'), function (b) { b.disabled = dis; });
  }

  // ---------- completion ----------
  function complete() {
    var v = input.value;
    var parts = v.split(/\s+/);
    var pool;
    if (parts.length <= 1) {
      pool = Object.keys(C);
    } else {
      var c = parts[0].toLowerCase();
      if (c === 'cat') pool = posts.map(function (p) { return p.slug; });
      else if (c === 'open') pool = Object.keys(SECTIONS).concat(Object.keys(EXTERNAL));
      else if (c === 'ls' || c === 'cd') pool = ['blog'].concat(categories().map(function (x) { return 'blog/' + x.slug; }));
      else if (c === 'theme') pool = ['dark', 'light'];
      else return;
    }
    var last = parts[parts.length - 1].toLowerCase();
    var matches = pool.filter(function (x) { return x.toLowerCase().indexOf(last) === 0; });
    if (!matches.length) return;
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      input.value = parts.join(' ') + (parts.length === 1 ? ' ' : '');
      return;
    }
    var pre = matches.reduce(function (a, b) { var k = 0; while (k < a.length && a[k] === b[k]) k++; return a.slice(0, k); });
    if (pre.length > last.length) { parts[parts.length - 1] = pre; input.value = parts.join(' '); return; }
    print(PROMPT + esc(v), 'echo');
    print(matches.map(function (m) { return cmd((parts.length > 1 ? parts.slice(0, -1).join(' ') + ' ' : '') + m, m); }).join('   '));
  }

  // ---------- events ----------
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy) return;
    var v = input.value;
    input.value = '';
    execute(v);
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') { e.preventDefault(); complete(); }
    else if (e.key === 'ArrowUp') { if (hIdx > 0) { hIdx--; input.value = history[hIdx]; } e.preventDefault(); }
    else if (e.key === 'ArrowDown') { if (hIdx < history.length - 1) { hIdx++; input.value = history[hIdx]; } else { hIdx = history.length; input.value = ''; } e.preventDefault(); }
    else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); C.clear(); }
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-run]');
    if (b) { e.preventDefault(); typeAndRun(b.getAttribute('data-run')); }
  });
  screen.addEventListener('click', function (e) {
    if (e.target.closest('a, button') || String(window.getSelection())) return;
    input.focus({ preventScroll: true });
  });

  // ---------- boot ----------
  var returning = store('aalvz_visited');
  print('<span class="h">Welcome' + (returning ? ' back' : '') + '!</span> This is a real (tiny) terminal about me.');
  if (!returning) {
    print('<div class="hint-box">👋 <b>New here?</b> You don\'t need to know any commands. <b>Click any button</b> below, or type ' + cmd('help') + ' and press Enter. Everything you click shows the command it ran, so you pick it up as you go.</div>');
    store('aalvz_visited', '1');
  } else {
    print('<span class="dim">Type</span> ' + cmd('help') + ' <span class="dim">or click a button below.</span>');
  }
  if (window.matchMedia && matchMedia('(pointer: fine)').matches) input.focus({ preventScroll: true });

  var q = new URLSearchParams(location.search).get('cmd');
  if (q) ready.then(function () { typeAndRun(q.slice(0, 120)); });
})();
