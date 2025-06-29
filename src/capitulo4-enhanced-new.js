// ===== CAPÍTULO 4: SISTEMA MEJORADO CON ANIMACIONES GSAP =====

import { gsap } from 'gsap';

class AdvancedPresentationManager {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 11;
    this.isTransitioning = false;
    this.autoplayEnabled = false;
    this.autoplayTimer = null;
    
    // Sistema de progreso y logros
    this.slideVisited = new Set();
    this.achievements = {
      explorer: false,
      speedster: false,
      scholar: false
    };
    this.startTime = Date.now();
    
    // Elementos del DOM
    this.slides = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.currentSlideSpan = null;
    this.totalSlidesSpan = null;
    this.progressFill = null;
    
    // Configuración de animaciones
    this.animationConfig = {
      duration: 0.8,
      ease: "power2.inOut",
      stagger: 0.1
    };
    
    this.init();
  }

  // ===== INICIALIZACIÓN =====
  init() {
    console.log('🚀 Inicializando presentación avanzada...');
    
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    this.cacheDOMElements();
    this.validateElements();
    this.setupInitialState();
    this.setupEventListeners();
    this.initializeAnimations();
    this.initializeParallax();
    this.createParallaxControls();
    this.setupInteractiveEffects();
    this.showSlide(1);
    
    console.log('✅ Presentación con sistema parallax avanzado completamente inicializada');
    console.log('🎮 Controles disponibles: Click, Scroll, Tecla R para efectos aleatorios');
  }

  cacheDOMElements() {
    this.slides = document.querySelectorAll('.slide');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.currentSlideSpan = document.getElementById('currentSlide');
    this.totalSlidesSpan = document.getElementById('totalSlides');
    this.progressFill = document.querySelector('.progress-fill');
    
    console.log(`📄 Encontrados ${this.slides.length} slides`);
  }

  validateElements() {
    if (!this.slides.length) {
      console.error('❌ No se encontraron slides');
      return false;
    }
    
    if (!this.prevBtn || !this.nextBtn) {
      console.error('❌ No se encontraron botones de navegación');
      return false;
    }
    
    return true;
  }

  setupInitialState() {
    // Actualizar contador total
    if (this.totalSlidesSpan) {
      this.totalSlidesSpan.textContent = this.totalSlides;
    }

    // Configurar estado inicial de slides con GSAP
    gsap.set(this.slides, {
      opacity: 0,
      visibility: 'hidden',
      scale: 0.95,
      rotationY: 10
    });

    // Mostrar primer slide
    if (this.slides[0]) {
      gsap.set(this.slides[0], {
        opacity: 1,
        visibility: 'visible',
        scale: 1,
        rotationY: 0
      });
      this.slides[0].classList.add('active');
    }
  }

  // ===== SISTEMA DE NAVEGACIÓN CON TRANSICIONES ALEATORIAS =====
  showSlide(slideNumber, direction = 'next') {
    if (this.isTransitioning || slideNumber < 1 || slideNumber > this.totalSlides) {
      return;
    }

    console.log(`🎲 Navegando al slide ${slideNumber} con transición aleatoria`);
    
    this.isTransitioning = true;
    const previousSlideIndex = this.currentSlide - 1;
    const newSlideIndex = slideNumber - 1;

    // Seleccionar transición aleatoria
    const transition = this.getRandomTransition();
    console.log(`🎨 Usando transición: ${transition.name}`);

    // Timeline principal para la transición
    const tl = gsap.timeline({
      onComplete: () => {
        this.isTransitioning = false;
        this.onSlideChanged(slideNumber);
        this.resetSlidePosition(previousSlideIndex);
      }
    });

    // Aplicar transición de salida
    if (previousSlideIndex !== newSlideIndex && this.slides[previousSlideIndex]) {
      this.applyExitTransition(tl, this.slides[previousSlideIndex], transition, direction);
    }

    // Aplicar transición de entrada
    if (this.slides[newSlideIndex]) {
      this.applyEnterTransition(tl, this.slides[newSlideIndex], transition, direction);
      this.slides[newSlideIndex].classList.add('active');
    }

    // Actualizar estado
    this.currentSlide = slideNumber;
    
    // Actualizar UI
    this.updateUI();
  }

  // ===== TRANSICIONES ALEATORIAS =====
  getRandomTransition() {
    const transitions = [
      {
        name: 'slide',
        exitProps: (direction) => ({
          x: direction === 'next' ? -window.innerWidth : window.innerWidth,
          opacity: 0.8,
          duration: 0.7,
          ease: "power2.inOut"
        }),
        enterProps: (direction) => ({
          from: { x: direction === 'next' ? window.innerWidth : -window.innerWidth, opacity: 0 },
          to: { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        })
      },
      {
        name: 'flip',
        exitProps: () => ({
          rotationY: 90,
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          transformOrigin: "center center"
        }),
        enterProps: () => ({
          from: { rotationY: -90, scale: 0.8, opacity: 0 },
          to: { rotationY: 0, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
        })
      },
      {
        name: 'zoom',
        exitProps: () => ({
          scale: 0.3,
          rotation: 45,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in"
        }),
        enterProps: () => ({
          from: { scale: 3, rotation: -45, opacity: 0 },
          to: { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.6)" }
        })
      },
      {
        name: 'cube',
        exitProps: (direction) => ({
          rotationY: direction === 'next' ? -90 : 90,
          z: -500,
          opacity: 0.7,
          duration: 0.8,
          ease: "power2.inOut"
        }),
        enterProps: (direction) => ({
          from: { rotationY: direction === 'next' ? 90 : -90, z: -500, opacity: 0 },
          to: { rotationY: 0, z: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        })
      },
      {
        name: 'wave',
        exitProps: () => ({
          y: -window.innerHeight,
          rotation: 10,
          scale: 0.9,
          opacity: 0,
          duration: 0.7,
          ease: "power2.in"
        }),
        enterProps: () => ({
          from: { y: window.innerHeight, rotation: -10, scale: 0.9, opacity: 0 },
          to: { y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.9, ease: "bounce.out" }
        })
      },
      {
        name: 'spiral',
        exitProps: () => ({
          rotation: 180,
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
          transformOrigin: "center center"
        }),
        enterProps: () => ({
          from: { rotation: -180, scale: 0, opacity: 0 },
          to: { rotation: 0, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(2)" }
        })
      },
      {
        name: 'fold',
        exitProps: (direction) => ({
          rotationX: 90,
          scaleY: 0.1,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          transformOrigin: direction === 'next' ? "top center" : "bottom center"
        }),
        enterProps: (direction) => ({
          from: { rotationX: -90, scaleY: 0.1, opacity: 0 },
          to: { rotationX: 0, scaleY: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
        })
      }
    ];

    return transitions[Math.floor(Math.random() * transitions.length)];
  }

  applyExitTransition(timeline, slideElement, transition, direction) {
    const exitProps = transition.exitProps(direction);
    
    timeline.to(slideElement, {
      ...exitProps,
      onComplete: () => {
        gsap.set(slideElement, { visibility: 'hidden' });
        slideElement.classList.remove('active');
      }
    });
  }

  applyEnterTransition(timeline, slideElement, transition, direction) {
    const enterAnimation = transition.enterProps(direction);
    
    gsap.set(slideElement, {
      visibility: 'visible',
      ...enterAnimation.from
    });

    timeline.to(slideElement, enterAnimation.to, '-=0.4');
  }

  resetSlidePosition(slideIndex) {
    if (this.slides[slideIndex]) {
      gsap.set(this.slides[slideIndex], {
        x: 0,
        y: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        scaleY: 1,
        z: 0,
        transformOrigin: "center center"
      });
    }
  }

  onSlideChanged(slideNumber) {
    // Registrar slide visitado
    this.slideVisited.add(slideNumber);
    
    // Animar elementos específicos del slide
    this.animateSlideContent(slideNumber);
    
    // Efectos especiales según el slide
    this.applySlideSpecificEffects(slideNumber);
    
    // Añadir efectos parallax específicos
    this.addSlideSpecificParallax(slideNumber);
    
    // Verificar logros
    this.checkAchievements();
    
    // Mostrar información del slide
    this.showSlideInfo(slideNumber);
  }

  showSlideInfo(slideNumber) {
    const slideInfo = {
      1: "🎬 Introducción al transporte celular",
      2: "🧱 Estructura de la membrana",
      3: "🚛 Tipos de transporte",
      4: "🌊 Difusión simple",
      5: "🚪 Difusión facilitada",
      6: "🔌 Canales proteicos",
      7: "💧 Osmosis",
      8: "⚡ Transporte activo primario",
      9: "🔄 Transporte activo secundario",
      10: "📋 Resumen del capítulo",
      11: "🔬 Galería visual interactiva"
    };

    const info = slideInfo[slideNumber];
    if (info) {
      const indicator = document.createElement('div');
      indicator.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 500;
        pointer-events: none;
      `;
      
      indicator.textContent = info;
      document.body.appendChild(indicator);
      
      gsap.fromTo(indicator, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      });
      
      setTimeout(() => {
        gsap.to(indicator, {
          y: -30,
          opacity: 0,
          duration: 0.4,
          onComplete: () => indicator.remove()
        });
      }, 2000);
    }
  }

  animateSlideContent(slideNumber) {
    const currentSlideEl = this.slides[slideNumber - 1];
    if (!currentSlideEl) return;

    // Animar elementos internos con stagger
    const elements = currentSlideEl.querySelectorAll(
      '.slide-title, .highlight-item, .transport-card, .factor-card, .definition-card, .visual-card'
    );

    gsap.fromTo(elements, {
      y: 30,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: this.animationConfig.stagger,
      ease: "back.out(1.7)",
      delay: 0.2
    });

    // Animar imágenes con efecto especial
    const images = currentSlideEl.querySelectorAll('img');
    gsap.fromTo(images, {
      scale: 0.8,
      opacity: 0,
      rotationY: 20
    }, {
      scale: 1,
      opacity: 1,
      rotationY: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.4
    });
  }

  applySlideSpecificEffects(slideNumber) {
    switch (slideNumber) {
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
      case 5:
        this.animateSlide5();
        break;
      case 6:
        this.animateSlide6();
        break;
      case 7:
        this.animateSlide7();
        break;
      case 8:
        this.animateSlide8();
        break;
      case 9:
        this.animateSlide9();
        break;
      case 10:
        this.animateSlide10();
        break;
      case 11:
        this.animateSlide11();
        break;
    }
  }

  // ===== FUNCIONES AUXILIARES PARA ANIMACIONES =====
  generateRandomPath() {
    const points = [];
    const centerX = 0;
    const centerY = 0;
    const radius = 30;
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const randomRadius = radius + Math.random() * 20 - 10;
      const x = centerX + Math.cos(angle) * randomRadius;
      const y = centerY + Math.sin(angle) * randomRadius;
      points.push(`${x},${y}`);
    }
    
    return `M${points[0]} Q${points.slice(1).join(' ')},${points[0]}`;
  }

  generateDiffusionPath() {
    const points = [];
    let currentX = 0;
    let currentY = 0;
    
    for (let i = 0; i < 10; i++) {
      currentX += Math.random() * 40 - 20;
      currentY += Math.random() * 40 - 20;
      points.push(`${currentX},${currentY}`);
    }
    
    return `M0,0 L${points.join(' L')}`;
  }

  createFloatingParticles(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: radial-gradient(circle, rgba(255, 204, 0, 0.6), rgba(65, 105, 225, 0.3));
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      `;
      
      container.appendChild(particle);
      
      gsap.set(particle, {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight
      });
      
      gsap.to(particle, {
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
        duration: gsap.utils.random(8, 15),
        ease: "none",
        repeat: -1,
        repeatRefresh: true
      });
      
      gsap.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: gsap.utils.random(2, 5),
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  }

  // ===== SISTEMA DE PARALLAX AVANZADO =====
  initializeParallax() {
    this.createParallaxLayers();
    this.createFloatingParticles();
    this.createBackgroundGeometry();
    this.setupMouseTrail();
    this.initializeDynamicLighting();
    this.setupAdvancedParallax();
    
    console.log('🌟 Sistema de parallax avanzado inicializado');
  }

  createParallaxLayers() {
    const container = document.querySelector('.chapter-presentation-container');
    if (!container) return;

    // Crear capas de parallax
    const layers = ['bg', 'mid', 'front'];
    
    layers.forEach(layer => {
      const parallaxLayer = document.createElement('div');
      parallaxLayer.className = `parallax-layer parallax-${layer}`;
      parallaxLayer.id = `parallax-${layer}`;
      container.appendChild(parallaxLayer);
    });

    // Crear grid de perspectiva
    const grid = document.createElement('div');
    grid.className = 'perspective-grid';
    container.appendChild(grid);
  }

  createFloatingParticles() {
    const bgLayer = document.getElementById('parallax-bg');
    if (!bgLayer) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    bgLayer.appendChild(particleContainer);

    // Crear diferentes tipos de partículas
    const particleTypes = [
      { count: 15, size: 'large', speed: 25 },
      { count: 25, size: 'medium', speed: 20 },
      { count: 35, size: 'small', speed: 15 }
    ];

    particleTypes.forEach(type => {
      for (let i = 0; i < type.count; i++) {
        const particle = document.createElement('div');
        particle.className = `floating-particle ${type.size}`;
        
        // Posición aleatoria inicial
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * type.speed + 's';
        particle.style.animationDuration = (type.speed + Math.random() * 10) + 's';
        
        particleContainer.appendChild(particle);
      }
    });
  }

  createBackgroundGeometry() {
    const midLayer = document.getElementById('parallax-mid');
    if (!midLayer) return;

    const geometryContainer = document.createElement('div');
    geometryContainer.className = 'bg-geometry';
    midLayer.appendChild(geometryContainer);

    // Crear formas geométricas flotantes
    for (let i = 0; i < 3; i++) {
      const shape = document.createElement('div');
      shape.className = 'bg-shape';
      geometryContainer.appendChild(shape);
    }
  }

  setupMouseTrail() {
    // Crear elemento de rastro del mouse
    this.mouseTrail = document.createElement('div');
    this.mouseTrail.className = 'mouse-trail';
    document.body.appendChild(this.mouseTrail);

    // Variables para suavizar el movimiento
    this.mousePos = { x: 0, y: 0 };
    this.trailPos = { x: 0, y: 0 };

    // Seguimiento del mouse
    document.addEventListener('mousemove', (e) => {
      this.mousePos.x = e.clientX;
      this.mousePos.y = e.clientY;
      
      // Actualizar variables CSS para lighting dinámico
      document.documentElement.style.setProperty('--mouse-x', (e.clientX / window.innerWidth * 100) + '%');
      document.documentElement.style.setProperty('--mouse-y', (e.clientY / window.innerHeight * 100) + '%');
    });

    // Animación suave del trail
    this.animateMouseTrail();
  }

  animateMouseTrail() {
    // Interpolación suave
    this.trailPos.x += (this.mousePos.x - this.trailPos.x) * 0.1;
    this.trailPos.y += (this.mousePos.y - this.trailPos.y) * 0.1;

    // Aplicar posición
    if (this.mouseTrail) {
      gsap.set(this.mouseTrail, {
        x: this.trailPos.x,
        y: this.trailPos.y
      });
    }

    requestAnimationFrame(() => this.animateMouseTrail());
  }

  initializeDynamicLighting() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach(slide => {
      const lighting = document.createElement('div');
      lighting.className = 'dynamic-lighting';
      slide.appendChild(lighting);
    });
  }

  setupAdvancedParallax() {
    let ticking = false;
    
    document.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateParallax(e);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  updateParallax(e) {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalizar posición del mouse (-1 a 1)
    const normalizedX = (clientX / innerWidth - 0.5) * 2;
    const normalizedY = (clientY / innerHeight - 0.5) * 2;

    // Actualizar capas de parallax con diferentes intensidades
    const layers = [
      { element: document.getElementById('parallax-bg'), intensity: 0.5 },
      { element: document.getElementById('parallax-mid'), intensity: 1 },
      { element: document.getElementById('parallax-front'), intensity: 1.5 }
    ];

    layers.forEach(layer => {
      if (layer.element) {
        const moveX = normalizedX * layer.intensity * 20;
        const moveY = normalizedY * layer.intensity * 20;
        
        gsap.to(layer.element, {
          x: moveX,
          y: moveY,
          rotationX: normalizedY * layer.intensity * 2,
          rotationY: normalizedX * layer.intensity * 2,
          duration: 1,
          ease: "power2.out"
        });
      }
    });

    // Actualizar elementos específicos del slide actual
    this.updateSlideParallax(normalizedX, normalizedY);
  }

  updateSlideParallax(normalizedX, normalizedY) {
    const currentSlideEl = this.slides[this.currentSlide - 1];
    if (!currentSlideEl) return;

    // Elementos parallax en el slide actual
    const parallaxElements = currentSlideEl.querySelectorAll(
      '.membrane-visual, .transport-visual, .lipid-bilayer, .highlight-item, img'
    );

    parallaxElements.forEach((element, index) => {
      const depth = (index + 1) * 0.5;
      const moveX = normalizedX * depth * 10;
      const moveY = normalizedY * depth * 10;
      
      gsap.to(element, {
        x: moveX,
        y: moveY,
        rotationX: normalizedY * depth,
        rotationY: normalizedX * depth,
        duration: 1.5,
        ease: "power2.out"
      });
    });
  }

  // ===== EFECTOS ESPECÍFICOS POR SLIDE =====
  addSlideSpecificParallax(slideNumber) {
    switch (slideNumber) {
      case 1:
        this.createDNAHelix();
        break;
      case 2:
        this.createMembraneWaves();
        break;
      case 3:
        this.createTransportParticles();
        break;
      case 4:
        this.createDiffusionField();
        break;
      case 7:
        this.createOsmosisFlow();
        break;
      case 11:
        this.createGalleryParallax();
        break;
    }
  }

  createDNAHelix() {
    const slide1 = this.slides[0];
    if (!slide1) return;

    const helix = document.createElement('div');
    helix.className = 'dna-helix';
    helix.innerHTML = `
      <svg width="200" height="400" viewBox="0 0 200 400">
        <path d="M50,0 Q150,100 50,200 Q150,300 50,400" stroke="#FFD700" stroke-width="3" fill="none" opacity="0.7"/>
        <path d="M150,0 Q50,100 150,200 Q50,300 150,400" stroke="#4169E1" stroke-width="3" fill="none" opacity="0.7"/>
      </svg>
    `;
    
    slide1.appendChild(helix);
    
    gsap.to(helix, {
      rotationY: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });
  }

  createMembraneWaves() {
    const slide2 = this.slides[1];
    if (!slide2) return;

    // Crear ondas de membrana
    for (let i = 0; i < 5; i++) {
      const wave = document.createElement('div');
      wave.style.cssText = `
        position: absolute;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(255, 204, 0, 0.5), transparent);
        top: ${20 + i * 15}%;
        left: 0;
        animation: membraneWave ${3 + i}s infinite ease-in-out;
        animation-delay: ${i * 0.5}s;
      `;
      slide2.appendChild(wave);
    }
  }

  createTransportParticles() {
    const slide3 = this.slides[2];
    if (!slide3) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'transport-particles';
    slide3.appendChild(particleContainer);

    // Crear partículas de transporte
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'transport-particle';
      particle.style.top = Math.random() * 80 + 10 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particleContainer.appendChild(particle);
    }
  }

  createDiffusionField() {
    const slide4 = this.slides[3];
    if (!slide4) return;

    // Campo de difusión con gradiente animado
    const diffusionField = document.createElement('div');
    diffusionField.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 30% 50%, rgba(255, 204, 0, 0.3) 0%, transparent 50%);
      animation: diffusionSpread 6s infinite ease-in-out;
      z-index: 2;
      pointer-events: none;
    `;
    
    slide4.appendChild(diffusionField);
  }

  createOsmosisFlow() {
    const slide7 = this.slides[6];
    if (!slide7) return;

    // Crear flujo de osmosis visual
    for (let i = 0; i < 8; i++) {
      const droplet = document.createElement('div');
      droplet.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(65, 105, 225, 0.8), transparent);
        border-radius: 50%;
        left: ${30 + Math.random() * 40}%;
        top: ${20 + Math.random() * 60}%;
        animation: osmosisFlow ${2 + Math.random() * 3}s infinite ease-in-out;
        animation-delay: ${i * 0.3}s;
      `;
      slide7.appendChild(droplet);
    }
  }

  createGalleryParallax() {
    const slide11 = this.slides[10];
    if (!slide11) return;

    const visualCards = slide11.querySelectorAll('.visual-card');
    
    visualCards.forEach((card, index) => {
      // Añadir efecto de profundidad a cada card
      const depth = (index + 1) * 50;
      gsap.set(card, {
        z: -depth,
        scale: 1 + (depth / 1000)
      });
    });
  }

  // ===== CONTROLES DE PARALLAX =====
  createParallaxControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: rgba(255, 255, 255, 0.9);
      padding: 15px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      backdrop-filter: blur(10px);
    `;

    const parallaxToggle = document.createElement('button');
    parallaxToggle.innerHTML = '🌟 Parallax: ON';
    parallaxToggle.style.cssText = `
      padding: 8px 12px;
      border: none;
      border-radius: 5px;
      background: var(--primary-yellow);
      color: var(--primary-black);
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    `;

    const particlesToggle = document.createElement('button');
    particlesToggle.innerHTML = '✨ Partículas: ON';
    particlesToggle.style.cssText = `
      padding: 8px 12px;
      border: none;
      border-radius: 5px;
      background: var(--primary-blue);
      color: white;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    `;

    const lightingToggle = document.createElement('button');
    lightingToggle.innerHTML = '💡 Iluminación: ON';
    lightingToggle.style.cssText = `
      padding: 8px 12px;
      border: none;
      border-radius: 5px;
      background: var(--gradient-primary);
      color: white;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    `;

    // Event listeners para los controles
    parallaxToggle.addEventListener('click', () => {
      this.toggleParallax();
      parallaxToggle.innerHTML = this.parallaxEnabled ? '🌟 Parallax: ON' : '🌟 Parallax: OFF';
      parallaxToggle.style.opacity = this.parallaxEnabled ? '1' : '0.6';
    });

    particlesToggle.addEventListener('click', () => {
      this.toggleParticles();
      particlesToggle.innerHTML = this.particlesEnabled ? '✨ Partículas: ON' : '✨ Partículas: OFF';
      particlesToggle.style.opacity = this.particlesEnabled ? '1' : '0.6';
    });

    lightingToggle.addEventListener('click', () => {
      this.toggleDynamicLighting();
      lightingToggle.innerHTML = this.lightingEnabled ? '💡 Iluminación: ON' : '💡 Iluminación: OFF';
      lightingToggle.style.opacity = this.lightingEnabled ? '1' : '0.6';
    });

    controlsContainer.appendChild(parallaxToggle);
    controlsContainer.appendChild(particlesToggle);
    controlsContainer.appendChild(lightingToggle);
    document.body.appendChild(controlsContainer);

    // Inicializar estados
    this.parallaxEnabled = true;
    this.particlesEnabled = true;
    this.lightingEnabled = true;
  }

  toggleParallax() {
    this.parallaxEnabled = !this.parallaxEnabled;
    
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach(layer => {
      if (this.parallaxEnabled) {
        layer.style.transform = '';
        layer.style.transition = '';
      } else {
        layer.style.transform = 'none';
        layer.style.transition = 'none';
      }
    });
  }

  toggleParticles() {
    this.particlesEnabled = !this.particlesEnabled;
    
    const particles = document.querySelectorAll('.floating-particle, .transport-particle');
    particles.forEach(particle => {
      particle.style.display = this.particlesEnabled ? 'block' : 'none';
    });
  }

  toggleDynamicLighting() {
    this.lightingEnabled = !this.lightingEnabled;
    
    const lightingElements = document.querySelectorAll('.dynamic-lighting');
    lightingElements.forEach(element => {
      element.style.opacity = this.lightingEnabled ? '1' : '0';
    });
  }

  // ===== EFECTOS INTERACTIVOS AVANZADOS =====
  setupInteractiveEffects() {
    // Efecto de click en cualquier parte
    document.addEventListener('click', (e) => {
      this.createClickEffect(e.clientX, e.clientY);
    });

    // Efecto de scroll si está disponible
    document.addEventListener('wheel', (e) => {
      this.createScrollEffect(e.deltaY);
    });

    // Efectos de teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'r' || e.key === 'R') {
        this.createRandomEffect();
      }
    });
  }

  createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      border: 2px solid var(--primary-yellow);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(effect);
    
    gsap.to(effect, {
      scale: 8,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => effect.remove()
    });

    // Efecto secundario
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      background: var(--primary-blue);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(ripple);
    
    gsap.to(ripple, {
      scale: 15,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.2,
      onComplete: () => ripple.remove()
    });
  }

  createScrollEffect(deltaY) {
    const direction = deltaY > 0 ? 1 : -1;
    
    // Efecto de distorsión temporal
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
      gsap.to(slide, {
        skewY: direction * 2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    });
  }

  createRandomEffect() {
    const effects = [
      () => this.createEnergyBurst(),
      () => this.createColorWave(),
      () => this.createTimeWarp(),
      () => this.createParticleExplosion()
    ];

    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
  }

  createEnergyBurst() {
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const energy = document.createElement('div');
      energy.style.cssText = `
        position: fixed;
        left: ${center.x}px;
        top: ${center.y}px;
        width: 4px;
        height: 20px;
        background: linear-gradient(0deg, var(--primary-yellow), var(--primary-blue));
        transform-origin: center bottom;
        transform: translate(-50%, -100%) rotate(${angle}rad);
        pointer-events: none;
        z-index: 9999;
      `;
      
      document.body.appendChild(energy);
      
      gsap.to(energy, {
        scaleY: 10,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => energy.remove()
      });
    }
  }

  createColorWave() {
    const wave = document.createElement('div');
    wave.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, 
        rgba(255, 204, 0, 0.3) 0%, 
        rgba(65, 105, 225, 0.3) 50%, 
        rgba(255, 204, 0, 0.3) 100%);
      pointer-events: none;
      z-index: 9997;
      opacity: 0;
    `;
    
    document.body.appendChild(wave);
    
    gsap.to(wave, {
      opacity: 1,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      onComplete: () => wave.remove()
    });
  }

  createTimeWarp() {
    const currentSlide = this.slides[this.currentSlide - 1];
    if (!currentSlide) return;

    gsap.to(currentSlide, {
      scale: 1.1,
      filter: "blur(2px)",
      duration: 0.2,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut"
    });
  }

  createParticleExplosion() {
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: ${center.x}px;
        top: ${center.y}px;
        width: 6px;
        height: 6px;
        background: ${Math.random() > 0.5 ? 'var(--primary-yellow)' : 'var(--primary-blue)'};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
      `;
      
      document.body.appendChild(particle);
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 200 + Math.random() * 300;
      const endX = center.x + Math.cos(angle) * distance;
      const endY = center.y + Math.sin(angle) * distance;
      
      gsap.to(particle, {
        x: endX - center.x,
        y: endY - center.y,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  }

  // ===== ANIMACIONES ESPECÍFICAS POR SLIDE (MEJORADAS) =====
  animateSlide1() {
    // Membrana flotante con múltiples animaciones
    const membrane = document.querySelector('.lipid-bilayer');
    if (membrane) {
      gsap.to(membrane, {
        rotationY: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });
      
      gsap.to(membrane, {
        y: -15,
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });
    }

    // Highlights con animaciones escalonadas y variadas
    const highlights = document.querySelectorAll('.highlight-item');
    highlights.forEach((item, index) => {
      const animations = [
        { y: -10, rotation: 5 },
        { scale: 1.05, y: -8 },
        { x: 5, y: -12 },
        { rotation: -3, y: -15 }
      ];
      
      const anim = animations[index % animations.length];
      
      gsap.to(item, {
        ...anim,
        duration: 2 + index * 0.3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.4
      });

      // Efecto de brillo aleatorio
      gsap.to(item, {
        filter: "brightness(1.2)",
        duration: Math.random() * 2 + 1,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 3
      });
    });

    // Partículas flotantes de fondo
    this.createFloatingParticles('.chapter-intro');
  }

  animateSlide2() {
    // Moléculas con movimiento browniano realista
    const molecules = document.querySelectorAll('.molecule');
    molecules.forEach(molecule => {
      gsap.to(molecule, {
        motionPath: {
          path: this.generateRandomPath(),
          autoRotate: true
        },
        duration: gsap.utils.random(4, 8),
        ease: "none",
        repeat: -1,
        repeatRefresh: true
      });

      // Pulso de tamaño
      gsap.to(molecule, {
        scale: gsap.utils.random(0.8, 1.3),
        duration: gsap.utils.random(1, 3),
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    });

    // Animación de la membrana detallada
    const membraneStructure = document.querySelector('.membrane-structure');
    if (membraneStructure) {
      gsap.to(membraneStructure, {
        backgroundPosition: "200px 0px",
        duration: 10,
        ease: "none",
        repeat: -1
      });
    }
  }

  animateSlide3() {
    // Animación mejorada de tipos de transporte
    const transportCards = document.querySelectorAll('.transport-card');
    transportCards.forEach((card, index) => {
      gsap.fromTo(card, {
        y: 50,
        opacity: 0,
        rotationY: 45
      }, {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: index * 0.3
      });

      // Animación continua de hover
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          duration: 0.3
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          duration: 0.3
        });
      });
    });

    // Animación de las flechas de transporte
    const passiveArrow = document.querySelector('.passive-arrow');
    const activeArrow = document.querySelector('.active-arrow');
    
    if (passiveArrow) {
      gsap.to(passiveArrow, {
        x: 30,
        scale: 1.1,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(passiveArrow, {
        backgroundColor: "rgba(65, 105, 225, 0.1)",
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }

    if (activeArrow) {
      gsap.to(activeArrow, {
        x: -30,
        scale: 1.1,
        duration: 1.8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5
      });

      gsap.to(activeArrow, {
        boxShadow: "0 0 25px rgba(255, 204, 0, 0.6)",
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }

    // Partículas en la demostración de concentración
    const particles = document.querySelectorAll('.particles-demo .particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: gsap.utils.random(-10, 10),
        x: gsap.utils.random(-5, 5),
        rotation: gsap.utils.random(-180, 180),
        duration: gsap.utils.random(2, 4),
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.2
      });

      // Efecto de energía cinética
      gsap.to(particle, {
        scale: gsap.utils.random(0.8, 1.3),
        duration: gsap.utils.random(1, 3),
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      });
    });

    // Animación de barras de energía
    const energyFills = document.querySelectorAll('.energy-fill');
    energyFills.forEach((fill, index) => {
      gsap.fromTo(fill, {
        scaleX: 0
      }, {
        scaleX: 1,
        duration: 2,
        ease: "power2.out",
        delay: index * 0.5
      });

      // Pulso continuo
      gsap.to(fill, {
        opacity: 0.7,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      });
    });

    // Crear efecto de campo de energía
    this.createEnergyField();
  }

  createConcentrationGradient() {
    const gradientContainer = document.querySelector('.concentration-diagram');
    if (!gradientContainer) return;

    // Crear efecto de gradiente animado
    const gradient = document.createElement('div');
    gradient.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        rgba(255, 204, 0, 0.4) 0%, 
        rgba(255, 204, 0, 0.2) 25%, 
        rgba(65, 105, 225, 0.1) 50%, 
        rgba(65, 105, 225, 0.2) 75%, 
        rgba(65, 105, 225, 0.4) 100%);
      border-radius: 15px;
      pointer-events: none;
      z-index: 1;
    `;
    
    gradientContainer.style.position = 'relative';
    gradientContainer.appendChild(gradient);
    
    // Animación del gradiente
    gsap.to(gradient, {
      backgroundImage: `linear-gradient(90deg, 
        rgba(65, 105, 225, 0.4) 0%, 
        rgba(65, 105, 225, 0.2) 25%, 
        rgba(255, 204, 0, 0.1) 50%, 
        rgba(255, 204, 0, 0.2) 75%, 
        rgba(255, 204, 0, 0.4) 100%)`,
      duration: 6,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true
    });
  }

  // ===== SISTEMA DE LOGROS Y PROGRESO =====
  initializeProgressSystem() {
    this.slideVisited = new Set();
    this.achievements = {
      explorer: false,
      speedster: false,
      scholar: false
    };
    this.startTime = Date.now();
  }

  checkAchievements() {
    // Explorador: visitar todos los slides
    if (this.slideVisited.size === this.totalSlides && !this.achievements.explorer) {
      this.achievements.explorer = true;
      this.showAchievement("🏆 Explorador Completo", "Has visitado todos los slides");
    }

    // Velocista: completar en menos de 5 minutos
    const timeSpent = (Date.now() - this.startTime) / 1000 / 60;
    if (timeSpent < 5 && this.slideVisited.size === this.totalSlides && !this.achievements.speedster) {
      this.achievements.speedster = true;
      this.showAchievement("⚡ Velocista", "Completaste la presentación en tiempo récord");
    }
  }

  showAchievement(title, description) {
    const achievement = document.createElement('div');
    achievement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #FFD700, #FFA500);
      color: white;
      padding: 30px;
      border-radius: 20px;
      text-align: center;
      z-index: 3000;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      max-width: 400px;
    `;
    
    achievement.innerHTML = `
      <h2 style="margin-bottom: 15px; font-size: 24px;">${title}</h2>
      <p style="font-size: 16px; opacity: 0.9;">${description}</p>
    `;
    
    document.body.appendChild(achievement);
    
    gsap.fromTo(achievement, {
      scale: 0,
      rotation: -180,
      opacity: 0
    }, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    });
    
    setTimeout(() => {
      gsap.to(achievement, {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => achievement.remove()
      });
    }, 3000);
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
    const direction = slideNumber > this.currentSlide ? 'next' : 'prev';
    this.showSlide(slideNumber, direction);
  }

  // ===== ACTUALIZACIÓN DE UI =====
  updateUI() {
    this.updateProgress();
    this.updateNavigationButtons();
    this.updateSlideCounter();
  }

  updateProgress() {
    if (this.progressFill) {
      const progress = (this.currentSlide / this.totalSlides) * 100;
      gsap.to(this.progressFill, {
        height: `${progress}%`,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }

  updateNavigationButtons() {
    if (this.prevBtn) {
      const isDisabled = this.currentSlide === 1;
      this.prevBtn.disabled = isDisabled;
      gsap.to(this.prevBtn, {
        opacity: isDisabled ? 0.5 : 1,
        scale: isDisabled ? 0.9 : 1,
        duration: 0.3
      });
    }

    if (this.nextBtn) {
      const isDisabled = this.currentSlide === this.totalSlides;
      this.nextBtn.disabled = isDisabled;
      gsap.to(this.nextBtn, {
        opacity: isDisabled ? 0.5 : 1,
        scale: isDisabled ? 0.9 : 1,
        duration: 0.3
      });
    }
  }

  updateSlideCounter() {
    if (this.currentSlideSpan) {
      gsap.to(this.currentSlideSpan, {
        scale: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          this.currentSlideSpan.textContent = this.currentSlide;
        }
      });
    }
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Botones de navegación
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.previousSlide();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.nextSlide();
      });
    }

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (this.isTransitioning) return;

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

    // Navegación táctil
    this.setupTouchNavigation();
    
    // Hover effects para elementos interactivos
    this.setupHoverEffects();
  }

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

  setupHoverEffects() {
    // Efectos hover para elementos interactivos
    const interactiveElements = document.querySelectorAll(
      '.highlight-item, .transport-card, .factor-card, .definition-card, .nav-btn'
    );

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          y: -3,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }

  // ===== ANIMACIONES INICIALES =====
  initializeAnimations() {
    // Animar entrada del header
    gsap.fromTo('.chapter-header', {
      y: -100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Animar controles de navegación
    gsap.fromTo('.navigation-controls', {
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3
    });

    // Animar indicadores de progreso
    gsap.fromTo('.progress-indicators', {
      x: 100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5
    });
  }

  // ===== AUTOPLAY =====
  toggleAutoplay() {
    this.autoplayEnabled = !this.autoplayEnabled;
    
    if (this.autoplayEnabled) {
      this.startAutoplay();
      console.log('▶️ Autoplay activado');
    } else {
      this.stopAutoplay();
      console.log('⏹️ Autoplay desactivado');
    }
  }

  startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      if (this.currentSlide < this.totalSlides) {
        this.nextSlide();
      } else {
        this.goToSlide(1);
      }
    }, 8000);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  createEnergyField() {
    const energyComparison = document.querySelector('.energy-comparison');
    if (!energyComparison) return;

    // Crear partículas de energía para transporte activo
    const activeCard = energyComparison.querySelector('.energy-source.active');
    if (activeCard) {
      for (let i = 0; i < 8; i++) {
        const energyParticle = document.createElement('div');
        energyParticle.style.cssText = `
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #FFD700, #FFA500);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10;
        `;
        
        activeCard.style.position = 'relative';
        activeCard.appendChild(energyParticle);
        
        const angle = (i / 8) * Math.PI * 2;
        const radius = 40;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        gsap.set(energyParticle, {
          x: x,
          y: y
        });
        
        gsap.to(energyParticle, {
          rotation: 360,
          duration: 4 + i * 0.5,
          ease: "none",
          repeat: -1,
          transformOrigin: `${-x}px ${-y}px`
        });
        
        gsap.to(energyParticle, {
          scale: gsap.utils.random(0.5, 1.5),
          opacity: gsap.utils.random(0.5, 1),
          duration: gsap.utils.random(1, 3),
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    }

    // Crear flujo suave para transporte pasivo
    const passiveCard = energyComparison.querySelector('.energy-source.passive');
    if (passiveCard) {
      for (let i = 0; i < 5; i++) {
        const flowParticle = document.createElement('div');
        flowParticle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(65, 105, 225, 0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 10;
        `;
        
        passiveCard.style.position = 'relative';
        passiveCard.appendChild(flowParticle);
        
        gsap.set(flowParticle, {
          x: -30,
          y: Math.random() * 60 - 30
        });
        
        gsap.to(flowParticle, {
          x: 130,
          duration: gsap.utils.random(3, 6),
          ease: "none",
          repeat: -1,
          delay: i * 0.5,
          onComplete: () => {
            gsap.set(flowParticle, { x: -30 });
          }
        });
        
        gsap.to(flowParticle, {
          y: "+=20",
          duration: gsap.utils.random(2, 4),
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    }
  }

  animateSlide8() {
    // Bomba sodio-potasio con animación realista
    const pump = document.querySelector('.pump-protein');
    if (pump) {
      // Rotación de la bomba
      gsap.to(pump, {
        rotation: 360,
        duration: 6,
        ease: "none",
        repeat: -1
      });

      // Pulso de actividad
      gsap.to(pump, {
        scale: 1.05,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }

    // ATP con efecto de energía mejorado
    const atp = document.querySelector('.atp-binding, .atp-symbol');
    if (atp) {
      gsap.to(atp, {
        scale: 1.4,
        backgroundColor: "#FFA500",
        boxShadow: "0 0 25px #FFD700, inset 0 0 15px rgba(255, 255, 255, 0.3)",
        duration: 1,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // Efecto de descarga de energía
      gsap.to(atp, {
        filter: "brightness(1.5)",
        duration: 0.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5
      });
    }

    // Iones sodio y potasio con movimiento realista
    const sodiumExits = document.querySelectorAll('.sodium-exit');
    const potassiumEntries = document.querySelectorAll('.potassium-entry');
    
    sodiumExits.forEach((sodium, index) => {
      gsap.to(sodium, {
        x: 40,
        y: -20,
        opacity: 0.3,
        duration: 2,
        ease: "power2.out",
        repeat: -1,
        delay: index * 0.7,
        onComplete: () => {
          gsap.set(sodium, { x: 0, y: 0, opacity: 1 });
        }
      });
    });

    potassiumEntries.forEach((potassium, index) => {
      gsap.to(potassium, {
        x: -40,
        y: 20,
        opacity: 0.3,
        duration: 2.5,
        ease: "power2.out",
        repeat: -1,
        delay: index * 0.8 + 1,
        onComplete: () => {
          gsap.set(potassium, { x: 0, y: 0, opacity: 1 });
        }
      });
    });

    // Crear ondas de activación
    this.createPumpWaves();
  }

  createPumpWaves() {
    const pumpVisual = document.querySelector('.pump-visual');
    if (!pumpVisual) return;

    for (let i = 0; i < 3; i++) {
      const wave = document.createElement('div');
      wave.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        border: 2px solid rgba(255, 204, 0, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
      
      pumpVisual.style.position = 'relative';
      pumpVisual.appendChild(wave);
      
      gsap.fromTo(wave, {
        scale: 0,
        opacity: 0.8
      }, {
        scale: 2,
        opacity: 0,
        duration: 3,
        ease: "power2.out",
        repeat: -1,
        delay: i * 1
      });
    }
  }

  animateSlide11() {
    // Laboratorio virtual interactivo
    this.setupVirtualLab();
    this.setupInteractiveGallery();
    this.initializeLabStats();
  }

  setupVirtualLab() {
    const labButtons = document.querySelectorAll('.lab-btn');
    const experimentArea = document.getElementById('experiment-area');
    const experimentTitle = document.getElementById('experiment-title');
    
    let experimentsRun = 0;
    let conceptsExplored = new Set();
    
    labButtons.forEach(button => {
      button.addEventListener('click', () => {
        const experiment = button.dataset.experiment;
        
        if (experiment === 'reset') {
          this.resetLab();
          return;
        }
        
        experimentsRun++;
        conceptsExplored.add(experiment);
        this.updateLabStats(experimentsRun, conceptsExplored.size);
        
        // Feedback visual del botón
        gsap.to(button, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            this.runExperiment(experiment, experimentArea, experimentTitle);
          }
        });
      });
      
      // Efectos hover mejorados
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          boxShadow: "0 12px 25px rgba(65, 105, 225, 0.3)",
          duration: 0.3
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          duration: 0.3
        });
      });
    });
  }

  runExperiment(experiment, area, title) {
    // Limpiar área anterior
    gsap.to(area, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        area.innerHTML = '';
        
        switch (experiment) {
          case 'diffusion':
            this.createDiffusionExperiment(area, title);
            break;
          case 'osmosis':
            this.createOsmosisExperiment(area, title);
            break;
          case 'active-transport':
            this.createActiveTransportExperiment(area, title);
            break;
        }
        
        gsap.to(area, {
          opacity: 1,
          duration: 0.5
        });
      }
    });
  }

  createDiffusionExperiment(area, title) {
    title.textContent = '🌊 Experimento: Difusión Molecular';
    
    area.innerHTML = `
      <div class="experiment-diffusion">
        <div class="diffusion-chamber">
          <div class="chamber-left">
            <div class="particles-container">
              ${Array(12).fill(0).map(() => '<div class="exp-particle">●</div>').join('')}
            </div>
          </div>
          <div class="chamber-barrier">
            <div class="barrier-opening"></div>
          </div>
          <div class="chamber-right">
            <div class="particles-container">
              ${Array(3).fill(0).map(() => '<div class="exp-particle">●</div>').join('')}
            </div>
          </div>
        </div>
        <div class="experiment-controls">
          <button class="exp-btn" onclick="presentationManager.startDiffusion()">▶️ Iniciar</button>
          <button class="exp-btn" onclick="presentationManager.pauseDiffusion()">⏸️ Pausar</button>
        </div>
      </div>
    `;
    
    this.styleDiffusionExperiment();
  }

  createOsmosisExperiment(area, title) {
    title.textContent = '💧 Experimento: Presión Osmótica';
    
    area.innerHTML = `
      <div class="experiment-osmosis">
        <div class="osmosis-chamber">
          <div class="solution-a">
            <div class="solution-label">Hipotónica</div>
            <div class="water-level" id="water-level-a">💧💧💧💧💧</div>
          </div>
          <div class="semipermeable-wall">
            <div class="membrane-pores">
              <div class="pore"></div>
              <div class="pore"></div>
              <div class="pore"></div>
            </div>
          </div>
          <div class="solution-b">
            <div class="solution-label">Hipertónica</div>
            <div class="water-level" id="water-level-b">💧💧</div>
            <div class="solutes">🔶🔶🔶🔶</div>
          </div>
        </div>
        <div class="experiment-controls">
          <button class="exp-btn" onclick="presentationManager.startOsmosis()">▶️ Iniciar</button>
          <button class="exp-btn" onclick="presentationManager.resetOsmosis()">🔄 Reiniciar</button>
        </div>
      </div>
    `;
    
    this.styleOsmosisExperiment();
  }

  createActiveTransportExperiment(area, title) {
    title.textContent = '⚡ Experimento: Bomba Sodio-Potasio';
    
    area.innerHTML = `
      <div class="experiment-active">
        <div class="cell-simulation">
          <div class="extracellular">
            <div class="ion-container">
              <div class="sodium-ions">
                ${Array(8).fill(0).map(() => '<div class="ion sodium">Na⁺</div>').join('')}
              </div>
              <div class="potassium-ions">
                ${Array(3).fill(0).map(() => '<div class="ion potassium">K⁺</div>').join('')}
              </div>
            </div>
          </div>
          <div class="membrane-pump">
            <div class="pump-protein-visual">
              <div class="atp-site">ATP</div>
              <div class="binding-sites">
                <div class="na-site">Na⁺</div>
                <div class="k-site">K⁺</div>
              </div>
            </div>
          </div>
          <div class="intracellular">
            <div class="ion-container">
              <div class="sodium-ions">
                ${Array(2).fill(0).map(() => '<div class="ion sodium">Na⁺</div>').join('')}
              </div>
              <div class="potassium-ions">
                ${Array(7).fill(0).map(() => '<div class="ion potassium">K⁺</div>').join('')}
              </div>
            </div>
          </div>
        </div>
        <div class="experiment-controls">
          <button class="exp-btn" onclick="presentationManager.activatePump()">⚡ Activar Bomba</button>
          <button class="exp-btn" onclick="presentationManager.addATP()">🔋 Añadir ATP</button>
        </div>
      </div>
    `;
    
    this.styleActiveTransportExperiment();
  }

  styleDiffusionExperiment() {
    const style = document.createElement('style');
    style.textContent = `
      .experiment-diffusion {
        color: white;
        text-align: center;
      }
      .diffusion-chamber {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 20px;
        margin: 20px 0;
        align-items: center;
      }
      .chamber-left, .chamber-right {
        border: 2px solid #FFD700;
        border-radius:  10px;
        height: 100px;
        position: relative;
        overflow: hidden;
      }
      .particles-container {
        padding: 10px;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        align-content: flex-start;
      }
      .exp-particle {
        color: #4169E1;
        font-size: 12px;
        animation: particleJiggle 2s ease-in-out infinite;
      }
      .chamber-barrier {
        width: 20px;
        height: 100px;
        background: linear-gradient(180deg, #FFD700, #4169E1);
        border-radius: 10px;
        position: relative;
      }
      .barrier-opening {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translateX(-50%);
        width: 8px;
        height: 20px;
        background: rgba(255,255,255,0.3);
        border-radius: 4px;
      }
      .experiment-controls {
        margin-top: 20px;
        display: flex;
        gap: 10px;
        justify-content: center;
      }
      .exp-btn {
        background: #4169E1;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
      }
      .exp-btn:hover {
        background: #FFD700;
        color: #4169E1;
      }
      @keyframes particleJiggle {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(2px, -2px); }
        50% { transform: translate(-2px, 2px); }
        75% { transform: translate(2px, 2px); }
      }
    `;
    document.head.appendChild(style);
  }

  styleOsmosisExperiment() {
    const style = document.createElement('style');
    style.textContent = `
      .experiment-osmosis {
        color: white;
        text-align: center;
      }
      .osmosis-chamber {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 20px;
        margin: 20px 0;
        align-items: stretch;
      }
      .solution-a, .solution-b {
        border: 2px solid #4169E1;
        border-radius: 10px;
        padding: 15px;
        min-height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .solution-label {
        font-weight: 600;
        color: #FFD700;
        margin-bottom: 10px;
      }
      .water-level {
        font-size: 14px;
        line-height: 1.2;
      }
      .solutes {
        margin-top: 10px;
        font-size: 12px;
      }
      .semipermeable-wall {
        width: 30px;
        background: linear-gradient(180deg, #FFD700, #4169E1);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .membrane-pores {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .pore {
        width: 10px;
        height: 6px;
        background: rgba(255,255,255,0.7);
        border-radius: 3px;
      }
    `;
    document.head.appendChild(style);
  }

  styleActiveTransportExperiment() {
    const style = document.createElement('style');
    style.textContent = `
      .experiment-active {
        color: white;
        text-align: center;
      }
      .cell-simulation {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 20px;
        margin: 20px 0;
        align-items: center;
      }
      .extracellular, .intracellular {
        border: 2px solid #4169E1;
        border-radius: 10px;
        padding: 15px;
        min-height: 100px;
      }
      .membrane-pump {
        width: 60px;
        height: 100px;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      .pump-protein-visual {
        text-align: center;
        font-size: 10px;
        color: #4169E1;
        font-weight: bold;
      }
      .ion-container {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        justify-content: center;
      }
      .ion {
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: bold;
      }
      .ion.sodium {
        background: #FFD700;
        color: #4169E1;
      }
      .ion.potassium {
        background: #4169E1;
        color: white;
      }
      .atp-site {
        background: #FF6B6B;
        color: white;
        padding: 2px 4px;
        border-radius: 5px;
        margin-bottom: 5px;
      }
    `;
    document.head.appendChild(style);
  }

  // Métodos para controlar experimentos
  startDiffusion() {
    const particles = document.querySelectorAll('.exp-particle');
    particles.forEach(particle => {
      gsap.to(particle, {
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-30, 30),
        duration: gsap.utils.random(2, 5),
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    });
  }

  pauseDiffusion() {
    const particles = document.querySelectorAll('.exp-particle');
    gsap.killTweensOf(particles);
  }

  startOsmosis() {
    const waterA = document.getElementById('water-level-a');
    const waterB = document.getElementById('water-level-b');
    
    gsap.to(waterA, {
      textContent: '💧💧💧',
      duration: 3,
      ease: "power2.inOut"
    });
    
    gsap.to(waterB, {
      textContent: '💧💧💧💧',
      duration: 3,
      ease: "power2.inOut"
    });
  }

  resetOsmosis() {
    const waterA = document.getElementById('water-level-a');
    const waterB = document.getElementById('water-level-b');
    
    waterA.textContent = '💧💧💧💧💧';
    waterB.textContent = '💧💧';
  }

  activatePump() {
    const pump = document.querySelector('.pump-protein-visual');
    if (pump) {
      gsap.to(pump, {
        rotation: 360,
        duration: 1,
        ease: "power2.inOut",
        repeat: 3
      });
    }
    
    // Simular movimiento de iones
    const sodiumIons = document.querySelectorAll('.extracellular .sodium');
    const potassiumIons = document.querySelectorAll('.intracellular .potassium');
    
    sodiumIons.forEach((ion, index) => {
      if (index < 3) {
        gsap.to(ion, {
          x: 100,
          opacity: 0,
          duration: 1.5,
          delay: index * 0.3,
          onComplete: () => {
            gsap.set(ion, { x: 0, opacity: 1 });
          }
        });
      }
    });
    
    potassiumIons.forEach((ion, index) => {
      if (index < 2) {
        gsap.to(ion, {
          x: -100,
          opacity: 0,
          duration: 1.5,
          delay: index * 0.3 + 0.5,
          onComplete: () => {
            gsap.set(ion, { x: 0, opacity: 1 });
          }
        });
      }
    });
  }

  addATP() {
    const atpSite = document.querySelector('.atp-site');
    if (atpSite) {
      gsap.to(atpSite, {
        scale: 1.5,
        backgroundColor: '#FF4444',
        duration: 0.5,
        yoyo: true,
        repeat: 3,
        onComplete: () => {
          gsap.set(atpSite, { scale: 1, backgroundColor: '#FF6B6B' });
        }
      });
    }
  }

  resetLab() {
    const experimentArea = document.getElementById('experiment-area');
    const experimentTitle = document.getElementById('experiment-title');
    
    gsap.to(experimentArea, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        experimentArea.innerHTML = '<div class="placeholder-text">Click en los botones para iniciar experimentos virtuales</div>';
        experimentTitle.textContent = '🧪 Selecciona un experimento';
        
        gsap.to(experimentArea, {
          opacity: 1,
          duration: 0.3
        });
      }
    });
    
    this.updateLabStats(0, 0);
  }

  initializeLabStats() {
    this.labStartTime = Date.now();
    this.updateTimeCounter();
  }

  updateLabStats(experiments, concepts) {
    const experimentsEl = document.getElementById('experiments-run');
    const conceptsEl = document.getElementById('concepts-explored');
    
    if (experimentsEl) {
      gsap.to(experimentsEl, {
        textContent: experiments,
        duration: 0.5,
        snap: { textContent: 1 }
      });
    }
    
    if (conceptsEl) {
      gsap.to(conceptsEl, {
        textContent: concepts,
        duration: 0.5,
        snap: { textContent: 1 }
      });
    }
  }

  updateTimeCounter() {
    const timeEl = document.getElementById('time-spent');
    if (timeEl && this.labStartTime) {
      const elapsed = Math.floor((Date.now() - this.labStartTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    setTimeout(() => this.updateTimeCounter(), 1000);
  }
}

// ===== INICIALIZACIÓN =====
const presentationManager = new AdvancedPresentationManager();

// Exportar para debug
window.presentationManager = presentationManager;
window.debugSlides = {
  current: () => presentationManager.currentSlide,
  total: () => presentationManager.totalSlides,
  goto: (n) => presentationManager.goToSlide(n),
  next: () => presentationManager.nextSlide(),
  prev: () => presentationManager.previousSlide(),
  autoplay: () => presentationManager.toggleAutoplay()
};

console.log('🎯 Presentación avanzada cargada. Usa window.debugSlides para debug.');
