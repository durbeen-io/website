// Runs in <head> before the page paints, so there is no light/dark flash.
// If the visitor chose a theme with the toggle, apply it. Otherwise do nothing:
// the CSS follows the system setting (prefers-color-scheme).
// Kept as a separate file (not inline) so the Content-Security-Policy can stay strict.
try {
  var t = localStorage.getItem('theme');
  if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
