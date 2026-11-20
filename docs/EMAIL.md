# hello@durbeen.io: forward to your Gmail (Cloudflare Email Routing)

Cloudflare Email Routing receives mail sent to hello@durbeen.io and forwards it to a mailbox you choose. It is free. The steps are from Cloudflare's own documentation (checked 21 Nov 2026). Menu names can change slightly; if one is missing, look in the same area.

## Status (21 Nov 2026): not set up

- The site shows `hello@durbeen.io` as plain text (footer, About, legal pages), not as a mail link, because mail does not arrive yet.
- **Enabling Email Routing adds DNS records to durbeen.io. That is a DNS change, so I have not done it and will not. You do it, in the steps below.** It does not affect the website, which is not connected to durbeen.io until launch (Phase 8): only mail records are added.

## Before you start

- You need to be signed in to Cloudflare as the owner of the account that holds durbeen.io. The domain is registered on Cloudflare, so it uses Cloudflare's DNS (required for Email Routing).
- Decide the destination: your Gmail address.
- Have a **second** email account ready for the test (any other provider or address). Do not test from the Gmail you forward to.

## Step by step

**1. Turn on Email Routing for the domain**
1. Sign in at <https://dash.cloudflare.com>.
2. In the left menu go to **Compute**, then **Email Service**, then **Email Routing**. (Direct link: <https://dash.cloudflare.com/?to=/:account/email-service/routing>.)
3. Click **Onboard Domain** and choose **durbeen.io**.
4. Cloudflare shows the DNS records it will add to the domain: **MX** records (to route incoming mail to Cloudflare), a **TXT record for SPF**, and a **TXT record for DKIM**. You may review them.
5. Click **Done**. DNS changes usually finish within 5 to 15 minutes, and can take up to 24 hours.

> **Stop and tell me if** Cloudflare says there are existing MX or SPF records on durbeen.io that conflict, or asks you to delete anything. Do not delete records you do not recognise.

**2. Add and verify your Gmail as the destination**
1. In **Email Routing**, open **Destination Addresses**.
2. Type your Gmail address in the form under **Destination addresses** and submit.
3. Cloudflare emails that address. Open the email in Gmail and click **Verify email address**. (Check spam if it does not arrive.) A routing rule stays disabled until its destination is verified.

**3. Create the hello@ address**
1. In **Email Routing**, select the domain **durbeen.io**, then the **Routing Rules** tab.
2. Click **Create routing rule**.
3. **Email pattern:** type `hello` and choose `durbeen.io`.
4. **Action:** Send to an email.
5. **Destination:** your verified Gmail address.
6. Click **Save**. Make only one rule for `hello` (if there are two, only the first one works).

**4. Test it**
1. From your **other** email account, send a message to hello@durbeen.io.
2. Check your Gmail inbox. If it is not there, check spam.
3. If it works, tell me. Then I will update the Privacy page to name Email Routing, and turn the plain text into a mail link if you want.

## Optional

- **Catch-all:** forwards mail sent to any other address at durbeen.io (including typos such as `helo@`). In **Routing Rules** enable **Catch-all rule**, choose **Send to an email**, pick your Gmail, **Save**. It also forwards junk, so it is off unless you want it.
- **Replying as hello@durbeen.io:** Email Routing only **receives and forwards**. Replying from Gmail will show your Gmail address unless you also set up "send as", which needs a mail-sending service and is a separate decision. Cloudflare's documentation I used does not cover it.

## If it goes wrong

- No mail arrives: wait up to 24 hours for DNS, confirm the destination shows as verified, and test from a different account.
- The rule shows disabled: the destination is not verified yet (step 2).
- To turn it off later: in **Email Routing**, disable or delete the rule, and ask me before removing any DNS records.
