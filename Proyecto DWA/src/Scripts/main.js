// JavaScript para funcionalidad del header y hero slider
document.addEventListener('DOMContentLoaded', function() {
    console.log('Header UNIVO cargado correctamente');
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Funcionalidad para los menús desplegables
    
    navItems.forEach(item => {
        const dropdown = item.querySelector('.dropdown');
        
        if (dropdown) {
            // Mostrar dropdown al hacer hover
            item.addEventListener('mouseenter', function() {
                dropdown.style.display = 'flex';
            });
            
            // Ocultar dropdown al quitar el mouse
            item.addEventListener('mouseleave', function() {
                dropdown.style.display = 'none';
            });
        }
    });
    
    // Funcionalidad para los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navegando a:', this.textContent);
        });
    });
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Navegando a:', this.textContent);
        });
    });

    // Hero Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slider-btn-prev');
    const nextBtn = document.querySelector('.slider-btn-next');
    const ctaButton = document.querySelector('.cta-button');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Función para mostrar un slide específico
    function showSlide(index) {
        // Remover clase active de todos los slides e indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Agregar clase active al slide e indicator actual
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
        
        // Controlar el fondo del header para banner 3
        const header = document.querySelector('.header');
        if (index === 2) { // Banner 3 (índice 2)
            header.classList.add('banner3-active');
        } else {
            header.classList.remove('banner3-active');
        }
        
        // Pausar todos los videos de forma segura
        const videos = document.querySelectorAll('.slide-video');
        videos.forEach(video => {
            if (video) {
                video.pause();
                video.currentTime = 0; // Reiniciar video
            }
        });
        
        // Reproducir video del slide actual de forma segura
        const currentVideo = slides[index].querySelector('.slide-video');
        if (currentVideo) {
            // Esperar un poco antes de reproducir para evitar conflictos
            setTimeout(() => {
                currentVideo.play().catch(error => {
                    console.log('Video play error:', error);
                });
            }, 100);
        }
    }
    
    // Función para ir al siguiente slide (automático)
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
        // No reinicia el timer aquí, se mantiene el ciclo de 30 segundos
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Función para iniciar el auto-slide
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 30000); // Cambiar cada 30 segundos
    }
    
    // Función para detener el auto-slide
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Event listeners para los botones de navegación
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide(); // Reinicia timer solo cuando se usa control manual
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide(); // Reinicia timer solo cuando se usa control manual
    });
    
    // Event listeners para los indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide(); // Reinicia timer solo cuando se usa control manual
        });
    });
    
    // Event listener para el botón CTA
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('CTA Button clicked: Albus 2025 - International Conference');
            // Aquí puedes agregar la lógica para el botón CTA
        });
    }
    
    // Pausar auto-slide cuando el mouse está sobre el slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoSlide);
        heroSlider.addEventListener('mouseleave', () => {
            // Solo reanuda si no hay interacción manual reciente
            startAutoSlide();
        });
    }
    
    // Iniciar el auto-slide
    startAutoSlide();
    
    // Mostrar el primer slide
    showSlide(0);
});
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.uni-slide');
    const prev = document.querySelector('.uni-arrow--prev');
    const next = document.querySelector('.uni-arrow--next');
    const thumbs = document.querySelectorAll('.uni-thumb');
  
    let index = 0;
  
    function go(i){
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(${-100 * index}%)`;
        document.querySelectorAll('.uni-thumb').forEach((t) => {
          t.classList.toggle('is-active', Number(t.dataset.index) === index);
        });
      }
      
  
    prev.addEventListener('click', () => go(index - 1));
    next.addEventListener('click', () => go(index + 1));
    thumbs.forEach(t => t.addEventListener('click', () => go(Number(t.dataset.index))));
  
    go(0);
  });
  