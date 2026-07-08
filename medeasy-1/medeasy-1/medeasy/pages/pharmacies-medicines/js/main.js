// Simple Interaction logic for Add to Cart
        document.querySelectorAll('button').forEach(btn => {
            if(btn.innerText === 'Add') {
                btn.addEventListener('click', function() {
                    const originalText = this.innerText;
                    this.innerText = 'Added!';
                    this.classList.replace('bg-primary', 'bg-secondary-container');
                    this.classList.replace('text-on-primary', 'text-on-secondary-container');
                    
                    setTimeout(() => {
                        this.innerText = originalText;
                        this.classList.replace('bg-secondary-container', 'bg-primary');
                        this.classList.replace('text-on-secondary-container', 'text-on-primary');
                    }, 1500);
                });
            }
        });

        // Search bar focus effect
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('scale-[1.02]');
        });
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('scale-[1.02]');
        });
