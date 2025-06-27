// Capítulo 2: La Célula y sus Funciones - JavaScript
import { Cell3DModel, Heart3DModel } from './models-visual.js'

// Estado de la presentación del capítulo
let currentSlide = 1;
const totalSlides = 12;

// Modelos visuales específicos del capítulo
let chapterModels = {};

// Función para inicializar cuando el DOM esté listo
function initializeChapter2() {
  console.log('Inicializando Capítulo 2...');
  
  // Elementos del DOM
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressFill = document.querySelector('.progress-fill');
  const currentSlideCounter = document.getElementById('currentSlide');
  const totalSlidesCounter = document.getElementById('totalSlides');

  console.log(`Encontrados ${slides.length} slides`);
  console.log('Botón anterior:', prevBtn);
  console.log('Botón siguiente:', nextBtn);

  // Función para actualizar la presentación del capítulo
  function updateChapterPresentation() {
    console.log(`Actualizando a slide ${currentSlide}`);
    
    // Actualizar slides
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev');
      if (index + 1 === currentSlide) {
        slide.classList.add('active');
      } else if (index + 1 < currentSlide) {
        slide.classList.add('prev');
      }
    });

    // Actualizar barra de progreso
    const progressPercent = (currentSlide / totalSlides) * 100;
    if (progressFill) {
      progressFill.style.width = `${progressPercent}%`;
    }

    // Actualizar contador
    if (currentSlideCounter) currentSlideCounter.textContent = currentSlide;
    if (totalSlidesCounter) totalSlidesCounter.textContent = totalSlides;

    // Actualizar botones
    if (prevBtn) prevBtn.disabled = currentSlide === 1;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides;

    // Inicializar modelos visuales para el slide actual
    initializeChapterVisualModels(currentSlide);
  }

  // Función para inicializar modelos visuales específicos del capítulo
  function initializeChapterVisualModels(slideNumber) {
    try {
      switch (slideNumber) {
        case 1:
          // Modelo de célula introductorio
          const cellIntroContainer = document.getElementById('cell-intro-3d');
          if (cellIntroContainer && !chapterModels.cellIntro) {
            chapterModels.cellIntro = new Cell3DModel(cellIntroContainer);
            console.log('Modelo visual de célula intro cargado');
          }
          break;
          
        case 2:
          // Modelo de organización celular
          const cellOrgContainer = document.getElementById('cell-organization-3d');
          if (cellOrgContainer && !chapterModels.cellOrganization) {
            chapterModels.cellOrganization = new Cell3DModel(cellOrgContainer);
            console.log('Modelo visual de organización celular cargado');
          }
          break;
          
        case 6:
          // Modelo de membrana
          const membraneContainer = document.getElementById('membrane-3d');
          if (membraneContainer && !chapterModels.membrane) {
            chapterModels.membrane = new Cell3DModel(membraneContainer);
            console.log('Modelo visual de membrana cargado');
          }
          break;
      }
    } catch (error) {
      console.warn('No se pudo cargar modelo visual:', error);
      showVisualFallback();
    }
  }

  // Función para mostrar fallback visual
  function showVisualFallback() {
    const containers = document.querySelectorAll('.model-3d-container');
    containers.forEach(container => {
      if (container && !container.querySelector('.visual-fallback')) {
        container.innerHTML = `
          <div class="visual-fallback">
            <div class="fallback-icon">🔬</div>
            <p>Modelo visual de célula</p>
            <small>Representación interactiva</small>
          </div>
        `;
      }
    });
  }

  // Función para navegar a slide anterior
  function goToPrevSlide() {
    if (currentSlide > 1) {
      currentSlide--;
      updateChapterPresentation();
    }
  }

  // Función para navegar a slide siguiente
  function goToNextSlide() {
    if (currentSlide < totalSlides) {
      currentSlide++;
      updateChapterPresentation();
    }
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', goToPrevSlide);
    console.log('Event listener del botón anterior agregado');
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', goToNextSlide);
    console.log('Event listener del botón siguiente agregado');
  }

  // Navegación por teclado
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        goToPrevSlide();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        e.preventDefault();
        goToNextSlide();
        break;
    }
  });

  // Inicializar la presentación
  updateChapterPresentation();
  console.log('Capítulo 2 inicializado correctamente');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChapter2);
  console.log('Esperando DOMContentLoaded...');
} else {
  initializeChapter2();
  console.log('DOM ya está listo, inicializando inmediatamente...');
}
