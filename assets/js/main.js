document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Footer Year Update
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Gatilho quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Navbar Blur Effect on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.replace('bg-dark/80', 'bg-dark/95');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.classList.replace('bg-dark/95', 'bg-dark/80');
        }
    });

    // 4. Smooth Scroll para Links Internos (Polyfill simples para browsers antigos, embora css scroll-smooth resolva na maioria)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Compensação do Navbar fixo
                    behavior: 'smooth'
                });
            }
        });
    });
});