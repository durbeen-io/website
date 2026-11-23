# Analytics: Cloudflare Web Analytics

Cloudflare Web Analytics counts page views, referrers, countries and page speed. Cloudflare's documentation says it uses no cookies, localStorage, sessionStorage or IndexedDB, does not fingerprint visitors (no tracking by IP address or browser string), and does not collect or use visitors' personal data. It is free.

## Status (23 Nov 2026): ON

- Web Analytics is switched on for durbeen.io in the Cloudflare dashboard. **Cloudflare injects its own script automatically** (`static.cloudflareinsights.com/beacon.min.js`). There is **no token in the code**.
- It is **cookie-free**.
- The Content-Security-Policy (report-only for now) allows it: `script-src https://static.cloudflareinsights.com` and `connect-src https://cloudflareinsights.com` (PR #79, in `public/_headers`).
- The **Privacy page names Cloudflare Web Analytics** (PR #80).
- The site's own loader, `public/analytics.js`, is **not used**: `ANALYTICS_TOKEN` in `src/data/site.ts` is empty, so nothing from the repo loads. Do not add a token while Cloudflare's automatic setup is on: Cloudflare allows only one snippet per page.

## Turning it off

Turn it off in the Cloudflare dashboard (Analytics & Logs, Web Analytics). Then update the Privacy page and remove the two Cloudflare entries from the CSP in `public/_headers`.

## Notes

- Cloudflare accepts the beacon only from the registered hostname, so nothing is recorded on `localhost` or branch previews.
- If a self-installed snippet is ever wanted instead: set `ANALYTICS_TOKEN` (the token is public) and disable the automatic setup first. The loader adds the beacon only on durbeen.io and not when the browser sends Do Not Track.
