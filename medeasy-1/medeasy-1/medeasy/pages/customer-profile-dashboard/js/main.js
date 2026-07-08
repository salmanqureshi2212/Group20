// Tab switching logic for interactive feeling
        document.querySelectorAll('.bento-card, a').forEach(el => {
            el.addEventListener('mousedown', () => {
                el.style.transform = 'scale(0.97)';
            });
            el.addEventListener('mouseup', () => {
                el.style.transform = 'scale(1)';
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'scale(1)';
            });
        });

        // Simple scroll observer for sticky header effect
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('glass-header');
                header.classList.remove('bg-surface');
            } else {
                header.classList.remove('glass-header');
                header.classList.add('bg-surface');
            }
        });
