// Simple micro-interaction for entry transition
        document.addEventListener('DOMContentLoaded', () => {
            const logo = document.querySelector('.animate-pulse-soft');
            const mainContent = document.querySelector('main');
            
            // Subtle entry fade
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 1s ease-out';
            
            requestAnimationFrame(() => {
                mainContent.style.opacity = '1';
            });

            // Simulate progress completion and possible redirect
            // In a real PWA this would be replaced by actual asset loading
            setTimeout(() => {
                const loadingBar = document.querySelector('.loading-progress');
                if (loadingBar) {
                    loadingBar.style.animation = 'none';
                    loadingBar.style.width = '100%';
                    loadingBar.style.transition = 'width 0.5s ease-in';
                }
            }, 3000);
        });
