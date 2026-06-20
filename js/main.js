/* ============================================================
   Jagapathi Babu Allam — Portfolio
   Vanilla JS: theme toggle, typed hero, scroll-reveal,
   active-section nav, mobile menu, footer year.
   No dependencies.
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Theme toggle ---------- */
  var toggle = document.getElementById("theme-toggle");

  function syncToggleState() {
    if (!toggle) return;
    var isLight = root.getAttribute("data-theme") === "light";
    toggle.setAttribute("aria-pressed", String(isLight));
    toggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  }
  syncToggleState();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* storage unavailable — theme still applies for the session */
      }
      syncToggleState();
    });
  }

  /* Follow OS theme changes only if the user hasn't chosen explicitly */
  var media = window.matchMedia("(prefers-color-scheme: light)");
  media.addEventListener("change", function (e) {
    try {
      if (localStorage.getItem("theme")) return;
    } catch (err) {
      /* ignore */
    }
    root.setAttribute("data-theme", e.matches ? "light" : "dark");
    syncToggleState();
  });

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  function closeMenu() {
    if (!navToggle || !mobileMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.removeAttribute("data-open");
    mobileMenu.hidden = true;
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMenu();
      } else {
        navToggle.setAttribute("aria-expanded", "true");
        mobileMenu.hidden = false;
        mobileMenu.setAttribute("data-open", "true");
      }
    });
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Typed hero effect ---------- */
  var typedEl = document.getElementById("typed");
  var caretEl = document.getElementById("caret");
  var outputEl = document.getElementById("terminal-output");

  var command = "whoami";
  var outputLines = [
    '<span class="ok">→</span> <span class="key">Senior Platform Engineer</span>',
    '<span class="muted">role:</span> DevSecOps · AWS Cloud Engineer',
    '<span class="muted">exp:</span>  6+ years · <span class="muted">loc:</span> Bangalore, India',
    '<span class="muted">stack:</span> AWS · Terraform · CI/CD · Kubernetes · Observability',
    '<span class="ok">●</span> status: <span class="ok">available for opportunities</span>'
  ];

  function renderOutput() {
    if (!outputEl) return;
    outputLines.forEach(function (html, i) {
      var line = document.createElement("div");
      line.className = "out-line";
      line.innerHTML = html;
      outputEl.appendChild(line);
      var delay = prefersReducedMotion ? 0 : 140 * (i + 1);
      window.setTimeout(function () {
        line.classList.add("show");
      }, delay);
    });
  }

  function typeCommand() {
    if (!typedEl) return;
    if (prefersReducedMotion) {
      typedEl.textContent = command;
      renderOutput();
      return;
    }
    var i = 0;
    (function step() {
      if (i <= command.length) {
        typedEl.textContent = command.slice(0, i);
        i++;
        window.setTimeout(step, 85);
      } else {
        window.setTimeout(renderOutput, 220);
      }
    })();
  }

  // Kick off after first paint so the hero is interactive immediately.
  window.requestAnimationFrame(function () {
    window.setTimeout(typeCommand, 350);
  });

  /* ---------- Scroll-reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------- Active-section nav indicator ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll("[data-nav]");

  function setActive(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + id;
      link.classList.toggle("is-active", match);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      navObserver.observe(s);
    });
  }
})();
