// Micro-interactions
    window.addEventListener('load', () => {
      setTimeout(() => {
        const toast = document.getElementById('toast');
        toast.classList.remove('translate-y-20', 'opacity-0');
      }, 2000);
      
      setTimeout(hideToast, 7000);
    });

    function hideToast() {
      const toast = document.getElementById('toast');
      toast.classList.add('translate-y-20', 'opacity-0');
    }

    // Add click feedback for all buttons
    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('mousedown', function() {
        this.classList.add('scale-95');
      });
      btn.addEventListener('mouseup', function() {
        this.classList.remove('scale-95');
      });
      btn.addEventListener('mouseleave', function() {
        this.classList.remove('scale-95');
      });
    });
