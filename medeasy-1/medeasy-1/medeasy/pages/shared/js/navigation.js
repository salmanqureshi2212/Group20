/**
 * MedEasy — shared page navigation (static prototype).
 */
(function () {
  'use strict';

  var P = {
    splash: '../splash-screen/index.html',
    home: '../home-dashboard/index.html',
    search: '../medicine-search-results/index.html',
    upload: '../onboarding-ai-upload/index.html',
    prescriptionScan: '../ai-prescription-scan/index.html',
    cart: '../shopping-cart/index.html',
    checkoutAddress: '../checkout-delivery-address/index.html',
    checkoutPayment: '../checkout-payment-method/index.html',
    orderSuccess: '../order-success/index.html',
    orderHistory: '../order-history-support/index.html',
    orderTracking: '../live-order-tracking/index.html',
    orderFeedback: '../order-feedback-complaints/index.html',
    medicineDetails: '../medicine-details/index.html',
    profile: '../customer-profile-dashboard/index.html',
    pharmacies: '../pharmacies-medicines/index.html',
    pharmacyDetails: '../pharmacy-details-medicine-list/index.html'
  };

  var BACK = {
    'shopping-cart': P.home,
    'ai-prescription-scan': P.upload,
    'checkout-delivery-address': P.cart,
    'checkout-payment-method': P.checkoutAddress,
    'medicine-details': P.search,
    'medicine-search-results': P.home,
    'order-feedback-complaints': P.orderHistory,
    'pharmacy-details-medicine-list': P.pharmacies
  };

  function go(url) {
    window.location.href = url;
  }

  function pageId() {
    var path = window.location.pathname.replace(/\\/g, '/');
    var match = path.match(/\/([^/]+)\/index\.html/) || path.match(/\/([^/]+)\/?$/);
    return match ? match[1] : '';
  }

  function iconText(el) {
    if (!el) return '';
    var icon = el.querySelector('.material-symbols-outlined');
    if (icon) return icon.textContent.trim();
    return el.textContent.trim();
  }

  function medicineDetailUrl(el) {
    var target = el.closest('[data-product-id]') || el;
    var id = target.getAttribute('data-product-id');
    return id ? P.medicineDetails + '?id=' + encodeURIComponent(id) : P.medicineDetails;
  }

  function wireMedicineDetail(el, stopProp) {
    if (!el || el.dataset.navWired === '1') return;
    el.dataset.navWired = '1';
    el.style.cursor = 'pointer';
    el.addEventListener('click', function (e) {
      if (stopProp) {
        e.preventDefault();
        e.stopPropagation();
      }
      go(medicineDetailUrl(el));
    });
  }

  function pharmacyDetailUrl(el) {
    var target = el.closest('[data-pharmacy-id]') || el;
    var id = target.getAttribute('data-pharmacy-id');
    return id ? P.pharmacyDetails + '?id=' + encodeURIComponent(id) : P.pharmacyDetails;
  }

  function wirePharmacyDetail(el) {
    if (!el || el.dataset.navWired === '1') return;
    el.dataset.navWired = '1';
    el.style.cursor = 'pointer';
    el.addEventListener('click', function (e) {
      if (e.target.closest('button') && e.target.closest('button').textContent.trim() === 'Add') return;
      go(pharmacyDetailUrl(el));
    });
  }

  function wireNav(el, url, stopProp) {
    if (!el || el.dataset.navWired === '1') return;
    el.dataset.navWired = '1';
    el.style.cursor = 'pointer';
    if (el.tagName === 'A') {
      el.href = url;
      return;
    }
    el.addEventListener('click', function (e) {
      if (stopProp) {
        e.preventDefault();
        e.stopPropagation();
      }
      go(url);
    });
  }

  function wireButtonsContaining(text, url, stopProp) {
    document.querySelectorAll('button, a').forEach(function (btn) {
      var label = btn.textContent.replace(/\s+/g, ' ').trim();
      if (label.indexOf(text) !== -1) wireNav(btn, url, stopProp !== false);
    });
  }

  /* ─── Hamburger / Drawer ─────────────────────────────────── */

  var NAV_LINKS = [
    { icon: 'home',          label: 'Home',        url: P.home },
    { icon: 'search',        label: 'Search',       url: P.search },
    { icon: 'description',   label: 'Upload Rx',    url: P.upload },
    { icon: 'shopping_bag',  label: 'My Orders',    url: P.orderHistory },
    { icon: 'person',        label: 'Profile',      url: P.profile }
  ];

  var EXTRA_LINKS = [
    { icon: 'local_pharmacy', label: 'Pharmacies',  url: P.pharmacies },
    { icon: 'shopping_cart',  label: 'Cart',        url: P.cart },
    { icon: 'track_changes',  label: 'Track Order', url: P.orderTracking },
    { icon: 'star_rate',      label: 'Feedback',    url: P.orderFeedback }
  ];

  function currentPageUrl() {
    return window.location.href;
  }

  function isActive(url) {
    var current = window.location.pathname.replace(/\\/g, '/');
    var target  = url.replace(/\.\.\//g, '').replace(/index\.html.*$/, '');
    return current.indexOf(target.replace(/\/$/, '')) !== -1;
  }

  function buildDrawer() {
    // Overlay
    var overlay = document.createElement('div');
    overlay.id = 'me-drawer-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9998',
      'background:rgba(0,0,0,0.45)',
      'opacity:0', 'pointer-events:none',
      'transition:opacity 0.3s ease'
    ].join(';');

    // Drawer panel
    var drawer = document.createElement('aside');
    drawer.id = 'me-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', 'Navigation menu');
    drawer.style.cssText = [
      'position:fixed', 'top:0', 'left:0', 'bottom:0',
      'z-index:9999',
      'width:280px', 'max-width:80vw',
      'background:#fff',
      'box-shadow:4px 0 24px rgba(0,0,0,0.12)',
      'transform:translateX(-100%)',
      'transition:transform 0.3s cubic-bezier(0.4,0,0.2,1)',
      'display:flex', 'flex-direction:column',
      'overflow-y:auto'
    ].join(';');

    // Drawer header
    var dHeader = document.createElement('div');
    dHeader.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:20px 16px 16px;border-bottom:1px solid #e5e7eb;flex-shrink:0;';

    var logoWrap = document.createElement('div');
    logoWrap.style.cssText = 'display:flex;align-items:center;gap:10px;';
    logoWrap.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style="width:32px;height:32px;flex-shrink:0;" aria-hidden="true"><rect width="48" height="48" rx="10" fill="#16a34a"/><path d="M19 10h10v10h10v10H29v10H19V30H9V20h10z" fill="#22c55e"/><path d="M8 30 Q18 18 38 16" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M10 34 Q22 20 40 20" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/></svg><span style="font-size:18px;font-weight:700;color:#16a34a;">MedEasy</span>';

    var closeBtn = document.createElement('button');
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.style.cssText = 'width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:50%;border:none;background:transparent;cursor:pointer;color:#6b7280;transition:background 0.15s;';
    closeBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;">close</span>';
    closeBtn.addEventListener('mouseenter', function () { this.style.background = '#f3f4f6'; });
    closeBtn.addEventListener('mouseleave', function () { this.style.background = 'transparent'; });

    dHeader.appendChild(logoWrap);
    dHeader.appendChild(closeBtn);

    // Main nav links
    var navSection = document.createElement('nav');
    navSection.style.cssText = 'padding:12px 8px;flex:1;';

    var sectionLabel = document.createElement('p');
    sectionLabel.style.cssText = 'font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;padding:8px 12px 4px;';
    sectionLabel.textContent = 'Main Menu';
    navSection.appendChild(sectionLabel);

    NAV_LINKS.forEach(function (item) {
      var active = isActive(item.url);
      var a = document.createElement('a');
      a.href = item.url;
      a.style.cssText = [
        'display:flex', 'align-items:center', 'gap:14px',
        'padding:12px 16px',
        'border-radius:10px',
        'margin-bottom:2px',
        'text-decoration:none',
        'font-size:15px', 'font-weight:' + (active ? '700' : '500'),
        'color:' + (active ? '#16a34a' : '#374151'),
        'background:' + (active ? '#f0fdf4' : 'transparent'),
        'transition:background 0.15s,color 0.15s',
        '-webkit-tap-highlight-color:transparent'
      ].join(';');

      a.innerHTML = '<span class="material-symbols-outlined" style="font-size:22px;color:' + (active ? '#16a34a' : '#6b7280') + ';font-variation-settings:\'FILL\' ' + (active ? '1' : '0') + ';">' + item.icon + '</span><span>' + item.label + '</span>';

      if (active) {
        var dot = document.createElement('span');
        dot.style.cssText = 'margin-left:auto;width:8px;height:8px;border-radius:50%;background:#16a34a;flex-shrink:0;';
        a.appendChild(dot);
      }

      a.addEventListener('mouseenter', function () {
        if (!isActive(item.url)) {
          this.style.background = '#f9fafb';
          this.style.color = '#111827';
        }
      });
      a.addEventListener('mouseleave', function () {
        if (!isActive(item.url)) {
          this.style.background = 'transparent';
          this.style.color = '#374151';
        }
      });

      navSection.appendChild(a);
    });

    // Divider
    var divider = document.createElement('hr');
    divider.style.cssText = 'border:none;border-top:1px solid #e5e7eb;margin:4px 16px 8px;';
    navSection.appendChild(divider);

    var moreSectionLabel = document.createElement('p');
    moreSectionLabel.style.cssText = 'font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;padding:8px 12px 4px;';
    moreSectionLabel.textContent = 'More';
    navSection.appendChild(moreSectionLabel);

    EXTRA_LINKS.forEach(function (item) {
      var a = document.createElement('a');
      a.href = item.url;
      a.style.cssText = [
        'display:flex', 'align-items:center', 'gap:14px',
        'padding:10px 16px',
        'border-radius:10px',
        'margin-bottom:2px',
        'text-decoration:none',
        'font-size:14px', 'font-weight:500',
        'color:#374151',
        'transition:background 0.15s,color 0.15s',
        '-webkit-tap-highlight-color:transparent'
      ].join(';');
      a.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;color:#6b7280;">' + item.icon + '</span><span>' + item.label + '</span>';
      a.addEventListener('mouseenter', function () { this.style.background = '#f9fafb'; this.style.color = '#111827'; });
      a.addEventListener('mouseleave', function () { this.style.background = 'transparent'; this.style.color = '#374151'; });
      navSection.appendChild(a);
    });

    // Footer
    var dFooter = document.createElement('div');
    dFooter.style.cssText = 'padding:16px;border-top:1px solid #e5e7eb;flex-shrink:0;';
    dFooter.innerHTML = '<p style="font-size:12px;color:#9ca3af;text-align:center;">MedEasy &copy; 2025</p>';

    drawer.appendChild(dHeader);
    drawer.appendChild(navSection);
    drawer.appendChild(dFooter);
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // Open / close logic
    function openDrawer() {
      drawer.style.transform = 'translateX(0)';
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeDrawer() {
      drawer.style.transform = 'translateX(-100%)';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    // Wire all hamburger/menu buttons in the page
    document.querySelectorAll('button, [role="button"], span.material-symbols-outlined').forEach(function (btn) {
      var icon = iconText(btn);
      if (icon === 'menu') {
        // For span elements, walk up to find a clickable parent or wire the span itself
        var target = btn.tagName === 'SPAN' ? (btn.closest('button') || btn) : btn;
        target.addEventListener('click', openDrawer);
      }
    });
  }

  /* ─── Back button ─────────────────────────────────────────── */

  function wireBackButton() {
    var backUrl = BACK[pageId()];
    if (!backUrl) return;
    document.querySelectorAll('header button, nav.fixed button').forEach(function (btn) {
      if (iconText(btn) === 'arrow_back') wireNav(btn, backUrl, true);
    });
  }

  function wireHeaderCart() {
    document.querySelectorAll('header button').forEach(function (btn) {
      if (iconText(btn) === 'shopping_cart') wireNav(btn, P.cart, true);
    });
  }

  function wireAnchorByText(selector, map) {
    document.querySelectorAll(selector).forEach(function (a) {
      var t = a.textContent.trim();
      Object.keys(map).forEach(function (key) {
        if (t.indexOf(key) !== -1) a.href = map[key];
      });
    });
  }

  /* ─── Page-specific wiring ───────────────────────────────── */

  function wirePageActions() {
    var id = pageId();

    if (id === 'home-dashboard') {
      document.querySelectorAll('section .grid > div').forEach(function (el) {
        var t = el.textContent;
        if (t.indexOf('Upload Prescription') !== -1) wireNav(el, P.upload);
        if (t.indexOf('Reorder Medicines') !== -1) wireNav(el, P.cart);
      });
      document.querySelectorAll('section .flex-shrink-0.group.cursor-pointer').forEach(function (el) {
        wireNav(el, P.search);
      });
      document.querySelectorAll('section .group.cursor-pointer.hover\\:shadow-md').forEach(function (el) {
        if (el.classList.contains('pharmacy-card') || el.getAttribute('data-pharmacy-id')) {
          wirePharmacyDetail(el);
        } else {
          wireNav(el, P.search);
        }
      });
      document.querySelectorAll('section .group.overflow-hidden').forEach(function (el) {
        if (el.querySelector('button') && el.textContent.indexOf('Add to Cart') !== -1) {
          wireMedicineDetail(el);
        }
      });
      document.querySelectorAll('section .group.overflow-hidden button').forEach(function (btn) {
        if (btn.textContent.indexOf('Add to Cart') !== -1) wireNav(btn, P.cart, true);
      });
      document.querySelectorAll('section button').forEach(function (btn) {
        if (btn.textContent.trim().indexOf('See All') !== -1) wireNav(btn, P.pharmacies, true);
      });
      var searchInput = document.querySelector('input[placeholder*="Search medicines"]');
      if (searchInput) {
        searchInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            var q = encodeURIComponent(searchInput.value.trim());
            go(P.search + (q ? '?q=' + q : ''));
          }
        });
      }
    }

    if (id === 'shopping-cart') {
      wireButtonsContaining('Proceed to Checkout', P.checkoutAddress, true);
      wireButtonsContaining('Upload Rx', P.prescriptionScan, true);
      document.querySelectorAll('header button').forEach(function (btn) {
        if (iconText(btn) === 'help') wireNav(btn, P.orderHistory, true);
      });
    }

    if (id === 'checkout-delivery-address') {
      wireButtonsContaining('Continue to Payment', P.checkoutPayment, true);
      document.querySelectorAll('.cursor-pointer').forEach(function (el) {
        if (el.textContent.indexOf('4242') !== -1) wireNav(el, P.checkoutPayment);
      });
    }

    if (id === 'checkout-payment-method') {
      wireButtonsContaining('Place Order', P.orderSuccess, true);
    }

    if (id === 'order-success') {
      document.querySelectorAll('header button').forEach(function (btn) {
        if (iconText(btn) === 'close') wireNav(btn, P.home, true);
      });
      wireButtonsContaining('Track Order', P.orderTracking, true);
      wireButtonsContaining('Continue Shopping', P.home, true);
    }

    if (id === 'onboarding-ai-upload') {
      document.querySelectorAll('header button').forEach(function (btn) {
        if (btn.textContent.trim() === 'Skip') wireNav(btn, P.home, true);
      });
      wireButtonsContaining('Next', P.prescriptionScan, true);
    }

    if (id === 'ai-prescription-scan') {
      document.querySelectorAll('button').forEach(function (btn) {
        if (btn.textContent.indexOf('Add to Cart') !== -1) wireNav(btn, P.cart, true);
      });
      document.querySelectorAll('header button').forEach(function (btn) {
        if (iconText(btn) === 'help') wireNav(btn, P.orderHistory, true);
      });
    }

    if (id === 'pharmacies-medicines') {
      document.querySelectorAll('.pharmacy-card').forEach(function (card) {
        wirePharmacyDetail(card);
        card.querySelectorAll('button').forEach(function (btn) {
          if (btn.textContent.trim() === 'Add') wireNav(btn, P.cart, true);
        });
      });
    }

    if (id === 'pharmacy-details-medicine-list') {
      document.querySelectorAll('section .grid button').forEach(function (btn) {
        if (iconText(btn) === 'add') wireNav(btn, P.cart, true);
      });
    }

    if (id === 'medicine-search-results') {
      document.querySelectorAll('.search-product-card').forEach(function (card) {
        wireMedicineDetail(card);
        card.querySelectorAll('button').forEach(function (btn) {
          if (btn.textContent.indexOf('ADD') !== -1 || btn.textContent.indexOf('Add to Cart') !== -1) {
            wireNav(btn, P.cart, true);
          }
        });
      });
      wireAnchorByText('aside a[href="#"]', {
        'My Records': P.profile,
        Search: P.search,
        Pharmacies: P.pharmacies,
        Payments: P.checkoutPayment,
        Settings: P.profile
      });
      document.querySelectorAll('aside div').forEach(function (el) {
        if (el.textContent.indexOf('Alex Johnson') !== -1) wireNav(el, P.profile);
      });
    }

    if (id === 'medicine-details') {
      wireButtonsContaining('Add to Cart', P.cart, true);
      document.querySelectorAll('button').forEach(function (btn) {
        if (btn.textContent.indexOf('View All') !== -1) wireNav(btn, P.search, true);
      });
      document.querySelectorAll('section .group.cursor-pointer, section .group').forEach(function (el) {
        if (el.querySelector('img') && el.textContent.indexOf('Add') !== -1 && !el.closest('header')) {
          wireMedicineDetail(el);
        }
      });
    }

    if (id === 'customer-profile-dashboard') {
      document.querySelectorAll('button.bento-card').forEach(function (btn) {
        var t = btn.textContent;
        if (t.indexOf('Orders') !== -1) wireNav(btn, P.orderHistory);
        if (t.indexOf('Prescriptions') !== -1) wireNav(btn, P.prescriptionScan);
      });
      document.querySelectorAll('button').forEach(function (btn) {
        if (btn.textContent.trim() === 'View All') wireNav(btn, P.orderHistory, true);
        if (btn.textContent.indexOf('Logout') !== -1) wireNav(btn, P.splash, true);
      });
      document.querySelectorAll('.divide-y .p-md').forEach(function (row) {
        if (row.textContent.indexOf('Delivered') !== -1) wireNav(row, P.orderHistory);
        if (row.textContent.indexOf('Prescription Uploaded') !== -1) wireNav(row, P.prescriptionScan);
      });
      wireAnchorByText('a[href="#"]', {
        'Address Book': P.checkoutAddress,
        'Payment Methods': P.checkoutPayment,
        Notifications: P.orderHistory,
        'Password': P.profile,
        'Active Sessions': P.profile
      });
      document.querySelectorAll('.cursor-pointer.rounded-xl, .rounded-xl.cursor-pointer').forEach(function (el) {
        if (el.textContent.indexOf('Help Center') !== -1) wireNav(el, P.orderFeedback);
        if (el.textContent.indexOf('Terms') !== -1) wireNav(el, P.home);
      });
    }

    if (id === 'live-order-tracking') {
      wireButtonsContaining('Shop Now', P.home, true);
      wireButtonsContaining('Contact Support', P.orderFeedback, true);
    }

    if (id === 'order-history-support') {
      wireAnchorByText('header a[href="#"]', {
        Dashboard: P.home,
        'My Orders': P.orderHistory,
        'Healthcare Store': P.home,
        'Help & Support': P.orderFeedback
      });
      wireAnchorByText('aside a[href="#"]', {
        'My Profile': P.profile,
        'My Addresses': P.checkoutAddress,
        Payments: P.checkoutPayment,
        'My Orders': P.orderHistory,
        Reminders: P.orderHistory,
        Notifications: P.orderHistory,
        Logout: P.splash
      });
      document.querySelectorAll('header .cursor-pointer, aside .cursor-pointer').forEach(function (el) {
        if (el.textContent.indexOf('Arjun Mehta') !== -1) wireNav(el, P.profile);
      });
      document.querySelectorAll('button').forEach(function (btn) {
        var t = btn.textContent.replace(/\s+/g, ' ').trim();
        if (t.indexOf('Track Live') !== -1 || t.indexOf('View Details') !== -1) wireNav(btn, P.orderTracking, true);
        if (t.indexOf('Give Feedback') !== -1 || t.indexOf('File Complaint') !== -1) wireNav(btn, P.orderFeedback, true);
        if (t.indexOf('Reorder') !== -1) wireNav(btn, P.cart, true);
      });
    }
  }

  function wireSplashRedirect() {
    if (pageId() !== 'splash-screen') return;
    setTimeout(function () {
      // If already logged in go straight to home, otherwise go to login
      if (localStorage.getItem('me_session') === '1') {
        go(P.home);
      } else {
        go('../login/index.html');
      }
    }, 3500);
  }

  function wireLogoClick() {
    // Wire the MedEasy logo/wordmark in the header to navigate to home dashboard
    document.querySelectorAll('header h1, header span.font-display, header .font-display').forEach(function (el) {
      // Only target elements that contain the MedEasy wordmark (SVG logo + text)
      if (el.textContent.replace(/\s+/g, '').toLowerCase().indexOf('medeasy') === -1) return;
      if (el.dataset.logoWired) return;
      el.dataset.logoWired = '1';
      el.style.cursor = 'pointer';
      el.addEventListener('click', function (e) {
        // Don't interfere if clicking a child button
        if (e.target.closest('button')) return;
        go(P.home);
      });
    });
  }

  function init() {
    buildDrawer();
    wireLogoClick();
    wireBackButton();
    wireHeaderCart();
    wirePageActions();
    wireSplashRedirect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
