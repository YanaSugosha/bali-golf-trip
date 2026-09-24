# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A static marketing/booking site for Bali Golf Trip. No build system, no package manager, no tests — open `output/index.html` in a browser.

- `SKILL.md` — the team's `tmd-design-to-html` standard (tokens, BEM, automation-`id` naming, folder layout, QA checklist). It governs everything in `output/`. Read it before adding a page or component.
- `bali-golf-trip-hifi-v14.html` — the original single-file hi-fi prototype. **Historical reference only.** `output/` supersedes it; don't edit it, and don't copy patterns from it (it predates the standard: inline styles, camelCase ids, fake SPA routing).
- `output/` — the standards-compliant build. This is the live work.
- `build/` — page assembler (see below).

## Regenerating pages

The navbar, drawer and footer are identical across all 21 pages, so they are **not** hand-maintained per file. `build/` holds the chrome and one body fragment per page:

```
build/chrome-head.html   nav + drawer, with __TITLE__ / __PAGECSS__ / __<NAVKEY>__ placeholders
build/chrome-foot.html   footer + lightbox + WhatsApp button, __PAGEJS__ placeholder
build/body-<page>.html   that page's unique <main> content
build/assemble.sh        stitches them into output/*.html
```

```sh
sh build/assemble.sh     # rebuilds all 21 pages
```

**Edit `build/body-<page>.html`, not `output/<page>.html`** — assemble.sh overwrites the latter. The page table at the top of `assemble.sh` maps each page to its title, active drawer link(s), page CSS and page JS. Anything touching nav/footer goes in `chrome-*.html` so it can't drift between pages.

`output/components.html` is written directly (not assembled) and must be updated in the same task whenever a global component changes.

## Course content has one source

`build/data/courses.md` is the source of truth for every course fact. The same
course appears at three lengths — home card excerpt, course-list paragraph,
detail-page paragraphs — and those are **edits of one text, never three
separate write-ups.**

Change the course in `courses.md` first, then bring its three surfaces into
line. Anything asserted on a page must trace back to that file; the file marks
which courses have client-supplied copy and which are still in-house
placeholder, and lists claims pulled pending confirmation.

## Breadcrumbs

Every page carries one **except the homepage** (it is the root) **and the six
checkout-flow pages** — cart, cart-empty, checkout, payment, received,
confirmed, failed — where a funnel step is not a place in the hierarchy. It sits at the foot of the page, directly above the footer, on a transparent
ground with a rule that stops at the container edges. Where a page’s last
section is `--cream`, the breadcrumb takes `.breadcrumb--panel` so the parchment
band carries on instead of stepping back to white for one strip — that is
courses, the four course details and the blog post. The trail lives in each `body-*.html`, not the chrome, because it
differs per page;
the last crumb is the current page, unlinked, with `aria-current="page"`. The
"/" separators are drawn by CSS so a screen reader reads the list, not a row of
slashes.

## State pages

Empty, error and success states are separate pages, not query-string variants:
`cart-empty`, `blog-search-results`, `blog-no-results`, `contact-sent`, `404`, plus the booking-flow
states. Each is reached through the control that would produce it — Apply on the blog,
Send message on contact, Remove on the cart — so the prototype can be walked
end to end. The failed payment is the exception: both outcomes hang off the same
Pay button, so it keeps a small grey `.state-link`, which is scaffolding to
strip before launch. `output/components.html` lists every state page.

## The terms have one source

`build/data/terms.md` holds the client’s Terms & Condition copy and the list of
places the rest of the site contradicts it — cancellation charges against a
"free to cancel" booking flow, and an inclusions list that does not match the
packages. The page is verbatim, typos included. Do not tidy it.

## The booking flow has one source

`build/data/booking-flow.md` describes it: the customer places a booking
request with **no payment**, we agree the details on WhatsApp, then send a
Midtrans payment link by hand, and the booking is confirmed once that is paid.
`payment.html` is a mock of the Midtrans page, reached from that link and not
from checkout. Read it before touching cart, checkout, received, confirmed,
payment or failed — the six pages share one set of demo figures.

## Photography has one source

`build/data/images.md` records where every photograph came from: which client
file each site image was generated from, which slots are still stock, and which
supplied files could not be used. Add a row there whenever an image changes.

`output/assets/images/client-images/` is the client's delivery as received —
**never reference it from a page.** Generate a site copy at the house sizes
(display 1600px wide, `-full` 2400px wide, never upscaled) and point the page
at that.

## CSS architecture

Load order on every page: `tokens.css` → `base.css` → `components.css` → `pages/[page].css`.

- **`tokens.css`** — `:root` custom properties only. Every colour and spacing value traces here; no raw hex anywhere else. Alpha overlays derived from the brand ink are tokenised (`--line`, `--on-dark`, …) rather than repeated inline.
- **`components.css`** — anything used on 2+ pages. BEM with `--` modifiers (`.pill--ghost`, `.section--dark`) and `is-` state classes (`.is-active`, `.is-open`, `.is-selected`).
- **`pages/*.css`** — genuinely single-page only. `courses` has no page CSS; that's correct, not an omission. If a page style is needed by a second page, move it to `components.css` and add it to `components.html`.

Mobile behaviour that is easy to undo by accident: `.grid-3` goes three → two →
one rather than straight to one; `.site-footer__grid` is two columns from 900 down
to 600 with the brand block spanning; `.filter-bar` becomes a one-column grid at
600 because its `min-width` fields strand themselves otherwise; and
`.course-rows .split > .ratio` takes `order: -1` so the alternating course rows all
stack photo-first. Touch sizing lives in `@media (pointer: coarse)` blocks at the
end of each file, never in the width queries.

The Titleist banner is the one exception: its hire spec sheet takes a third
step at **1180px**, where the lists and the photographs stop fitting side by
side, and its columns use `auto-fit` so they thin out on their own rather than
stepping at each width. It is the only block on the site with that much tabular
copy. See the `assumption:` note on the rule in `components.css`.

**Breakpoints are 900px / 600px, desktop-first** — the design's own, deliberately kept instead of the house `sm/md/lg` scale so the layout switches exactly where it did in the approved design. This is a documented deviation from SKILL.md §5, flagged in the file headers. Don't "fix" it without a design decision.

## JavaScript

Vanilla ES5-style, no dependencies, one IIFE per file, every component null-checks its own elements before binding.

- **`main.js`** (every page) — navbar scroll state, drawer, the blog filter disclosure, scroll reveal, and two shared globals other scripts depend on: `window.bgtSwipe(el, onLeft, onRight)` and `window.bgtLightbox.open(list, index)`.
- **`home.js`** — hero slider, testimonials, gallery. `heroCopy` is index-parallel to the `<img>` elements in `#home_hero_background` **and** the buttons in `#home_hero_dots_nav`; adding a slide means editing all three.
- **`detail.js`** (all four course pages) — the looping carousel (clones the slide set either side of the originals and snaps the index back on `transitionend`) and the booking calculator. The rate card is **not** in the JS: it reads `data-green-fee` and `data-saving` off `#detail_booking_form`, so one file serves every course. A course with a single photograph renders a still instead of a carousel and the carousel half no-ops.

The lightbox reads each image's **`data-full`** attribute for the large file, falling back to `src`. Any new lightbox-able image needs both.

## Automation IDs are a contract

Every interactive element carries a snake_case `<page>_<element>_<component>` id (`detail_players_dropdown`, `global_menu_button`). These are the QA automation contract and the JS hooks — **never rename an existing one.** Repeated items use stable business identifiers, never indexes (`cart_item_new_kuta_10sep`, not `cart_item_1`).

## Constraints that hold across the site

- No inline `<style>` blocks and no `style=""` attributes — the only exception is colour swatches in `components.html`.
- Every `<img>` has an `alt`; icon-only buttons have `aria-label`.
- Any anchor leaving the site takes `target="_blank" rel="noopener"`. `mailto:` and internal links do not.
- All images are local files in `assets/images/`; each photo has a display size and a `-full` variant for the lightbox. Never reference a path that isn't on disk. A few client photos arrived as WebP behind a `.jpg` name and are served as `.webp` at their original size — see `build/data/images.md`.
- Runtime behaviour and visual QA have never been verified here — there's no way to test in this repo. Hand back a manual QA checklist per SKILL.md §10 rather than claiming a slider or price calculation works.
