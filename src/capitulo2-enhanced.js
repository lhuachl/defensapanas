// Capítulo 2: Enhanced Presentation Manager con GSAP y efectos parallax
import { gsap } from 'https://esm.sh/gsap';

class AdvancedPresentationManager {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 12;
    this.animationDuration = 0.8;
    this.isAnimating = false;
    this.isPlaying = false;
    this.parallaxIntensity = 0.3;
    this.effectsEnabled = true;
    
    // Configuración de transiciones aleatorias
    this.transitionTypes = [
      'slide', 'flip', 'zoom', 'cube', 'wave', 'spiral', 'fold'
    ];
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.initializeSlides();
    this.initializeParallax();
    this.updateProgress();
    this.createControlPanel();
    
    // Inicializar GSAP con configuración optimizada
    gsap.registerPlugin();
    gsap.config({ 
      autoSleep: 60,
      force3D: true,
      nullTargetWarn: false 
    });

    console.log('🎬 Advanced Presentation Manager - Capítulo 2 initialized');
  }

  bindEvents() {
    // Navegación con botones
    document.getElementById('prevBtn')?.addEventListener('click', () => this.previousSlide());
    document.getElementById('nextBtn')?.addEventListener('click', () => this.nextSlide());

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (this.isAnimating) return;
      
      switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          this.previousSlide();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'Home':
          this.goToSlide(1);
          break;
        case 'End':
          this.goToSlide(this.totalSlides);
          break;
        case 'r':
        case 'R':
          this.triggerRandomEffect();
          break;
        case 'p':
        case 'P':
          this.toggleAutoPlay();
          break;
        case 'f':
        case 'F':
          this.toggleFullscreen();
          break;
      }
    });

    // Efectos de mouse para parallax
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('click', (e) => this.handleClick(e));
    
    // Detección de scroll para efectos adicionales
    window.addEventListener('scroll', () => this.handleScroll());
    
    // Responsive handling
    window.addEventListener('resize', () => this.handleResize());
  }

  initializeSlides() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, index) => {
      if (index === 0) {
        slide.classList.add('active');
        gsap.set(slide, { opacity: 1, scale: 1, rotationY: 0 });
      } else {
        slide.classList.remove('active');
        gsap.set(slide, { opacity: 0, scale: 0.8, rotationY: 90 });
      }
      
      // Añadir efectos de entrada para elementos
      this.initializeSlideElements(slide, index);
    });

    // Precargar transiciones
    this.preloadTransitions();
  }

  initializeSlideElements(slide, slideIndex) {
    const elements = slide.querySelectorAll('.slide-title, .part-card, .component-card, .function-card, .summary-item');
    
    elements.forEach((element, index) => {
      gsap.set(element, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        rotation: Math.random() * 10 - 5
      });
    });
  }

  initializeParallax() {
    // Crear capas de parallax
    this.createParallaxLayers();
    
    // Configurar efectos 3D
    gsap.set('.slides-container', {
      perspective: 1000,
      transformStyle: 'preserve-3d'
    });
  }

  createParallaxLayers() {
    const container = document.querySelector('.chapter-presentation-container');
    
    // Capa de partículas flotantes
    const particlesLayer = document.createElement('div');
    particlesLayer.className = 'parallax-particles';
    container.appendChild(particlesLayer);
    
    // Crear partículas
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particlesLayer.appendChild(particle);
    }

    // Capa de efectos de luz
    const lightLayer = document.createElement('div');
    lightLayer.className = 'parallax-lights';
    container.appendChild(lightLayer);
  }

  createControlPanel() {
    const controlPanel = document.createElement('div');
    controlPanel.className = 'advanced-controls';
    controlPanel.innerHTML = `
      <div class="control-group">
        <button class="control-btn" data-action="random">🎲 Efecto Aleatorio</button>
        <button class="control-btn" data-action="parallax">🌊 Toggle Parallax</button>
        <button class="control-btn" data-action="fullscreen">🔍 Pantalla Completa</button>
        <button class="control-btn" data-action="autoplay">▶️ Auto Play</button>
      </div>
      <div class="info-panel">
        <span>Presiona R para efectos aleatorios, P para auto-play</span>
      </div>
    `;
    
    document.body.appendChild(controlPanel);
    
    // Bind events
    controlPanel.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (action) this.handleControlAction(action);
    });
  }

  handleControlAction(action) {
    switch(action) {
      case 'random':
        this.triggerRandomEffect();
        break;
      case 'parallax':
        this.toggleParallax();
        break;
      case 'fullscreen':
        this.toggleFullscreen();
        break;
      case 'autoplay':
        this.toggleAutoPlay();
        break;
    }
  }

  getRandomTransition() {
    const randomIndex = Math.floor(Math.random() * this.transitionTypes.length);
    return this.transitionTypes[randomIndex];
  }

  nextSlide() {
    if (this.isAnimating || this.currentSlide >= this.totalSlides) return;
    
    const transition = this.getRandomTransition();
    this.goToSlideWithTransition(this.currentSlide + 1, transition);
  }

  previousSlide() {
    if (this.isAnimating || this.currentSlide <= 1) return;
    
    const transition = this.getRandomTransition();
    this.goToSlideWithTransition(this.currentSlide - 1, transition);
  }

  goToSlide(slideNumber) {
    if (this.isAnimating || slideNumber === this.currentSlide) return;
    
    const transition = this.getRandomTransition();
    this.goToSlideWithTransition(slideNumber, transition);
  }

  goToSlideWithTransition(slideNumber, transitionType = 'slide') {
    if (this.isAnimating || slideNumber < 1 || slideNumber > this.totalSlides) return;
    
    this.isAnimating = true;
    const currentSlideElement = document.querySelector(`.slide[data-slide="${this.currentSlide}"]`);
    const nextSlideElement = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
    
    if (!currentSlideElement || !nextSlideElement) {
      this.isAnimating = false;
      return;
    }

    // Ejecutar transición según el tipo
    this.executeTransition(currentSlideElement, nextSlideElement, transitionType)
      .then(() => {
        this.currentSlide = slideNumber;
        this.updateProgress();
        this.animateSlideElements(nextSlideElement);
        this.isAnimating = false;
      });
  }

  executeTransition(currentSlide, nextSlide, type) {
    const tl = gsap.timeline();
    
    // Configurar posición inicial de la siguiente slide
    gsap.set(nextSlide, { opacity: 0 });
    
    switch(type) {
      case 'slide':
        return this.slideTransition(currentSlide, nextSlide, tl);
      case 'flip':
        return this.flipTransition(currentSlide, nextSlide, tl);
      case 'zoom':
        return this.zoomTransition(currentSlide, nextSlide, tl);
      case 'cube':
        return this.cubeTransition(currentSlide, nextSlide, tl);
      case 'wave':
        return this.waveTransition(currentSlide, nextSlide, tl);
      case 'spiral':
        return this.spiralTransition(currentSlide, nextSlide, tl);
      case 'fold':
        return this.foldTransition(currentSlide, nextSlide, tl);
      default:
        return this.slideTransition(currentSlide, nextSlide, tl);
    }
  }

  slideTransition(currentSlide, nextSlide, tl) {
    const direction = this.currentSlide < parseInt(nextSlide.dataset.slide) ? 1 : -1;
    
    gsap.set(nextSlide, { x: direction * 100 + '%', opacity: 1 });
    
    tl.to(currentSlide, { 
      x: -direction * 100 + '%', 
      opacity: 0, 
      duration: this.animationDuration,
      ease: "power2.inOut"
    })
    .to(nextSlide, { 
      x: '0%', 
      duration: this.animationDuration,
      ease: "power2.inOut"
    }, 0)
    .call(() => {
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
      gsap.set([currentSlide, nextSlide], { clearProps: "all" });
    });
    
    return tl;
  }

  flipTransition(currentSlide, nextSlide, tl) {
    tl.to(currentSlide, {
      rotationY: -90,
      duration: this.animationDuration / 2,
      ease: "power2.in"
    })
    .set(nextSlide, { rotationY: 90, opacity: 1 })
    .set(currentSlide, { opacity: 0 })
    .to(nextSlide, {
      rotationY: 0,
      duration: this.animationDuration / 2,
      ease: "power2.out"
    })
    .call(() => {
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
      gsap.set([currentSlide, nextSlide], { clearProps: "all" });
    });
    
    return tl;
  }

  zoomTransition(currentSlide, nextSlide, tl) {
    gsap.set(nextSlide, { scale: 0, opacity: 1 });
    
    tl.to(currentSlide, {
      scale: 2,
      opacity: 0,
      duration: this.animationDuration,
      ease: "power2.inOut"
    })
    .to(nextSlide, {
      scale: 1,
      duration: this.animationDuration,
      ease: "back.out(1.7)"
    }, 0.2)
    .call(() => {
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
      gsap.set([currentSlide, nextSlide], { clearProps: "all" });
    });
    
    return tl;
  }

  cubeTransition(currentSlide, nextSlide, tl) {
    const container = document.querySelector('.slides-container');
    gsap.set(container, { perspective: 1000 });
    
    tl.to(currentSlide, {
      rotationY: -90,
      transformOrigin: "right center",
      duration: this.animationDuration,
      ease: "power2.inOut"
    })
    .set(nextSlide, { 
      rotationY: 90, 
      transformOrigin: "left center",
      opacity: 1 
    })
    .set(currentSlide, { opacity: 0 })
    .to(nextSlide, {
      rotationY: 0,
      duration: this.animationDuration,
      ease: "power2.inOut"
    }, this.animationDuration * 0.5)
    .call(() => {
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
      gsap.set([currentSlide, nextSlide], { clearProps: "all" });
    });
    
    return tl;
  }

  waveTransition(currentSlide, nextSlide, tl) {
    const elements = currentSlide.querySelectorAll('.slide-content > *');
    const nextElements = nextSlide.querySelectorAll('.slide-content > *');
    
    gsap.set(nextSlide, { opacity: 1 });
    gsap.set(nextElements, { y: 100, opacity: 0 });
    
    tl.staggerTo(elements, 0.3, {
      y: -100,
      opacity: 0,
      ease: "power2.in"
    }, 0.1)
    .call(() => {
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
    })
    .staggerTo(nextElements, 0.4, {
      y: 0,
      opacity: 1,
      ease: "back.out(1.7)"
    }, 0.1, this.animationDuration * 0.3)
    .call(() => {
      gsap.set([currentSlide, nextSlide], { clearProps: "all" });
      gsap.set([...elements, ...nextElements], { clearProps: "all" });
    });
    
    return tl;
  }

  spiralTransition(currentSlide, nextSlide, tl) {
    gsap.set(nextSlide, { scale: 0, rotation: 180, opacity: 1 });
    
    tl.to(currentSlide, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: this.animationDuration,
      ease: "power2.inOut"
    })
    .to(nextSlide, {
      scale: 1,
      rotation: 0,
      duration: this.animationDuration,
      ease: "back.out(1.7)"
    }, 0.2)
    .call(() => {
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
      gsap.set([currentSlide, nextSlide], { clearProps: "all" });
    });
    
    return tl;
  }

  foldTransition(currentSlide, nextSlide, tl) {
    const currentContent = currentSlide.querySelector('.slide-content');
    const nextContent = nextSlide.querySelector('.slide-content');
    
    gsap.set(nextSlide, { opacity: 1 });
    gsap.set(nextContent, { rotationX: -90, transformOrigin: "top" });
    
    tl.to(currentContent, {
      rotationX: 90,
      transformOrigin: "bottom",
      duration: this.animationDuration / 2,
      ease: "power2.inOut"
    })
    .set(currentSlide, { opacity: 0 })
    .to(nextContent, {
      rotationX: 0,
      duration: this.animationDuration / 2,
      ease: "power2.out"
    })
    .call(() => {
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
      gsap.set([currentSlide, nextSlide], { clearProps: "all" });
      gsap.set([currentContent, nextContent], { clearProps: "all" });
    });
    
    return tl;
  }

  animateSlideElements(slide) {
    const elements = slide.querySelectorAll('.slide-title, .part-card, .component-card, .function-card, .summary-item');
    
    gsap.set(elements, {
      opacity: 0,
      y: 50,
      scale: 0.9
    });
    
    gsap.staggerTo(elements, 0.6, {
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "back.out(1.7)"
    }, 0.1);
  }

  updateProgress() {
    document.getElementById('currentSlide').textContent = this.currentSlide;
    
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = (this.currentSlide / this.totalSlides) * 100;
    
    gsap.to(progressFill, {
      width: progressPercentage + '%',
      duration: 0.5,
      ease: "power2.out"
    });
  }

  preloadTransitions() {
    // Precargar recursos necesarios para transiciones
    console.log('🎯 Transiciones precargadas');
  }

  handleMouseMove(e) {
    if (!this.effectsEnabled) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPercent = (clientX / innerWidth - 0.5) * 2;
    const yPercent = (clientY / innerHeight - 0.5) * 2;
    
    // Efecto parallax sutil en elementos
    const parallaxElements = document.querySelectorAll('.part-card, .component-card, .function-card');
    
    parallaxElements.forEach((element, index) => {
      const intensity = (index % 3 + 1) * this.parallaxIntensity;
      gsap.to(element, {
        x: xPercent * intensity * 10,
        y: yPercent * intensity * 10,
        rotationY: xPercent * intensity * 5,
        rotationX: -yPercent * intensity * 5,
        duration: 0.8,
        ease: "power2.out"
      });
    });
    
    // Mover partículas
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach((particle, index) => {
      const intensity = (index % 4 + 1) * 0.1;
      gsap.to(particle, {
        x: xPercent * intensity * 20,
        y: yPercent * intensity * 20,
        duration: 1.2,
        ease: "power1.out"
      });
    });
  }

  handleClick(e) {
    if (!this.effectsEnabled) return;
    
    // Efecto de click con ondas
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    
    document.body.appendChild(ripple);
    
    gsap.fromTo(ripple, 
      { scale: 0, opacity: 1 },
      { 
        scale: 3, 
        opacity: 0, 
        duration: 0.8, 
        ease: "power2.out",
        onComplete: () => ripple.remove()
      }
    );
  }

  handleScroll() {
    // Efecto de distorsión al hacer scroll
    const scrollY = window.scrollY;
    const container = document.querySelector('.slides-container');
    
    gsap.to(container, {
      skewY: Math.min(scrollY * 0.01, 2),
      duration: 0.5,
      ease: "power2.out"
    });
  }

  handleResize() {
    // Reajustar efectos al cambiar tamaño
    this.initializeParallax();
  }

  triggerRandomEffect() {
    if (!this.effectsEnabled) return;
    
    const effects = [
      () => this.glitchEffect(),
      () => this.shakeEffect(),
      () => this.colorWaveEffect(),
      () => this.pulseEffect(),
      () => this.rotationEffect()
    ];
    
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
  }

  glitchEffect() {
    const activeSlide = document.querySelector('.slide.active');
    const elements = activeSlide.querySelectorAll('.slide-content > *');
    
    elements.forEach((element, index) => {
      gsap.timeline()
        .to(element, { x: Math.random() * 20 - 10, duration: 0.1 })
        .to(element, { x: Math.random() * 20 - 10, duration: 0.1 })
        .to(element, { x: 0, duration: 0.1 });
    });
  }

  shakeEffect() {
    const container = document.querySelector('.slides-container');
    
    gsap.timeline()
      .to(container, { x: 5, duration: 0.1 })
      .to(container, { x: -5, duration: 0.1 })
      .to(container, { x: 3, duration: 0.1 })
      .to(container, { x: -3, duration: 0.1 })
      .to(container, { x: 0, duration: 0.1 });
  }

  colorWaveEffect() {
    const elements = document.querySelectorAll('.part-card, .component-card, .function-card');
    
    gsap.staggerTo(elements, 0.3, {
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 85%)`,
      scale: 1.05,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    }, 0.1);
  }

  pulseEffect() {
    const activeSlide = document.querySelector('.slide.active');
    
    gsap.to(activeSlide, {
      scale: 1.02,
      duration: 0.3,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut"
    });
  }

  rotationEffect() {
    const cards = document.querySelectorAll('.part-card, .component-card, .function-card');
    
    cards.forEach(card => {
      gsap.to(card, {
        rotation: 360,
        duration: 1,
        ease: "power2.inOut"
      });
    });
  }

  toggleParallax() {
    this.effectsEnabled = !this.effectsEnabled;
    
    if (!this.effectsEnabled) {
      // Resetear posiciones
      gsap.to('.part-card, .component-card, .function-card', {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.5
      });
    }
    
    console.log(`🌊 Parallax ${this.effectsEnabled ? 'activado' : 'desactivado'}`);
  }

  toggleAutoPlay() {
    this.isPlaying = !this.isPlaying;
    
    if (this.isPlaying) {
      this.autoPlayInterval = setInterval(() => {
        if (this.currentSlide >= this.totalSlides) {
          this.goToSlide(1);
        } else {
          this.nextSlide();
        }
      }, 5000);
      console.log('▶️ Auto-play activado');
    } else {
      clearInterval(this.autoPlayInterval);
      console.log('⏸️ Auto-play desactivado');
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new AdvancedPresentationManager();
});

// Estilos CSS dinámicos
const dynamicStyles = `
  .click-ripple {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(255, 215, 0, 0.6);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
  }

  .floating-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 215, 0, 0.6);
    border-radius: 50%;
    pointer-events: none;
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }

  .advanced-controls {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.8);
    padding: 15px;
    border-radius: 10px;
    z-index: 1000;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.3);
  }

  .control-group {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }

  .control-btn {
    padding: 8px 12px;
    background: rgba(255, 215, 0, 0.2);
    border: 1px solid rgba(255, 215, 0, 0.5);
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s ease;
  }

  .control-btn:hover {
    background: rgba(255, 215, 0, 0.4);
    transform: translateY(-2px);
  }

  .info-panel {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
  }

  .parallax-particles,
  .parallax-lights {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
`;

// Inyectar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
