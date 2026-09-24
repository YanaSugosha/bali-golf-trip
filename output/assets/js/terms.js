/* ==========================================================================
   terms.js — terms page: marks the table-of-contents link for the section
   the reader is currently in.
   ========================================================================== */

(function () {
  'use strict';

  var links = document.querySelectorAll('#terms_toc_nav .toc__link');
  if (!links.length) return;

  /* Each link's href names its heading, so the two lists stay in step without
     a second list to maintain here. */
  var headings = [];
  for (var i = 0; i < links.length; i++) {
    var h = document.getElementById(links[i].getAttribute('href').slice(1));
    if (!h) return;
    headings.push(h);
  }

  var current = -1;

  var mark = function () {
    /* The last heading whose top has passed the jump line is the one being
       read. Same offset as the headings' scroll-margin-top, so a link click
       lands on its own section rather than the one above. */
    var line = parseFloat(getComputedStyle(headings[0]).scrollMarginTop) || 0;
    var active = 0;

    for (var j = 0; j < headings.length; j++) {
      if (headings[j].getBoundingClientRect().top <= line + 1) active = j;
    }
    if (active === current) return;

    for (var k = 0; k < links.length; k++) {
      links[k].classList.toggle('is-active', k === active);
      if (k === active) links[k].setAttribute('aria-current', 'location');
      else links[k].removeAttribute('aria-current');
    }
    current = active;
  };

  window.addEventListener('scroll', mark, { passive: true });
  window.addEventListener('resize', mark);
  mark();
})();
