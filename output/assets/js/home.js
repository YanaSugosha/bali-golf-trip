/* ==========================================================================
   home.js — homepage sliders: hero, testimonials, gallery strip.
   Depends on main.js for window.bgtSwipe and window.bgtLightbox.
   ========================================================================== */

(function () {
  'use strict';

  var swipe = window.bgtSwipe || function () {};

  /* --- Hero slider -------------------------------------------------------- */
  /* Client-supplied banner texts. Index-parallel to the <img> elements in
     #home_hero_background and the buttons in #home_hero_dots_nav — adding a
     slide means editing all three. Source: build/data/homepage.md */
  var heroCopy = [
    'Professional Golf Tours with Excellent Services',
    'Perfect Plan for your Golf Vacation in Bali',
    'Best Bali Golf Tour Packages',
    'Experience the Golf Links Challenge',
    'Where Every Day is a Great Golf Day'
  ];

  var hero = document.querySelector('.hero');
  var heroImages = document.querySelectorAll('#home_hero_background img');
  var heroDots = document.querySelectorAll('#home_hero_dots_nav button');
  var heroText = document.getElementById('home_hero_text');
  var heroTitle = document.getElementById('home_hero_title_label');

  if (hero && heroImages.length) {
    var heroIndex = 0;
    var heroTimer;

    var heroGo = function (n) {
      var prev = heroIndex;
      heroIndex = (n + heroImages.length) % heroImages.length;

      for (var i = 0; i < heroImages.length; i++) {
        heroImages[i].classList.toggle('is-active', i === heroIndex);
        if (heroDots[i]) {
          heroDots[i].classList.toggle('is-active', i === heroIndex);
          heroDots[i].setAttribute('aria-current', i === heroIndex ? 'true' : 'false');
        }
      }

      if (prev === heroIndex || !heroText) return;

      heroText.classList.add('is-swapping');
      setTimeout(function () {
        heroTitle.textContent = heroCopy[heroIndex];
        heroText.classList.remove('is-swapping');
      }, 450);
    };

    var heroPlay = function () {
      clearInterval(heroTimer);
      heroTimer = setInterval(function () { heroGo(heroIndex + 1); }, 7000);
    };

    var heroPrev = document.getElementById('home_hero_prev_button');
    var heroNext = document.getElementById('home_hero_next_button');
    if (heroPrev) heroPrev.onclick = function () { heroGo(heroIndex - 1); heroPlay(); };
    if (heroNext) heroNext.onclick = function () { heroGo(heroIndex + 1); heroPlay(); };

    for (var d = 0; d < heroDots.length; d++) {
      (function (i) {
        heroDots[i].onclick = function () { heroGo(i); heroPlay(); };
      })(d);
    }

    hero.addEventListener('mouseenter', function () { clearInterval(heroTimer); });
    hero.addEventListener('mouseleave', heroPlay);
    swipe(hero,
      function () { heroGo(heroIndex + 1); heroPlay(); },
      function () { heroGo(heroIndex - 1); heroPlay(); });

    heroPlay();

    var scrollBtn = document.getElementById('home_hero_scroll_button');
    if (scrollBtn) {
      scrollBtn.onclick = function () {
        window.scrollTo({ top: hero.offsetTop + hero.offsetHeight - 70, behavior: 'smooth' });
      };
    }
  }


  /* --- Testimonial slider ------------------------------------------------- */

  var tTrack = document.getElementById('home_testimonial_track');
  if (tTrack) {
    var tSlides = tTrack.querySelectorAll('.testimonials__slide');
    var tDots = document.querySelectorAll('#home_testimonial_dots_nav button');
    var tIndex = 0;

    var tGo = function (n) {
      tIndex = (n + tSlides.length) % tSlides.length;
      tTrack.style.transform = 'translateX(-' + (tIndex * 100) + '%)';
      for (var i = 0; i < tSlides.length; i++) {
        tSlides[i].classList.toggle('is-active', i === tIndex);
        if (tDots[i]) {
          tDots[i].classList.toggle('is-active', i === tIndex);
          tDots[i].setAttribute('aria-current', i === tIndex ? 'true' : 'false');
        }
      }
      tCollapseAll();
    };

    /* Reassigned once the read-more block below has the elements to collapse.
       tGo calls it, and tGo is defined first, so it needs to exist by then. */
    var tCollapseAll = function () {};

    var tPrev = document.getElementById('home_testimonial_prev_button');
    var tNext = document.getElementById('home_testimonial_next_button');
    if (tPrev) tPrev.onclick = function () { tGo(tIndex - 1); };
    if (tNext) tNext.onclick = function () { tGo(tIndex + 1); };

    for (var t = 0; t < tDots.length; t++) {
      (function (i) { tDots[i].onclick = function () { tGo(i); }; })(t);
    }

    /* Read more, sitting on the last line rather than under the paragraph.
       -webkit-line-clamp cannot do that: it clips whatever overflows, so a
       button at the end of a long review is clipped along with the text, and
       with centred text an absolutely positioned button lands at the edge of
       the box rather than beside the final word. So the text is trimmed here
       instead, to the most words that still fit three lines WITH the button on
       the end, found by binary search. The button is the paragraph's own last
       child, so it flows with the text however the line breaks fall. */
    var tItems = [];

    (function () {
      var bodies = tTrack.querySelectorAll('.testimonials__body');
      for (var b = 0; b < bodies.length; b++) {
        var button = bodies[b].nextElementSibling;
        if (!button || !button.classList.contains('testimonials__more')) continue;
        tItems.push({
          body: bodies[b],
          button: button,
          text: bodies[b].textContent,
          short: null,     /* the trimmed text, or null if the full text fits */
          open: false
        });
      }
    })();

    /* Rebuild the paragraph as one text node plus the button. Passing null
       renders the review in full. */
    var tRender = function (item, text) {
      while (item.body.firstChild) item.body.removeChild(item.body.firstChild);
      item.body.appendChild(document.createTextNode(text === null ? item.text : text));
      item.body.appendChild(item.button);
    };

    var tApply = function (item) {
      item.button.textContent = item.open ? 'Read less' : 'Read more';
      item.button.setAttribute('aria-expanded', item.open ? 'true' : 'false');
      item.body.classList.toggle('is-expanded', item.open);
      tRender(item, item.open ? null : item.short);
    };

    /* Height with the CSS max-height floor lifted. Left on, offsetHeight
       reports the floor rather than the text, and everything looks like it
       fits in three lines. */
    var tFullHeight = function (item, text) {
      item.body.classList.add('is-expanded');
      tRender(item, text);
      var h = item.body.offsetHeight;
      item.body.classList.remove('is-expanded');
      return h;
    };

    var tTrim = function (item, maxHeight) {
      var words = item.text.split(' ');
      var lo = 0, hi = words.length, best = '';
      while (lo <= hi) {
        var mid = (lo + hi) >> 1;
        var candidate = words.slice(0, mid).join(' ') + '\u2026';
        if (tFullHeight(item, candidate) <= maxHeight) { best = candidate; lo = mid + 1; }
        else { hi = mid - 1; }
      }
      return best;
    };

    var tMeasure = function () {
      for (var m = 0; m < tItems.length; m++) {
        var item = tItems[m];
        var lineHeight = parseFloat(window.getComputedStyle(item.body).lineHeight) || 26;
        /* +1 absorbs the sub-pixel rounding of three line boxes. */
        var maxHeight = Math.round(lineHeight * 3) + 1;

        /* A review that fits in three lines on its own has nothing to expand. */
        item.button.hidden = true;
        if (tFullHeight(item, null) <= maxHeight) { item.short = null; continue; }

        item.button.hidden = false;
        item.short = tTrim(item, maxHeight);
        tApply(item);
      }
    };

    tCollapseAll = function () {
      for (var c = 0; c < tItems.length; c++) {
        if (tItems[c].short === null || !tItems[c].open) continue;
        tItems[c].open = false;
        tApply(tItems[c]);
      }
    };

    for (var tb = 0; tb < tItems.length; tb++) {
      (function (item) {
        item.button.onclick = function () {
          item.open = !item.open;
          tApply(item);
        };
      })(tItems[tb]);
    }

    tMeasure();
    /* Web fonts land after first paint and reflow the text; a resize changes
       how many words a line holds. Both need the trim recomputed. */
    window.addEventListener('load', tMeasure);
    window.addEventListener('resize', tMeasure);

    swipe(document.querySelector('.testimonials'),
      function () { tGo(tIndex + 1); },
      function () { tGo(tIndex - 1); });
  }


  /* --- Gallery strip ------------------------------------------------------ */

  var gTrack = document.getElementById('home_gallery_track');
  if (gTrack) {
    var gPrev = document.getElementById('home_gallery_prev_button');
    var gNext = document.getElementById('home_gallery_next_button');

    if (gPrev) gPrev.onclick = function () {
      gTrack.scrollBy({ left: -gTrack.clientWidth * 0.75, behavior: 'smooth' });
    };
    if (gNext) gNext.onclick = function () {
      gTrack.scrollBy({ left: gTrack.clientWidth * 0.75, behavior: 'smooth' });
    };

    var gItems = gTrack.querySelectorAll('.gallery__item');
    for (var g = 0; g < gItems.length; g++) {
      (function (i) {
        gItems[i].onclick = function () { window.bgtLightbox.open(gItems, i); };
      })(g);
    }
  }
})();
