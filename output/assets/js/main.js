/* ==========================================================================
   main.js — global components present on every page:
   navbar scroll state, drawer navigation, scroll reveal,
   the shared lightbox, and the swipe helper used by the page-level sliders.

   Vanilla JS, no dependencies. Every component checks its own elements
   exist before binding, because not every page carries every component.
   ========================================================================== */

(function () {
  'use strict';

  /* --- Shared swipe helper (exposed for page scripts) --------------------- */

  function swipe(el, onLeft, onRight) {
    if (!el) return;
    var x0 = null, y0 = null;

    el.addEventListener('touchstart', function (e) {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      var dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) { onLeft(); } else { onRight(); }
      }
      x0 = null;
    }, { passive: true });
  }

  window.bgtSwipe = swipe;


  /* --- Navbar: large logo at the top, compact once scrolled --------------- */
  /* CSS holds the compact size by default, so a failed script leaves the
     navbar in its normal state rather than stuck large. */

  var navbar = document.querySelector('.navbar');
  if (navbar) {
    /* Two thresholds, not one. Growing the logo makes the navbar ~38px taller,
       which shifts the page below it; a single threshold sits inside that shift,
       so the state flips back and forth and the size visibly stutters. The gap
       between these two is wider than the tallest height change (24px at
       desktop, 18px ≤900, 16px ≤600), so one toggle can never trigger the next. */
    var GROW_AT = 4;      /* enlarge only when essentially at the top */
    var SHRINK_AT = 64;   /* shrink again well clear of GROW_AT */
    var isAtTop = null;

    var syncNavbar = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var next = isAtTop === true ? y < SHRINK_AT : y <= GROW_AT;
      if (next === isAtTop) return;
      isAtTop = next;
      navbar.classList.toggle('is-at-top', next);
    };

    syncNavbar();
    window.addEventListener('scroll', syncNavbar, { passive: true });
    window.addEventListener('resize', syncNavbar, { passive: true });
  }


  /* --- Drawer navigation -------------------------------------------------- */

  var drawer = document.getElementById('global_drawer_nav');
  var scrim = document.getElementById('global_drawer_scrim');
  var openBtn = document.getElementById('global_menu_button');
  var closeBtn = document.getElementById('global_drawer_close_button');

  function setDrawer(open) {
    if (!drawer || !scrim) return;
    drawer.classList.toggle('is-open', open);
    scrim.classList.toggle('is-open', open);
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (openBtn) openBtn.onclick = function () { setDrawer(true); };
  if (closeBtn) closeBtn.onclick = function () { setDrawer(false); };
  if (scrim) scrim.onclick = function () { setDrawer(false); };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setDrawer(false);
  });


  /* --- Blog filters ------------------------------------------------------- */
  /* Category and date are collapsed behind a toggle on a phone. The toggle is
     hidden above 600px, where the panel is display:contents and always shown,
     so this listener simply never fires there. */

  var filterToggle = document.getElementById('blog_filter_toggle_button');
  var filterFields = document.getElementById('blog_filter_fields');

  if (filterToggle && filterFields) {
    filterToggle.addEventListener('click', function () {
      var open = filterFields.classList.toggle('is-open');
      filterToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }


  /* --- Scroll reveal ------------------------------------------------------ */
  /* Blocks fade and rise as they scroll into view. Driven entirely from this
     selector list rather than markup attributes, so every page gets it without
     touching any HTML. Hidden state is added here, never in the stylesheet —
     if this never runs, the page renders normally. */

  var REVEAL_SELECTOR = [
    '.page-head > .wrap',
    '.section > .wrap > *',
    '.grid-3 > *',
    '.split > *',
    '.banner'
  ].join(',');

  var STAGGER_MS = 80;
  var STAGGER_MAX = 4;    /* cap, so a long row doesn't trail far behind */

  if (window.IntersectionObserver &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

    var candidates = Array.prototype.slice.call(document.querySelectorAll(REVEAL_SELECTOR));

    /* Keep the deepest matches only. Where a grid and its cards both match,
       animating the cards individually reads better than moving the block. */
    var targets = candidates.filter(function (el) {
      return !candidates.some(function (other) {
        return other !== el && el.contains(other);
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('reveal--in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    var lastParent = null;
    var parentIsRow = false;
    var indexInGroup = 0;

    targets.forEach(function (el) {
      /* Anything already on screen is left alone — hiding it now would flash. */
      if (el.getBoundingClientRect().top < window.innerHeight) return;

      if (el.parentNode !== lastParent) {
        lastParent = el.parentNode;
        indexInGroup = 0;
        /* Stagger only inside a grid or flex row, where siblings scroll into
           view together. In stacked content they arrive one at a time, and a
           delay would just look like lag. */
        var display = window.getComputedStyle(el.parentNode).display;
        parentIsRow = display === 'grid' || display === 'flex';
      }

      if (parentIsRow) {
        el.style.transitionDelay = Math.min(indexInGroup, STAGGER_MAX) * STAGGER_MS + 'ms';
      }
      indexInGroup++;

      el.classList.add('reveal');
      observer.observe(el);
    });
  }


  /* --- Shared lightbox ---------------------------------------------------- */
  /* Page scripts call window.bgtLightbox.open(list, index). `list` is an array
     of elements each containing an <img>; the full-size file comes from that
     image's data-full attribute, falling back to its own src. */

  var box = document.getElementById('global_lightbox_modal');
  var boxImg = document.getElementById('global_lightbox_image');
  var boxCap = document.getElementById('global_lightbox_caption_label');
  var items = [];
  var index = 0;

  function show(n) {
    if (!items.length) return;
    index = (n + items.length) % items.length;
    var img = items[index].querySelector('img');
    if (!img) return;
    boxImg.src = img.dataset.full || img.src;
    boxImg.alt = img.alt || '';
    boxCap.textContent = (img.alt || 'Photo') + '  ·  ' + (index + 1) + ' / ' + items.length;
  }

  function open(list, i) {
    if (!box) return;
    items = Array.prototype.slice.call(list);
    show(i);
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!box) return;
    box.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (box) {
    var closeButton = document.getElementById('global_lightbox_close_button');
    var prevButton = document.getElementById('global_lightbox_prev_button');
    var nextButton = document.getElementById('global_lightbox_next_button');

    if (closeButton) closeButton.onclick = close;
    if (prevButton) prevButton.onclick = function () { show(index - 1); };
    if (nextButton) nextButton.onclick = function () { show(index + 1); };

    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'ArrowLeft') show(index - 1);
    });

    swipe(box, function () { show(index + 1); }, function () { show(index - 1); });
  }

  window.bgtLightbox = { open: open, close: close };
})();
