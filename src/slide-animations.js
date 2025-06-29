// Sistema avanzado de animaciones para slides con GSAP
import { gsap } from 'gsap';

export class SlideAnimations {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 0;
    this.isAnimating = false;
    this.animationTypes = [
      'slideFromRight',
      'slideFromLeft', 
      'fadeScale',
      'rotateIn',
      'flipCard',
      'morphTransition',
      'particleExplode',
      'liquidMorph',
      'cubeRotate',
      'zoomBlur'
    ];
    this.currentAnimationType = 0;
  }

  init(slides) {
    this.totalSlides = slides.length;
    this.setupSlides(slides);
    this.createAnimationControls();
    this.bindEvents();
  }

  setupSlides(slides) {
    // Configurar posiciones iniciales
    gsap.set(slides, { 
      opacity: 0,
      scale: 0.8,
      rotationY: 0,
      z: 0,
      transformOrigin: "center center"
    });
    
    // Mostrar primera slide
    if (slides[0]) {
      gsap.set(slides[0], { 
        opacity: 1, 
        scale: 1,
        className: "+=active"
      });
    }
  }

  // 1. Slide desde la derecha con parallax
  slideFromRight(currentSlide, nextSlide, direction = 1) {
    const tl = gsap.timeline();
    
    tl.to(currentSlide, {
      x: -window.innerWidth * direction,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut"
    })
    .set(nextSlide, {
      x: window.innerWidth * direction,
      opacity: 1,
      scale: 1
    })
    .to(nextSlide, {
      x: 0,
      duration: 0.8,
      ease: "power3.inOut"
    }, 0.2);

    return tl;
  }

  // 2. Slide desde la izquierda con rebote
  slideFromLeft(currentSlide, nextSlide, direction = -1) {
    const tl = gsap.timeline();
    
    tl.to(currentSlide, {
      x: -window.innerWidth * direction,
      rotationY: -15,
      scale: 0.9,
      opacity: 0,
      duration: 0.7,
      ease: "back.in(1.7)"
    })
    .set(nextSlide, {
      x: window.innerWidth * direction,
      rotationY: 15,
      scale: 0.9,
      opacity: 1
    })
    .to(nextSlide, {
      x: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.7)"
    }, 0.2);

    return tl;
  }

  // 3. Fade con escala y rotación
  fadeScale(currentSlide, nextSlide) {
    const tl = gsap.timeline();
    
    tl.to(currentSlide, {
      scale: 0.5,
      opacity: 0,
      rotation: -5,
      duration: 0.5,
      ease: "power2.in"
    })
    .set(nextSlide, {
      scale: 1.5,
      opacity: 0,
      rotation: 5
    })
    .to(nextSlide, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)"
    }, 0.3);

    return tl;
  }

  // 4. Rotación 3D tipo tarjeta
  flipCard(currentSlide, nextSlide) {
    const tl = gsap.timeline();
    
    tl.to(currentSlide, {
      rotationY: -90,
      duration: 0.4,
      ease: "power2.in",
      transformOrigin: "center center"
    })
    .set(nextSlide, {
      rotationY: 90,
      opacity: 1,
      scale: 1
    })
    .to(nextSlide, {
      rotationY: 0,
      duration: 0.4,
      ease: "power2.out"
    });

    return tl;
  }

  // 5. Rotación como tarjeta
  rotateIn(currentSlide, nextSlide) {
    const tl = gsap.timeline();
    
    tl.to(currentSlide, {
      rotationX: 70,
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in"
    })
    .set(nextSlide, {
      rotationX: -70,
      scale: 0.8,
      opacity: 1
    })
    .to(nextSlide, {
      rotationX: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(2)"
    }, 0.2);

    return tl;
  }

  // 6. Transición morfológica
  morphTransition(currentSlide, nextSlide) {
    const tl = gsap.timeline();
    
    tl.to(currentSlide, {
      clipPath: "polygon(0% 0%, 100% 0%, 50% 50%, 0% 100%)",
      scale: 0.7,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut"
    })
    .set(nextSlide, {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      opacity: 1,
      scale: 0.7
    })
    .to(nextSlide, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scale: 1,
      duration: 0.8,
      ease: "power3.inOut"
    }, 0.2);

    return tl;
  }

  // 7. Explosión de partículas
  particleExplode(currentSlide, nextSlide) {
    const tl = gsap.timeline();
    
    // Crear partículas temporales
    this.createParticles(currentSlide);
    
    tl.to(currentSlide, {
      scale: 1.2,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    })
    .set(nextSlide, {
      scale: 0.5,
      opacity: 0
    })
    .to(nextSlide, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)"
    }, 0.4);

    return tl;
  }

  // 8. Transición líquida
  liquidMorph(currentSlide, nextSlide) {
    const tl = gsap.timeline();
    
    tl.to(currentSlide, {
      scaleY: 0,
      skewX: 5,
      transformOrigin: "center bottom",
      duration: 0.6,
      ease: "power3.in"
    })
    .set(nextSlide, {
      scaleY: 0,
      skewX: -5,
      transformOrigin: "center top",
      opacity: 1
    })
    .to(nextSlide, {
      scaleY: 1,
      skewX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)"
    }, 0.1);

    return tl;
  }

  // 9. Rotación de cubo 3D
  cubeRotate(currentSlide, nextSlide) {
    const tl = gsap.timeline();
    
    tl.to(currentSlide, {
      rotationY: -180,
      z: -500,
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    })
    .set(nextSlide, {
      rotationY: 180,
      z: -500,
      opacity: 1
    })
    .to(nextSlide, {
      rotationY: 0,
      z: 0,
      duration: 1,
      ease: "power2.inOut"
    }, 0.5);

    return tl;
  }

  // 10. Zoom con desenfoque
  zoomBlur(currentSlide, nextSlide) {
    const tl = gsap.timeline();
    
    tl.to(currentSlide, {
      scale: 2,
      opacity: 0,
      filter: "blur(20px)",
      duration: 0.6,
      ease: "power3.in"
    })
    .set(nextSlide, {
      scale: 0.5,
      opacity: 0,
      filter: "blur(10px)"
    })
    .to(nextSlide, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out"
    }, 0.3);

    return tl;
  }

  // Crear partículas para efectos
  createParticles(element) {
    const particles = [];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #FFD700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${rect.left + rect.width/2}px;
        top: ${rect.top + rect.height/2}px;
      `;
      document.body.appendChild(particle);
      particles.push(particle);
      
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 600,
        opacity: 0,
        scale: Math.random() * 2,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  }

  // Transición principal
  transitionTo(slideIndex, direction = 1) {
    if (this.isAnimating) return;
    
    const slides = document.querySelectorAll('.slide');
    const currentSlide = slides[this.currentSlide];
    const nextSlide = slides[slideIndex];
    
    if (!nextSlide || slideIndex === this.currentSlide) return;
    
    this.isAnimating = true;
    
    // Obtener tipo de animación
    const animationType = this.animationTypes[this.currentAnimationType];
    
    // Ejecutar animación
    const animation = this[animationType](currentSlide, nextSlide, direction);
    
    animation.call(() => {
      // Limpiar clases
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
      
      // Actualizar índice
      this.currentSlide = slideIndex;
      this.isAnimating = false;
      
      // Actualizar indicadores
      this.updateProgress();
    });
    
    // Cambiar tipo de animación para la próxima
    this.currentAnimationType = (this.currentAnimationType + 1) % this.animationTypes.length;
  }

  // Crear controles de animación
  createAnimationControls() {
    const controlsHTML = `
      <div class="animation-controls">
        <button class="animation-btn" data-animation="slideFromRight">→</button>
        <button class="animation-btn" data-animation="slideFromLeft">←</button>
        <button class="animation-btn" data-animation="fadeScale">⚡</button>
        <button class="animation-btn" data-animation="flipCard">🔄</button>
        <button class="animation-btn" data-animation="rotateIn">↺</button>
        <button class="animation-btn" data-animation="morphTransition">◈</button>
        <button class="animation-btn" data-animation="particleExplode">💥</button>
        <button class="animation-btn" data-animation="liquidMorph">〰</button>
        <button class="animation-btn" data-animation="cubeRotate">🎲</button>
        <button class="animation-btn" data-animation="zoomBlur">🔍</button>
      </div>
    `;
    
    const container = document.querySelector('.navigation-controls');
    if (container) {
      container.insertAdjacentHTML('beforeend', controlsHTML);
    }
  }

  // Eventos
  bindEvents() {
    // Controles de animación
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('animation-btn')) {
        const animationType = e.target.dataset.animation;
        this.currentAnimationType = this.animationTypes.indexOf(animationType);
      }
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (this.isAnimating) return;
      
      switch(e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.prevSlide();
          break;
        case 'r':
          this.randomAnimation();
          break;
      }
    });

    // Gestos táctiles
    this.setupTouchGestures();
  }

  // Configurar gestos táctiles
  setupTouchGestures() {
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
      if (this.isAnimating) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.prevSlide();
        } else {
          this.nextSlide();
        }
      }
    });
  }

  // Navegación
  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides;
    this.transitionTo(nextIndex, 1);
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.transitionTo(prevIndex, -1);
  }

  randomAnimation() {
    this.currentAnimationType = Math.floor(Math.random() * this.animationTypes.length);
    this.nextSlide();
  }

  // Actualizar progreso
  updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const currentSlideSpan = document.getElementById('currentSlide');
    
    if (progressFill) {
      const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
      gsap.to(progressFill, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    
    if (currentSlideSpan) {
      currentSlideSpan.textContent = this.currentSlide + 1;
    }
  }
}

// Exportar también funciones individuales
export const slideAnimations = new SlideAnimations();
