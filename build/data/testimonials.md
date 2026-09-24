# Testimonials — single source

**Source:** client, 17 Sep 2026. Real customer reviews. **Verbatim** — the
spelling, punctuation and missing full stops below are the reviewers' own and
must not be tidied, the same rule as `terms.md`.

They appear in one place: the dark testimonial slider on the homepage,
`#home_testimonial_track`.

## What they replaced

The three testimonials here before this date were **invented** — written
in-house, attributed to people who did not say them, and illustrated with stock
portraits of strangers from Unsplash, whose licence grants no model release.
That is gone. Nothing on this page is written by us any more.

## The three

| Key | Title | Attribution |
|---|---|---|
| `pieter` | Play golf in Bali | Pieter · Jakarta, Indonesia |
| `john_anna` | Excellent service and quality | John & Anna · Newcastle, Australia |
| `victoria` | Great experience with a perfect organization | Victoria K · Moscow, Russia |

Automation ids follow the key, not an index: `home_testimonial_text_pieter`,
`home_testimonial_more_button_pieter`, and so on.

### Play golf in Bali — Pieter · Jakarta, Indonesia

Mr. Pongky of Baligolftrip.com has organized our golf trip to Bali very efficient and perfectly on time. We played Bali National and Handara golfclub, tee times, cart and caddies were arranged to our convenience and Mr. Pongky was present on spot. Transport from our Nusa Dua Hotel was made by comfortable Toyota car driven by Mr Pongky. During the trip he showed us highlights of Bali like waterfalls, rice fields and temples. He explained about religious festivities taking place that day. Payment for the trip was made with Visacard and was exactly the amount offered by Baligolftrip.com via internet. Our gratitude to Mr. Pongky for making our golf trip a great succes. We would like to do the trip again in the future. Best of luck for you and your family Mr. Pongky. From Judi and Pieter Sterrenburg.

*Verbatim includes "very efficient" (not efficiently), "on spot", "Visacard",
"a great succes" and "Mr Pongky" without the full stop.*

### Excellent service and quality — John & Anna · Newcastle, Australia

Great service and enjoyable day. Our villa booked a golf game for me through Bali Golf Trip. Pongky (the owner) picked us up and took us to the Bali National Golf club. He explained the layout in detail. The hire clubs provided were high quality - Taylor Made SIM2. The caddy provided, Triana, was awesome. She knew intimately the course layout, provided excellent tips on distance and club choice and read the greens very well. Made the day so enjoyable.

### Great experience with a perfect organization — Victoria K · Moscow, Russia

I would like to say a huge thank to Pongky for arranging everything Quick response, perfect golf organization, no issues - which is amazing especially on holidays I highly recommend Pongky if you are looking for the best golf experience in Bali

*No sentence-ending full stops in the original; the run-on after "everything"
is theirs.*

## Three lines, then Read more

Client rule, 17 Sep 2026: **three lines**, then a **Read more** that sits on the
end of the last line — not under the paragraph — and opens the rest in place,
growing the panel rather than a modal.

`-webkit-line-clamp` cannot do that. It clips whatever overflows, so a button at
the end of a long review is clipped with the text, and because the review is
centred, an absolutely positioned button lands at the edge of the box instead of
beside the final word. So `home.js` trims the text itself: a binary search over
the words finds the most that still fit three lines **with the button on the
end**, and the button is the paragraph's own last child, so it flows with the
line breaks. The CSS keeps only a `max-height` of three lines, as the floor for
a reader whose script never runs.

Whether a review needs the link is measured, not assumed: today it is Pieter and
John & Anna, and Victoria's fits. **Do not hard-code that** — the measurement
re-runs on `load` (web fonts reflow the text) and on `resize`, because a
narrower column pushes a short review over three lines too.

Two traps, both hit once while building this:

- Measure with the CSS `max-height` floor lifted. Left on, `offsetHeight`
  reports the floor rather than the text, and every review looks like it fits.
- `.testimonials__more` sets `display: inline`, an author rule, which beats the
  user agent's `[hidden] { display: none }`. Without the explicit
  `.testimonials__more[hidden]` rule, Read more shows on a review that is
  already complete. Check the *computed display*, not the `hidden` property.

The gap before the link comes from `padding-left` on the button, so the trimmed
and expanded states are spaced the same and neither carries a trailing space.

Opening one grows every slide: the track is a flex row, so the slides share a
height. Moving to another testimonial collapses whatever was open.

## Photographs

Client, 17 Sep 2026. `testimoni-1.png`, `testimoni-2.png`, `testimoni-3.png` —
100x100 PNGs, in that order for Pieter, John & Anna and Victoria K. They sit
inside `.testimonials__avatar`, which is 56px (48px on mobile) with
`border-radius: 50%` and `overflow: hidden`, and the global `img` rule covers
and crops them, so a square source needs nothing else.

Each carries `alt=""`. The attribution line underneath already names the
reviewer, so the portrait repeats nothing a screen reader needs.

These replace the empty placeholder discs, and before that the stock portraits
of strangers described above. **Do not put stock portraits here again.**

## Open

- Whether the reviewers have agreed to be named publicly. The reviews read as
  if they came from a public listing; the client should confirm before launch.
- Two reviews mention **Bali National Golf**, which is not one of the four
  courses the site sells. Left as written — they are quotes, not claims about
  the packages — but the client may want to know.
