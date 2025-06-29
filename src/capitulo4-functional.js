// ===== NAVEGACIÓN SIMPLE Y FUNCIONAL - CAPÍTULO 4 =====

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
    console.log('🚀 Iniciando presentación...');
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

    console.log('📊 Slides encontrados:', slides.length);
    console.log('⬅️ Botón anterior:', prevBtn ? 'OK' : 'ERROR');
    console.log('➡️ Botón siguiente:', nextBtn ? 'OK' : 'ERROR');

    // Verificar que tenemos los elementos necesarios
    if (!slides.length) {
        console.error('❌ No se encontraron slides');
        return;
    }

    if (!prevBtn || !nextBtn) {
        console.error('❌ No se encontraron botones de navegación');
        return;
    }

    // Configurar eventos
    setupEventListeners();
    
    // Mostrar primer slide
    showSlide(1);
    
    // Actualizar contador total
    if (totalSlidesSpan) {
        totalSlidesSpan.textContent = totalSlides;
    }
    
    console.log('✅ Presentación inicializada correctamente');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔙 Botón anterior clickeado');
            previousSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔜 Botón siguiente clickeado');
            nextSlide();
        });
    }

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        console.log('⌨️ Tecla presionada:', e.key);
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

    console.log('✅ Event listeners configurados');
}

// ===== NAVEGACIÓN =====
function showSlide(slideNumber) {
    console.log('📖 Mostrando slide:', slideNumber);
    
    if (slideNumber < 1 || slideNumber > totalSlides) {
        console.log('❌ Número de slide inválido:', slideNumber);
        return;
    }

    // Ocultar todos los slides
    slides.forEach(function(slide, index) {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.visibility = 'hidden';
        slide.style.pointerEvents = 'none';
    });

    // Mostrar slide actual
    const currentSlideElement = slides[slideNumber - 1];
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
        currentSlideElement.style.opacity = '1';
        currentSlideElement.style.visibility = 'visible';
        currentSlideElement.style.pointerEvents = 'auto';
    }

    // Actualizar variable global
    currentSlide = slideNumber;

    // Actualizar UI
    updateProgress();
    updateNavigationButtons();
    updateSlideCounter();

    console.log('✅ Slide', slideNumber, 'mostrado correctamente');
}

function nextSlide() {
    console.log('➡️ Siguiente slide - actual:', currentSlide, 'total:', totalSlides);
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    } else {
        console.log('🔚 Ya estás en el último slide');
    }
}

function previousSlide() {
    console.log('⬅️ Slide anterior - actual:', currentSlide);
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    } else {
        console.log('🔜 Ya estás en el primer slide');
    }
}

// ===== ACTUALIZACIÓN DE UI =====
function updateProgress() {
    if (progressFill) {
        const progress = (currentSlide / totalSlides) * 100;
        progressFill.style.height = progress + '%';
        console.log('📊 Progreso actualizado:', progress + '%');
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
    
    console.log('🔘 Botones actualizados');
}

function updateSlideCounter() {
    if (currentSlideSpan) {
        currentSlideSpan.textContent = currentSlide;
        console.log('🔢 Contador actualizado:', currentSlide);
    }
}

// ===== FUNCIONES DE UTILIDAD =====
function goToSlide(slideNumber) {
    console.log('🎯 Ir al slide:', slideNumber);
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        showSlide(slideNumber);
    }
}

// ===== NAVEGACIÓN TÁCTIL =====
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
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

// Hacer funciones disponibles globalmente
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.goToSlide = goToSlide;

console.log('📱 Script de navegación cargado completamente');
