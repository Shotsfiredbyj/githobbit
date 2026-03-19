// ── Shared Nav & Footer ──
// Injected on DOMContentLoaded across all pages.

const navHTML = `
  <div class="nav-left">
    <a href="/" class="nav-logo">
      <span class="octohobbit" title="The Octohobbit">🦶</span>
      GitHobbit
    </a>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links">
      <li><a href="/#features">Product</a></li>
      <li><a href="/treebeard.html">Treebeard</a></li>
      <li><a href="/gandalf.html">Gandalf</a></li>
      <li><a href="/pricing.html">Pricing</a></li>
      <li><a href="https://github.com/Shotsfiredbyj/githobbit" target="_blank" rel="noopener">Open Sauce</a></li>
    </ul>
  </div>
  <div class="nav-right">
    <div class="nav-search">
      <span>Search or jump to the Shire...</span>
      <kbd>/</kbd>
    </div>
    <button class="btn btn-secondary mordor-toggle" onclick="toggleMordorMode()">Sign in</button>
    <a href="/merch.html" class="btn btn-gold">Merch</a>
  </div>
`;

const footerHTML = `
  <div class="footer-grid">
    <div class="footer-brand">
      <span class="octohobbit" style="font-size: 2rem;">🦶</span>
      <p>GitHobbit Inc. &copy; T.A. 3019<br>Built with love in the Shire.<br>Second breakfast served daily.</p>
    </div>
    <div class="footer-col">
      <h4>Product</h4>
      <ul>
        <li><a href="/#features">Deeds (CI/CD)</a></li>
        <li><a href="/gandalf.html">Gandalf Copilot</a></li>
        <li><a href="/treebeard.html">Treebeard (Dependabot)</a></li>
        <li><a href="/pricing.html">Pricing</a></li>
        <li><a href="/#features">Mithril Security</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Explore</h4>
      <ul>
        <li><a href="https://github.com/Shotsfiredbyj/githobbit" target="_blank" rel="noopener">Open Sauce</a></li>
        <li><a href="/#features">Features</a></li>
        <li><a href="/merch.html">Merch</a></li>
        <li><a href="#" title="Coming soon">The Shire Pages</a></li>
        <li><a href="#" title="Coming soon">Marketplace of Dale</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="/about.html">About (The Legendarium)</a></li>
        <li><a href="#" title="Coming soon">Blog (The Red Book)</a></li>
        <li><a href="#" title="Coming soon">Careers (Quests)</a></li>
        <li><a href="#" title="Coming soon">Press (Heralds)</a></li>
        <li><a href="#" title="Coming soon">Rivendell Office</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Support</h4>
      <ul>
        <li><a href="#" title="Coming soon">Docs (Scrolls)</a></li>
        <li><a href="https://github.com/Shotsfiredbyj/githobbit" target="_blank" rel="noopener">Community (Council)</a></li>
        <li><a href="#" title="Coming soon">Status (Palantír)</a></li>
        <li><a href="/gandalf.html">Contact Gandalf</a></li>
        <li><a href="/pricing.html">Premium Support (Eagles)</a></li>
      </ul>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="footer-bottom-links">
      <a href="#" title="Coming soon">Terms of Fellowship</a>
      <a href="#" title="Coming soon">Privacy (Invisibility Policy)</a>
      <a href="#" title="Coming soon">Cookie Policy (Lembas)</a>
      <a href="/about.html">About</a>
    </div>
    <span>Made with 🍄 in the Shire</span>
  </div>

  <!-- Secret inscription -->
  <p class="tengwar" title="One Ring inscription, but for code">
    ash git push-ishi, ash git merge-ishi, ash git blame-ishi, ash burzum-ishi krimpatul
  </p>
`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const nav = document.getElementById('shared-nav');
  if (nav) {
    nav.innerHTML = navHTML;
  }

  // Inject footer
  const footer = document.getElementById('shared-footer');
  if (footer) {
    footer.innerHTML = footerHTML;
  }

  // Highlight current nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '/index.html' && href === '/')) {
      link.classList.add('active');
    }
  });

  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  // Inject ring cursor element if missing
  if (!document.getElementById('ring')) {
    const ring = document.createElement('div');
    ring.className = 'ring-cursor';
    ring.id = 'ring';
    ring.textContent = '💍';
    document.body.appendChild(ring);
  }
});
