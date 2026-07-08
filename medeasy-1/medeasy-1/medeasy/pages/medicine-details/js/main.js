function renderProduct(productId) {
    var catalog = window.MedEasyProducts || {};
    var product = catalog[productId] || catalog['amoxicillin-500mg'];
    if (!product) return;

    document.title = product.name + ' | MedEasy';

    var image = document.getElementById('product-image');
    if (image) {
        image.src = product.image;
        image.alt = product.name + ' product packaging';
    }

    var titleDesktop = document.getElementById('product-title-desktop');
    var titleMobile = document.getElementById('product-title-mobile');
    if (titleDesktop) titleDesktop.textContent = product.name;
    if (titleMobile) titleMobile.textContent = product.name;

    var genericDesktop = document.getElementById('product-generic-desktop');
    var genericMobile = document.getElementById('product-generic-mobile');
    if (genericDesktop) genericDesktop.textContent = 'Generic: ' + product.generic;
    if (genericMobile) genericMobile.textContent = 'Generic: ' + product.generic;

    var mfgDesktop = document.getElementById('product-manufacturer-desktop');
    var mfgMobile = document.getElementById('product-manufacturer-mobile');
    if (mfgDesktop) mfgDesktop.textContent = product.manufacturer;
    if (mfgMobile) mfgMobile.textContent = product.manufacturer;

    var priceDesktop = document.getElementById('product-price-desktop');
    var priceMobile = document.getElementById('product-price-mobile');
    if (priceDesktop) priceDesktop.textContent = product.price;
    if (priceMobile) priceMobile.textContent = product.price;

    var mfgDate = document.getElementById('product-mfg-date');
    var expiryDate = document.getElementById('product-expiry-date');
    if (mfgDate) mfgDate.textContent = product.manufacturingDate;
    if (expiryDate) expiryDate.textContent = product.expiryDate;

    var deliveryChip = document.getElementById('product-delivery-chip');
    if (deliveryChip) deliveryChip.textContent = product.delivery;

    var rxChip = document.getElementById('product-rx-chip');
    if (rxChip) rxChip.classList.toggle('hidden', !product.rxRequired);

    var uses = document.getElementById('product-uses');
    var dosage = document.getElementById('product-dosage');
    var sideEffects = document.getElementById('product-side-effects');
    if (uses) uses.textContent = product.uses;
    if (dosage) dosage.textContent = product.dosage;
    if (sideEffects) sideEffects.textContent = product.sideEffects;
}

function getProductIdFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id') || 'amoxicillin-500mg';
}

window.addEventListener('load', function () {
    renderProduct(getProductIdFromUrl());

    // Quantity controls — shared between mobile and desktop
    function wireQty(minusId, plusId, displayId) {
        var qty = 1;
        var display = document.getElementById(displayId);
        var plus = document.getElementById(plusId);
        var minus = document.getElementById(minusId);
        if (!display || !plus || !minus) return;

        plus.addEventListener('click', function () {
            qty++;
            display.textContent = qty;
        });
        minus.addEventListener('click', function () {
            if (qty > 1) {
                qty--;
                display.textContent = qty;
            }
        });
    }

    wireQty('mobile-minus', 'mobile-plus', 'mobile-qty');
    wireQty('desktop-minus', 'desktop-plus', 'desktop-qty');

    document.querySelectorAll('.similar-product-card').forEach(function (card) {
        card.addEventListener('click', function (e) {
            if (e.target.closest('button')) return;
            var id = card.getAttribute('data-product-id');
            if (id) {
                window.location.href = 'index.html?id=' + encodeURIComponent(id);
            }
        });
    });
});
