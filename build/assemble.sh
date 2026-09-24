#!/bin/sh
# Assembles output/*.html from build/chrome-*.html + build/body-*.html.
# Keeps the navbar, drawer and footer identical across every page.
set -eu

cd "$(dirname "$0")/.."
OUT=output
B=build

# name | title | active drawer keys (space sep) | page css (comma sep, or -) | page js (or -)
PAGES="
index|Bali Golf Trip — Tee times, club hire and transport in Bali|HOME|home|home
courses|Bali Golf Course — New Kuta, Bukit Pandawa, Handara|COURSES|courses|-
detail-new-kuta|New Kuta Golf Package — Book a tee time|COURSES NEWKUTA|detail|detail
detail-bukit-pandawa|Bukit Pandawa Golf Package — Book a tee time|COURSES PANDAWA|detail|detail
detail-handara|Bali Handara Golf Country Package — Book a tee time|COURSES HANDARA|detail|detail
detail-bali-beach|Bali Beach Golf and Country Package — Coming soon|COURSES BALIBEACH|detail|detail
blog|Blog — Bali Golf Trip|BLOG|blog|-
blog-search-results|Search results — Bali Golf Trip|BLOG|blog|-
blog-no-results|No articles found — Bali Golf Trip|BLOG|blog|-
post|Which Bali course should you play first? — Bali Golf Trip|BLOG|post|-
terms|Terms &amp; Condition — Bali Golf Trip|TERMS|terms|terms
contact|Contact Us — Bali Golf Trip|CONTACT|contact|-
contact-sent|Message sent — Bali Golf Trip|CONTACT|contact|-
cart|Your cart — Bali Golf Trip||cart|-
cart-empty|Your cart is empty — Bali Golf Trip||cart|-
checkout|Checkout — Bali Golf Trip||checkout|checkout
payment|Secure payment — Bali Golf Trip||payment|-
received|Booking request received — Bali Golf Trip|||-
confirmed|Booking confirmed — Bali Golf Trip|||-
failed|Payment declined — Bali Golf Trip||failed|-
404|Page not found — Bali Golf Trip|||-
"

KEYS="HOME COURSES NEWKUTA PANDAWA HANDARA BALIBEACH BLOG TERMS CONTACT"

# Escape characters that are special on the replacement side of sed.
esc() { printf '%s' "$1" | sed -e 's/[\\&|]/\\&/g'; }

echo "$PAGES" | while IFS='|' read -r name title active css js; do
  [ -z "$name" ] && continue

  links=""
  if [ "$css" != "-" ]; then
    for c in $(echo "$css" | tr ',' ' '); do
      links="$links<link rel=\"stylesheet\" href=\"assets/css/pages/$c.css\">"
    done
  fi

  if [ "$js" = "-" ]; then
    script=""
  else
    script="<script src=\"assets/js/$js.js\"></script>"
  fi

  sed -e "s|__TITLE__|$(esc "$title")|" \
      -e "s|__PAGECSS__|$(esc "$links")|" \
      "$B/chrome-head.html" > "$OUT/$name.html"

  # Mark this page's drawer links active; blank every other placeholder.
  for k in $KEYS; do
    hit=""
    for a in $active; do
      [ "$a" = "$k" ] && hit=1
    done
    if [ -n "$hit" ]; then
      sed -i "s|__${k}__| is-active|g" "$OUT/$name.html"
    else
      sed -i "s|__${k}__||g" "$OUT/$name.html"
    fi
  done

  cat "$B/body-$name.html" >> "$OUT/$name.html"
  sed -e "s|__PAGEJS__|$(esc "$script")|" "$B/chrome-foot.html" >> "$OUT/$name.html"

  echo "built $OUT/$name.html"
done
