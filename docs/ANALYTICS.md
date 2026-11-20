# Analytics: Cloudflare Web Analytics

Cloudflare Web Analytics counts page views, referrers, countries and page speed. Cloudflare's documentation says it uses no cookies, localStorage, sessionStorage or IndexedDB, does not fingerprint visitors (no tracking by IP address or browser string), and does not collect or use visitors' personal data. It is free.

## Status (21 Nov 2026): prepared, switched off

- The loader is built: `public/analytics.js`, included on every page **only when `src/data/site.ts` holds a token**. The token is empty, so nothing loads today.
- The loader adds Cloudflare's beacon **only on durbeen.io** (and `www`), never on `localhost`, a `workers.dev` preview or a look-alike domain, and **never when the visitor's browser sends "Do Not Track"**. Tested in Chrome with a throwaway token for all of these cases.
- The **Privacy page follows the same setting**: with no token it says "no analytics yet"; with a token it describes Cloudflare Web Analytics. It can never claim more than the site does.

## Step by step: get the token (your step: it needs your Cloudflare login)

Source: Cloudflare's "Get started" page for sites not proxied through Cloudflare (checked 21 Nov 2026). Menu names can change slightly.

1. Sign in at <https://dash.cloudflare.com> and open **Web Analytics** (left menu), or go straight to <https://dash.cloudflare.com/?to=/:account/web-analytics>.
2. Click **Add a site**.
3. Under **Set up hostname**, type `durbeen.io`. Click the message box that appears to choose it, then click **Done**.
4. Click **Manage site**. You will see a **JS snippet** that contains `data-cf-beacon='{"token": "…"}'`.
5. Copy **only the token**: the long string of letters and numbers between the quotes after `"token":`. Do not copy the rest.
6. Send me the token. It is not a secret (it appears in every page's source), so you can paste it in the chat. I will put it in `src/data/site.ts` in a small pull request.
7. **Do not paste the snippet into any file.** The loader does that for you, and Cloudflare allows only one snippet per page.

When will data appear? Cloudflare accepts the beacon only from the hostname you registered. Until the site is served from durbeen.io (Phase 8, launch) nothing will be recorded, and that is expected. After launch it can take a few minutes for numbers to appear.

**At launch (Phase 8):** once durbeen.io is connected through Cloudflare, Cloudflare may turn on its automatic setup for the site. Because only one snippet may run per page, open **Web Analytics, Manage site** and choose **Enable with JS Snippet installation** (manual), so it does not add a second one.

## For Phase 7 (security headers)

If the Content-Security-Policy is set, Cloudflare's docs say a manually embedded beacon needs:
- `script-src … https://static.cloudflareinsights.com/beacon.min.js`
- `connect-src … cloudflareinsights.com`

## Turning it off again

Set `ANALYTICS_TOKEN` back to `''` in `src/data/site.ts`. The script and the Privacy text both go away.
