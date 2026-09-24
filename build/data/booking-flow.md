# Booking flow — single source

**Source:** client, 10 Sep 2026. Replaces the pay-at-checkout flow the
prototype was built with.

## The flow

1. **Customer places a booking request.** Cart → checkout → *Place order*.
   **Nothing is charged.** Checkout collects billing details and shows one
   payment method, `Pay after booking confirmed`, which is a statement, not a
   choice.
2. **We contact them.** WhatsApp, to talk the round through and agree the
   details — course, date, tee time, players, club hire, transport.
3. **We send a Midtrans payment link** once it is agreed. The link is sent by
   hand; nothing on this site generates or takes the payment.
4. **They pay, and the booking is confirmed** for whatever was agreed in step 2.

## Pages

| Page | State | Reached from | Goes to |
|---|---|---|---|
| `cart` | Step 1 of 3 | course detail | `checkout` |
| `checkout` | Step 2 of 3, no payment | `cart` | `received` |
| `received` | Step 3 of 3 — request received, awaiting our call | `checkout` | — |
| `payment` | Midtrans hosted page | **the link we send**, not this site | `confirmed` / `failed` |
| `confirmed` | Paid, booking confirmed | `payment` | — |
| `failed` | Midtrans declined the payment | `payment` | back to `payment` |

`payment.html` is a **mock of the Midtrans page** so the whole flow can be
demonstrated. In production the customer leaves the site for Midtrans and comes
back to `confirmed` or `failed`.

## What this changed

- Checkout no longer takes payment. The four payment-method rows (card, virtual
  account, e-wallet, QRIS) became one non-interactive `Pay after booking
  confirmed` row, and the picker was deleted from `main.js`.
- `received.html` was "payment received, confirming your tee times". It is now
  "booking request received, we will be in touch" — the timeline runs request →
  WhatsApp → payment link → booked.
- `confirmed.html` is new: the state `received.html` used to describe.
- `failed.html` no longer offers other methods on this site; it points back at
  the payment link, or at us to reissue it.
- Currency across the flow moved to `IDR 7.800.000` format, matching the rest of
  the site.

## Required fields

Client, 11 Sep 2026. On the detail booking form: **Date, Players, Tee time and
Transport**. Club hire and Non-golfers are optional. A required field carries
`.req` after its label and the `required` attribute on the control; a required
dropdown opens on a `value=""` placeholder ("Select players", "Select tee
time") and the transport radios start unchecked, so nothing is answered for the
customer. Until Players is picked the total reads "—" rather than pricing an
empty booking.

Date, Premium of Club Hire and Non-golfers open on a `value=""` placeholder
like the required dropdowns, so nothing is answered for the customer. The
calculator reads them with unary `+`, and `+""` is 0, so an untouched field
prices as nothing rather than NaN.

## The detail panel, redesigned 14 Sep 2026

Client mock. The panel now leads straight with **Book this package** — no
eyebrow, and no course name repeated from the `<h1>` a column away. Prices are
written `IDR 600.000 / set` and `IDR 500.000 / car`. Three blocks were dropped
at the same time:

- the club-hire note ("Travelling without clubs? ...") and `.booking-row__note`
- the `No payment now` callout and `.notice--form`
- "Pickup address is collected at checkout" and `.form-note`

**Note.** The detail page no longer states that nothing is charged. The promise
now first appears on the cart (`Nothing is charged at checkout`) and again on
checkout — a customer who reads only the course page does not see it.

Bali Beach keeps its eyebrow: its panel is the coming-soon notice, not this form.

Add to cart and Book now sit in `.booking-actions`, a wrapping flex row with a
150px basis: side by side while the panel can take both, stacked the moment it
cannot. No breakpoint decides it.

## Choosing what to check out

Every round in the cart goes to checkout; to leave one out, the customer
removes it. The per-round checkboxes and Select all went on 21 Sep 2026.

**Line prices are net of the season saving** — New Kuta IDR 6.300.000,
Handara IDR 5.000.000 — on the cart and checkout, so the rounds add straight
up to IDR 11.300.000 with no discount line. Received, payment, confirmed and
failed still show gross line prices with the discount on its own line; the
total agrees on all six pages.

## Checkout layout

21 Sep 2026. The cart and checkout were relaid after a client reference and
then, at the client's request, put back on the site's **existing** styles:
the dark page head with the step label, labelled fields (`.form__field`,
`.form-pair`), the bordered `.form` panel, `.spec-table`, `.summary-row`,
`.payment-option` and `.notice`. No cart- or checkout-specific components were
kept from the reference pass; `cart.css` and `checkout.css` are back to their
earlier rules.

What the reference changed and did keep:

- **Checkout arrangement:** Contact information (email, phone / WhatsApp),
  Billing address (country / region, name, hotel or pickup address, apartment,
  city, state / province, ZIP), then payment, order notes, the terms checkbox
  and Place order — all in the left column. The right-hand panel is the order
  summary only: rounds, Subtotal and Total.
- **Net line prices** on cart and checkout, above.

**Cart, final layout (21 Sep 2026).** Built from existing classes only: a plain
`Cart` title (`.display`, as the course pages' `<h1>`) instead of the dark
page head, then a Product / Total head (`.summary-row.eyebrow` over a `.rule`),
the rounds as `.cart-row`, and an unboxed totals column: Cart totals head,
Estimated total (`.summary-row--total`), a rule, Proceed to checkout and the
no-charge `.notice`. The step label is gone from the cart; checkout keeps its
dark head with Step 2 of 3.

**Checkout, final fields (21 Sep 2026).** Titles and fields exactly as the
client reference, on the existing form classes (labels above, `.form__field`,
`.form-pair`): **Contact information** — Email address, then "You are
currently checking out as a guest."; **Billing address** — Country/Region;
First name | Last name; Address; Apartment, suite, etc. (optional); City |
State; ZIP Code | Phone / WhatsApp (required, reversed the same day); **Payment options** — the site's own Pay
after booking confirmed row, kept at the client's request. Then Add a note to
your order (a checkbox; `checkout.js` shows the note field when ticked), a
rule, the terms sentence and Place order.

Knock-on effects, recorded rather than silently accepted:

- **Phone was made optional**, as the reference has it, then made required
  again the same day at the client's request, labelled Phone / WhatsApp.
- **Every field has a placeholder** showing a Bali booking: a Seminyak hotel
  and pickup, Bali as the state, 80361 as the ZIP.
- **Order summary** follows the reference's structure with the existing
  `.form` panel and `.spec-table`: the title, each round as name, price per
  player, date / tee time / players and the line total, then Subtotal and
  Total. No Add coupons. The reference's thumbnails and quantity badges are not
  there: they would need new CSS.
- **The terms checkbox is gone again** (`checkout_terms_checkbox`); the
  sentence "By proceeding with your purchase you agree to our Terms and
  Conditions" replaces it. The reference also names a Privacy Policy; the
  site has no such page, so that part is left out.
- The Address field is still `checkout_pickup_address_input` and still where
  the driver collects them, but its label no longer says so.

Tried and removed the same day: a players stepper, Add coupons, and the
reference's fields-without-labels look.

## Banners and the thank-you page (21 Sep 2026)

The cart has its dark banner back ("Your cart"), and neither the cart nor
checkout shows a step label any more. `received` lost its label too.

`received` was relaid after a client reference, on existing classes: the
banner ("Thank you"), a plain line saying the request was received, an order
strip between two rules (No. Order, Date, Total, Payment method —
`.stat-grid`, left-aligned), the no-charge line with the terms link, then **What
happens next** (the timeline, standing where the reference shows bank
details: payment here is a Midtrans link we send later, so there are none) and
**Order details** as a `.spec-table` — Product / Subtotal head, the two
rounds, Subtotal, Payment method, Total. Its figures are now **net of the
season saving**, like cart and checkout. Payment, confirmed and failed still
show gross lines with the discount on its own line; the total agrees.

## Demo figures used across cart, checkout, received, payment, confirmed, failed

Two rounds, two players, two club sets each, return transport taken on both:

| Line | Amount |
|---|---|
| New Kuta Golf — 10 Sep, 6:15 AM | IDR 6.900.000 |
| Bali Handara — 12 Sep, 9:00 AM | IDR 5.800.000 |
| Season discount (2 × IDR 300.000 + 2 × IDR 400.000) | − IDR 1.400.000 |
| **Total** | **IDR 11.300.000** |

Line prices are the green fee plus Premium of Club Hire at IDR 600.000 a set and
transport — IDR 500.000, or IDR 600.000 at Handara — **before** the season discount — the discount is its own
line. The advertised "start from" price is already discounted, so the
undiscounted green fee is that figure plus the saving (New Kuta IDR 2.600.000,
Handara IDR 2.000.000). Net of the discount these agree with the detail-page
calculator: New Kuta IDR 6.300.000 and Handara IDR 5.000.000 for the same
selection. Change one, change all six pages.

## Open

- Nothing here is wired up: no order is created, no link is sent, no payment is
  taken. These are static pages showing the states.
