# Course content — single source

The same course appears on three surfaces at three lengths:

| Surface | File | Length |
|---|---|---|
| Home card | `build/body-index.html` | eyebrow, title, price, CTA |
| Course list | `build/body-courses.html` | eyebrow, title, description clamped to 3 lines, 2-row spec table, price, CTA |
| Course detail | `build/body-detail-<slug>.html` | eyebrow, title, gallery, package name, the client's package copy in full, booking form |

Every course has its own detail page: `detail-new-kuta`, `detail-bukit-pandawa`,
`detail-handara`, `detail-bali-beach`. They share `pages/detail.css` and
`detail.js`; the rate card comes off `data-green-fee` / `data-saving` on the
booking form, so the JS is not per-course.

**The detail page carries the client's package copy and nothing else.** Client
instruction, 10 Sep 2026: *"jangan kurang mau pun lebih dari konten yang
diberikan klien"*. No in-house spec rows, no invented tee times, no claims that
are not in the sheet. Anything the site needs for its own function — the green
fee, club hire, the cart — sits in the booking form, not in the description.

**Package inclusions**, client 21 Sep 2026 (replacing the three-item list of
11 Sep). On every bookable detail page as a `.check-list` under the heading
**This Package Includes:**, positioned between the description and the list
that follows it — except on New Kuta, whose sheet has both a list and a field
table, where it sits at the very bottom after both:

- Green Fee 18 Holes
- Check-in/out Assistance
- Caddie Service (tip excluded)
- Golf Cart (Shared)
- Mineral Water — **New Kuta only.** Handara and Bukit Pandawa list four
  items, without it.

Transport is a priced add-on, not an inclusion (client, 11 Sep 2026, reversing
the earlier instruction): a Yes/No row in the booking form, defaulting to No,
and not in the inclusions list. The fee is **IDR 500.000 per car, except at
Bali Handara, which is IDR 600.000** (client, 17 Sep 2026). It comes off
`data-transport` on the booking form, one more field in the rate card beside
`data-green-fee` and `data-saving`, so `detail.js` stays free of per-course
figures.

**Bali Beach carries no package terms at all** — no inclusions, no transport
line. The course is not open, so there is no package to sell.

**Change a course here first, then update its three surfaces so they agree.**
Every fact on those pages must trace back to this file. The three surfaces are
edits of the same content, never three separate write-ups.

The course list carries the **same two spec rows in the same order** — Tee
windows, then Format — with the price below them, so the list is comparable.
Per-course extras belong on the detail page.

**Bali Beach is the exception:** it shows Tee windows only (client, 21 Sep
2026). Its Format row read "9 holes — seven par 4, one par 5, one par 3" and is
gone from the list; the hole breakdown is still in the client's own paragraphs
on the detail page. The course is not open, so there is nothing to compare it
against yet.

**Where the client sheet gives no value, the row reads `TBD`** (client
instruction, 10 Sep 2026). Do not fill a gap with an in-house guess.

## Tee times

Client, 11 Sep 2026. The list row gives the window; the detail page's dropdown
offers every slot, split Morning / Afternoon at noon.

| Course | Slots |
|---|---|
| New Kuta Golf | 6:15, 6:30, 6:45, 7:00, 7:15, 7:30 AM · 12:30, 12:45, 1:00, 1:15, 1:30, 1:45, 2:00 PM |
| Bukit Pandawa Golf | 6:00 AM – 3:00 PM, on the hour |
| Bali Handara Golf | 6:00 AM – 3:00 PM, on the hour |
| Bali Beach Golf and Country Club | TBD — not open |

The client writes these with a dot (`06.15`); the site writes every time as
12-hour with AM/PM and no leading zero — `6:15 AM`, `2:00 PM` (client,
11 Sep 2026). Same time, house format. It applies wherever a tee time is
printed: the dropdowns, the Tee windows rows, and the cart, checkout and
booking-state pages.

**Bali Handara is named `Bali Handara Golf`** (client, 21 Sep 2026), not
"Bali Handara Golf Country Club" as before. Two places keep the longer form
and are not mistakes:

- The client's own description opens "Bali Handara Golf Country Club & Resort
  Bali is an award-winning Golf Getaway...". That sentence is theirs, quoted
  verbatim, and is not reworded to follow the label.
- The **package** is still `Bali Handara Golf Country Package`, from the
  client's detail sheet. The course and the package are different names here,
  as the table below records. Ask before changing the package too.

**The subtitle above a course name is the area, and nothing else.** Same word on
every page. No holes, par, drive time or status — those live in the spec table.

| Course | Subtitle |
|---|---|
| New Kuta Golf | Pecatu |
| Bukit Pandawa Golf | Bukit Peninsula |
| Bali Handara Golf | Bedugul |
| Bali Beach Golf and Country Club | Sanur, Denpasar |

Names are as written above. Prices use the Indonesian format, `IDR 2.300.000`,
and come from the homepage sheet in `homepage.md` — the course-page sheet
carries no prices.

The detail page also carries the **package** name from the detail sheet, which
is not the course name:

| Course | Package |
|---|---|
| New Kuta Golf | New Kuta Golf Package |
| Bukit Pandawa Golf | Bukit Pandawa Golf Package |
| Bali Handara Golf | Bali Handara Golf Country Package |
| Bali Beach Golf and Country Club | Bali Beach Golf and Country Package (coming soon) |

---

## New Kuta Golf

**Source:** supplied by client, 10 Sep 2026. Authoritative.

> **Use this copy verbatim. Do not reword, tighten or re-punctuate it.**
> Where a surface is too short for all of it, cut at a sentence boundary and use
> whole sentences from below — never a paraphrase.

### Description — verbatim

New Kuta Golf is a championship standard course and the first links style layout in Indonesia. It will challenge both the low handicapper and reward the novice. With five sets of tees, there’s enough variety to ensure a satisfying experience for all skill levels.

● Par 72
● 18-Hole Course
● Selective public welcome
● One day in advance reservation booking for selected public and privilege members
● Tournament packages
● Turf grass Seashore Paspalum

Total area 85 hectares

Hole categories Monkey Tee/Black : 6832 M
Tiger Tee/Gold : 6378 M
Cobra Tee/Blue : 6000 M
Dragon Tee/White : 5600 M
Eagle Tee/Red : 5165 M

Designer Golfplan – Ronald Fream, David Dale & Kevin Ramsey (USA)

Landscape Natural desert-like vegetation with native trees, a semi Scottish rough of existing shrubs, long grass and creepers.

Location On the southwestern rim of the island’s Bukit Peninsula, within the Pecatu Indah Resort grounds. Perched above a limestone cliff, overlooking stunning Dreamland and Balangan Beach. 20 Minutes driving distance from the International Ngurah Rai Airport.

### Course list row

| Field | Value | From |
|---|---|---|
| Tee windows | 6:15 – 7:30 AM · 12:30 – 2:00 PM | the tee-time sheet |
| Format | 18 holes, par 72 | "Par 72", "18-Hole Course" |
| Price | Start from IDR 2.300.000 | `homepage.md` |

### Commercial data (Bali Golf Trip's own, not from the course)

| Field | Value |
|---|---|
| Season saving | IDR 300.000 per player, per `homepage.md`. **The advertised "start from" price is already net of it** (client, 11 Sep 2026): base IDR 2.600.000, less IDR 300.000, shown as IDR 2.300.000. `data-green-fee` on the booking form is the discounted figure; the struck price adds the saving back. |
| Saving shown as | `.promo-badge--save` ribbon on the photo — home card, list row and detail page all the same. On the detail page the booking total also shows the pre-discount figure struck through (`detail_total_was_label`, green fee + saving per player), so the ribbon has something to be a saving against. Courses with no saving have no struck price and no such element. |
| Premium of Club Hire | Titleist — 1 complete set of 13 clubs and 1 golf bag per golfer, IDR 600.000 per set (client, 11 Sep 2026; was "Club hire", 14 clubs, IDR 350.000) |
| Transport | Yes/No radios in the booking form, IDR 500.000 per car, default No. Handara is IDR 600.000 |

These live in the booking form only. The detail page's description block does
not mention them, because the client sheet does not.

Tee times, client 11 Sep 2026. Real values, no longer placeholder.

Dropped from the detail page at the same time, none of them in the client sheet:
the "Green fee", "Tee windows" and "Season offer" spec rows, and the "Club hire"
row. (The "Transport" row came back as a priced option on 11 Sep 2026.)

### Claims removed — awaiting confirmation

These were on the site before the client source arrived and are **not** in it.
Re-add only once someone confirms them:

- "Hosted the 2009 Indonesia Open" / "the Asian Tour brought the Indonesia Open here in 2009"
- "Links Magazine named it Best New International Course"
- "opened 2007" / "Ronald Fream routed it in 2007"
- "thirty minutes from Kuta" — the source gives 20 minutes from the airport instead

---

## Bukit Pandawa Golf

**Source:** supplied by client, 10 Sep 2026. Authoritative. Verbatim.

Opened in October 2016, Bukit Pandawa Golf & Country Club is the latest addition to Bali’s growing collection of world-class golf courses. Situated on a limestone cliff-top overlooking the world-famous surf breaks of Bukit Peninsula, the singular venue offers 18 championship caliber par-3 golf holes, many of which are back-dropped by rustic architectural relics and spectacular views of the Indian Ocean, with a clubhouse inspired by the many grand temples Bali is renowned for.

The club is the centerpiece of an expansive development that will eventually include several 5-star hotels, including a Waldorf Astoria, Mandarin Oriental and Swissôtel.

Both paragraphs are on `detail-bukit-pandawa.html`; the list row uses the first.

| Field | Value | From |
|---|---|---|
| Tee windows | 6:00 AM – 3:00 PM | the tee-time sheet |
| Format | 18 holes, all par 3 | "18 championship caliber par-3 golf holes" |
| Price | Start from IDR 1.850.000 | `homepage.md` |

The earlier in-house claim "World Golf Awards named it the Best Par 3 Golf
Course in the World in 2017" is **not** in the client sheet and has been dropped.

---

## Bali Handara Golf

**Source:** supplied by client, 10 Sep 2026. Authoritative. Verbatim.

Bali Handara Golf Country Club & Resort Bali is an award-winning Golf Getaway that attracts golfers from around the world. Recognized as one of Asia’s most iconic courses, it was ranked among the “Top 50 Greatest Golf Courses in The World.” by Golf Magazine and chosen as the 2015 winner of the “Best Golf Hotel in Indonesia” by the prestigious World Golf Awards.

Handara Golf & Resort Bali is located in the central highlands of Bali and is nestled down inside the crater of a dormant volcano at an altitude of almost 1.200 meters (almost 4.000 feet) above sea level. The resort is surrounded by lush green mountains, crater lakes and an equatorial rainforest that creates dramatic backdrops for approach shots into the well maintained creeping bentgrass greens.

Both paragraphs are on `detail-handara.html`; the list row uses the first.

| Field | Value | From |
|---|---|---|
| Tee windows | 6:00 AM – 3:00 PM | the tee-time sheet |
| Format | 18 holes, par 72 | client, 21 Sep 2026 — not in their written sheet |
| Price | Start from IDR 1.600.000 | `homepage.md` |

Earlier in-house claims — "ranked among the top 50 courses in the world in
1980", "the only course anywhere that plays inside a crater" — are **not** in
the client sheet and have been dropped. The sheet says *dormant* volcano, not
extinct.

---

## Bali Beach Golf and Country Club — coming soon

**Source:** supplied by client, 10 Sep 2026. Authoritative. Verbatim.

It has a detail page like the others — the client's copy is readable in full —
but no booking: the form is replaced by a coming-soon panel with the green fee
as `TBD` and a link to the contact page. The status is written over the photo
with `.ratio__soon`, the same treatment as the homepage card and the list row.

### Description — the list uses the first paragraph, verbatim

The Bali Beach Golf and Country Club Course, set in an environment of very mature, tall trees, has been given a face lift, with the introduction of lakes, mounding and features, including newly designed and constructed greens all of which add to the aesthetic beauty of the course. It is a course that will provide challenges to all golfers of all skill levels.

The whole sheet — the greens and bunkering, the wind on hole 2, the layout, the
note on higher handicappers, the six services and "the more you play it, the more
you want to come back" — is on `detail-bali-beach.html`, verbatim. The list row
uses the first paragraph only.

| Field | Value | From |
|---|---|---|
| Tee windows | TBD | not in the sheet |
| Format | not shown — removed from the list, client 21 Sep 2026 | — |
| Price | Start from TBD | no price in either sheet |

Services listed in the notice: club rental, golf lessons, golf voucher,
tournament package, night driving range, EZ Golf membership (yearly).

---

## Club hire — the Titleist banner spec sheet

**Source:** client, 21 Sep 2026. **Verbatim.** It replaced the one-line
description on the course-list banner, which used to read "Premium Titleist
club hire, with 1 complete set of 13 clubs and 1 golf bag provided for each
golfer." The heading is now that phrase and the detail sits under it.

**Three groups, split on the blank lines in the client's copy** (corrected
21 Sep 2026 after a first pass read it as four). Putter and Titleist Golf Bag
are items inside Brand Titleist, not a group of their own:

| Group | Items |
|---|---|
| Brand Titleist | Driver : TSI2 & TSR2 · Wood 3 : TSi2 & TSR2 · Rescue : TSi2 & TSR2 · Iron Set : T150 T200 T300 · Putter · Titleist Golf Bag |
| Ladies | Fullset Callaway |
| Choose from | Mens Steel Shaff RH · Mens Grafhite Shaff RH · Mens Stiff Steel Shaff RH · Mens Regular steel Shaff RH · Mens Grafhite LH · Ladies Grafhite Shaff RH |

Brand Titleist and Ladies share the left column, Choose from takes the right.

**The client's spelling stands** (confirmed 21 Sep 2026), the same rule as
`terms.md`: "Shaff" for shaft, "Grafhite" for graphite, "TSI2" in the driver
line against "TSi2" in the next two, and the lower-case s in "Regular steel".
Worth raising again before launch — this is a Titleist-branded panel — but they
are not ours to correct.

**"Putter" has no model beside it.** Every other line names one. Left as
written.

The ticks are `ph-fill ph-check-circle` (client request); the fill weight was
already loaded in `chrome-head.html` for the contact card.

### Layout

Client mock, 21 Sep 2026. Two columns: the spec sheet on the left, the three
photographs on the right with the two portraits side by side and the wide shot
under them. The wide shot is still first in the markup and takes row 2 by grid
placement, so nothing had to be reordered. Every photograph keeps its delivered
ratio.

The collage track is `min(430px, 38%)`, so it is the photographs and not the
lists that narrow first - a fixed width held its size while the copy was
squeezed. Below **1180px** the two halves stack: at 1024 the copy was down to
395px and its columns started wrapping. That is a third width step beyond the
house 900/600 and is marked `assumption:` on the rule.

The CTA reads **View & book**, matching the course rows below it.

Earlier attempts, for the record: a four-group split of the copy (wrong, see
above); a three-column sheet, which left too little per column; and a full-width
photo strip along the bottom, which showed the sets larger but cropped them to a
common height. The client chose this one.


## Open — the course sheet asks for something it does not supply

Item 1 of the sheet is "Overview Information (explanation about Bali Golf
Course)" with no copy under it. The course-list banner still carries an in-house
lead paragraph. Either the client sends that copy, or the paragraph stays ours.
