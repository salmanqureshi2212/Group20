// Micro-interactions and Atmosphere
        document.addEventListener('DOMContentLoaded', () => {
            // Shadow shifting on scroll for Header
            const header = document.querySelector('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    header.classList.add('shadow-md');
                } else {
                    header.classList.remove('shadow-md');
                }
            });

            // Smooth horizontal scroll for categories
            const scroller = document.querySelector('.no-scrollbar');
            let isDown = false;
            let startX;
            let scrollLeft;

            scroller.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - scroller.offsetLeft;
                scrollLeft = scroller.scrollLeft;
            });
            scroller.addEventListener('mouseleave', () => {
                isDown = false;
            });
            scroller.addEventListener('mouseup', () => {
                isDown = false;
            });
            scroller.addEventListener('mousemove', (e) => {
                if(!isDown) return;
                e.preventDefault();
                const x = e.pageX - scroller.offsetLeft;
                const walk = (x - startX) * 2;
                scroller.scrollLeft = scrollLeft - walk;
            });
        });
