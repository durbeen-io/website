# Writing in Pages CMS

[Pages CMS](https://pagescms.org) is a free editor that sits on top of GitHub. You write and edit articles in forms in the browser; each save is a change to the files in this repository. Nothing is added to the website itself (no server code, no package). The setup is one file, `.pages.yml`.

## Status: tested by the founder in the live app, except image upload

- **Tested by the founder on a `cms-test` branch (works):** listing the `.mdx` files in Articles; editing an article (only the frontmatter was reformatted; the body text was untouched); creating an article from a starter template in **Start a new article**; deleting an article.
- **Expect this when you edit:** saving in Pages CMS rewrites the frontmatter block (spacing and quoting can change). That is harmless, but it shows up as extra changed lines in the pull request. Read the body in the diff: it should not change.
- **Not tested yet:** image upload (point 3 in "First test" below). Until it is tested, add hero images in the repository (`docs/PUBLISHING.md`), or test one upload on a sample article before relying on it. The path the CMS writes must be `./images/...`, and the build must pass.
- **Checked against Pages CMS's documentation:** the file layout, the field types (dropdowns, tag picker with 3 to 5, optional scorecard, dates, image upload), the media folder, and the "keep unknown keys" setting. The file parses as YAML, and its 22 fields match the article schema.
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

**Start a new article:** the sidebar has a **Start a new article** group with one entry per type (Guide, Build Note, Review, Comparison, Infographic). Each opens the form pre-filled from the matching starter file (`src/content/insights/_template-*.mdx`): the right type, level and, where certain, the category and series, and the starter text with `[FILL]` hints. The starter files and these entries are the same thing: the entries are generated from the files. Each entry also lists the existing articles of that type.

Tips:
- New articles start as **Draft** (on). Switch it off to publish.
- **Log number** is the next free number; drafts count, and the build fails on a repeat.
- Tags: pick 3 to 5. Description: 120 to 160 characters. The build checks everything again, so a mistake never goes live.
- The article text is a code editor in MDX, so `<Callout>` and code blocks work. There is no live preview: use the Cloudflare preview address of the branch.
- Images: upload in the **Hero image** field. They are saved in `src/content/insights/images/` and written as `./images/name.png`. Always fill the alt text.

## Let content pull requests merge by themselves (auto-merge)

Auto-merge merges a pull request on its own once all required checks pass, so you do not have to come back and click Merge. **This is a GitHub setting, so I have not changed it. You turn it on.** Steps are from GitHub's own documentation (checked 21 Nov 2026):

**Once, for the repository**
1. On GitHub open **durbeen-io / website**, then the **Settings** tab.
2. In the left menu click **General**.
3. Scroll down to **Pull Requests** and tick **Allow auto-merge**.

**Each time, on the pull request from `content` into `main`**
1. Open the pull request (the **Pull requests** tab, then click it).
2. Next to the merge button, open the dropdown and choose **Squash and merge**.
3. Click **Enable auto-merge**, then **Confirm auto-merge**.
4. That is all. When the four required checks pass, GitHub merges it. If a check fails, it does not merge, and you see the failure on the pull request.

Good to know:
- The **Enable auto-merge** button only appears while the checks are still running or failing. If the checks have already passed you will see the normal **Squash and merge** button instead. Just click that.
- Auto-merge needs the branch protection we already have (required checks). Nothing there changes.
- A merged article goes to the live site. Articles with **Draft** on stay hidden, and the site is still hidden from search engines until launch.
- Do not switch on GitHub's "Automatically delete head branches": it would delete your `content` branch after each merge (you would have to recreate it).
- Pages CMS still cannot open the pull request for you. A small automatic step that opens and auto-merges it could be added later; it would be a new GitHub Action, so it needs your approval first.

## First test (about 10 minutes, on a test branch)

Result so far: points 1, 2 and 4 passed (and delete works). **Only point 3, image upload, is still open.**

1. **MDX files appear. (Passed.)** Articles lists the sample articles (`sample-*`), and opening one fills every field and the text box. The template file `_template.mdx` should be hidden.
2. **Saving changes nothing it should not. (Passed: only the frontmatter was reformatted, the body was untouched.)** Open `sample-review-lens-kit`, change nothing but one word in the text, save, then look at the change on GitHub. Only that word should differ. The `<Callout>` lines must be untouched, and the scorecard and `series` lines must be unchanged.
3. **Image upload. (NOT TESTED YET.)** On a sample, upload a small PNG as the hero image, add alt text, save, and check the pull request's build passes (the path must be `./images/...`).

4. **Starter forms. (Passed: creating from a template works.)** In **Start a new article**, open **New Guide**: the form should be pre-filled (type Guide, the `[FILL]` text in the title, description and text), and creating one should add a new file in **Articles**. (Several entries share one folder, which the documentation does not rule out but does not promise.)

If anything fails, send me a screenshot. Fallbacks: for point 4, open the starter files in the repository instead (`docs/PUBLISHING.md`); for point 2, change the text box to Pages CMS's rich-text editor (loses MDX components), or keep editing in the repository.

## Keeping it in sync

The dropdown lists are **generated**: categories, types, levels and series from `src/lib/taxonomy.ts`, tags from `src/content/tags.json`. After changing any of them run `npm run cms:build` and commit `.pages.yml`. `npm run check:cms` (and the pull-request checks) fail if it is out of date.

The schema also treats an empty optional value (`series: ""`, an empty scorecard) as "not set", because a CMS may write those.
