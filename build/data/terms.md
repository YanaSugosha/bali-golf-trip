# Terms & Condition — single source

**Source:** client, 11 Sep 2026. Authoritative, **verbatim**. This page carries
legal weight — do not reword, renumber or re-punctuate it. The placeholder terms
that were here before are gone.

Verbatim includes the client's own punctuation and typing: "cancelled without
further." (the sentence ends there), "players.(Special at New kuta Golf)" with
no space and lower-case *kuta*, "IDR 250.000,-/caddie", and the missing full
stops on items 4 and 5 of the Terms and on item 5 of the Regulations.

## Structure on the page

| Block | Element |
|---|---|
| Booking and confirmation | `#terms_booking_heading` + one paragraph |
| NOTED | `.notice notice--terms` |
| Terms and Conditions: | `#terms_conditions_heading` + `.numbered-list`, 4 items |
| Regulations: | `#terms_regulations_heading` + `.numbered-list`, 5 items |
| Sign-off | `.terms__signoff` — "Best Regards, Pongky" |

`.numbered-list` is a terms-only `<ol>`; `.bullet-list` in `components.css` is
the disc list the course pages use.

The table of contents shrank from six links to three. `terms_toc_link_payment`,
`…_cancellation`, `…_rescheduling`, `…_course_rules` and `…_privacy` went with
the placeholder sections they pointed at.

The **Terms and Conditions** list dropped from five items to four on
21 Sep 2026 at the client's request: "Any cancellations received by the club
one day before the day of play will be charged at 50%." was removed. The list
renumbers itself, so what was item 2 is now item 1. Only the day-of charge
remains; a cancellation the day before now carries no stated charge at all.

## ⚠️ Conflicts with the rest of the site — unresolved

These have to be settled before launch. The terms are the document that binds,
so where they disagree with a page, the page is probably wrong.

| Terms say | The site says |
|---|---|
| Cancellation on the day is charged **100%** | ~~Resolved 11 Sep 2026~~: the "free to cancel" line is gone from `received.html`, which now points at this page for cancellation charges. The flow still says nothing is charged until the payment link is opened, which is true and not in conflict |
| Rates include **green fee, sharing cart, caddy, player's insurance, 2 bottles mineral water and government tax 11%** | **Narrowed 21 Sep 2026.** The packages now say Green Fee 18 Holes, Check-in/out Assistance, Caddie Service (tip excluded), Golf Cart (Shared) and Mineral Water, so the cart, the caddie and the water agree. Still open: **no player's insurance and no 11% tax note** on any package, and the water is New Kuta only where the terms promise two bottles on every rate |
| **Sharing a cart is mandatory** | ~~Resolved 21 Sep 2026~~: the packages read "Golf Cart (Shared)" |
| Groups of fewer than 4 are **merged with other players** at New Kuta | Nothing on the booking form warns of this |
| **Caddy tipping is not included**, standard IDR 250.000 per caddie | The booking total presents itself as the full price |
| **No kids under 8** on the course | The players dropdown has no age question |
| Money written as **IDR 250.000,-** | The site now writes `IDR 600.000` too — only the trailing `,-` differs |

The inclusions row still matters most: the terms promise player's insurance,
an 11% tax and two bottles of water on every rate, and no package says any of
that. The terms are what binds.
