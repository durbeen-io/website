// Loads Cloudflare Web Analytics (cookieless). Only included on a page when src/data/site.ts holds a token.
// It adds Cloudflare's beacon only on the real site (durbeen.io), because the beacon rejects other hostnames
// (workers.dev previews would only log errors), and never for visitors whose browser sends "Do Not Track".
// A separate file, not inline, so the Content-Security-Policy can stay strict. See docs/ANALYTICS.md.
(function () {
  var token = document.currentScript && document.currentScript.getAttribute('data-token');
  var host = location.hostname;
  var onSite = host === 'durbeen.io' || host.slice(-11) === '.durbeen.io';
  var dnt = navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNotTrack === '1';
  if (!token || !onSite || dnt) return;
  var s = document.createElement('script');
  s.type = 'module';
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', JSON.stringify({ token: token }));
  document.head.appendChild(s);
})();
