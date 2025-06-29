// Capítulo 4: Transporte de Sustancias con Animaciones Avanzadas
import { gsap } from 'gsap';
import { slideAnimations } from './slide-animations.js';
import { backgroundParticles } from './background-particles.js';

class Capitulo4Enhanced {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 0;
    this.isInitialized = false;
    this.membraneAnimations = [];
    this.interactiveElements = [];
  }

  init() {
    if (this.isInitialized) return;
    
    this.setupSlides();
    this.initializeAnimations();
    this.createInteractiveElements();
    this.bindEvents();
    this.startBackgroundEffects();
    
    this.isInitialized = true;
    console.log('Capítulo 4 Enhanced initialized');
  }

  setupSlides() {
    const slides = document.querySelectorAll('.slide');
    this.totalSlides = slides.length;
    
    // Actualizar contador total
    const totalSlidesSpan = document.getElementById('totalSlides');
    if (totalSlidesSpan) {
      totalSlidesSpan.textContent = this.totalSlides;
    }
    
    // Inicializar sistema de animaciones
    slideAnimations.init(slides);
  }

  initializeAnimations() {
    // Inicializar partículas de fondo
    backgroundParticles.init();
    
    // Animar entrada inicial
    this.animateInitialEntry();
    
    // Configurar animaciones por slide
    this.setupSlideSpecificAnimations();
  }

  animateInitialEntry() {
    const header = document.querySelector('.chapter-header');
    const firstSlide = document.querySelector('.slide.active');
    
    // Animar header
    if (header) {
      gsap.fromTo(header, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
    
    // Animar primera slide
    if (firstSlide) {
      this.animateSlideContent(firstSlide);
    }
  }

  setupSlideSpecificAnimations() {
    // Slide 1: Animación de membrana celular
    this.setupMembraneAnimation();
    
    // Slide 2: Animación de estructura
    this.setupStructureAnimation();
    
    // Slide 3: Animación de tipos de transporte
    this.setupTransportAnimation();
    
    // Slide 4: Animación de difusión
    this.setupDiffusionAnimation();
    
    // Slides adicionales
    this.setupAdvancedAnimations();
  }

  setupMembraneAnimation() {
    const membraneVisual = document.querySelector('.membrane-visual');
    if (!membraneVisual) return;
    
    const lipidBilayer = membraneVisual.querySelector('.lipid-bilayer');
    const proteins = membraneVisual.querySelectorAll('.membrane-proteins > div');
    
    if (lipidBilayer) {
      // Animación continua de la bicapa
      gsap.to(lipidBilayer, {
        rotationY: 5,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    }
    
    // Animar proteínas
    proteins.forEach((protein, index) => {
      gsap.to(protein, {
        y: "+=10",
        duration: 2 + index * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 0.3
      });
    });
  }

  bindEvents() {
    // Navegación mejorada
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        slideAnimations.prevSlide();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        slideAnimations.nextSlide();
      });
    }
  }

  setupAdvancedAnimations() {
    // Animaciones para acuaporinas
    const aquaporins = document.querySelectorAll('.aquaporin');
    aquaporins.forEach(aquaporin => {
      const waterMolecules = aquaporin.querySelectorAll('.water-molecule');
      
      waterMolecules.forEach((water, index) => {
        gsap.to(water, {
          y: "+=20",
          duration: 1.5,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.3
        });
      });
    });
    
    // Animaciones para canales proteicos
    const channels = document.querySelectorAll('.channel-pore');
    channels.forEach(channel => {
      gsap.to(channel, {
        scale: 1.05,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    });
    
    // Configurar galería visual interactiva
    this.setupVisualGallery();
  }

  setupVisualGallery() {
    const visualCards = document.querySelectorAll('.visual-card');
    const controlBtns = document.querySelectorAll('.control-btn');
    
    // Efectos hover para las tarjetas
    visualCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.activateCardEffect(card);
      });
      
      card.addEventListener('click', () => {
        this.showCardDetail(card);
      });
    });
    
    // Controles de efectos
    controlBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const effect = btn.dataset.effect;
        this.applyGlobalEffect(effect);
      });
    });
  }

  activateCardEffect(card) {
    // Crear partículas específicas para cada tipo de tarjeta
    if (card.classList.contains('membrane-3d')) {
      this.createMembraneParticles(card);
    } else if (card.classList.contains('transport-process')) {
      this.createTransportAnimation(card);
    } else if (card.classList.contains('diffusion-demo')) {
      this.createDiffusionEffect(card);
    } else if (card.classList.contains('osmosis-visual')) {
      this.createOsmosisEffect(card);
    }
  }

  createMembraneParticles(card) {
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 3px;
        height: 3px;
        background: linear-gradient(45deg, #FFD700, #1a73e8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top + Math.random() * rect.height}px;
      `;
      
      document.body.appendChild(particle);
      
      gsap.to(particle, {
        y: -50 - Math.random() * 50,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 2,
        duration: 2,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    }
  }

  createTransportAnimation(card) {
    const indicator = card.querySelector('.animation-indicator');
    if (indicator) {
      gsap.fromTo(indicator, 
        { scale: 1, rotation: 0 },
        { 
          scale: 1.5, 
          rotation: 360, 
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            gsap.to(indicator, { scale: 1, rotation: 0, duration: 0.3 });
          }
        }
      );
    }
  }

  createDiffusionEffect(card) {
    const particles = card.querySelectorAll('.diffusion-particles .particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        scale: 1.5,
        duration: 1,
        ease: "power2.out",
        delay: index * 0.2,
        onComplete: () => {
          gsap.to(particle, { x: 0, y: 0, scale: 1, duration: 0.5 });
        }
      });
    });
  }

  createOsmosisEffect(card) {
    const waterFlow = card.querySelector('.water-flow-animation');
    if (waterFlow) {
      // Crear múltiples gotas de agua
      for (let i = 0; i < 5; i++) {
        const drop = waterFlow.cloneNode(true);
        card.appendChild(drop);
        
        gsap.fromTo(drop,
          { x: 0, y: 0, scale: 0 },
          {
            x: 200 + i * 20,
            y: -50 + i * 10,
            scale: 1.5,
            duration: 2,
            delay: i * 0.3,
            ease: "power2.out",
            onComplete: () => drop.remove()
          }
        );
      }
    }
  }

  applyGlobalEffect(effect) {
    const visualCards = document.querySelectorAll('.visual-card');
    
    visualCards.forEach((card, index) => {
      card.classList.remove('effect-pulse', 'effect-rotate', 'effect-zoom', 'effect-flow');
      
      setTimeout(() => {
        card.classList.add(`effect-${effect}`);
      }, index * 100);
    });
    
    // Remover clases después de la animación
    setTimeout(() => {
      visualCards.forEach(card => {
        card.classList.remove(`effect-${effect}`);
      });
    }, 3000);
  }

  showCardDetail(card) {
    const cardType = card.dataset.info;
    const details = {
      membrana: {
        title: "Estructura Tridimensional de la Membrana",
        content: "Visualización detallada de la bicapa lipídica con proteínas integradas, mostrando la disposición molecular en tiempo real.",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop"
      },
      transporte: {
        title: "Mecanismos de Transporte Activo",
        content: "Animación de las bombas moleculares (Na+/K+, Ca2+) mostrando el consumo de ATP y el movimiento direccional de iones.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
      },
      difusion: {
        title: "Simulación de Difusión Molecular",
        content: "Representación del movimiento browniano y la distribución estadística de moléculas a través de gradientes de concentración.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop"
      },
      osmosis: {
        title: "Dinámica de la Osmosis",
        content: "Visualización del flujo de agua a través de membranas semipermeables y el equilibrio de presiones osmóticas.",
        image: "https://images.unsplash.com/photo-1569163008819-de4e6d5a883b?w=600&h=400&fit=crop"
      }
    };
    
    const detail = details[cardType] || details.membrana;
    this.showDetailModal({ dataset: { info: cardType } }, Object.keys(details).indexOf(cardType));
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const capitulo4 = new Capitulo4Enhanced();
  capitulo4.init();
});

// Exportar para uso global
window.Capitulo4Enhanced = Capitulo4Enhanced;
