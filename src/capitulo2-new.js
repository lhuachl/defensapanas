/**
 * CAPÍTULO 2: LA CÉLULA Y SUS FUNCIONES
 * Sistema de navegación para presentación de diapositivas
 */

class Capitulo2Presentation {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 12;
    this.slides = [];
    this.init();
  }

  init() {
    console.log('🔬 Inicializando Capítulo 2: La Célula y sus Funciones');
    
    this.setupSlides();
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.updateProgress();
    this.startAnimations();
    
    console.log(`📊 Presentación inicializada con ${this.totalSlides} diapositivas`);
  }

  setupSlides() {
    this.slides = document.querySelectorAll('.slide');
    
    // Configurar estado inicial
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev');
      if (index === 0) {
        slide.classList.add('active');
      }
    });

    // Actualizar contador total de slides
    const totalSlidesElement = document.getElementById('totalSlides');
    if (totalSlidesElement) {
      totalSlidesElement.textContent = this.totalSlides;
    }
  }

  setupEventListeners() {
    // Botones de navegación
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousSlide());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Navegación táctil para dispositivos móviles
    this.setupTouchNavigation();

    // Navegación con rueda del mouse
    this.setupWheelNavigation();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          this.previousSlide();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          event.preventDefault();
          this.nextSlide();
          break;
        case 'Home':
          event.preventDefault();
          this.goToSlide(1);
          break;
        case 'End':
          event.preventDefault();
          this.goToSlide(this.totalSlides);
          break;
        case 'Escape':
          // Opción para volver al menú principal
          if (confirm('¿Deseas volver a la presentación principal?')) {
            window.location.href = '../index.html';
          }
          break;
      }
    });
  }

  setupTouchNavigation() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const container = document.querySelector('.slides-container');
    if (!container) return;

    container.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    });

    container.addEventListener('touchend', (event) => {
      endX = event.changedTouches[0].clientX;
      endY = event.changedTouches[0].clientY;
      this.handleSwipe();
    });

    const handleSwipe = () => {
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const minSwipeDistance = 50;

      // Solo procesar swipes horizontales significativos
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          this.previousSlide(); // Swipe derecha = slide anterior
        } else {
          this.nextSlide(); // Swipe izquierda = slide siguiente
        }
      }
    };

    this.handleSwipe = handleSwipe;
  }

  setupWheelNavigation() {
    let lastWheelTime = 0;
    const wheelCooldown = 500; // ms

    document.addEventListener('wheel', (event) => {
      const now = Date.now();
      if (now - lastWheelTime < wheelCooldown) return;

      if (Math.abs(event.deltaY) > 10) {
        event.preventDefault();
        lastWheelTime = now;

        if (event.deltaY > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
    }, { passive: false });
  }

  nextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.goToSlide(this.currentSlide + 1);
    } else {
      // En la última slide, preguntar si quiere volver al inicio
      if (confirm('Has llegado al final del capítulo. ¿Deseas volver al inicio?')) {
        this.goToSlide(1);
      }
    }
  }

  previousSlide() {
    if (this.currentSlide > 1) {
      this.goToSlide(this.currentSlide - 1);
    } else {
      // En la primera slide, opción de volver al menú
      if (confirm('Estás en la primera diapositiva. ¿Deseas volver al menú principal?')) {
        window.location.href = '../index.html';
      }
    }
  }

  goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > this.totalSlides) return;

    console.log(`📊 Navegando a diapositiva ${slideNumber} de ${this.totalSlides}`);

    const previousSlideIndex = this.currentSlide - 1;
    const currentSlideIndex = slideNumber - 1;

    // Remover clases activas
    this.slides.forEach(slide => {
      slide.classList.remove('active', 'prev');
    });

    // Configurar slide anterior
    if (this.slides[previousSlideIndex]) {
      this.slides[previousSlideIndex].classList.add('prev');
    }

    // Configurar slide actual
    if (this.slides[currentSlideIndex]) {
      this.slides[currentSlideIndex].classList.add('active');
    }

    this.currentSlide = slideNumber;
    this.updateProgress();
    this.triggerSlideAnimations(slideNumber);
    
    // Actualizar URL para navegación directa (opcional)
    this.updateURL();
  }

  updateProgress() {
    // Actualizar contador de slide
    const currentSlideElement = document.getElementById('currentSlide');
    if (currentSlideElement) {
      currentSlideElement.textContent = this.currentSlide;
    }

    // Actualizar barra de progreso
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      const percentage = (this.currentSlide / this.totalSlides) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    // Actualizar estado de botones
    this.updateNavigationButtons();
  }

  updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
      prevBtn.style.opacity = this.currentSlide === 1 ? '0.5' : '1';
      prevBtn.disabled = this.currentSlide === 1;
    }

    if (nextBtn) {
      nextBtn.style.opacity = this.currentSlide === this.totalSlides ? '0.5' : '1';
      nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
  }

  triggerSlideAnimations(slideNumber) {
    const currentSlideElement = this.slides[slideNumber - 1];
    if (!currentSlideElement) return;

    // Reiniciar animaciones de elementos específicos
    const animatedElements = currentSlideElement.querySelectorAll('.animate-on-enter');
    animatedElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.1}s`;
      element.classList.remove('animate-on-enter');
      setTimeout(() => {
        element.classList.add('animate-on-enter');
      }, 50);
    });

    // Animaciones específicas por slide
    this.runSlideSpecificAnimations(slideNumber);
  }

  runSlideSpecificAnimations(slideNumber) {
    switch (slideNumber) {
      case 1:
        this.animateIntroSlide();
        break;
      case 2:
        this.animateCellStructure();
        break;
      case 8:
        this.animateMitochondria();
        break;
      // Agregar más animaciones específicas según sea necesario
    }
  }

  animateIntroSlide() {
    const organelles = document.querySelectorAll('.organelle');
    organelles.forEach((organelle, index) => {
      organelle.style.animationDelay = `${index * 0.5}s`;
    });
  }

  animateCellStructure() {
    const parts = document.querySelectorAll('.part-card');
    parts.forEach((part, index) => {
      setTimeout(() => {
        part.style.transform = 'translateY(0) scale(1)';
        part.style.opacity = '1';
      }, index * 200);
    });
  }

  animateMitochondria() {
    const atpProcess = document.querySelector('.atp-process');
    if (atpProcess) {
      const steps = atpProcess.querySelectorAll('.process-step');
      steps.forEach((step, index) => {
        setTimeout(() => {
          step.style.background = 'var(--success-color)';
          step.style.color = 'white';
          step.style.transform = 'scale(1.05)';
        }, index * 1000);
      });
    }
  }

  startAnimations() {
    // Iniciar animaciones de fondo
    this.startBackgroundAnimations();
    
    // Iniciar animaciones de la primera slide
    this.triggerSlideAnimations(1);
  }

  startBackgroundAnimations() {
    // Animación de partículas de fondo (opcional)
    this.createFloatingParticles();
  }

  createFloatingParticles() {
    const container = document.querySelector('.chapter-presentation-container');
    if (!container) return;

    // Crear partículas flotantes sutiles
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: rgba(79, 70, 229, 0.1);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        animation: floatParticle ${Math.random() * 10 + 10}s infinite linear;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      container.appendChild(particle);
    }

    // Agregar CSS para animación de partículas
    if (!document.getElementById('particle-styles')) {
      const style = document.createElement('style');
      style.id = 'particle-styles';
      style.textContent = `
        @keyframes floatParticle {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  updateURL() {
    // Actualizar URL sin recargar la página
    const newURL = `${window.location.pathname}#slide-${this.currentSlide}`;
    window.history.replaceState({ slide: this.currentSlide }, '', newURL);
  }

  // Función para navegar desde URL
  navigateFromURL() {
    const hash = window.location.hash;
    const slideMatch = hash.match(/#slide-(\d+)/);
    
    if (slideMatch) {
      const slideNumber = parseInt(slideMatch[1]);
      if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
        this.goToSlide(slideNumber);
      }
    }
  }

  // Métodos públicos para control externo
  getCurrentSlide() {
    return this.currentSlide;
  }

  getTotalSlides() {
    return this.totalSlides;
  }

  // Método para limpiar event listeners al destruir
  destroy() {
    // Remover event listeners
    document.removeEventListener('keydown', this.keyboardHandler);
    
    // Limpiar partículas
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach(particle => particle.remove());
    
    console.log('🧹 Presentación del Capítulo 2 destruida');
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔬 DOM cargado, inicializando Capítulo 2...');
  
  // Crear instancia global de la presentación
  window.capitulo2Presentation = new Capitulo2Presentation();
  
  // Manejar navegación desde URL
  window.capitulo2Presentation.navigateFromURL();
  
  // Manejar cambios en el historial del navegador
  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.slide) {
      window.capitulo2Presentation.goToSlide(event.state.slide);
    }
  });
  
  // Prevenir zoom accidental en dispositivos móviles
  document.addEventListener('gesturestart', (event) => {
    event.preventDefault();
  });
  
  // Optimización de rendimiento
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pausar animaciones cuando la pestaña no está visible
      document.body.style.animationPlayState = 'paused';
    } else {
      // Reanudar animaciones
      document.body.style.animationPlayState = 'running';
    }
  });
});

// Limpiar recursos antes de salir de la página
window.addEventListener('beforeunload', () => {
  if (window.capitulo2Presentation) {
    window.capitulo2Presentation.destroy();
  }
});

// Funciones de utilidad adicionales
const CellularUtils = {
  // Función para mostrar información adicional de organelos
  showOrganelleInfo(organelleName) {
    const infoMap = {
      nucleus: {
        name: 'Núcleo',
        description: 'Centro de control celular que contiene el ADN',
        functions: ['Control genético', 'Transcripción', 'Regulación celular']
      },
      mitochondria: {
        name: 'Mitocondrias',
        description: 'Centrales energéticas que producen ATP',
        functions: ['Respiración celular', 'Producción de ATP', 'Regulación metabólica']
      },
      golgi: {
        name: 'Aparato de Golgi',
        description: 'Centro de procesamiento y empaquetamiento',
        functions: ['Modificación de proteínas', 'Empaquetamiento', 'Secreción']
      }
    };

    const info = infoMap[organelleName];
    if (info) {
      console.log(`📖 ${info.name}: ${info.description}`);
      console.log('🔧 Funciones:', info.functions.join(', '));
    }
  },

  // Función para destacar elementos relacionados
  highlightRelatedElements(elementType) {
    const elements = document.querySelectorAll(`[data-element="${elementType}"]`);
    elements.forEach(element => {
      element.classList.add('highlighted');
      setTimeout(() => {
        element.classList.remove('highlighted');
      }, 2000);
    });
  },

  // Función para exportar progreso
  exportProgress() {
    const progress = {
      currentSlide: window.capitulo2Presentation?.getCurrentSlide() || 1,
      totalSlides: window.capitulo2Presentation?.getTotalSlides() || 12,
      timestamp: new Date().toISOString(),
      chapter: 'Capítulo 2: La Célula y sus Funciones'
    };
    
    localStorage.setItem('capitulo2_progress', JSON.stringify(progress));
    console.log('💾 Progreso guardado:', progress);
    return progress;
  },

  // Función para cargar progreso
  loadProgress() {
    const saved = localStorage.getItem('capitulo2_progress');
    if (saved) {
      const progress = JSON.parse(saved);
      console.log('📂 Progreso cargado:', progress);
      return progress;
    }
    return null;
  }
};

// Exportar para uso global
window.CellularUtils = CellularUtils;

console.log('✅ Capítulo 2: Sistema de navegación cargado completamente');
