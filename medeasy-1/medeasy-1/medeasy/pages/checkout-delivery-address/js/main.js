// Micro-interactions
        document.querySelectorAll('.bento-card, button').forEach(el => {
            el.addEventListener('mousedown', () => {
                if(!el.classList.contains('active:scale-95')) return;
                el.style.transform = 'scale(0.98)';
            });
            el.addEventListener('mouseup', () => {
                el.style.transform = '';
            });
        });

        // Simulating address selection
        const addressCards = document.querySelectorAll('.bento-card');
        addressCards.forEach(card => {
            card.addEventListener('click', () => {
                // Simplified visual feedback
                if (card.querySelector('h3')?.textContent === "Payment Method") return;
                
                addressCards.forEach(c => {
                    c.classList.remove('border-primary', 'ring-4', 'ring-primary/5');
                });
                card.classList.add('border-primary', 'ring-4', 'ring-primary/5');
            });
        });
