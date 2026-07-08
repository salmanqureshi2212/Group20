(function () {
  'use strict';

  // ── Quantity controls ──────────────────────────────────────
  document.querySelectorAll('.space-y-md .bg-white').forEach(function (item) {
    // Find the +/- stepper inside this cart item only
    var stepper = item.querySelector('.bg-surface-container-low.rounded-full');
    if (!stepper) return;

    var minusBtn = stepper.querySelector('button:first-child');
    var plusBtn  = stepper.querySelector('button:last-child');
    var display  = stepper.querySelector('span.px-md');
    if (!minusBtn || !plusBtn || !display) return;

    plusBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var val = parseInt(display.textContent, 10) || 1;
      display.textContent = val + 1;
    });

    minusBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var val = parseInt(display.textContent, 10) || 1;
      if (val > 1) display.textContent = val - 1;
    });
  });

  // ── Remove buttons ─────────────────────────────────────────
  document.querySelectorAll('button').forEach(function (btn) {
    var icon = btn.querySelector('.material-symbols-outlined');
    if (!icon) return;
    if (icon.textContent.trim() !== 'delete') return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      // Walk up to the cart-item card (bg-white rounded-xl)
      var card = btn.closest('.bg-white.rounded-xl');
      if (card) {
        card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateX(40px)';
        setTimeout(function () { card.remove(); }, 260);
      }
    });
  });
})();
