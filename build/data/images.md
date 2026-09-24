# Photography — what is the client's and what is still stock

**Client set:** `output/assets/images/client-images/`, supplied 10 Sep 2026.
That folder is the delivery as received; nothing in it is referenced by a page.
The site copies are generated from it at the house sizes — display 1600px wide,
`-full` 2400px wide, JPEG q82 — and never upscaled past the source.

## Mapping applied

| Client file | Site file | Used on |
|---|---|---|
| `Lapangan…/New Kuta Golf/Dewas Landing.png` | `course-new-kuta-island-green` | hero 1, home + course-list card, course-list banner, detail slide 1, cart |
| `Lapangan…/New Kuta Golf/Dewas Landing II.png` | `course-new-kuta-island-green-aerial` | hero 2, detail slide 2 |
| `Lapangan…/Bukit Pandawa Golf/BPGCC_Hole 13 & 18_1 (1).jpg` | `course-bukit-pandawa-greens` | hero 3, home + course-list card, detail related card |
| `Lapangan…/Bukit Pandawa Golf/BPGCC_Hole_13.jpg` | `course-bukit-pandawa-hole-13` | hero 5, home gallery 3 |
| `Lapangan…/Handara Golf/IMG20210930074642.jpg` | `course-handara-highland` | hero 4, home + course-list card, detail related card, cart |
| `Aktivitas…/20230508_082247.jpg` | `gallery-group-new-kuta-sign` | home gallery 1 |
| `Aktivitas…/20230309_100003(0).jpg` | `gallery-group-on-fairway` | home gallery 2 |
| `Aktivitas…/IMG_20230401_151526_770.jpg` | `gallery-players-and-caddies.webp` | home gallery 4 |
| `Aktivitas…/20230405_110637.jpg` | `gallery-group-highland-deck` | home gallery 5 |
| `Aktivitas…/IMG_20230403_125015_949.jpg` | `gallery-clubhouse-terrace.webp` | home gallery 6 |
| `Aktivitas…/IMG20230216093740.jpg` | `gallery-buggy-line-up` | home gallery 7 |
| `Aktivitas…/IMG-20260908-WA0009.jpg` | `gallery-ladies-group-new-kuta` | home gallery 8 |
| `Aktivitas…/IMG_20221028_081919_830.jpg` | `gallery-corporate-day-new-kuta.webp` | home gallery 9 |


| `Club Hire/20260909_164653.jpg` | `banner/titleist-banner` | club hire section, course list |
| `Club Hire/IMG-20260910-WA0001.jpg` | `club-putter-and-bag` | components.html only |
| `Stick Golf Titleist.png` | `banner/titleist-clubs.webp` | Titleist banner, collage bottom right |
| `Tas Golf Titleist.png` | `banner/titleist-bag-sunset.webp` | Titleist banner, collage bottom left |
| `Tas Golf Titleist Berjejer.png` | `banner/titleist-bags-row.webp` | Titleist banner, collage top |
| `BG Tas Golf Titleist Berjejer.jpg` | `banner/titleist-bags-backdrop.webp` | Titleist banner backdrop |
| `testimoni-1.png` | `testimoni-1.png` | homepage testimonial 1, Pieter |
| `testimoni-2.png` | `testimoni-2.png` | homepage testimonial 2, John & Anna |
| `testimoni-3.png` | `testimoni-3.png` | homepage testimonial 3, Victoria K |
| `contact-page.webp` | `banner/contact-clifftop-aerial.webp` | contact + contact-sent banner |

The four Titleist banner photographs arrived 17 Sep 2026 with the banner
redesign. They were renamed to the house pattern (the delivered names carry
spaces and capitals) and re-encoded from PNG/JPEG to WebP at their delivered
sizes, which took the set from 1.9MB to 531KB. The backdrop is drained of
colour in CSS, not in the file: `filter: grayscale(1)` with `opacity: .14`
over the slate panel, so the original stays available if the treatment changes.
`banner/titleist-banner.jpg`, the single wide photograph the banner used
before, is no longer referenced.

The contact banner changed on 21 Sep 2026 to the client's aerial of the
clifftop course above the bay. They sent it twice: first `banner-contact.jfif`
(a JPEG behind a `.jfif` name, 1509x704), then `contact-page.webp` at
1836x857, which is the one in use — already WebP at 380KB, so it ships as
delivered with no re-encoding. It replaces `course-palm-lined-fairway-full.jpg`,
which was stock and is now referenced by nothing.

The three `testimoni-*.png` avatars arrived on 17 Sep 2026 already cropped to
100x100 and are used as delivered  they sit in a 56px circle, so there is
nothing to generate. They replaced the stock portraits that had been standing
in for real customers. See `testimonials.md`.

**The New Kuta detail gallery carries course photographs only** (client,
17 Sep 2026). The three group photographs that were on it moved to the homepage
gallery strip, where two already were; `gallery-corporate-day-new-kuta` was
added there as item 9.

The logo was already the client's own artwork (`logo-bali-golf-trip.png`); the
scan in `client-images/Logo/` is the same mark with the "CV." prefix and is not
needed.

## Second delivery — the four course folders, 17 Sep 2026

`output/assets/images/Lapangan/` — `New Kuta`, `Bukit Pandawa`, `Bali Handara`,
`Bali Beach`, four photographs each. Same rule as `client-images/`: the folder
is the delivery as received, **no page references it**, and it is excluded from
the Vercel deploy. All sixteen are WebP.

**Scope, client 17 Sep 2026.** These replace the course photographs *only* -
the course-list rows, the detail-page galleries, the home cards and the related
cards on the detail pages. The **homepage hero, the course-list banner, the
homepage gallery strip, the cart thumbnails and `components.html` keep the
photographs they already had  with one exception: hero
slide 4, "Experience the Golf Links Challenge", moved from Bali Handara to the
New Kuta clifftop green at the clients request, 17 Sep 2026**, and were reverted after a first pass changed
them. "Card everywhere" below means home card, course-list row and the related
card on all four detail pages, and nothing else.

| Delivered file | Site file | Source px | Used on |
|---|---|---|---|
| `New Kuta/New Kuta III.webp` | `course-new-kuta-clifftop-green` | 4032 | hero 4, detail slide 1 |
| `New Kuta/Dewas Landing.webp` | `course-new-kuta-water-carry` | 1673 | New Kuta card everywhere, detail slide 2 |
| `New Kuta/Dewas Landing II.webp` | `course-new-kuta-island-green-above` | 1672 | detail slide 3 |
| `New Kuta/New Kuta IV.webp` | `course-new-kuta-coastline-aerial` | 1537 | detail slide 4 |
| `Bukit Pandawa/Bukit Pandawa I.webp` | `course-bukit-pandawa-lookout-tower` | 1536 | detail slide 1 |
| `Bukit Pandawa/BPGCC_Hole_13.webp` | `course-bukit-pandawa-13th` | 4894 | Bukit Pandawa card everywhere, detail slide 2 |
| `Bukit Pandawa/BPGCC_Hole 13 & 18_1 (1).webp` | `course-bukit-pandawa-13th-18th-aerial` | 4000 | detail slide 3 |
| `Bukit Pandawa/Bukit Pandawa III.webp` | `course-bukit-pandawa-lakeside-green` | 1536 | detail slide 4 |
| `Bali Handara/Bali Handara 3.jfif` | `course-handara-garden-path.jpg` | 1024 | detail slide 1 |
| `Bali Handara/Bali Handara I.webp` | `course-handara-clubhouse-deck` | 1448 | detail slide 2 |
| `Bali Handara/Bali Handara IV.webp` | `course-handara-terrace-view` | 1536 | Handara card everywhere, detail slide 3 |
| `Bali Handara/Bali Handara 2.jfif` | `course-handara-lakeside-green.jpg` | 1024 | detail slide 4 |
| `Bali Beach/Bali Beach I.webp` | `course-bali-beach-flame-trees` | 1536 | Bali Beach card everywhere, detail slide 1 |
| `Bali Beach/Bali Beach IV.webp` | `course-bali-beach-clubhouse` | 1536 | detail slide 2 |
| `Bali Beach/Bali Beach III.webp` | `course-bali-beach-fountain-pond` | 1536 | detail slide 3 |
| `Bali Beach/Bali Beach II.webp` | `course-bali-beach-clubhouse-lawn` | 1536 | detail slide 4 |

**Bali Beach is no longer stock.** The slot held `course-headland-view.jpg`, a
stock photograph standing in for a course nobody had sent a picture of. All
four of its photographs are now the club’s own.

### Handara slides 1 and 4, replaced 17 Sep 2026

Two retouched frames were swapped for the client’s real ones:
`Bali Handara III.webp` → `Bali Handara 3.jfif` (slide 1) and
`Bali Handara II.webp` → `Bali Handara 2.jfif` (slide 4), at the
client’s request. Each is the same view as the file it replaces — the garden
path with the pond and mountain, and the green with the lake beyond the trees —
so the alt text still describes them.

Both are JPEGs behind a `.jfif` name and only **1024px wide**, under the 1600px
house display size. They are not upscaled, so these are the two photographs on
the site below the band and may look soft on a wide gallery strip; ask the
client for larger originals if it shows. `course-handara-garden-path.webp` and
`course-handara-lakeside-green.webp` are left on disk, unreferenced.

### Sizes

Thirteen files arrived between 1448px and 1673px wide — inside the house
display band — and are served as delivered, with `data-full` pointing at the
same file. That is the same treatment the WebP files in the first delivery got.

Three arrived far larger and were downscaled to the house sizes, 1600px for
display and 2400px for the lightbox: `New Kuta III` (4032px),
`BPGCC_Hole 13 & 18_1 (1)` (4000px) and `BPGCC_Hole_13` (4894px). A 4894px
photograph in a 430px card is 1.6MB the phone does not need.

There is **no ImageMagick, python or sharp on this machine**, and
`System.Drawing` cannot read WebP, so the resize was done by drawing each
image to a canvas in headless Chrome and re-encoding at WebP q0.88. If these
are ever regenerated, use a real encoder and check the result — a canvas
round-trip is not a lossless pipeline.

### Renamed, same photograph

Two files in this delivery are the ones the first delivery supplied as PNG:
`Dewas Landing` was `course-new-kuta-island-green` and is now
`course-new-kuta-water-carry`; `Dewas Landing II` was
`course-new-kuta-island-green-aerial` and is now
`course-new-kuta-island-green-above`. The old names describe the New Kuta
island green, which is only one of the two, so the names follow the subject now.

### Still in use elsewhere

`course-new-kuta-island-green*.jpg`, `course-bukit-pandawa-greens*.jpg`,
`course-bukit-pandawa-hole-13*.jpg`, `course-handara-highland*.jpg` and
`course-headland-view.jpg` are **still referenced** — by the hero, the
course-list banner, the homepage gallery, the cart and `components.html` — and
must not be deleted. They are no longer on any course card, row or detail
gallery.

## Reverted

The homepage About photo went back to stock on 10 Sep 2026. It had been
`Aktivitas…/IMG-20260908-WA0014.jpg`, written over `about-bali-golf-trip.jpg`.
**That original was overwritten and there is no version control here**, so the
slot now holds a copy of `gallery-bukit-pandawa-par-3.jpg` — a surviving stock
course photograph, not the exact original. Confirm the choice with the client.

The contact page map slot no longer holds a photograph at all: the client's
live Google Maps embed replaced the placeholder on 11 Sep 2026. It had been
back on its original `gallery-golfers-new-kuta-full.jpg`, having briefly
carried `gallery-group-on-fairway-full.jpg`.

The contact page banner is **settled**. It was briefly a client group shot
(`Aktivitas…/IMG20220913121341.jpg`, written over
`contact-course-banner-full.jpg`), then, after the client asked for a course
photograph back on 10 Sep 2026 and the original had already been overwritten,
a stand-in: `course-palm-lined-fairway-full.jpg`, the closest surviving stock
landscape rather than the exact original. **That open question is closed:**
the client supplied `banner-contact.jfif` on 21 Sep 2026 and the banner now
carries their own photograph. `contact-course-banner-full.jpg` and
`course-palm-lined-fairway-full.jpg` are both unreferenced now.

## Still stock — the client has supplied nothing for these

| Slot | Why |
|---|---|
| `testimonial-netherlands/-denpasar/-china.jpg` | No customer portraits in the set. **Must not ship** — stock faces attached to named quotes. |
| `lesson-practice-ground.jpg`, `lesson-short-game.jpg` | The `Golf Lesson/` folder came through **empty**. |
| `course-headland-view.jpg` (Bali Beach card and row) | No Bali Beach photo in the set. |
| `blog-which-course-first`, `blog-handara-crater`, `gallery-australian-pga-member`, `gallery-golfers-new-kuta`, `gallery-handara-crater`, `gallery-interclub-new-kuta-full` | Blog cards and banner. Illustrative only. |

## Not placed — supplied but no slot

- `Club Hire/20260910_140640.jpg` (clubs fanned out) and
  `Club Hire/WhatsApp Image 2026-08-20 at 2.17.54 PM.jpeg` (bag at sunset) —
  the club hire section is one banner, so only one photo fits.
- `Aktivitas…/IMG_20220915_211629_876.jpg` — carries a third party's corporate
  banner (PT. Manambang Muara Enim). Needs their permission before it is used.
- `Aktivitas…/FB_IMG_1674999171282.jpg` — 1080px with grey letterbox bars
  baked in; too small and too damaged for any slot.
- The remaining `IMG-20260908-WA*` group shots — duplicates of scenes already
  covered.
- Two `.mp4` clips — the site has no video component.

## Caveats

- `Lapangan…/New Kuta Golf/IMG_0860.HEIC` **cannot be used.** HEIC is not a web
  format and no browser will render it. Ask for a JPEG of the same frame.
- Four `Aktivitas` files ending `.jpg` are **actually WebP**. They are copied
  through as `.webp` at their original 1440px rather than re-encoded, so their
  lightbox `data-full` points at the same file as the thumbnail.
- `Dewas Landing.png`/`II.png` are 1673px wide, so their `-full` variants are
  1673px, not the usual 2400px.
- `gallery-ladies-group-new-kuta` came in at 960×1280; its `-full` is the same
  file size-for-size.
- The homepage gallery `id`s (`home_gallery_item_interclub`, `…_black_tee`,
  `…_pga_member`, `…_client_new_kuta`, `…_third_round`, `…_happy_golfers`) were
  named after the stock photos they used to hold. Automation ids are a contract
  and are never renamed, so they no longer describe their picture. The `alt`
  text does.
