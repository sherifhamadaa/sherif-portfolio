(function () {
  "use strict";

  var C = window.SITE_CONTENT;
  if (!C) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  var ICON = {
    github: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    copy: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M15 9V6.2A2.2 2.2 0 0 0 12.8 4H6.2A2.2 2.2 0 0 0 4 6.2v6.6A2.2 2.2 0 0 0 6.2 15H9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
    ext: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 16 16 8M9 8h7v7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  /* ---------- document meta ---------- */
  document.title = C.meta.title;

  /* ---------- navigation ---------- */
  var navHtml = C.nav.map(function (n) {
    return '<a href="#' + esc(n.id) + '" data-nav="' + esc(n.id) + '">' + esc(n.label) + "</a>";
  }).join("");
  $("#desktop-nav").innerHTML = navHtml;
  $("#mobile-nav").innerHTML = C.nav.map(function (n) {
    return '<a href="#' + esc(n.id) + '" data-nav="' + esc(n.id) + '"><span>' + esc(n.label) + "</span></a>";
  }).join("");
  $("#mobile-foot").innerHTML =
    '<a href="' + esc(C.person.github) + '" target="_blank" rel="noopener">' + ICON.github + "<span>GitHub</span></a>" +
    '<a href="' + esc(C.person.linkedin) + '" target="_blank" rel="noopener">' + ICON.linkedin + "<span>LinkedIn</span></a>" +
    '<button type="button" data-copy="' + esc(C.person.email) + '">' + ICON.mail + "<span>Copy email</span></button>";

  /* ---------- hero ---------- */
  var P = C.person;
  var heroShot = C.projects[0] && C.projects[0].screens.filter(function (s) { return s.type === "image"; })[0];
  $("#hero").innerHTML =
    '<div class="wrap hero__grid">' +
      '<div class="hero__copy">' +
        '<p class="hero__role">' + esc(P.role) + "</p>" +
        '<h1 class="hero__name" id="hero-name"><span class="line"><span>' + esc(P.firstName) + '</span></span><span class="line"><span>' + esc(P.lastName) + "</span></span></h1>" +
        '<p class="hero__headline">' + esc(P.headline) + "</p>" +
        '<p class="hero__bio">' + esc(P.bio) + "</p>" +
        '<div class="hero__cta">' +
          '<a class="btn btn--primary" href="#work">View my work</a>' +
          '<a class="btn btn--ghost" href="#contact">Contact me</a>' +
        "</div>" +
      "</div>" +
      '<div class="hero__art" aria-hidden="false">' +
        '<div class="arch arch--outer" aria-hidden="true"></div>' +
        '<div class="arch arch--inner" aria-hidden="true"></div>' +
        (heroShot ? '<div class="hero__phone" id="tilt">' + phoneImage(heroShot, true) + "</div>" : "") +
        '<p class="hero__tag">' + esc(P.availability) + "</p>" +
      "</div>" +
    "</div>";

  /* ---------- phones ---------- */
  function phoneImage(s, eager) {
    return '<div class="phone"><div class="phone__body"><span class="phone__island"></span>' +
      '<img class="phone__screen" src="' + esc(s.src) + '" alt="' + esc(s.alt || "") + '" ' +
      (eager ? 'fetchpriority="high"' : 'loading="lazy"') + ' decoding="async" width="639" height="1136"></div></div>';
  }

  var SURAHS = ["الفاتحة","البقرة","آل عمران","النساء","المائدة","الأنعام","الأعراف","الأنفال","التوبة","يونس","هود","يوسف","الرعد","إبراهيم","الحجر","النحل","الإسراء","الكهف","مريم","طه","الأنبياء","الحج","المؤمنون","النور","الفرقان","الشعراء","النمل","القصص","العنكبوت","الروم","لقمان","السجدة","الأحزاب","سبأ","فاطر","يس","الصافات","ص","الزمر","غافر","فصلت","الشورى","الزخرف","الدخان","الجاثية","الأحقاف","محمد","الفتح","الحجرات","ق","الذاريات","الطور","النجم","القمر","الرحمن","الواقعة","الحديد","المجادلة","الحشر","الممتحنة","الصف","الجمعة","المنافقون","التغابن","الطلاق","التحريم","الملك","القلم","الحاقة","المعارج","نوح","الجن","المزمل","المدثر","القيامة","الإنسان","المرسلات","النبأ","النازعات","عبس","التكوير","الانفطار","المطففين","الانشقاق","البروج","الطارق","الأعلى","الغاشية","الفجر","البلد","الشمس","الليل","الضحى","الشرح","التين","العلق","القدر","البينة","الزلزلة","العاديات","القارعة","التكاثر","العصر","الهمزة","الفيل","قريش","الماعون","الكوثر","الكافرون","النصر","المسد","الإخلاص","الفلق","الناس"];

  // Same rules as the app's search_service.dart _normalize()
  function normalizeAr(v) {
    return String(v)
      .replace(/[ً-ٰٟ]/g, "")
      .replace(/ـ/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function phoneDemo(s, idx) {
    var id = "demo" + idx;
    return '<div class="phone phone--demo"><div class="phone__body"><span class="phone__island"></span>' +
      '<div class="phone__screen demo" data-demo>' +
        '<div class="demo__head">Search</div>' +
        '<label class="demo__field" for="' + id + '"><span class="sr-only">Search surah names</span>' +
          '<input id="' + id + '" type="search" dir="rtl" lang="ar" autocomplete="off" inputmode="search" value="ال عمران" placeholder="ابحث عن سورة">' +
        "</label>" +
        '<div class="demo__try" role="group" aria-label="Example searches">' +
          ["ال عمران", "الفاتحه", "الاسراء"].map(function (q) {
            return '<button type="button" data-q="' + esc(q) + '" dir="rtl" lang="ar">' + esc(q) + "</button>";
          }).join("") +
        "</div>" +
        '<ul class="demo__list" dir="rtl" lang="ar" aria-live="polite"></ul>' +
      "</div></div></div>";
  }

  function initDemo(root) {
    var input = $("input", root), list = $(".demo__list", root);
    var normalized = SURAHS.map(normalizeAr);
    function run() {
      var q = normalizeAr(input.value);
      if (!q) { list.innerHTML = '<li class="demo__empty">اكتب اسم سورة</li>'; return; }
      var out = [];
      for (var i = 0; i < SURAHS.length; i++) if (normalized[i].indexOf(q) !== -1) out.push(i);
      list.innerHTML = out.length
        ? out.slice(0, 12).map(function (i) { return '<li><span class="demo__n">' + (i + 1) + "</span><span>" + esc(SURAHS[i]) + "</span></li>"; }).join("")
        : '<li class="demo__empty">لا توجد نتائج</li>';
    }
    input.addEventListener("input", run);
    $$("[data-q]", root).forEach(function (b) {
      b.addEventListener("click", function () { input.value = b.getAttribute("data-q"); run(); });
    });
    run();
  }

  /* ---------- about ---------- */
  var A = C.about;
  $("#about").innerHTML =
    '<div class="wrap about__grid">' +
      '<h2 id="about-title" class="h2">' + esc(A.title) + "</h2>" +
      '<div class="about__text">' + A.paragraphs.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
      '<dl class="about__facts">' + A.facts.map(function (f) {
        return "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>";
      }).join("") + "</dl>" +
    "</div>";

  /* ---------- skills ---------- */
  var K = C.skills;
  $("#skills").innerHTML =
    '<div class="wrap">' +
      '<div class="skills__top">' +
        '<h2 id="skills-title" class="h2">' + esc(K.title) + "</h2>" +
        '<p class="lede">' + esc(K.intro) + "</p>" +
      "</div>" +
      '<ul class="skills__primary">' + K.primary.map(function (p) {
        return '<li><span class="skills__big">' + esc(p.name) + '</span><span class="skills__note">Used in ' + esc(p.note) + "</span></li>";
      }).join("") + "</ul>" +
      '<div class="skills__groups">' + K.groups.map(function (g) {
        return '<div class="sk"><h3>' + esc(g.title) + "</h3><ul>" + g.items.filter(function (i) { return i.level !== "hidden"; }).map(function (i) {
          return '<li class="' + (i.level === "learning" ? "is-learning" : "") + '">' + esc(i.name) +
            (i.level === "learning" ? '<span class="sk__tag">Learning</span>' : "") + "</li>";
        }).join("") + "</ul></div>";
      }).join("") + "</div>" +
    "</div>";

  /* ---------- projects ---------- */
  function links(p) {
    var out = "";
    var repo = p.repo || P.github;
    out += '<a class="btn btn--primary" href="' + esc(repo) + '" target="_blank" rel="noopener">' + ICON.github + "<span>" + (p.repo ? "View on GitHub" : "GitHub profile") + '</span><span class="sr-only"> (opens in a new tab)</span></a>';
    if (p.demo) out += '<a class="btn btn--ghost" href="' + esc(p.demo) + '" target="_blank" rel="noopener">' + ICON.ext + "<span>Live demo</span></a>";
    return out;
  }

  function projectHtml(p, i) {
    var visual = "";
    if (p.screens && p.screens.length) {
      visual = '<div class="phones" tabindex="0" role="group" aria-label="' + esc(p.name) + ' screens">' + p.screens.map(function (s, k) {
        var inner = s.type === "search-demo" ? phoneDemo(s, i + "-" + k) : phoneImage(s, false);
        return '<figure class="phones__item">' + inner + "<figcaption>" + esc(s.caption || "") + (s.note ? '<small>' + esc(s.note) + "</small>" : "") + "</figcaption></figure>";
      }).join("") + "</div>";
    } else {
      visual = '<div class="win" role="img" aria-label="' + esc(p.name) + ' overview"><div class="win__bar"><span>' + esc(p.name.replace(/ /g, "_")) + '</span></div><div class="win__body">' +
        '<p class="win__big">C++</p><ul>' + (p.pillars || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></div>";
    }
    return '<article class="proj proj--' + esc(p.theme) + '" id="' + esc(p.id) + '" aria-labelledby="' + esc(p.id) + '-t">' +
      '<div class="wrap proj__grid">' +
        '<div class="proj__info reveal">' +
          '<p class="proj__kind">' + esc(p.kind) + '<span class="proj__status">' + esc(p.status) + "</span></p>" +
          '<h3 class="proj__name" id="' + esc(p.id) + '-t">' + esc(p.name) + "</h3>" +
          '<p class="proj__desc">' + esc(p.description) + "</p>" +
          '<ul class="proj__list">' + p.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>" +
          (p.note ? '<p class="proj__note">' + esc(p.note) + "</p>" : "") +
          '<ul class="proj__tech" aria-label="Technologies">' + p.tech.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
          '<div class="proj__links">' + links(p) + "</div>" +
        "</div>" +
        '<div class="proj__visual reveal">' + visual + "</div>" +
      "</div></article>";
  }
  $("#work").innerHTML =
    '<div class="wrap work__head"><h2 id="work-title" class="h2">Featured projects</h2></div>' +
    C.projects.map(projectHtml).join("");
  $$("[data-demo]").forEach(initDemo);

  /* ---------- journey ---------- */
  $("#journey").innerHTML =
    '<div class="wrap"><h2 id="journey-title" class="h2">' + esc(C.journey.title) + "</h2>" +
    '<ol class="tl">' + C.journey.items.map(function (it) {
      return '<li class="tl__item reveal"><p class="tl__date">' + esc(it.date) + '</p><div><h3>' + esc(it.title) + '</h3><p class="tl__place">' + esc(it.place) + "</p><p>" + esc(it.text) + "</p></div></li>";
    }).join("") + "</ol></div>";

  /* ---------- services ---------- */
  $("#services").innerHTML =
    '<div class="wrap svc__grid"><h2 id="services-title" class="h2">' + esc(C.services.title) + "</h2>" +
    '<ul class="svc">' + C.services.items.map(function (s) {
      var learning = /learning/i.test(s.status);
      return '<li class="svc__item"><div><h3>' + esc(s.title) + "</h3><p>" + esc(s.text) + '</p></div><span class="svc__status' + (learning ? " is-learning" : "") + '">' + esc(s.status) + "</span></li>";
    }).join("") + "</ul></div>";

  /* ---------- contact ---------- */
  $("#contact").innerHTML =
    '<div class="wrap contact__grid">' +
      '<div><h2 id="contact-title" class="h2">' + esc(C.contact.title) + '</h2><p class="lede">' + esc(C.contact.text) + "</p></div>" +
      '<div class="contact__panel">' +
        '<p class="contact__email" id="email-text">' + esc(P.email) + "</p>" +
        '<div class="contact__actions">' +
          '<a class="btn btn--primary" href="mailto:' + esc(P.email) + '">' + ICON.mail + "<span>Email me</span></a>" +
          '<button class="btn btn--ghost" type="button" data-copy="' + esc(P.email) + '">' + ICON.copy + "<span>Copy email</span></button>" +
        "</div>" +
        '<ul class="contact__links">' +
          '<li><a href="' + esc(P.github) + '" target="_blank" rel="noopener">' + ICON.github + "<span>GitHub</span><span class=\"sr-only\"> (opens in a new tab)</span></a></li>" +
          '<li><a href="' + esc(P.linkedin) + '" target="_blank" rel="noopener">' + ICON.linkedin + "<span>LinkedIn</span><span class=\"sr-only\"> (opens in a new tab)</span></a></li>" +
        "</ul>" +
      "</div>" +
    "</div>";

  $("#footer").innerHTML = '<div class="wrap"><p>© ' + new Date().getFullYear() + " " + esc(P.name) + ". " + esc(C.footer) + "</p></div>";

  /* ---------- copy email ---------- */
  var toast = $("#toast"), toastT;
  function say(msg) {
    toast.textContent = msg; toast.classList.add("is-on");
    clearTimeout(toastT); toastT = setTimeout(function () { toast.classList.remove("is-on"); }, 2200);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (res, rej) {
      var t = document.createElement("textarea");
      t.value = text; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0;top:0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy") ? res() : rej(); } catch (e) { rej(e); } finally { document.body.removeChild(t); }
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copy]");
    if (!b) return;
    copyText(b.getAttribute("data-copy")).then(
      function () { say("Email copied: " + b.getAttribute("data-copy")); },
      function () { say("Copy failed. Select the address and copy it manually."); }
    );
  });

  /* ---------- theme ---------- */
  var root = document.documentElement, tbtn = $("#theme-toggle");
  function currentTheme() {
    return root.getAttribute("data-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function paintTheme() {
    var dark = currentTheme() === "dark";
    tbtn.setAttribute("aria-pressed", String(dark));
    tbtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute("content", dark ? "#0a1d1e" : "#f1f3ef");
  }
  var saved = store("sh-theme");
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  paintTheme();
  tbtn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next); store("sh-theme", next); paintTheme();
  });

  /* ---------- mobile menu ---------- */
  var sheet = $("#sheet"), openB = $("#menu-open"), closeB = $("#menu-close"), lastFocus;
  function focusables() { return $$("a, button", sheet).filter(function (n) { return !n.disabled; }); }
  function openMenu() {
    lastFocus = document.activeElement;
    sheet.hidden = false; document.body.classList.add("no-scroll");
    openB.setAttribute("aria-expanded", "true");
    requestAnimationFrame(function () { sheet.classList.add("is-open"); closeB.focus(); });
  }
  function closeMenu(restore) {
    sheet.classList.remove("is-open"); document.body.classList.remove("no-scroll");
    openB.setAttribute("aria-expanded", "false");
    setTimeout(function () { sheet.hidden = true; }, reduceMotion ? 0 : 280);
    if (restore !== false && lastFocus) lastFocus.focus();
  }
  openB.addEventListener("click", openMenu);
  closeB.addEventListener("click", function () { closeMenu(); });
  sheet.addEventListener("click", function (e) {
    if (e.target.closest("a[href^='#']")) closeMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (sheet.hidden) return;
    if (e.key === "Escape") { closeMenu(); return; }
    if (e.key === "Tab") {
      var f = focusables(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  window.addEventListener("resize", function () { if (window.innerWidth > 860 && !sheet.hidden) closeMenu(false); });

  /* ---------- active nav ---------- */
  var navLinks = $$("[data-nav]");
  var sections = C.nav.map(function (n) { return document.getElementById(n.id); }).filter(Boolean);
  function setActive(id) {
    navLinks.forEach(function (a) {
      var on = a.getAttribute("data-nav") === id;
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* header state */
  var bar = $("#top");
  function onScroll() {
    bar.classList.toggle("is-stuck", window.scrollY > 12);
    if (window.scrollY < 200) setActive("");
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive("contact");
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- reveal (projects + timeline only) ---------- */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    document.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- hero phone tilt (fine pointers only) ---------- */
  var tilt = $("#tilt");
  if (tilt && !reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var art = $(".hero__art"), raf;
    art.addEventListener("pointermove", function (e) {
      var r = art.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        tilt.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");
        tilt.style.setProperty("--ry", (x * 9).toFixed(2) + "deg");
      });
    });
    art.addEventListener("pointerleave", function () {
      tilt.style.setProperty("--rx", "0deg"); tilt.style.setProperty("--ry", "0deg");
    });
  }

  document.documentElement.classList.add("is-ready");
})();
