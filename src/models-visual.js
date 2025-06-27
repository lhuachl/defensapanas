// Sistema de modelos simplificado sin WebGL - Fallback visual
// Este archivo reemplaza los modelos 3D problemáticos con versiones visuales

// Variable global para almacenar modelos
let models3D = {};

// Función para crear contenido visual de corazón
function createHeartVisual(container) {
  container.innerHTML = `
    <div class="model-visual heart-visual">
      <div class="heart-container">
        <div class="heart-shape pulsing">❤️</div>
        <div class="heart-info">
          <h3>Corazón Humano</h3>
          <div class="heart-features">
            <div class="feature">🫀 Músculo cardíaco</div>
            <div class="feature">🩸 Bombeo de sangre</div>
            <div class="feature">⚡ 60-100 lat/min</div>
          </div>
        </div>
      </div>
      <div class="visual-note">
        <small>💡 Representación visual interactiva</small>
      </div>
    </div>
  `;
  
  // Hacer que el corazón sea clickeable
  const heartShape = container.querySelector('.heart-shape');
  if (heartShape) {
    heartShape.addEventListener('click', () => {
      heartShape.classList.add('clicked');
      setTimeout(() => heartShape.classList.remove('clicked'), 600);
    });
  }
}

// Función para crear contenido visual de célula
function createCellVisual(container) {
  container.innerHTML = `
    <div class="model-visual cell-visual">
      <div class="cell-container">
        <div class="cell-diagram">
          <div class="cell-membrane">
            <div class="nucleus">🔵</div>
            <div class="organelle mitochondria">⚡</div>
            <div class="organelle ribosome">📦</div>
            <div class="organelle golgi">🏭</div>
          </div>
        </div>
        <div class="cell-info">
          <h3>Célula Eucariota</h3>
          <div class="cell-features">
            <div class="feature">🔵 Núcleo</div>
            <div class="feature">⚡ Mitocondrias</div>
            <div class="feature">📦 Ribosomas</div>
            <div class="feature">🏭 Aparato de Golgi</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Función para crear contenido visual de sistema circulatorio
function createCirculationVisual(container) {
  container.innerHTML = `
    <div class="model-visual circulation-visual">
      <div class="circulation-container">
        <div class="circulation-diagram">
          <div class="heart-center">❤️</div>
          <div class="blood-vessel artery">🔴</div>
          <div class="blood-vessel vein">🔵</div>
          <div class="capillary-network">
            <div class="capillary">•</div>
            <div class="capillary">•</div>
            <div class="capillary">•</div>
          </div>
        </div>
        <div class="circulation-info">
          <h3>Sistema Circulatorio</h3>
          <div class="circulation-features">
            <div class="feature">🔴 Arterias</div>
            <div class="feature">🔵 Venas</div>
            <div class="feature">• Capilares</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Función para crear diagrama de fisiología
function createPhysiologyVisual(container) {
  container.innerHTML = `
    <div class="model-visual physiology-visual">
      <div class="physiology-container">
        <div class="body-systems">
          <div class="system nervous">
            <div class="system-icon">🧠</div>
            <span>Sistema Nervioso</span>
          </div>
          <div class="system endocrine">
            <div class="system-icon">🧪</div>
            <span>Sistema Endocrino</span>
          </div>
          <div class="system cardiovascular">
            <div class="system-icon">❤️</div>
            <span>Sistema Cardiovascular</span>
          </div>
          <div class="system respiratory">
            <div class="system-icon">🫁</div>
            <span>Sistema Respiratorio</span>
          </div>
        </div>
        <div class="homeostasis-center">
          <h4>⚖️ HOMEOSTASIS</h4>
          <p>Control del medio interno</p>
        </div>
      </div>
    </div>
  `;
  
  // Hacer los sistemas interactivos
  const systems = container.querySelectorAll('.system');
  systems.forEach(system => {
    system.addEventListener('click', () => {
      systems.forEach(s => s.classList.remove('active'));
      system.classList.add('active');
      
      const centerDiv = container.querySelector('.homeostasis-center');
      const systemName = system.querySelector('span').textContent;
      centerDiv.innerHTML = `
        <h4>⚖️ ${systemName}</h4>
        <p>Contribuye al control homeostático</p>
      `;
    });
  });
}

// Clases de modelos simplificadas
class Heart3DModel {
  constructor(container) {
    this.container = container;
    createHeartVisual(container);
    console.log('Modelo visual de corazón cargado');
  }
  
  resize() {
    // No necesita resize para contenido HTML
  }
  
  cleanup() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

class Cell3DModel {
  constructor(container) {
    this.container = container;
    createCellVisual(container);
    console.log('Modelo visual de célula cargado');
  }
  
  resize() {
    // No necesita resize para contenido HTML
  }
  
  cleanup() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

class CirculationSystem3DModel {
  constructor(container) {
    this.container = container;
    createCirculationVisual(container);
    console.log('Modelo visual de circulación cargado');
  }
  
  resize() {
    // No necesita resize para contenido HTML
  }
  
  cleanup() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

class PhysiologyDiagramModel {
  constructor(container) {
    this.container = container;
    createPhysiologyVisual(container);
    console.log('Diagrama visual de fisiología cargado');
  }
  
  resize() {
    // No necesita resize para contenido HTML
  }
  
  cleanup() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Función principal para inicializar modelos según el slide
function initializeModelOnSlide(slideNumber) {
  try {
    console.log(`Inicializando modelo para slide ${slideNumber}`);
    switch(slideNumber) {
      case 1:
        // Corazón en slide 1
        const heartContainer = document.getElementById('heart-3d-container');
        if (heartContainer && !models3D.heart) {
          console.log('Creando modelo de corazón...');
          models3D.heart = new Heart3DModel(heartContainer);
        }
        break;
        
      case 2:
        // Diagrama de Fisiología en slide 2
        const diagramContainer = document.getElementById('physiology-diagram-container');
        if (diagramContainer && !models3D.diagram) {
          console.log('Creando diagrama de fisiología...');
          models3D.diagram = new PhysiologyDiagramModel(diagramContainer);
        }
        break;
        
      case 3:
        // Célula en slide 3
        const cellContainer = document.getElementById('cell-3d-container');
        if (cellContainer && !models3D.cell) {
          console.log('Creando modelo de célula...');
          models3D.cell = new Cell3DModel(cellContainer);
        }
        break;
        
      case 5:
        // Sistema circulatorio en slide 5
        const circulationContainer = document.getElementById('circulation-3d-container');
        if (circulationContainer && !models3D.circulation) {
          console.log('Creando sistema circulatorio...');
          models3D.circulation = new CirculationSystem3DModel(circulationContainer);
        }
        break;
        
      default:
        console.log(`No hay modelo específico para slide ${slideNumber}`);
        break;
    }
  } catch (error) {
    console.error('Error inicializando modelo visual:', error);
  }
}

// Función para limpiar modelos
function cleanupModels() {
  Object.values(models3D).forEach(model => {
    if (model && model.cleanup) {
      model.cleanup();
    }
  });
  models3D = {};
}

// Función para manejar redimensionamiento
function handleResize() {
  Object.values(models3D).forEach(model => {
    if (model && model.resize) {
      try {
        model.resize();
      } catch (error) {
        console.warn('Error en resize:', error);
      }
    }
  });
}

// Solo agregar el listener si no existe
if (!window.resizeListenerAdded) {
  window.addEventListener('resize', handleResize);
  window.resizeListenerAdded = true;
}

// Función de inicialización general (compatibilidad)
function initializeModels() {
  // Los modelos se inicializan cuando se necesitan
  console.log('Sistema de modelos visuales inicializado');
}

// Exportar las clases y funciones
export { 
  Heart3DModel, 
  Cell3DModel, 
  CirculationSystem3DModel, 
  PhysiologyDiagramModel, 
  initializeModels, 
  initializeModelOnSlide, 
  cleanupModels 
};
