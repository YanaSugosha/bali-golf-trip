/* ==========================================================================
   checkout.js — checkout page: the order-note field opens from its checkbox.
   ========================================================================== */

(function () {
  'use strict';

  var box = document.getElementById('checkout_add_note_checkbox');
  var note = document.getElementById('checkout_order_notes_input');
  if (!box || !note) return;

  /* The field's wrapper, so its spacing goes with it. Left showing if this
     script never runs, rather than out of reach. */
  var field = note.parentNode;
  var sync = function () { field.hidden = !box.checked; };

  box.addEventListener('change', sync);
  sync();
})();
