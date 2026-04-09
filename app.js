document.addEventListener('DOMContentLoaded', () => {
    // Наблюдатель за появлением элементов на экране (Анимация скролла)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-up');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Эффект помутнения навигации при скролле вниз
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 5, 8, 0.8)';
            nav.style.backdropFilter = 'blur(15px)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.08)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(5, 5, 8, 0.3)';
            nav.style.backdropFilter = 'none';
            nav.style.borderBottom = '1px solid transparent';
            nav.style.boxShadow = 'none';
        }
    });

    // Динамический статус в шапке (переключение ролей)
    const statusText = document.getElementById('dynamic-status');
    const statusContainer = document.querySelector('.nav-status-container');
    
    if (statusText) {
        const lang = document.documentElement.lang || 'ru';
        const phrases = {
            ru: [
                "Ведущий BIM-инженер",
                "Открыт к проектам",
                "Эксперт по AI-автоматизации",
                "Доступен для задач",
                "Архитектор систем",
                "Жду предложений"
            ],
            en: [
                "Lead BIM Engineer",
                "Open for projects",
                "AI Automation Expert",
                "Available Now",
                "System Architect",
                "Let's collaborate"
            ]
        };

        let currentIndex = 0;
        const currentPhrases = phrases[lang] || phrases.en;

        const updateStatus = () => {
            statusContainer.style.opacity = '0';
            
            setTimeout(() => {
                statusText.textContent = currentPhrases[currentIndex];
                statusContainer.style.opacity = '1';
                
                // Меняем цвет точки, если это статус (опционально для акцента)
                const isStatus = currentIndex % 2 !== 0;
                const dot = statusContainer.querySelector('.status-dot');
                if (dot) dot.style.background = isStatus ? '#00ff88' : 'var(--accent-blue)';
                
                currentIndex = (currentIndex + 1) % currentPhrases.length;
            }, 400);
        };

        // Запуск цикла
        updateStatus();
        setInterval(updateStatus, 5000);
        // Mobile Menu Logic (Side Drawer)
        const menuToggle = document.getElementById('menu-toggle');
        const closeDrawer = document.getElementById('close-drawer');
        const mobileDrawer = document.getElementById('mobile-drawer');
        const menuDimmer = document.getElementById('menu-dimmer');
        const drawerLinks = document.querySelectorAll('.drawer-nav a');

        const toggleMenu = (show) => {
            mobileDrawer.classList.toggle('active', show);
            menuDimmer.classList.toggle('active', show);
            menuToggle.classList.toggle('active', show); // Trigger burger animation
            document.body.style.overflow = show ? 'hidden' : '';
        };

        if (menuToggle && mobileDrawer && menuDimmer) {
            menuToggle.addEventListener('click', () => toggleMenu(true));
            closeDrawer.addEventListener('click', () => toggleMenu(false));
            menuDimmer.addEventListener('click', () => toggleMenu(false));

            drawerLinks.forEach(link => {
                link.addEventListener('click', () => toggleMenu(false));
            });
        }
    }
});
