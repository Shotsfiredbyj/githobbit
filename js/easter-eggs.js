// ── Mordor Mode Toggle ──
function toggleMordorMode() {
  document.body.classList.toggle('mordor-mode');
  const btn = document.querySelector('.mordor-toggle');
  if (document.body.classList.contains('mordor-mode')) {
    btn.textContent = 'Flee Mordor';
    document.title = document.title.replace(/GitHobbit.*/, 'GitHobbit - One Does Not Simply Ship to Prod');
  } else {
    btn.textContent = 'Sign in';
    document.title = document.title.replace(/GitHobbit.*/, 'GitHobbit - Where Middle-earth Ships Code');
  }
}

// ── Konami Code Easter Egg → Ring follows cursor ──
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
                    'KeyB','KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.code === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateOneRing();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateOneRing() {
  const ring = document.getElementById('ring');
  if (!ring) return;
  ring.style.display = 'block';
  ring.classList.add('ring-active');
  document.addEventListener('mousemove', (e) => {
    ring.style.left = e.clientX + 15 + 'px';
    ring.style.top = e.clientY + 15 + 'px';
  });
  console.log('%c🔥 One Ring to rule them all, One Ring to find them, One Ring to bring them all, and in the darkness bind them. 🔥',
    'color: gold; font-size: 16px; text-shadow: 0 0 10px red;');
  setTimeout(() => {
    ring.style.display = 'none';
    ring.classList.remove('ring-active');
  }, 30000);
}

// ── Console Easter Egg ──
console.log(`
  %c🧙 GitHobbit v3.019
  %c"All that is gold does not glitter,
   Not all who wander are lost;
   The old that is strong does not wither,
   Deep roots are not reached by git rebase --hard."

   — Gandalf the Grey (Staff Engineer)
`, 'color: #58a649; font-size: 18px; font-weight: bold;',
   'color: #d4a843; font-size: 12px; font-style: italic;');

// ── Keyboard shortcut: / focuses search ──
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !e.target.matches('input, textarea')) {
    e.preventDefault();
    const search = document.querySelector('.nav-search');
    if (search) {
      search.style.borderColor = 'var(--rivendell-blue)';
      setTimeout(() => search.style.borderColor = '', 1500);
    }
  }
});
