// ===== NAVEGACIÓN SIMPLE Y FUNCIONAL =====

// Variables globales
let currentSlide = 1;
const totalSlides = 11;

// Elementos del DOM
let slides = [];
let prevBtn = null;
let nextBtn = null;
let currentSlideSpan = null;
let totalSlidesSpan = null;
let progressFill = null;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando presentación...');
    initializePresentation();
});

function initializePresentation() {
    // Obtener elementos del DOM
    slides = document.querySelectorAll('.slide');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    currentSlideSpan = document.getElementById('currentSlide');
    totalSlidesSpan = document.getElementById('totalSlides');
    progressFill = document.querySelector('.progress-fill');

    console.log('Slides encontrados:', slides.length);
    console.log('Botón anterior:', prevBtn);
    console.log('Botón siguiente:', nextBtn);

    // Configurar eventos
    setupEventListeners();
    
    // Mostrar primer slide
    showSlide(1);
    
    // Actualizar contador total
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }
    
    console.log('Presentación inicializada correctamente');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('Botón anterior clickeado');
            previousSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('Botón siguiente clickeado');
            nextSlide();
        });
    }

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
        }
    });

    console.log('Event listeners configurados');
}

// ===== NAVEGACIÓN =====
function showSlide(slideNumber) {
    console.log('Mostrando slide:', slideNumber);
    
    if (slideNumber < 1 || slideNumber > totalSlides) {
        console.log('Número de slide inválido:', slideNumber);
        return;
    }

    // Ocultar todos los slides
    slides.forEach(function(slide, index) {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
    });

    // Mostrar slide actual
    const currentSlideElement = slides[slideNumber - 1];
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
        currentSlideElement.style.opacity = '1';
        currentSlideElement.style.visibility = 'visible';
    }

    // Actualizar variable global
    currentSlide = slideNumber;

    // Actualizar UI
    updateProgress();
    updateNavigationButtons();
    updateSlideCounter();

    console.log('Slide', slideNumber, 'mostrado correctamente');
}

function nextSlide() {
    console.log('Siguiente slide - actual:', currentSlide, 'total:', totalSlides);
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

function previousSlide() {
    console.log('Slide anterior - actual:', currentSlide);
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

// ===== ACTUALIZACIÓN DE UI =====
function updateProgress() {
    if (progressFill) {
        const progress = (currentSlide / totalSlides) * 100;
        progressFill.style.height = progress + '%';
    }
}

function updateNavigationButtons() {
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
        prevBtn.style.opacity = currentSlide === 1 ? '0.5' : '1';
    }

    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
        nextBtn.style.opacity = currentSlide === totalSlides ? '0.5' : '1';
    }
}

function updateSlideCounter() {
    if (currentSlideSpan) {
        currentSlideSpan.textContent = currentSlide;
    }
}

// ===== FUNCIONES DE UTILIDAD =====
function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        showSlide(slideNumber);
    }
}

// Hacer funciones disponibles globalmente
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.goToSlide = goToSlide;

console.log('Script de navegación cargado');
let isTransitioning = false;

// Elementos del DOM
let slides = null;
let prevBtn = null;
let nextBtn = null;
let currentSlideSpan = null;
let totalSlidesSpan = null;
let progressFill = null;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando presentación...');
    initializePresentation();
});

function initializePresentation() {
    // Cache elementos del DOM
    slides = document.querySelectorAll('.slide');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    currentSlideSpan = document.getElementById('currentSlide');
    totalSlidesSpan = document.getElementById('totalSlides');
    progressFill = document.querySelector('.progress-fill');

    console.log(`Encontrados ${slides.length} slides`);

    // Verificar que los elementos existen
    if (!slides.length) {
        console.error('No se encontraron slides');
        return;
    }

    // Configurar estado inicial
    setupInitialState();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Mostrar primer slide
    showSlide(1);
    
    console.log('Presentación inicializada correctamente');
}

function setupInitialState() {
    // Actualizar contador total
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }

    // Ocultar todos los slides excepto el primero
    slides.forEach((slide, index) => {
        slide.style.opacity = index === 0 ? '1' : '0';
        slide.style.visibility = index === 0 ? 'visible' : 'hidden';
        slide.style.transform = 'translateX(0)';
        
        if (index === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

function setupEventListeners() {
    // Botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Botón anterior clickeado');
            previousSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Botón siguiente clickeado');
            nextSlide();
        });
    }

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
        }
    });

    // Navegación táctil básica
    setupTouchNavigation();
}

function setupTouchNavigation() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        if (!touchStartX || !touchStartY) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const deltaX = touchStartX - touchEndX;
        const deltaY = touchStartY - touchEndY;

        const minSwipeDistance = 50;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }
            }
        }

        touchStartX = 0;
        touchStartY = 0;
    });
}

// ===== FUNCIONES DE NAVEGACIÓN =====
function showSlide(slideNumber) {
    if (isTransitioning || slideNumber < 1 || slideNumber > totalSlides) {
        return;
    }

    console.log(`Mostrando slide ${slideNumber}`);
    
    isTransitioning = true;
    const previousSlideIndex = currentSlide - 1;
    const newSlideIndex = slideNumber - 1;

    // Ocultar slide anterior
    if (previousSlideIndex !== newSlideIndex && slides[previousSlideIndex]) {
        slides[previousSlideIndex].classList.remove('active');
        slides[previousSlideIndex].style.opacity = '0';
        slides[previousSlideIndex].style.visibility = 'hidden';
    }

    // Mostrar nuevo slide
    if (slides[newSlideIndex]) {
        slides[newSlideIndex].style.visibility = 'visible';
        slides[newSlideIndex].style.opacity = '1';
        slides[newSlideIndex].classList.add('active');
    }

    // Actualizar estado
    currentSlide = slideNumber;
    
    // Actualizar UI
    updateProgress();
    updateNavigationButtons();
    updateSlideCounter();

    // Liberar bloqueo después de un breve delay
    setTimeout(() => {
        isTransitioning = false;
    }, 300);
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        showSlide(slideNumber);
    }
}

// ===== ACTUALIZACIÓN DE UI =====
function updateProgress() {
    if (progressFill) {
        const progress = (currentSlide / totalSlides) * 100;
        progressFill.style.height = `${progress}%`;
    }
}

function updateNavigationButtons() {
    if (prevBtn) {
        prevBtn.disabled = (currentSlide === 1);
        prevBtn.style.opacity = (currentSlide === 1) ? '0.5' : '1';
    }

    if (nextBtn) {
        nextBtn.disabled = (currentSlide === totalSlides);
        nextBtn.style.opacity = (currentSlide === totalSlides) ? '0.5' : '1';
    }
}

function updateSlideCounter() {
    if (currentSlideSpan) {
        currentSlideSpan.textContent = currentSlide;
    }
}

// ===== ANIMACIONES SIMPLES (OPCIONALES) =====
function addSimpleAnimations() {
    // Agregar hover effects a elementos interactivos
    const interactiveElements = document.querySelectorAll('.highlight-item, .transport-card, .factor-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-5px)';
            element.style.transition = 'transform 0.3s ease';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
        });
    });
}

// ===== INICIALIZACIÓN DE ANIMACIONES OPCIONALES =====
setTimeout(() => {
    addSimpleAnimations();
}, 1000);

// ===== EXPORTAR FUNCIONES PARA DEBUG =====
window.debugSlides = {
    currentSlide: () => currentSlide,
    totalSlides: () => totalSlides,
    goToSlide: goToSlide,
    nextSlide: nextSlide,
    previousSlide: previousSlide
};

console.log('Script de capítulo 4 cargado. Usa window.debugSlides para debug.');
