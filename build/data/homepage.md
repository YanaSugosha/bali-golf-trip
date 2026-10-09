# Homepage content — single source

**Source:** client content sheet, 10 Sep 2026. Authoritative. Use verbatim.

## 1 · Hero banner text

Five texts, rotating. Index-parallel to the `<img>` list in
`#home_hero_background`, the `heroCopy` array in `assets/js/home.js`, and the
dot buttons in `#home_hero_dots_nav` — adding a slide means editing all three.

1. Professional Golf Tours with Excellent Services
2. Perfect Plan for your Golf Vacation in Bali
3. Best Bali Golf Tour Packages
4. Experience the Golf Links Challenge
5. Where Every Day is a Great Golf Day

## 2 · About Bali Golf Trip

Bali is a world-class golf destination with 4 golf courses, offering unique play, stunning landscape and challenging play for beginner and experienced golfers. Bali Golf Trip offers one stop services including discounted green fee, guaranteed tee time and free transports. Let us do the work for you and make your golf experience very satisfying with the best services!

## 3 · Overview — Bali Golf Course

| Course | Area | Price | Season saving |
|---|---|---|---|
| New Kuta Golf | Pecatu | Start from IDR 2.300.000 | save IDR 300.000 this season |
| Bukit Pandawa Golf | Bukit Peninsula | Start from IDR 1.850.000 | none |
| Bali Handara Golf | Bedugul | Start from IDR 1.600.000 | save IDR 400.000 this season |
| Bali Beach Golf and Country Club | Sanur, Denpasar | Start from TBD | coming soon, not bookable |

Card layout, per the client mockups of 10 Sep 2026: photo, area, name, a
divider rule, price, button — **no description paragraph.** The season saving
is a red ribbon on the bottom edge of the photo, not a line under the price.

Bali Beach carries "Coming Soon" written across its photo on a dark veil. Its
button is the same green "View course" as the rest and links to its section on
the course list — the card is a read, not a booking; nothing on it offers a tee
time.

**Card design, client mock 11 Sep 2026.** The four courses are overlay cards —
photograph full bleed, name, price and button on it — laid out two by two
(`.grid-2`), and the same card carries the "also on the island" row on every
detail page. The component is `.card.card--overlay` in `components.css`; the
old stacked card it replaced is still there for anything else that needs it.

Names are as written above — **"New Kuta Golf", not "New Kuta"**. Prices use the
Indonesian digit grouping with the ISO code, `IDR 2.300.000`.

## Conflicts this sheet creates elsewhere — unresolved

⚠️ These pages now disagree with the homepage. Someone has to decide which is
right before launch.

| Where | Says | Homepage now says |
|---|---|---|
| The card mockup | Price label reads **From** | `Start from`, as the sheet writes it. The 11 Sep 2026 card redesign shows **From** again — still not adopted, still the sheet's wording on the page. |
| The 11 Sep 2026 card redesign | Saving chip reads **Save IDR 300.000** | `Save IDR 300.000 this season`, the sheet's own phrase, kept |

Resolved 10 Sep 2026. The course list and all four detail pages now use the full
names, the `IDR` format and this sheet's prices. The booking calculator reads its
rate card off the page, so New Kuta deducts IDR 300.000 and Handara IDR 400.000 —
the same numbers the homepage advertises. The old `SEASON_DISCOUNT = 400000` for
New Kuta is gone.

## Kept, though not in the sheet

The sheet lists required content, not a full layout. These were left in place
because nothing in it contradicts them:

- The "Book a tee time" and "Our courses" buttons, the testimonials, gallery
  and closing contact section

The gallery heading was "Mornings on the island" while the photos were stock
landscapes. Six of the eight are now the client's own group shots, so it reads
**"The groups we play with"** — the heading follows the pictures, not the other
way round. Change the photos and check it still holds.

## Removed, because the sheet replaces it

- Per-slide hero eyebrow and body copy — the sheet defines the hero text as
  these five lines alone
- The "Pongky books it, and Pongky is there" about copy
- "Popular" badges on the course cards — not in the sheet; the cards carry the
  season saving instead
- Course card descriptions — the mockup of 10 Sep 2026 has none

## Daily Tour by Request

**Source:** client, 9 Oct 2026. An extra service, arranged **off the website**
— the whole thing is discussed with the admin on WhatsApp. The site's job is
to announce it and hand the reader over, nothing more.

A light band **under About Bali Golf Trip**, before the course list: a green
rule the width of the container (not full bleed), then the heading and one
line on the left and the WhatsApp button on the right
(`home_daily_tour_whatsapp_button`, "Chat WhatsApp"). No eyebrow
and no line under the button, both dropped by the client.

**Motion.** The client asked for the panel to slide down with the copy fading
in behind it. On a white band a sliding white panel is invisible, so the rule
carries it instead: it draws out from the left, and the copy follows on the
site's own reveal, held back by a transition-delay. `home.js` arms it; with no
script, or reduced motion, the rule and copy are simply in place.

**The one line is in-house copy**, not the client's: "Have a preferred course
or schedule? Tell us what you have in mind, and we will help arrange your golf
day in Bali." It says only how the booking works. **Nothing about what the
tour covers** — no itinerary, no price, no duration — until they send that
copy.
