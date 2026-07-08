// Star Rating Logic
        const stars = document.querySelectorAll('.star-rating .star');
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                const val = parseInt(e.target.dataset.value);
                stars.forEach((s, idx) => {
                    if (idx < val) {
                        s.style.fontVariationSettings = "'FILL' 1";
                        s.classList.add('text-primary');
                        s.classList.remove('text-outline-variant');
                    } else {
                        s.style.fontVariationSettings = "'FILL' 0";
                        s.classList.remove('text-primary');
                        s.classList.add('text-outline-variant');
                    }
                });
            });
        });

        // Chip selection logic
        const chips = document.querySelectorAll('.issue-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('chip-active');
                if (chip.classList.contains('chip-active')) {
                    chip.classList.remove('text-on-surface-variant', 'bg-surface-container-low');
                } else {
                    chip.classList.add('text-on-surface-variant', 'bg-surface-container-low');
                }
            });
        });

        // Simple feedback for the submit button
        document.querySelector('button.bg-primary').addEventListener('click', function() {
            const btn = this;
            const originalContent = btn.innerHTML;
            btn.innerHTML = '<span class="material-symbols-outlined animate-spin">progress_activity</span> Sending...';
            btn.disabled = true;
            btn.classList.add('opacity-70', 'cursor-not-allowed');
            
            setTimeout(() => {
                btn.innerHTML = '<span class="material-symbols-outlined">check_circle</span> Submitted Successfully';
                btn.classList.replace('bg-primary', 'bg-primary-container');
                setTimeout(() => {
                    window.location.href = '../order-history-support/index.html';
                }, 1500);
            }, 2000);
        });
