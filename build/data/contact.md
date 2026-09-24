# Contact details — single source

**Source:** client, 10 Sep 2026. These are the real details; the placeholder
number that was here before is gone.

| Channel | Shown as | Links to |
|---|---|---|
| WhatsApp | `+62 813-3722-5399` | `https://wa.me/6281337225399` |
| Instagram | `@baligolftrip` | `https://www.instagram.com/baligolftrip` |
| Facebook | `pongky.subagia` | `https://www.facebook.com/pongky.subagia` |
| Email | `pongky@baligolftrip.com` | `mailto:pongky@baligolftrip.com` |
| Hours | 8:00 AM – 8:00 PM WITA | — |
| Address | Jalan Gunung Bromo VIII No. 47, Denpasar, Bali. | Google Maps search, below |

Hours are **8:00 AM – 8:00 PM WITA**. They were briefly changed to
7:00 AM – 12:00 AM on 17 Sep 2026 and changed back the same day, so the
8:00-8:00 figure stands. Four surfaces carry it: the footer on every page, the
contact card, the contact-sent confirmation and the homepage "Plan your round"
lead.

The contact card lists them as one value a line behind a filled Phosphor icon —
WhatsApp, Instagram, Email, Hours, Facebook, in that order (client mock,
11 Sep 2026) — not as a label/value table. The icon stands in for the label, so
each row carries a `.visually-hidden` one. The fill weight is a second Phosphor
stylesheet in `chrome-head.html`; this card is its only user.

The WhatsApp number appears in the `wa.me` URL without punctuation
(`6281337225399`) and with it in the visible text.

Every address carries an **Open in Maps** link to the client's own short URL —
`https://maps.app.goo.gl/9y1jkE2bgYNraACU8` (client, 11 Sep 2026, replacing the
search-query URL the site built from the address) — so the footer and the
contact card drop the same pin. It is a fixed link now: changing the address
does not change it, the client has to supply a new one.

The contact page carries the client's own **Google Maps embed** below the card,
in `.map-embed`. Its `width`, `height` and `border:0` are dropped from the
iframe and set in `contact.css` instead — the house rule allows no `style`
attribute, and 600×450 would not fill the band.

Every link that leaves the site — WhatsApp, Instagram, Facebook, Google Maps —
carries `target="_blank" rel="noopener"` (client request, 10 Sep 2026).
`mailto:` links do not: they hand off to a mail client rather than opening a
page. Internal links never do.

## Rule

**Show the value, not the channel name.** A contact link reads
`+62 813-3722-5399`, not "WhatsApp"; `@baligolftrip`, not "Instagram". The icon
carries the channel, the text carries the value, and the whole thing is a real
hyperlink.

Pills use `.pill--verbatim` so a handle or address is not forced to uppercase
by `.pill`'s `text-transform`.

**Exceptions, by client request (10 Sep 2026).** Where the WhatsApp link is a
button sitting beside another button, it carries an action label, not the
number — a bare number there reads as a detail rather than something to press:

| Button | Label |
|---|---|
| `home_whatsapp_button` — homepage "Plan your round" | Chat WhatsApp |
| `courses_lesson_whatsapp_button` — golf lesson section | Chat WhatsApp |
| `received_whatsapp_button` — booking request received | Chat us on WhatsApp |
| `confirmed_whatsapp_button` — booking confirmed | Chat us on WhatsApp |
| `failed_whatsapp_button` — payment failed | Chat us on WhatsApp |

Every other surface — the footer, the contact page — shows the value.

## Where it appears

| Surface | Channels |
|---|---|
| Footer, every page | WhatsApp, Instagram, Facebook, Email, address + Open in Maps |
| Contact page, detail table | WhatsApp, Instagram, Facebook, Email, Hours, address + Open in Maps |
| Floating button, every page | WhatsApp |
| Homepage "Plan your round" | WhatsApp |
| Golf lesson section | WhatsApp |
| Booking flow — received, confirmed, failed | WhatsApp |

## Removed 10 Sep 2026, at the client's request

- The **Website** row on the contact card (`baligolftrip.com`) — it is this
  site, so it pointed at itself.
- The two pills under the contact card, `contact_whatsapp_button` and
  `contact_instagram_button` — they repeated the table directly above them.
  `.contact__actions` went with them.
