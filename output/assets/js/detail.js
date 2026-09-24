/* ==========================================================================
   detail.js — course detail page: the looping image carousel and the
   booking price calculator.
   Depends on main.js for window.bgtSwipe and window.bgtLightbox.
   ========================================================================== */

(function () {
  'use strict';

  var swipe = window.bgtSwipe || function () {};


  /* --- Course carousel ---------------------------------------------------- */
  /* Loops by cloning the whole slide set either side of the originals, then
     snapping the index back into the middle set once a transition ends. */

  var track = document.getElementById('detail_gallery_track');
  var strip = document.querySelector('.course-gallery__strip');

  if (track && strip) {
    var dots = document.querySelectorAll('#detail_gallery_dots_nav button');
    var thumbs = document.querySelectorAll('#detail_gallery_thumbs_nav button');
    var originals = Array.prototype.slice.call(track.querySelectorAll('.course-gallery__slide'));
    var count = originals.length;

    for (var a = 0; a < count; a++) {
      track.appendChild(originals[a].cloneNode(true));
    }
    for (var b = count - 1; b >= 0; b--) {
      track.insertBefore(originals[b].cloneNode(true), track.firstChild);
    }

    var slides = track.querySelectorAll('.course-gallery__slide');
    var pos = count;

    var realIndex = function () { return ((pos % count) + count) % count; };

    var paint = function () {
      var slideWidth = slides[0].offsetWidth;
      var stripWidth = strip.offsetWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var real = realIndex();

      track.style.transform =
        'translateX(' + (-(pos * (slideWidth + gap) - (stripWidth - slideWidth) / 2)) + 'px)';

      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.toggle('is-active', (i % count) === real);
      }
      for (var j = 0; j < count; j++) {
        if (dots[j]) {
          dots[j].classList.toggle('is-active', j === real);
          dots[j].setAttribute('aria-current', j === real ? 'true' : 'false');
        }
        if (thumbs[j]) {
          thumbs[j].classList.toggle('is-active', j === real);
          thumbs[j].setAttribute('aria-current', j === real ? 'true' : 'false');
        }
      }
    };

    var snap = function () {
      var t = track.style.transition;
      track.style.transition = 'none';
      paint();
      void track.offsetWidth;
      track.style.transition = t;
    };

    /* Bring pos back into the middle set. The position it lands on shows the
       same photograph, so the jump is invisible - it only matters that pos
       stays where the clones can cover it. */
    var normalise = function () {
      if (pos >= count && pos < 2 * count) return;
      pos = count + realIndex();
      snap();
    };

    /* transitionend settles a single move. It cannot settle a run of them: a
       new click restarts the transition, so the event fires once for the whole
       run, and the loop is what stops pos being left outside the middle set. */
    track.addEventListener('transitionend', function (e) {
      if (e.propertyName !== 'transform') return;
      if (pos >= count && pos < 2 * count) return;
      normalise();
    });

    /* Normalise first, so pos can never be more than one step outside the
       middle set when it is painted. Clicking next faster than the transition
       runs used to walk it past the last clone, and the strip went blank. */
    var slide = function (delta) { normalise(); pos += delta; paint(); };
    var slideTo = function (i) { pos = count + i; paint(); };

    for (var c = 0; c < count; c++) {
      (function (i) {
        if (dots[i]) dots[i].onclick = function () { slideTo(i); };
        if (thumbs[i]) thumbs[i].onclick = function () { slideTo(i); };
      })(c);
    }

    for (var s = 0; s < slides.length; s++) {
      (function (el) {
        el.onclick = function () {
          window.bgtLightbox.open(originals, parseInt(el.dataset.index, 10) || 0);
        };
      })(slides[s]);
    }

    var prevButton = document.getElementById('detail_gallery_prev_button');
    var nextButton = document.getElementById('detail_gallery_next_button');
    if (prevButton) prevButton.onclick = function () { slide(-1); };
    if (nextButton) nextButton.onclick = function () { slide(1); };

    var zoomButton = document.getElementById('detail_gallery_zoom_button');
    if (zoomButton) {
      zoomButton.onclick = function () {
        window.bgtLightbox.open(originals, realIndex());
      };
    }

    swipe(strip, function () { slide(1); }, function () { slide(-1); });
    window.addEventListener('resize', snap);
    paint();
  }


  /* --- Booking price calculator ------------------------------------------- */
  /* Four course pages share this file, so the rate card comes off the form's
     data attributes rather than being hardcoded here. Return transport is
     a priced Yes/No add-on: a flat IDR 500.000 per car. */

  var form = document.getElementById('detail_booking_form');
  var players = document.getElementById('detail_players_dropdown');
  var clubs = document.getElementById('detail_club_hire_dropdown');
  var guests = document.getElementById('detail_non_golfers_dropdown');
  var transportYes = document.getElementById('detail_transport_yes_radio');
  var transportRadios = document.querySelectorAll('input[name="detail_transport_radio"]');
  var totalEl = document.getElementById('detail_total_label');
  var summaryEl = document.getElementById('detail_total_summary_label');
  var clubsPriceEl = document.getElementById('detail_club_hire_price_label');
  var wasEl = document.getElementById('detail_total_was_label');

  if (form && players && clubs && guests && transportYes && totalEl) {
    var GREEN_FEE = parseInt(form.getAttribute('data-green-fee'), 10) || 0;
    /* data-green-fee is the advertised "start from" price — already discounted.
       data-saving is what it is discounted BY, so the struck price adds it back. */
    var SEASON_SAVING = parseInt(form.getAttribute('data-saving'), 10) || 0;
    var CLUB_SET = 600000;
    /* Per course: Handara charges IDR 600.000, the others IDR 500.000. */
    var TRANSPORT = parseInt(form.getAttribute('data-transport'), 10) || 500000;

    var money = function (n) { return n.toLocaleString('de-DE'); };

    var calc = function () {
      var playerCount = +players.value;
      var clubCount = +clubs.value;
      var guestCount = +guests.value;
      var transportFee = transportYes.checked ? TRANSPORT : 0;

      var total = GREEN_FEE * playerCount + CLUB_SET * clubCount + transportFee;

      if (clubsPriceEl) clubsPriceEl.textContent = clubCount ? money(CLUB_SET * clubCount) : '0';

      /* Players is a required field that starts unanswered: until it is picked
         there is nobody to price, so the total stays a dash. */
      if (!playerCount) {
        totalEl.textContent = '—';
        if (wasEl) wasEl.textContent = '';
        if (summaryEl) summaryEl.textContent = 'Choose your players to see the total';
        return;
      }

      totalEl.textContent = 'IDR ' + money(total);

      /* Only on a course with a saving: what the same selection costs before
         the discount. The element is absent elsewhere. */
      if (wasEl) wasEl.textContent =
        'IDR ' + money((GREEN_FEE + SEASON_SAVING) * playerCount + CLUB_SET * clubCount + transportFee);

      if (summaryEl) {
        var bits = [playerCount + (playerCount > 1 ? ' players' : ' player')];
        bits.push(clubCount ? clubCount + (clubCount > 1 ? ' club sets' : ' club set') : 'own clubs');
        if (transportFee) bits.push('transport');
        if (guestCount) {
          bits.push(guestCount + (guestCount > 1 ? ' non-golfers' : ' non-golfer'));
        }
        summaryEl.textContent = bits.join(' · ');
      }
    };

    [players, clubs, guests].forEach(function (el) {
      el.addEventListener('change', calc);
    });
    for (var r = 0; r < transportRadios.length; r++) {
      transportRadios[r].addEventListener('change', calc);
    }

    calc();
  }
  /* Native date input: clicking the field focuses it, but only the calendar
     icon opens the picker. showPicker() makes the whole box the target.
     It throws if the browser has not granted user activation, and is absent
     before Chrome 99 / Safari 16, where the icon still works on its own. */
  var dateInput = document.getElementById('detail_date_input');
  if (dateInput) {
    if (typeof dateInput.showPicker === 'function') {
      dateInput.addEventListener('click', function () {
        try { dateInput.showPicker(); } catch (e) {}
      });
    }

    /* iOS Safari leaves an unfilled date input blank, so components.css draws
       the placeholder in. This flag turns it off once there is a date. */
    var markFilled = function () {
      if (dateInput.value) dateInput.classList.add('is-filled');
      else dateInput.classList.remove('is-filled');
    };
    dateInput.addEventListener('change', markFilled);
    dateInput.addEventListener('input', markFilled);
    markFilled();
  }

})();
