// Micro-interaction: button scale and ripple effect logic can go here
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function(e) {
                let ripple = document.createElement('span');
                ripple.classList.add('absolute', 'bg-white/20', 'rounded-full', 'pointer-events-none', 'animate-ping');
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.left = e.clientX - e.target.offsetLeft + 'px';
                ripple.style.top = e.clientY - e.target.offsetTop + 'px';
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 1000);
            });
        });
