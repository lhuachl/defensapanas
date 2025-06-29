// ===== CAPÍTULO 4: TRANSPORTE DE SUSTANCIAS - SISTEMA AVANZADO CON GSAP =====

import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import MembraneComponents from './membrane-components.js';

// Registrar plugins de GSAP
gsap.registerPlugin(TextPlugin);

// ===== CONFIGURACIÓN GLOBAL =====
class PresentationManager {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 10;
    this.isTransitioning = false;
    this.autoplayEnabled = false;
    this.autoplayInterval = null;
    
    // Elementos del DOM
    this.slides = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.currentSlideSpan = null;
    this.totalSlidesSpan = null;
    this.progressFill = null;
    
    // Timeline principal
    this.masterTimeline = gsap.timeline();
    
    // Componentes interactivos
    this.membraneComponents = null;
    
    this.init();
  }

  // ===== INICIALIZACIÓN =====
  init() {
    this.cacheDOMElements();
    this.setupEventListeners();
    this.createLoadingAnimation();
    this.initializeSlides();
    this.startPresentation();
  }

  cacheDOMElements() {
    this.slides = document.querySelectorAll('.slide');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.currentSlideSpan = document.getElementById('currentSlide');
    this.totalSlidesSpan = document.getElementById('totalSlides');
    this.progressFill = document.querySelector('.progress-fill');
  }

  // ===== ANIMACIÓN DE CARGA =====
  createLoadingAnimation() {
    // Crear overlay de carga
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-animation';
    loadingOverlay.innerHTML = `
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <h2 class="loading-text">Preparando presentación...</h2>
      </div>
    `;
    document.body.appendChild(loadingOverlay);

    // Animación de carga con GSAP
    const tl = gsap.timeline();
    
    tl.from('.loading-spinner', {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    .from('.loading-text', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')
    .to('.loading-animation', {
      opacity: 0,
      duration: 0.8,
      delay: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        loadingOverlay.remove();
      }
    });
  }

  // ===== CONFIGURACIÓN DE SLIDES =====
  initializeSlides() {
    if (!this.slides.length) return;

    // Configurar estado inicial de todos los slides
    gsap.set(this.slides, {
      opacity: 0,
      visibility: 'hidden',
      scale: 0.8,
      rotationY: 90,
      transformOrigin: 'center center'
    });

    // Actualizar contador
    if (this.totalSlidesSpan) {
      this.totalSlidesSpan.textContent = this.totalSlides;
    }
  }

  startPresentation() {
    setTimeout(() => {
      this.showSlide(1, 'init');
      this.animateIntroElements();
      this.initializeInteractiveComponents();
    }, 2000);
  }

  // ===== NAVEGACIÓN DE SLIDES =====
  showSlide(slideNumber, direction = 'next') {
    if (this.isTransitioning) return;
    if (slideNumber < 1 || slideNumber > this.totalSlides) return;

    this.isTransitioning = true;
    const previousSlide = this.currentSlide;
    this.currentSlide = slideNumber;

    // Timeline para la transición
    const tl = gsap.timeline({
      onComplete: () => {
        this.isTransitioning = false;
        this.updateSlideSpecificAnimations();
      }
    });

    // Ocultar slide anterior
    if (previousSlide !== slideNumber) {
      const prevSlideEl = this.slides[previousSlide - 1];
      if (prevSlideEl) {
        tl.to(prevSlideEl, {
          opacity: 0,
          scale: 0.8,
          rotationY: direction === 'next' ? -90 : 90,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(prevSlideEl, { visibility: 'hidden' });
          }
        });
      }
    }

    // Mostrar nuevo slide
    const currentSlideEl = this.slides[slideNumber - 1];
    if (currentSlideEl) {
      gsap.set(currentSlideEl, { 
        visibility: 'visible',
        rotationY: direction === 'next' ? 90 : -90
      });

      tl.to(currentSlideEl, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.3');

      // Animar elementos internos del slide
      this.animateSlideContent(currentSlideEl, direction);
    }

    // Actualizar UI
    this.updateProgress();
    this.updateNavigationButtons();
    this.updateSlideCounter();
  }

  // ===== ANIMACIONES ESPECÍFICAS POR SLIDE =====
  animateSlideContent(slideEl, direction) {
    const elements = slideEl.querySelectorAll('.slide-title, .slide-content > *, .highlight-item, .factor-card, .transport-card');
    
    gsap.fromTo(elements, {
      y: direction === 'next' ? 50 : -50,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.3
    });
  }

  updateSlideSpecificAnimations() {
    const currentSlideEl = this.slides[this.currentSlide - 1];
    if (!currentSlideEl) return;

    switch (this.currentSlide) {
      case 1:
        this.animateSlide1();
        break;
      case 2:
        this.animateSlide2();
        break;
      case 3:
        this.animateSlide3();
        break;
      case 4:
        this.animateSlide4();
        break;
      // Agregar más casos según necesites
    }
  }

  // ===== ANIMACIONES ESPECÍFICAS =====
  animateSlide1() {
    // Animación de la membrana 3D
    const membrane = document.querySelector('.lipid-bilayer');
    if (membrane) {
      gsap.to(membrane, {
        rotationY: 360,
        duration: 8,
        ease: 'none',
        repeat: -1
      });
    }

    // Animación de los iconos de highlights
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach((item, index) => {
      gsap.to(item, {
        y: -10,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      });
    });
  }

  animateSlide2() {
    // Animación de moléculas
    const molecules = document.querySelectorAll('.molecule');
    molecules.forEach((molecule, index) => {
      gsap.to(molecule, {
        x: gsap.utils.random(-20, 20),
        y: gsap.utils.random(-20, 20),
        duration: gsap.utils.random(2, 4),
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: index * 0.5
      });
    });
  }

  animateSlide3() {
    // Animación de flechas de transporte
    const arrows = document.querySelectorAll('.passive-arrow, .active-arrow');
    arrows.forEach(arrow => {
      gsap.to(arrow, {
        x: 20,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      });
    });
  }

  animateSlide4() {
    // Animación de partículas difundiéndose
    const particles = document.querySelectorAll('.diffusing-particles .particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-30, 30),
        rotation: gsap.utils.random(-180, 180),
        duration: gsap.utils.random(3, 6),
        ease: 'none',
        repeat: -1,
        delay: index * 0.8
      });
    });
  }

  // ===== ANIMACIONES DE INTRODUCCIÓN =====
  animateIntroElements() {
    // Animar header
    gsap.from('.chapter-header', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });

    // Animar controles de navegación
    gsap.from('.navigation-controls', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.3
    });

    // Animar indicadores de progreso
    gsap.from('.progress-indicators', {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5
    });
  }

  // ===== NAVEGACIÓN =====
  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.showSlide(this.currentSlide + 1, 'next');
    }
  }

  previousSlide() {
    if (this.currentSlide > 1) {
      this.showSlide(this.currentSlide - 1, 'prev');
    }
  }

  goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
      const direction = slideNumber > this.currentSlide ? 'next' : 'prev';
      this.showSlide(slideNumber, direction);
    }
  }

  // ===== ACTUALIZACIÓN DE UI =====
  updateProgress() {
    const progress = (this.currentSlide / this.totalSlides) * 100;
    gsap.to(this.progressFill, {
      height: `${progress}%`,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  updateNavigationButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentSlide === 1;
      gsap.to(this.prevBtn, {
        opacity: this.currentSlide === 1 ? 0.5 : 1,
        scale: this.currentSlide === 1 ? 0.9 : 1,
        duration: 0.3
      });
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentSlide === this.totalSlides;
      gsap.to(this.nextBtn, {
        opacity: this.currentSlide === this.totalSlides ? 0.5 : 1,
        scale: this.currentSlide === this.totalSlides ? 0.9 : 1,
        duration: 0.3
      });
    }
  }

  updateSlideCounter() {
    if (this.currentSlideSpan) {
      // Animación del contador
      gsap.to(this.currentSlideSpan, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          this.currentSlideSpan.textContent = this.currentSlide;
        }
      });
    }
  }

  // ===== COMPONENTES INTERACTIVOS =====
  initializeInteractiveComponents() {
    // Inicializar componentes de membrana
    this.membraneComponents = new MembraneComponents();
    
    // Configurar interacciones adicionales
    this.setupAdvancedInteractions();
  }

  setupAdvancedInteractions() {
    // Efectos de hover para elementos interactivos
    const interactiveElements = document.querySelectorAll('.highlight-item, .transport-card, .factor-card');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    // Efectos de paralaje al mover el mouse
    document.addEventListener('mousemove', (e) => {
      this.handleParallaxEffect(e);
    });
  }

  handleParallaxEffect(e) {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    // Aplicar efecto a elementos de fondo
    const parallaxElements = document.querySelectorAll('.membrane-visual, .transport-visual');
    
    parallaxElements.forEach(element => {
      gsap.to(element, {
        rotationY: xPos * 5,
        rotationX: -yPos * 5,
        duration: 1,
        ease: 'power2.out'
      });
    });
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Botones de navegación
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          this.previousSlide();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'Home':
          e.preventDefault();
          this.goToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          this.goToSlide(this.totalSlides);
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          this.toggleAutoplay();
          break;
      }
    });

    // Navegación con gestos touch
    this.setupTouchNavigation();

    // Redimensionamiento de ventana
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  // ===== NAVEGACIÓN TOUCH =====
  setupTouchNavigation() {
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
            this.nextSlide();
          } else {
            this.previousSlide();
          }
        }
      }

      touchStartX = 0;
      touchStartY = 0;
    });
  }

  // ===== AUTOPLAY =====
  toggleAutoplay() {
    this.autoplayEnabled = !this.autoplayEnabled;
    
    if (this.autoplayEnabled) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (this.currentSlide < this.totalSlides) {
        this.nextSlide();
      } else {
        this.goToSlide(1);
      }
    }, 10000); // 10 segundos por slide
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  // ===== RESPONSIVO =====
  handleResize() {
    // Reajustar animaciones si es necesario
    const isMobile = window.innerWidth <= 768;
    
    gsap.set('.slide-content', {
      padding: isMobile ? '1rem' : '2rem'
    });
  }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
  new PresentationManager();
});

// ===== EXPORTAR PARA USO GLOBAL =====
window.PresentationManager = PresentationManager;
