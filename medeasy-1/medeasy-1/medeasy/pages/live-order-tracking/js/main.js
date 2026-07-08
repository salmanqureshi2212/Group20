// Micro-interaction for the map tracking
        document.addEventListener('DOMContentLoaded', () => {
            const markers = document.querySelectorAll('.animate-bounce');
            markers.forEach(marker => {
                marker.addEventListener('click', () => {
                    marker.style.transform = 'scale(1.2)';
                    setTimeout(() => marker.style.transform = 'scale(1)', 200);
                });
            });
        });
