// Micro-interaction for radio button selection
        const radioButtons = document.querySelectorAll('input[name="payment_method"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                // Reset all icons and states
                document.querySelectorAll('.payment-option-transition .w-6').forEach(circle => {
                    circle.classList.remove('border-primary');
                    circle.querySelector('div').classList.add('opacity-0');
                    circle.querySelector('div').classList.remove('opacity-100');
                });
                
                // Set active state
                const container = e.target.nextElementSibling;
                const circle = container.querySelector('.w-6');
                circle.classList.add('border-primary');
                circle.querySelector('div').classList.remove('opacity-0');
                circle.querySelector('div').classList.add('opacity-100');
            });
        });
