// ===== NAVEGACIÓN SIMPLE PARA CAPÍTULO 4 =====

// Variables globales
let currentSlide = 1;
const totalSlides = 11;

// Elementos del DOM
let slides = [];
let prevBtn = null;
let nextBtn = null;
let currentSlideSpan = null;
let progressFill = null;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando navegación...');
    
    // Obtener elementos del DOM
    slides = document.querySelectorAll('.slide');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    currentSlideSpan = document.getElementById('currentSlide');
    progressFill = document.querySelector('.progress-fill');
    
    console.log(`📊 Encontrados ${slides.length} slides`);
    
    // Configurar navegación
    setupNavigation();
    
    // Mostrar slide inicial
    showSlide(1);
    
    console.log('✅ Navegación lista!');
});

// ===== CONFIGURAR NAVEGACIÓN =====
function setupNavigation() {
    // Botón anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentSlide > 1) {
                showSlide(currentSlide - 1);
            }
        });
    }
    
    // Botón siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentSlide < totalSlides) {
                showSlide(currentSlide + 1);
            }
        });
    }
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                e.preventDefault();
                if (currentSlide < totalSlides) {
                    showSlide(currentSlide + 1);
                }
                break;
            case 'ArrowLeft':
                e.preventDefault();
                if (currentSlide > 1) {
                    showSlide(currentSlide - 1);
                }
                break;
        }
    });
}

// ===== MOSTRAR SLIDE =====
function showSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    
    console.log(`📄 Mostrando slide ${slideNumber}`);
    
    // Ocultar todos los slides
    slides.forEach(slide => {
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
    
    // Actualizar variables
    currentSlide = slideNumber;
    
    // Actualizar UI
    updateUI();
}

// ===== ACTUALIZAR INTERFAZ =====
function updateUI() {
    // Actualizar contador
    if (currentSlideSpan) {
        currentSlideSpan.textContent = currentSlide;
    }
    
    // Actualizar barra de progreso
    if (progressFill) {
        const progress = (currentSlide / totalSlides) * 100;
        progressFill.style.height = progress + '%';
    }
    
    // Actualizar botones
    if (prevBtn) {
        prevBtn.disabled = (currentSlide === 1);
        prevBtn.style.opacity = (currentSlide === 1) ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = (currentSlide === totalSlides);
        nextBtn.style.opacity = (currentSlide === totalSlides) ? '0.5' : '1';
    }
}

// ===== FUNCIONES DE DEBUG =====
window.goToSlide = function(n) {
    showSlide(n);
};

window.getCurrentSlide = function() {
    return currentSlide;
};

console.log('🎯 Usa goToSlide(n) para navegar directamente');
