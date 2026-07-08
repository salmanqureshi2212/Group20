// Micro-interaction for the track order button
        const trackBtn = document.querySelector('main button.bg-primary');
        if (!trackBtn) return;
        trackBtn.addEventListener('mouseenter', () => {
            const icon = trackBtn.querySelector('span.material-symbols-outlined');
            if (icon) icon.style.transform = 'translateX(4px)';
        });
        trackBtn.addEventListener('mouseleave', () => {
            const icon = trackBtn.querySelector('span.material-symbols-outlined');
            if (icon) icon.style.transform = 'translateX(0px)';
        });
