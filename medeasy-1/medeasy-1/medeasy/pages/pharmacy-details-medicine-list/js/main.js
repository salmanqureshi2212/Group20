// Micro-interactions for buttons
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                // Haptic feedback logic could go here
            });
        });

        // Category Chip selection toggle logic
        const chips = document.querySelectorAll('.overflow-x-auto button');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => {
                    c.classList.remove('bg-primary', 'text-on-primary');
                    c.classList.add('bg-surface-container', 'text-on-surface-variant');
                });
                chip.classList.remove('bg-surface-container', 'text-on-surface-variant');
                chip.classList.add('bg-primary', 'text-on-primary');
            });
        });
