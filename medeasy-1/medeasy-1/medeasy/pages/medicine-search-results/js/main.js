// Medicine search — filter, sort, and live results
document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('medicine-search-input');
    var resultsCount = document.getElementById('search-results-count');
    var resultsQuery = document.getElementById('search-results-query');
    var emptyState = document.getElementById('search-empty-state');
    var resultsGrid = document.getElementById('search-results-grid');
    var sortBtn = document.getElementById('search-sort-btn');
    var cards = Array.from(document.querySelectorAll('.search-product-card'));

    var activeFilters = {
        prescription: false,
        availability: false
    };
    var sortAscending = true;
    var hasAppliedSearch = false;

    function getCardText(card) {
        var title = card.querySelector('h3');
        var subtitle = card.querySelector('p');
        return ((title ? title.textContent : '') + ' ' + (subtitle ? subtitle.textContent : '')).toLowerCase();
    }

    function readInitialQuery() {
        var params = new URLSearchParams(window.location.search);
        if (params.has('q')) {
            return params.get('q').trim();
        }
        return 'Paracetamol';
    }

    function showAllResults() {
        cards.forEach(function (card) {
            card.classList.remove('hidden');
        });
        resultsCount.textContent = String(cards.length);
        resultsQuery.textContent = searchInput.value.trim() || 'all medicines';
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
        resultsGrid.classList.remove('hidden');
    }

    function applySearch() {
        hasAppliedSearch = true;
        var query = searchInput.value.trim().toLowerCase();
        var visibleCount = 0;

        cards.forEach(function (card) {
            var matchesQuery = !query || getCardText(card).indexOf(query) !== -1;
            var matchesRx = !activeFilters.prescription || card.dataset.rx === 'true';
            var matchesStock = !activeFilters.availability || card.dataset.stock === 'in';
            var show = matchesQuery && matchesRx && matchesStock;

            card.classList.toggle('hidden', !show);
            if (show) visibleCount++;
        });

        resultsCount.textContent = String(visibleCount);
        resultsQuery.textContent = searchInput.value.trim() || 'all medicines';
        emptyState.classList.toggle('hidden', visibleCount > 0);
        emptyState.classList.toggle('flex', visibleCount === 0);
        resultsGrid.classList.toggle('hidden', visibleCount === 0);
    }

    function sortCards() {
        var sorted = cards.slice().sort(function (a, b) {
            var priceA = parseFloat(a.dataset.price || '0');
            var priceB = parseFloat(b.dataset.price || '0');
            return sortAscending ? priceA - priceB : priceB - priceA;
        });
        sorted.forEach(function (card) {
            resultsGrid.appendChild(card);
        });
        cards = sorted;
    }

    searchInput.value = readInitialQuery();

    if (new URLSearchParams(window.location.search).has('q')) {
        applySearch();
    } else {
        showAllResults();
    }

    searchInput.addEventListener('input', function () {
        applySearch();
    });

    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            applySearch();
        }
    });

    searchInput.addEventListener('search', function () {
        if (!searchInput.value) {
            showAllResults();
            hasAppliedSearch = false;
        } else {
            applySearch();
        }
    });

    if (sortBtn) {
        sortBtn.addEventListener('click', function () {
            sortAscending = !sortAscending;
            sortCards();
            if (hasAppliedSearch) {
                applySearch();
            } else {
                showAllResults();
            }
        });
    }

    document.querySelectorAll('#filter-chips button').forEach(function (chip) {
        chip.addEventListener('click', function () {
            var label = chip.textContent.trim();

            if (label.indexOf('Prescription') !== -1) {
                activeFilters.prescription = !activeFilters.prescription;
            } else if (label.indexOf('Availability') !== -1) {
                activeFilters.availability = !activeFilters.availability;
            } else if (label.indexOf('Price') !== -1) {
                sortAscending = !sortAscending;
                sortCards();
            }

            var isToggleFilter = label.indexOf('Prescription') !== -1 || label.indexOf('Availability') !== -1;
            var isActive = (label.indexOf('Prescription') !== -1 && activeFilters.prescription) ||
                (label.indexOf('Availability') !== -1 && activeFilters.availability) ||
                label.indexOf('Category') !== -1;

            if (isActive) {
                chip.classList.add('bg-primary-container', 'text-on-primary-container', 'shadow-sm');
                chip.classList.remove('bg-surface', 'ring-1', 'ring-outline-variant', 'text-on-surface-variant');
            } else if (isToggleFilter) {
                chip.classList.remove('bg-primary-container', 'text-on-primary-container', 'shadow-sm');
                chip.classList.add('bg-surface', 'ring-1', 'ring-outline-variant', 'text-on-surface-variant');
            }

            applySearch();
        });
    });
});
