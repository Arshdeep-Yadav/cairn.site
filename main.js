/* Cairn landing page — vanilla JS, no dependencies. */
(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------ theme */
  const THEME_KEY = 'cairn-site-theme';
  const themeToggle = document.querySelector('[data-theme-toggle]');

  function resolvedTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function paintTheme() {
    const theme = resolvedTheme();
    root.dataset.theme = theme;
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.classList.add('is-theme-switching');
    localStorage.setItem(THEME_KEY, next);
    paintTheme();
    window.setTimeout(() => root.classList.remove('is-theme-switching'), 60);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!localStorage.getItem(THEME_KEY)) paintTheme();
  });

  paintTheme();

  /* ----------------------------------------------------------------- header */
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function closeMenu() {
    if (!menu || !menuToggle) return;
    menu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  menuToggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
    document.body.classList.toggle('menu-open', Boolean(open));
  });

  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  /* ------------------------------------------------------------ copy buttons */
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const selector = button.getAttribute('data-copy');
      const source = selector ? document.querySelector(selector) : button.closest('[data-copy-scope]')?.querySelector('code');
      const text = source?.textContent?.trim();
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
      }

      button.classList.add('is-copied');
      const label = button.querySelector('[data-copy-label]');
      const previous = label?.textContent;
      if (label) label.textContent = 'Copied';
      window.setTimeout(() => {
        button.classList.remove('is-copied');
        if (label && previous) label.textContent = previous;
      }, 1600);
    });
  });

  /* -------------------------------------------------------------- tab groups */
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

    function activate(tab, focus = true) {
      tabs.forEach((candidate, index) => {
        const selected = candidate === tab;
        candidate.setAttribute('aria-selected', String(selected));
        candidate.tabIndex = selected ? 0 : -1;
        const panel = panels[index];
        if (panel) {
          panel.hidden = !selected;
          panel.classList.toggle('is-active', selected);
        }
      });
      if (focus) tab.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab, false));
      tab.addEventListener('keydown', (event) => {
        const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        activate(tabs[next]);
      });
    });

    const initiallySelected = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    if (initiallySelected) activate(initiallySelected, false);
  });

  /* ------------------------------------------------------- active navigation */
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        let best = null;
        let ratio = 0;
        for (const [id, value] of visible) {
          if (value > ratio) {
            ratio = value;
            best = id;
          }
        }
        if (best) {
          navLinks.forEach((link) => {
            const current = link.getAttribute('href') === `#${best}`;
            if (current) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          });
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.4, 0.75] },
    );
    sections.forEach((section) => observer.observe(section));
  }

  /* ------------------------------------------------------------- reveal pass */
  const revealItems = [...document.querySelectorAll('.reveal')];
  if (revealItems.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
    root.classList.add('has-reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) {
      revealItems.forEach((item) => item.classList.add('is-revealed'));
      root.classList.remove('has-reveal');
    }
  });

  /* ------------------------------------------------------------ year stamp */
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
