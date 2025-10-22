// Header and hero slider functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navClose = document.querySelector('.nav-close');
    const navItems = document.querySelectorAll('.nav-item');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    const closeMobileMenu = () => {
        if (!mobileMenuToggle || !nav) return;
        mobileMenuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
        navItems.forEach(item => item.classList.remove('active'));
        navLinks.forEach(link => {
            if (link.hasAttribute('aria-expanded')) {
                link.setAttribute('aria-expanded', 'false');
            }
        });
    };

    const closeAllDropdowns = () => {
        navItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('.nav-link');
            if (link && link.hasAttribute('aria-expanded')) {
                link.setAttribute('aria-expanded', 'false');
            }
        });
    };

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function () {
            const isActive = mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('active', isActive);
            document.body.classList.toggle('menu-open', isActive);

            if (!isActive) {
                navItems.forEach(item => item.classList.remove('active'));
            }
        });

        if (navClose) {
            navClose.addEventListener('click', closeMobileMenu);
        }

        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    navLinks.forEach(link => {
        const navItem = link.closest('.nav-item');
        const dropdown = navItem ? navItem.querySelector('.dropdown') : null;

        if (dropdown) {
            link.classList.add('has-dropdown');
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
        }

        link.addEventListener('click', function (e) {
            const href = link.getAttribute('href');
            const hasDestination = href && href !== '#' && href.trim() !== '';
            const hasDropdown = Boolean(dropdown);

            if (hasDropdown && isMobile()) {
                if (navItem.classList.contains('active') && hasDestination) {
                    closeMobileMenu();
                    return;
                }

                e.preventDefault();
                const willActivate = !navItem.classList.contains('active');

                // Cerrar todos los otros dropdowns primero
                closeAllDropdowns();

                // Activar/desactivar el dropdown actual
                navItem.classList.toggle('active', willActivate);
                link.setAttribute('aria-expanded', willActivate ? 'true' : 'false');
                return;
            }

            if (!hasDestination) {
                e.preventDefault();
            } else {
                // Cerrar todos los dropdowns activos antes de cerrar el menú
                closeAllDropdowns();
                closeMobileMenu();
            }
        });
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            const href = item.getAttribute('href');
            const hasDestination = href && href !== '#' && href.trim() !== '';

            if (!hasDestination) {
                e.preventDefault();
            } else {
                // Cerrar todos los dropdowns y el menú móvil
                closeAllDropdowns();
                closeMobileMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (!isMobile()) {
            closeMobileMenu();
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.slider-btn-prev');
        const nextBtn = document.querySelector('.slider-btn-next');
        const ctaButton = document.querySelector('.cta-button');
        const heroSlider = document.querySelector('.hero-slider');
        const header = document.querySelector('.header');

        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));

            const boundedIndex = ((index % slides.length) + slides.length) % slides.length;
            slides[boundedIndex].classList.add('active');
            if (indicators[boundedIndex]) {
                indicators[boundedIndex].classList.add('active');
            }

            currentSlide = boundedIndex;

            if (header) {
                if (currentSlide === 2) {
                    header.classList.add('banner3-active');
                } else {
                    header.classList.remove('banner3-active');
                }
            }

            const videos = document.querySelectorAll('.slide-video');
            videos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });

            const currentVideo = slides[boundedIndex].querySelector('.slide-video');
            if (currentVideo) {
                setTimeout(() => {
                    currentVideo.play().catch(() => {
                        /* ignore autoplay errors */
                    });
                }, 100);
            }
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        const startAutoSlide = () => {
            if (slides.length <= 1) return;
            stopAutoSlide();
            slideInterval = setInterval(nextSlide, 30000);
        };

        const stopAutoSlide = () => {
            clearInterval(slideInterval);
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });

        if (ctaButton) {
            ctaButton.addEventListener('click', function (e) {
                e.preventDefault();
            });
        }

        if (heroSlider) {
            heroSlider.addEventListener('mouseenter', stopAutoSlide);
            heroSlider.addEventListener('mouseleave', startAutoSlide);
        }

        startAutoSlide();
        showSlide(0);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.uni-slide');
    const prev = document.querySelector('.uni-arrow--prev');
    const next = document.querySelector('.uni-arrow--next');
    const thumbs = document.querySelectorAll('.uni-thumb');

    if (!track || slides.length === 0) {
        return;
    }

    let index = 0;

    const go = (i) => {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(${-100 * index}%)`;
        document.querySelectorAll('.uni-thumb').forEach((t) => {
            t.classList.toggle('is-active', Number(t.dataset.index) === index);
        });
    };

    if (prev) {
        prev.addEventListener('click', () => go(index - 1));
    }

    if (next) {
        next.addEventListener('click', () => go(index + 1));
    }

    thumbs.forEach(t => t.addEventListener('click', () => go(Number(t.dataset.index))));

    go(0);
});


const root = document.querySelector('.oferta-tabs');
if (!root) {
    console.log('Oferta tabs not found, skipping initialization');
} else {
    const tablist = root.querySelector('.oferta-tabs__tablist');
    const tabs = Array.from(root.querySelectorAll('.oferta-tabs__tab'));
    const panels = Array.from(root.querySelectorAll('.oferta-tabs__panel'));
    const mq = window.matchMedia('(max-width: 768px)');
    const host = root.querySelector('.oferta-tabs__wrap');

function setActive(i, focus = false) {
    tabs.forEach((t, idx) => {
        const on = idx === i;
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
        panels[idx].hidden = !on;
    });
    if (focus) tabs[i].focus();
    history.replaceState(null, '', '#' + tabs[i].id);
    if (mq.matches) {
        tablist.insertBefore(panels[i], tabs[i].nextSibling);
    }
}

function enterMobile() {
    const activeIdx = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true') || 0;
    tabs.forEach((t, idx) => {
        panels[idx].hidden = idx !== activeIdx;
        tablist.insertBefore(panels[idx], t.nextSibling);
    });
}

function exitMobile() {
    tabs.forEach((_, idx) => host.appendChild(panels[idx]));
}

function handleMQ(e) { e.matches ? enterMobile() : exitMobile(); }

tabs.forEach((b, i) => b.addEventListener('click', () => setActive(i, false)));

tablist.addEventListener('keydown', e => {
    const cur = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        let next = cur;
        if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
        if (e.key === 'ArrowLeft') next = (cur - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = tabs.length - 1;
        setActive(next, true);
    }
});

// Deep-link
const id = location.hash.slice(1);
const idx = Math.max(0, tabs.findIndex(t => t.id === id));
setActive(idx, false);

    handleMQ(mq);
    mq.addEventListener('change', handleMQ);
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) {
        return;
    }
    
    // Función para mostrar/ocultar el botón
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }
    
    // Event listener para el scroll
    window.addEventListener('scroll', handleScroll);
    
    // Verificar posición inicial
    handleScroll();
    
    // Funcionalidad de scroll suave al hacer clic
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initScrollToTop);

// Advertisement modal
document.addEventListener('DOMContentLoaded', function() {
    const anuncioModal = document.getElementById('anuncioModal');
    const closeBtn = document.querySelector('.anuncio-close');
    
    if (anuncioModal) {
        // Show modal with delay for better UX
        setTimeout(() => {
            anuncioModal.classList.add('show');
        }, 500);
        
        // Close modal on close button click
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                anuncioModal.classList.remove('show');
                // Hide completely after animation
                setTimeout(() => {
                    anuncioModal.style.display = 'none';
                }, 300);
            });
        }
        
        // Close modal on overlay click
        const overlay = document.querySelector('.anuncio-overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                anuncioModal.classList.remove('show');
                setTimeout(() => {
                    anuncioModal.style.display = 'none';
                }, 300);
            });
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && anuncioModal.classList.contains('show')) {
                anuncioModal.classList.remove('show');
                setTimeout(() => {
                    anuncioModal.style.display = 'none';
                }, 300);
            }
        });
    }
});