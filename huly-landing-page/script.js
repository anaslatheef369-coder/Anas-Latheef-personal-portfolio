document.addEventListener('DOMContentLoaded', () => {
    // --- REVEAL ON SCROLL ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });

    // --- STICKY NAVBAR BACKGROUND ---
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.style.background = 'rgba(8, 8, 8, 0.95)';
            nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)';
        } else {
            nav.style.background = 'rgba(8, 8, 8, 0.8)';
            nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
        }
    });

    // --- TAB SWITCH ENGINE ---
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            // Add to current
            tab.classList.add('active');
            
            // Log for visual feedback in dev tools
            console.log(`Switched to: ${tab.dataset.tab}`);
            
            // Subtle feedback: pulse animation on content change
            const bentoGrid = document.querySelector('.bento-grid');
            bentoGrid.style.opacity = '0.5';
            bentoGrid.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                bentoGrid.style.opacity = '1';
                bentoGrid.style.transform = 'translateY(0)';
            }, 300);
        });
    });

    // --- MOUSE FOLLOW GLOW EFFECT ---
    // Update card-bg-glow based on mouse position within the card
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = card.querySelector('.card-bg-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15), transparent 70%)`;
                glow.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.card-bg-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });

    // --- CTA PULSE ---
    const primaryBtn = document.querySelector('.pulse');
    if (primaryBtn) {
        setInterval(() => {
            primaryBtn.style.boxShadow = '0 0 0 0 rgba(255, 255, 255, 0.4)';
            setTimeout(() => {
                primaryBtn.style.boxShadow = '0 0 0 10px rgba(255, 255, 255, 0)';
            }, 10);
        }, 2000);
    }
});
