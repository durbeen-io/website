# Writing in Pages CMS

[Pages CMS](https://pagescms.org) is a free editor that sits on top of GitHub. You write and edit articles in forms in the browser; each save is a change to the files in this repository. Nothing is added to the website itself (no server code, no package). The setup is one file, `.pages.yml`.

## Status (21 Nov 2026): configured, not yet tried in the live app

- **Checked against Pages CMS's documentation:** the file layout, the field types (dropdowns, tag picker with 3 to 5, optional scorecard, dates, image upload), the media folder, and the "keep unknown keys" setting. The file parses as YAML, and its 22 fields match the article schema.
- **Not checked (needs your GitHub login, so it can only be tested in the app):** the three points in "First test" below.
- **Why not Keystatic:** its admin needs server-side rendering, an Astro adapter and the React integration, and its own guides say it cannot be used with a fully static build. This site is static on purpose.

## Install (your step: this is a GitHub setting, so I do not do it)

1. Go to <https://app.pagescms.org> and choose **Sign in with GitHub**.
2. When asked to install the **Pages CMS GitHub App**, choose the **durbeen-io** organisation, then **Only select repositories**, then pick **website** only. Read the permissions GitHub shows before you approve, then **Install**.
3. Back in Pages CMS, open **durbeen-io / website**. It finds `.pages.yml` by itself. If it offers to create a configuration, say no.

## How to write (branch workflow)

`main` is protected: every change must come through a pull request with passing checks, so Pages CMS cannot save to `main`.

1. On GitHub, create a branch called `content` from `main` (branch menu, type the name, **Create branch**).
2. In Pages CMS, switch to the `content` branch (it reads `.pages.yml` per branch), open **Articles**, and create or edit.
3. When you are done, on GitHub open a pull request from `content` into `main`. The checks run and Cloudflare builds a preview address for the branch. Merge when green.
4. Pages CMS cannot open the pull request itself (nothing in its documentation says it can).

Tips:
- New articles start as **Draft** (on). Switch it off to publish.
- **Log number** is the next free number; drafts count, and the build fails on a repeat.
- Tags: pick 3 to 5. Description: 120 to 160 characters. The build checks everything again, so a mistake never goes live.
- The article text is a code editor in MDX, so `<Callout>` and code blocks work. There is no live preview: use the Cloudflare preview address of the branch.
- Images: upload in the **Hero image** field. They are saved in `src/content/insights/images/` and written as `./images/name.png`. Always fill the alt text.

## First test (about 10 minutes, on the `content` branch)

1. **MDX files appear.** Articles lists the sample articles (`sample-*`), and opening one fills every field and the text box. The template file `_template.mdx` should be hidden.
2. **Saving changes nothing it should not.** Open `sample-review-lens-kit`, change nothing but one word in the text, save, then look at the change on GitHub. Only that word should differ. The `<Callout>` lines must be untouched, and the scorecard and `series` lines must be unchanged.
3. **Image upload.** On a sample, upload a small PNG as the hero image, add alt text, save, and check the pull request's build passes (the path must be `./images/...`).

If anything fails, send me a screenshot. Fallbacks: change the text box to Pages CMS's rich-text editor (loses MDX components), or keep editing in the repository.

## Keeping it in sync

The dropdown lists are **generated**: categories, types, levels and series from `src/lib/taxonomy.ts`, tags from `src/content/tags.json`. After changing any of them run `npm run cms:build` and commit `.pages.yml`. `npm run check:cms` (and the pull-request checks) fail if it is out of date.

The schema also treats an empty optional value (`series: ""`, an empty scorecard) as "not set", because a CMS may write those.
