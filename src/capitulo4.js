// ===== CAPÍTULO 4: TRANSPORTE DE SUSTANCIAS - INTERACTIVIDAD =====

// Variables globales para el control de slides
let currentSlide = 1;
const totalSlides = 10;

// Elementos del DOM
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideSpan = document.getElementById('currentSlide');
const totalSlidesSpan = document.getElementById('totalSlides');
const progressFill = document.querySelector('.progress-fill');

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializePresentation();
    setupEventListeners();
    updateSlideDisplay();
    initializeAnimations();
});

// ===== CONFIGURACIÓN INICIAL =====
function initializePresentation() {
    // Actualizar número total de slides
    totalSlidesSpan.textContent = totalSlides;
    
    // Mostrar primer slide
    showSlide(1);
    
    // Configurar controles de teclado
    document.addEventListener('keydown', handleKeyPress);
    
    // Prevenir scroll horizontal en el contenedor
    const slidesContainer = document.querySelector('.slides-container');
    if (slidesContainer) {
        slidesContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
        });
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Botones de navegación
    if (prevBtn) prevBtn.addEventListener('click', previousSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            previousSlide();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextSlide();
        } else if (e.key === 'Home') {
            goToSlide(1);
        } else if (e.key === 'End') {
            goToSlide(totalSlides);
        }
    });
    
    // Touch/swipe para dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                previousSlide();
            } else {
                nextSlide();
            }
        }
    }
}

// ===== NAVEGACIÓN DE SLIDES =====
function showSlide(slideNumber) {
    // Validar número de slide
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    
    // Ocultar todos los slides
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(50px)';
    });
    
    // Mostrar slide actual con animación
    const targetSlide = slides[slideNumber - 1];
    if (targetSlide) {
        setTimeout(() => {
            targetSlide.classList.add('active');
            targetSlide.style.opacity = '1';
            targetSlide.style.transform = 'translateX(0)';
        }, 100);
    }
    
    currentSlide = slideNumber;
    updateSlideDisplay();
    updateProgress();
    
    // Activar animaciones específicas del slide
    activateSlideAnimations(slideNumber);
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
    showSlide(slideNumber);
}

// ===== ACTUALIZACIÓN DE UI =====
function updateSlideDisplay() {
    if (currentSlideSpan) {
        currentSlideSpan.textContent = currentSlide;
    }
    
    // Actualizar estado de botones
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
        prevBtn.style.opacity = currentSlide === 1 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
        nextBtn.style.opacity = currentSlide === totalSlides ? '0.5' : '1';
    }
}

function updateProgress() {
    if (progressFill) {
        const progress = (currentSlide / totalSlides) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

// ===== MANEJO DE TECLADO =====
function handleKeyPress(e) {
    // Prevenir acciones por defecto para las teclas de navegación
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Home', 'End'].includes(e.code)) {
        e.preventDefault();
    }
    
    switch(e.code) {
        case 'ArrowLeft':
        case 'ArrowUp':
            previousSlide();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case 'Space':
            nextSlide();
            break;
        case 'Home':
            goToSlide(1);
            break;
        case 'End':
            goToSlide(totalSlides);
            break;
        case 'KeyR':
            // Reset a primer slide
            goToSlide(1);
            break;
    }
}

// ===== ANIMACIONES INICIALES =====
function initializeAnimations() {
    // Configurar transiciones CSS
    slides.forEach(slide => {
        slide.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Animar elementos de la portada
    animateIntroElements();
}

function animateIntroElements() {
    const highlights = document.querySelectorAll('.highlight-item');
    const membraneProteins = document.querySelectorAll('.channel-protein, .transport-protein, .pump-protein');
    
    // Animar highlights con delay
    highlights.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
    
    // Animar proteínas de membrana
    membraneProteins.forEach((protein, index) => {
        protein.style.animationDelay = `${index * 0.5}s`;
    });
}

// ===== ANIMACIONES ESPECÍFICAS POR SLIDE =====
function activateSlideAnimations(slideNumber) {
    switch(slideNumber) {
        case 1:
            animateSlide1();
            break;
        case 2:
            animateSlide2();
            break;
        case 3:
            animateSlide3();
            break;
        case 4:
            animateSlide4();
            break;
        case 5:
            animateSlide5();
            break;
        case 6:
            animateSlide6();
            break;
        case 7:
            animateSlide7();
            break;
        case 8:
            animateSlide8();
            break;
        case 9:
            animateSlide9();
            break;
        case 10:
            animateSlide10();
            break;
    }
}

// Slide 1: Portada - ya inicializada
function animateSlide1() {
    const membraneVisual = document.querySelector('.membrane-visual');
    if (membraneVisual) {
        membraneVisual.style.opacity = '0';
        membraneVisual.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            membraneVisual.style.transition = 'all 0.8s ease';
            membraneVisual.style.opacity = '1';
            membraneVisual.style.transform = 'scale(1)';
        }, 500);
    }
}

// Slide 2: Membrana Celular
function animateSlide2() {
    const molecules = document.querySelectorAll('.molecule');
    const membraneStructure = document.querySelector('.membrane-structure');
    
    if (membraneStructure) {
        membraneStructure.style.opacity = '0';
        membraneStructure.style.transform = 'scaleY(0)';
        
        setTimeout(() => {
            membraneStructure.style.transition = 'all 0.8s ease';
            membraneStructure.style.opacity = '1';
            membraneStructure.style.transform = 'scaleY(1)';
        }, 300);
    }
    
    molecules.forEach((molecule, index) => {
        molecule.style.opacity = '0';
        molecule.style.transform = 'scale(0)';
        
        setTimeout(() => {
            molecule.style.transition = 'all 0.4s ease';
            molecule.style.opacity = '1';
            molecule.style.transform = 'scale(1)';
        }, 800 + (index * 100));
    });
}

// Slide 3: Tipos de Transporte
function animateSlide3() {
    const transportTypes = document.querySelectorAll('.transport-type');
    const gradientVisual = document.querySelector('.gradient-visual');
    
    transportTypes.forEach((type, index) => {
        type.style.opacity = '0';
        type.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            type.style.transition = 'all 0.6s ease';
            type.style.opacity = '1';
            type.style.transform = 'translateX(0)';
        }, index * 300);
    });
    
    if (gradientVisual) {
        setTimeout(() => {
            gradientVisual.style.transition = 'all 0.8s ease';
            gradientVisual.style.opacity = '1';
            gradientVisual.style.transform = 'scale(1)';
        }, 800);
    }
}

// Slide 4: Difusión Simple
function animateSlide4() {
    const particles = document.querySelectorAll('.particle');
    const factorCards = document.querySelectorAll('.factor-card');
    
    // Animar partículas
    particles.forEach((particle, index) => {
        particle.style.opacity = '0';
        particle.style.transform = 'scale(0)';
        
        setTimeout(() => {
            particle.style.transition = 'all 0.5s ease';
            particle.style.opacity = '1';
            particle.style.transform = 'scale(1)';
            
            // Iniciar animación de difusión
            particle.style.animation = `diffuse 2s ease-in-out infinite ${index * 0.3}s`;
        }, 500 + (index * 200));
    });
    
    // Animar factor cards
    factorCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
}

// Slide 5: Difusión Facilitada
function animateSlide5() {
    const channels = document.querySelectorAll('.channel');
    const waterMolecules = document.querySelectorAll('.water-molecule');
    
    channels.forEach((channel, index) => {
        channel.style.opacity = '0';
        channel.style.transform = 'scaleY(0)';
        
        setTimeout(() => {
            channel.style.transition = 'all 0.6s ease';
            channel.style.opacity = '1';
            channel.style.transform = 'scaleY(1)';
        }, index * 400);
    });
    
    // Animar moléculas de agua pasando por acuaporinas
    setTimeout(() => {
        waterMolecules.forEach((molecule, index) => {
            molecule.style.animation = `flow 1.5s ease-in-out infinite ${index * 0.2}s`;
        });
    }, 1000);
}

// Slide 6: Canales Proteicos
function animateSlide6() {
    const channelPores = document.querySelectorAll('.channel-pore');
    const ions = document.querySelectorAll('.sodium-ion, .potassium-ion');
    
    channelPores.forEach((pore, index) => {
        pore.style.opacity = '0';
        pore.style.transform = 'scale(0)';
        
        setTimeout(() => {
            pore.style.transition = 'all 0.6s ease';
            pore.style.opacity = '1';
            pore.style.transform = 'scale(1)';
        }, index * 400);
    });
    
    // Animar iones
    setTimeout(() => {
        ions.forEach((ion, index) => {
            ion.style.animation = `pulse 2s ease-in-out infinite ${index * 0.5}s`;
        });
    }, 800);
}

// Slide 7: Osmosis
function animateSlide7() {
    const containers = document.querySelectorAll('.container');
    const waterFlow = document.querySelector('.water-flow');
    
    containers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.6s ease';
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, index * 300);
    });
    
    if (waterFlow) {
        setTimeout(() => {
            waterFlow.style.animation = 'flow 2s ease-in-out infinite';
        }, 800);
    }
}

// Slide 8: Transporte Activo Primario
function animateSlide8() {
    const pumps = document.querySelectorAll('.pump');
    const pumpProteins = document.querySelectorAll('.pump-protein');
    
    pumps.forEach((pump, index) => {
        pump.style.opacity = '0';
        pump.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            pump.style.transition = 'all 0.6s ease';
            pump.style.opacity = '1';
            pump.style.transform = 'translateY(0)';
        }, index * 250);
    });
    
    // Animar bombas
    setTimeout(() => {
        pumpProteins.forEach((protein, index) => {
            protein.style.animation = `pump 2s ease-in-out infinite ${index * 0.3}s`;
        });
    }, 1000);
}

// Slide 9: Transporte Activo Secundario
function animateSlide9() {
    const membraneProteins = document.querySelectorAll('.membrane-protein');
    const molecules = document.querySelectorAll('.primary-molecule, .secondary-molecule');
    
    membraneProteins.forEach((protein, index) => {
        protein.style.opacity = '0';
        protein.style.transform = 'rotateY(90deg)';
        
        setTimeout(() => {
            protein.style.transition = 'all 0.8s ease';
            protein.style.opacity = '1';
            protein.style.transform = 'rotateY(0deg)';
        }, index * 400);
    });
    
    // Animar moléculas
    setTimeout(() => {
        molecules.forEach((molecule, index) => {
            molecule.style.animation = `pulse 1.8s ease-in-out infinite ${index * 0.4}s`;
        });
    }, 1200);
}

// Slide 10: Resumen
function animateSlide10() {
    const summaryItems = document.querySelectorAll('.point, .concept-item, .clinical-item');
    
    summaryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// ===== EFECTOS INTERACTIVOS =====
function addInteractiveEffects() {
    // Efecto hover para elementos de transporte
    const transportElements = document.querySelectorAll('.factor-card, .concept-card, .example-card');
    
    transportElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-5px) scale(1.02)';
            element.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0) scale(1)';
            element.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });
}

// ===== UTILIDADES =====
function getSlideTitle(slideNumber) {
    const titles = {
        1: "Portada del Capítulo",
        2: "Membrana Celular",
        3: "Tipos de Transporte",
        4: "Difusión Simple",
        5: "Difusión Facilitada",
        6: "Canales Proteicos",
        7: "Osmosis",
        8: "Transporte Activo Primario",
        9: "Transporte Activo Secundario",
        10: "Resumen del Capítulo"
    };
    return titles[slideNumber] || `Slide ${slideNumber}`;
}

// ===== ACCESIBILIDAD =====
function setupAccessibility() {
    // Añadir roles ARIA
    const slidesContainer = document.querySelector('.slides-container');
    if (slidesContainer) {
        slidesContainer.setAttribute('role', 'region');
        slidesContainer.setAttribute('aria-label', 'Presentación del Capítulo 4');
    }
    
    // Anunciar cambios de slide para lectores de pantalla
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);
    
    // Función para anunciar cambios
    window.announceSlideChange = function(slideNumber) {
        announcer.textContent = `Slide ${slideNumber} de ${totalSlides}: ${getSlideTitle(slideNumber)}`;
    };
}

// ===== INICIALIZACIÓN FINAL =====
document.addEventListener('DOMContentLoaded', () => {
    setupAccessibility();
    addInteractiveEffects();
    
    // Anunciar slide inicial
    setTimeout(() => {
        if (window.announceSlideChange) {
            window.announceSlideChange(currentSlide);
        }
    }, 1000);
});

// ===== DEBUGGING (solo en desarrollo) =====
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugTransport = {
        currentSlide: () => currentSlide,
        totalSlides: () => totalSlides,
        goToSlide: goToSlide,
        nextSlide: nextSlide,
        previousSlide: previousSlide
    };
    
    console.log('🚛 Capítulo 4: Transporte de Sustancias iniciado');
    console.log('Usa window.debugTransport para debugging');
}
