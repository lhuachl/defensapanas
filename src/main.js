import './style.css'
import { Heart3DModel, Cell3DModel, CirculationSystem3DModel, PhysiologyDiagramModel, initializeModelOnSlide } from './models-visual.js'

// Estado de la presentación
let currentSlide = 1;
const totalSlides = 9;

// Modelos 3D
let models3D = {};

// Elementos del DOM
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.querySelector('.progress-fill');
const currentSlideCounter = document.getElementById('currentSlide');
const totalSlidesCounter = document.getElementById('totalSlides');

// Función para actualizar la presentación
function updatePresentation() {
  // Actualizar slides
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev');
    if (index + 1 === currentSlide) {
      slide.classList.add('active');
    } else if (index + 1 < currentSlide) {
      slide.classList.add('prev');
    }
  });

  // Actualizar dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index + 1 === currentSlide);
  });

  // Actualizar barra de progreso
  const progressPercent = (currentSlide / totalSlides) * 100;
  progressFill.style.width = `${progressPercent}%`;

  // Actualizar contador
  currentSlideCounter.textContent = currentSlide;
  totalSlidesCounter.textContent = totalSlides;

  // Actualizar botones
  prevBtn.disabled = currentSlide === 1;
  nextBtn.disabled = currentSlide === totalSlides;

  // Inicializar modelos 3D para el slide actual usando el sistema mejorado
  initializeModelOnSlide(currentSlide);
}

// Función para crear modelo de corazón simple
function createHeartModel(container) {
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Crear geometría del corazón (aproximación usando esferas)
    const heartGroup = new THREE.Group();
    
    // Ventrículo izquierdo (más grande)
    const leftVentricle = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xcc4444, shininess: 100 })
    );
    leftVentricle.scale.set(1.1, 1.3, 0.8);
    leftVentricle.position.set(-0.3, -0.2, 0);
    heartGroup.add(leftVentricle);
    
    // Ventrículo derecho
    const rightVentricle = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xaa3333, shininess: 100 })
    );
    rightVentricle.scale.set(0.9, 1.1, 0.7);
    rightVentricle.position.set(0.4, -0.1, 0.2);
    heartGroup.add(rightVentricle);
    
    // Aurícula izquierda
    const leftAtrium = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xee6666, shininess: 100 })
    );
    leftAtrium.position.set(-0.5, 0.8, 0);
    heartGroup.add(leftAtrium);
    
    // Aurícula derecha
    const rightAtrium = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xdd5555, shininess: 100 })
    );
    rightAtrium.position.set(0.3, 0.7, 0.1);
    heartGroup.add(rightAtrium);
    
    // Aorta
    const aorta = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.25, 1.5, 16),
      new THREE.MeshPhongMaterial({ color: 0xff7777, shininess: 100 })
    );
    aorta.position.set(0, 1.5, 0);
    aorta.rotation.x = Math.PI * 0.1;
    heartGroup.add(aorta);
    
    scene.add(heartGroup);
    
    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    camera.position.set(3, 2, 5);
    camera.lookAt(0, 0, 0);
    
    // Limpiar container y agregar canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    
    // Animación de rotación
    function animate() {
      requestAnimationFrame(animate);
      heartGroup.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
    
    // Controles de mouse
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    renderer.domElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    renderer.domElement.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y
        };
        
        heartGroup.rotation.y += deltaMove.x * 0.01;
        heartGroup.rotation.x += deltaMove.y * 0.01;
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    });
    
    renderer.domElement.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Zoom con rueda del mouse
    renderer.domElement.addEventListener('wheel', (e) => {
      e.preventDefault();
      camera.position.multiplyScalar(e.deltaY > 0 ? 1.1 : 0.9);
      camera.lookAt(0, 0, 0);
    });
    
    return { scene, camera, renderer, model: heartGroup };
  } catch (error) {
    console.error('Error creando modelo de corazón:', error);
    container.innerHTML = '<p style="color: #0f4c75; text-align: center; padding: 2rem;">Error cargando modelo 3D</p>';
    return null;
  }
}

// Función para crear modelo de célula simple
function createCellModel(container) {
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Crear célula
    const cellGroup = new THREE.Group();
    
    // Membrana celular
    const membrane = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshPhongMaterial({ 
        color: 0x4a90e2, 
        transparent: true, 
        opacity: 0.7,
        shininess: 100 
      })
    );
    cellGroup.add(membrane);
    
    // Núcleo
    const nucleus = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x2c5aa0, shininess: 100 })
    );
    nucleus.position.set(0, 0, 0);
    cellGroup.add(nucleus);
    
    // Mitocondrias
    for (let i = 0; i < 5; i++) {
      const mitochondria = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshPhongMaterial({ color: 0x8b4513, shininess: 100 })
      );
      mitochondria.position.set(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
      );
      cellGroup.add(mitochondria);
    }
    
    scene.add(cellGroup);
    
    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    camera.position.set(4, 3, 6);
    camera.lookAt(0, 0, 0);
    
    // Limpiar container y agregar canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    
    // Animación
    function animate() {
      requestAnimationFrame(animate);
      cellGroup.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();
    
    // Controles básicos
    renderer.domElement.addEventListener('click', () => {
      cellGroup.rotation.y += 0.2;
    });
    
    return { scene, camera, renderer, model: cellGroup };
  } catch (error) {
    console.error('Error creando modelo de célula:', error);
    container.innerHTML = '<p style="color: #0f4c75; text-align: center; padding: 1rem;">Error cargando modelo 3D</p>';
    return null;
  }
}

// Función para crear sistema de circulación simple
function createCirculationModel(container) {
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Crear sistema circulatorio
    const circulationGroup = new THREE.Group();
    
    // Corazón central
    const heart = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0xcc4444, shininess: 100 })
    );
    circulationGroup.add(heart);
    
    // Arterias (rojas)
    const arteryMaterial = new THREE.MeshPhongMaterial({ color: 0xff4444, shininess: 100 });
    
    // Arteria principal
    const mainArtery = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.15, 3, 16),
      arteryMaterial
    );
    mainArtery.position.set(0, 1.5, 0);
    circulationGroup.add(mainArtery);
    
    // Venas (azules)
    const veinMaterial = new THREE.MeshPhongMaterial({ color: 0x4444ff, shininess: 100 });
    
    // Vena principal
    const mainVein = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.1, 3, 16),
      veinMaterial
    );
    mainVein.position.set(0, -1.5, 0);
    circulationGroup.add(mainVein);
    
    // Capilares (pequeños vasos)
    for (let i = 0; i < 10; i++) {
      const capillary = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 1, 8),
        new THREE.MeshPhongMaterial({ color: 0x666666, shininess: 100 })
      );
      const angle = (i / 10) * Math.PI * 2;
      capillary.position.set(
        Math.cos(angle) * 2,
        Math.sin(angle * 0.5),
        Math.sin(angle) * 2
      );
      capillary.rotation.z = angle;
      circulationGroup.add(capillary);
    }
    
    scene.add(circulationGroup);
    
    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    camera.position.set(5, 3, 7);
    camera.lookAt(0, 0, 0);
    
    // Limpiar container y agregar canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    
    // Animación
    function animate() {
      requestAnimationFrame(animate);
      circulationGroup.rotation.y += 0.008;
      
      // Animación de latido del corazón
      const scale = 1 + Math.sin(Date.now() * 0.01) * 0.1;
      heart.scale.set(scale, scale, scale);
      
      renderer.render(scene, camera);
    }
    animate();
    
    // Controles básicos
    renderer.domElement.addEventListener('click', () => {
      circulationGroup.rotation.x += 0.1;
    });
    
    return { scene, camera, renderer, model: circulationGroup };
  } catch (error) {
    console.error('Error creando modelo de circulación:', error);
    container.innerHTML = '<p style="color: #0f4c75; text-align: center; padding: 1rem;">Error cargando modelo 3D</p>';
    return null;
  }
}

// Función para inicializar modelos según el slide
function initializeModelsForSlide(slideNumber) {
  try {
    switch (slideNumber) {
      case 1:
        // Modelo de corazón en slide 1
        const heartContainer = document.getElementById('heart-3d-container');
        if (heartContainer && !models3D.heart) {
          models3D.heart = createHeartModel(heartContainer);
        }
        break;
        
      case 3:
        // Modelo de célula en slide 3
        const cellContainer = document.getElementById('cell-3d-container');
        if (cellContainer && !models3D.cell) {
          models3D.cell = createCellModel(cellContainer);
        }
        break;
        
      case 5:
        // Modelo de circulación en slide 5
        const circulationContainer = document.getElementById('circulation-3d-container');
        if (circulationContainer && !models3D.circulation) {
          models3D.circulation = createCirculationModel(circulationContainer);
        }
        break;
    }
  } catch (error) {
    console.error('Error inicializando modelos 3D:', error);
  }
}

// Función para ir al slide siguiente
function nextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++;
    updatePresentation();
  }
}

// Función para ir al slide anterior
function prevSlide() {
  if (currentSlide > 1) {
    currentSlide--;
    updatePresentation();
  }
}

// Función para ir a un slide específico
function goToSlide(slideNumber) {
  if (slideNumber >= 1 && slideNumber <= totalSlides) {
    currentSlide = slideNumber;
    updatePresentation();
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar la presentación
  updatePresentation();

  // Controles de navegación
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Navegación por puntos
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index + 1);
    });
  });

  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowRight':
      case ' ': // Spacebar
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(1);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides);
        break;
      default:
        // Números del 1-5 para navegación directa
        const num = parseInt(e.key);
        if (num >= 1 && num <= totalSlides) {
          e.preventDefault();
          goToSlide(num);
        }
    }
  });

  // Navegación táctil (para dispositivos móviles)
  let startX = 0;
  let endX = 0;

  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50; // Mínima distancia para considerar un swipe
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe hacia la izquierda - siguiente slide
        nextSlide();
      } else {
        // Swipe hacia la derecha - slide anterior
        prevSlide();
      }
    }
  }

  // Animación automática de elementos al cambiar slide
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  // Observar elementos animados
  document.querySelectorAll('.list-item, .feature-card, .stat-item').forEach(el => {
    observer.observe(el);
  });

  // Inicializar presentación
  updatePresentation();

  // Inicializar primer modelo 3D
  initializeModelOnSlide(1);

  // Manejar redimensionamiento de ventana
  window.addEventListener('resize', () => {
    Object.values(models3D).forEach(model => {
      if (model && model.resize) {
        const container = document.getElementById(model.containerId);
        if (container) {
          model.resize(container.clientWidth, container.clientHeight);
        }
      }
    });
  });

  // Limpiar recursos al cerrar
  window.addEventListener('beforeunload', () => {
    cleanupModels(models3D);
  });

  // Precargar próximo slide para mejor rendimiento
  function preloadSlide(slideNumber) {
    const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
    if (slide) {
      // Trigger animations for better UX
      const animations = slide.querySelectorAll('[data-animation]');
      animations.forEach(el => {
        el.style.animationPlayState = 'paused';
      });
    }
  }

  // Configurar efectos de sonido (opcional)
  function playTransitionSound() {
    // Crear un sonido sutil para las transiciones
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  // Agregar sonido a las transiciones (comentado por defecto)
  // nextBtn.addEventListener('click', playTransitionSound);
  // prevBtn.addEventListener('click', playTransitionSound);
});

// Función para fullscreen (opcional)
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

// Agregar listener para F11 o doble click para fullscreen
document.addEventListener('keydown', (e) => {
  if (e.key === 'F11') {
    e.preventDefault();
    toggleFullscreen();
  }
});

// Doble click para fullscreen
document.addEventListener('dblclick', () => {
  toggleFullscreen();
});

// Exportar funciones para uso externo si es necesario
window.presentationControls = {
  nextSlide,
  prevSlide,
  goToSlide,
  toggleFullscreen,
  getCurrentSlide: () => currentSlide,
  getTotalSlides: () => totalSlides
};
