import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

// Función para detectar soporte WebGL
function detectWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

// Función para crear contenido fallback cuando WebGL no está disponible
function createFallbackContent(container, modelType) {
  container.innerHTML = '';
  
  const fallbackDiv = document.createElement('div');
  fallbackDiv.className = 'webgl-fallback';
  
  let content = '';
  
  switch (modelType) {
    case 'heart':
      content = `
        <div class="fallback-visual heart-visual">
          <div class="heart-illustration">
            <div class="heart-shape">
              <div class="heart-emoji">❤️</div>
            </div>
            <div class="heart-labels">
              <div class="label left-ventricle">Ventrículo Izquierdo</div>
              <div class="label right-ventricle">Ventrículo Derecho</div>
              <div class="label left-atrium">Aurícula Izquierda</div>
              <div class="label right-atrium">Aurícula Derecha</div>
            </div>
          </div>
          <div class="model-info">
            <h4>Corazón Humano</h4>
            <p>Bomba muscular de 4 cámaras</p>
            <small>⚠️ Modo de compatibilidad - WebGL no disponible</small>
          </div>
        </div>
      `;
      break;
      
    case 'cell':
      content = `
        <div class="fallback-visual cell-visual">
          <div class="cell-illustration">
            <div class="cell-membrane">
              <div class="nucleus">
                <span class="organelle-label">Núcleo</span>
              </div>
              <div class="mitochondria organelle">
                <span class="organelle-label">Mitocondrias</span>
              </div>
              <div class="endoplasmic-reticulum organelle">
                <span class="organelle-label">RE</span>
              </div>
              <div class="golgi organelle">
                <span class="organelle-label">Golgi</span>
              </div>
              <div class="lysosomes organelle">
                <span class="organelle-label">Lisosomas</span>
              </div>
            </div>
          </div>
          <div class="model-info">
            <h4>Célula Eucariota</h4>
            <p>Unidad básica de la vida</p>
            <small>⚠️ Modo de compatibilidad - WebGL no disponible</small>
          </div>
        </div>
      `;
      break;
      
    case 'circulation':
      content = `
        <div class="fallback-visual circulation-visual">
          <div class="circulation-illustration">
            <div class="heart-center">💓</div>
            <div class="blood-vessels">
              <div class="artery">🔴 Arterias</div>
              <div class="vein">🔵 Venas</div>
              <div class="capillaries">⚫ Capilares</div>
            </div>
            <div class="flow-animation">
              <div class="flow-particle"></div>
              <div class="flow-particle"></div>
              <div class="flow-particle"></div>
            </div>
          </div>
          <div class="model-info">
            <h4>Sistema Circulatorio</h4>
            <p>Transporte de sangre y nutrientes</p>
            <small>⚠️ Modo de compatibilidad - WebGL no disponible</small>
          </div>
        </div>
      `;
      break;
      
    case 'physiology':
      content = `
        <div class="fallback-visual physiology-visual">
          <div class="physiology-diagram">
            <div class="body-systems">
              <div class="system nervous-system">
                <span class="system-icon">🧠</span>
                <span class="system-label">Sistema Nervioso</span>
              </div>
              <div class="system endocrine-system">
                <span class="system-icon">🧪</span>
                <span class="system-label">Sistema Endocrino</span>
              </div>
              <div class="system circulatory-system">
                <span class="system-icon">❤️</span>
                <span class="system-label">Sistema Circulatorio</span>
              </div>
              <div class="system respiratory-system">
                <span class="system-icon">🫁</span>
                <span class="system-label">Sistema Respiratorio</span>
              </div>
            </div>
            <div class="homeostasis-center">
              <span class="homeostasis-text">HOMEOSTASIS</span>
            </div>
          </div>
          <div class="model-info">
            <h4>Sistemas Fisiológicos</h4>
            <p>Control integrado del medio interno</p>
            <small>⚠️ Modo de compatibilidad - WebGL no disponible</small>
          </div>
        </div>
      `;
      break;
      
    default:
      content = `
        <div class="fallback-visual default-visual">
          <div class="default-illustration">
            <div class="icon-placeholder">🔬</div>
            <h4>Modelo 3D</h4>
            <p>Contenido interactivo no disponible</p>
            <small>⚠️ WebGL no soportado en este dispositivo</small>
          </div>
        </div>
      `;
  }
  
  fallbackDiv.innerHTML = content;
  container.appendChild(fallbackDiv);
  
  // Agregar animación simple
  setTimeout(() => {
    fallbackDiv.classList.add('fade-in');
  }, 100);
  
  return fallbackDiv;
}

// Modelo 3D del Corazón Anatómico Realista
class Heart3DModel {
  constructor(container) {
    this.container = container;
    this.beatTime = 0;
    
    // Verificar soporte WebGL
    if (!detectWebGLSupport()) {
      console.warn('WebGL no soportado, usando fallback visual');
      createFallbackContent(container, 'heart');
      return;
    }
    
    try {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false,
        powerPreference: "default"
      });
      this.heart = null;
      this.isAnimating = false;
      this.loader = new FBXLoader();
      
      this.init();
    } catch (error) {
      console.error('Error inicializando modelo 3D del corazón:', error);
      createFallbackContent(container, 'heart');
    }
  }

  init() {
    // Configurar renderer con optimizaciones
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = false; // Desactivar sombras para mejor rendimiento
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limitar pixel ratio
    
    // Configurar cámara con distancia adaptativa
    this.camera.position.set(5, 3, 8); // Más alejada para ver el modelo completo
    this.camera.lookAt(0, 0, 0);
    
    // Configurar luces
    this.setupLights();
    
    // Cargar modelo FBX del corazón
    this.loadHeartModel();
    
    // Agregar controles
    this.setupControls();
    
    // Reemplazar loading por canvas
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);
    
    // Iniciar animación
    this.animate();
  }

  setupLights() {
    // Luz ambiental suave (solo luces esenciales)
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);
    
    // Luz principal (reducida complejidad)
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 5, 5);
    // Sombras desactivadas para mejor rendimiento
    this.scene.add(mainLight);
  }

  loadHeartModel() {
    // Mostrar mensaje de carga
    this.container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-family: Arial, sans-serif;">Cargando modelo del corazón...</div>';
    
    // Cargar modelo FBX
    this.loader.load(
      '/HumanHeart_FBX.fbx', // Nombre correcto del archivo FBX
      (fbx) => {
        console.log('Modelo FBX del corazón cargado exitosamente');
        
        // Configurar el modelo tal como viene, sin modificar escala
        this.heart = fbx;
        
        // Usar escala natural del modelo (sin modificar)
        const modelScale = 1; // Mantener escala original del modelo FBX
        this.heart.userData.baseScale = modelScale; // Guardar escala base para la animación
        
        // Centrar el modelo
        const box = new THREE.Box3().setFromObject(this.heart);
        const center = box.getCenter(new THREE.Vector3());
        this.heart.position.sub(center);
        
        // Configurar materiales para que se vean bien y con mejor rendimiento
        this.heart.traverse((child) => {
          if (child.isMesh) {
            // Desactivar sombras para mejor rendimiento
            child.castShadow = false;
            child.receiveShadow = false;
            
            // Optimizar material si es necesario
            if (child.material) {
              child.material.shininess = 30; // Reducir shininess
              // Simplificar material para mejor rendimiento
              if (child.material.map) {
                child.material.map.generateMipmaps = false;
              }
              if (!child.material.color) {
                child.material.color = new THREE.Color(0xcc2936); // Color rojo del corazón
              }
            }
          }
        });
        
        // Agregar el modelo a la escena
        this.scene.add(this.heart);
        
        // Limpiar el mensaje de carga y agregar el canvas
        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);
        
        console.log('Modelo del corazón agregado a la escena');
      },
      (progress) => {
        console.log('Progreso de carga:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('Error al cargar el modelo FBX del corazón:', error);
        this.container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #cc2936; font-family: Arial, sans-serif;">Error: No se pudo cargar el modelo del corazón.<br>Verifica que el archivo HumanHeart_FBX.fbx esté en /public/</div>';
        
        // Fallback: crear un corazón básico
        this.createFallbackHeart();
      }
    );
  }

  createFallbackHeart() {
    // Crear un corazón simple como respaldo
    const heartGeometry = new THREE.SphereGeometry(1, 16, 16);
    const heartMaterial = new THREE.MeshPhongMaterial({
      color: 0xcc2936,
      shininess: 50
    });
    this.heart = new THREE.Mesh(heartGeometry, heartMaterial);
    this.scene.add(this.heart);
    
    // Agregar el canvas si no está
    if (!this.container.querySelector('canvas')) {
      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);
    }
  }

  setupControls() {
    // Variables para controles de rotación suave
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.rotationSpeed = 0.1; // Velocidad de interpolación
    
    // Agregar indicador de interactividad
    const helpText = document.createElement('div');
    helpText.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      font-family: Arial, sans-serif;
      pointer-events: none;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);
      padding: 5px 8px;
      border-radius: 4px;
    `;
    helpText.innerHTML = 'Arrastra para rotar<br>Rueda para zoom<br>Doble clic para centrar';
    this.container.appendChild(helpText);
    
    // Controles de mouse mejorados con cursor
    this.container.style.cursor = 'grab';
    
    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.container.style.cursor = 'grabbing';
      this.previousMousePosition.x = e.clientX;
      this.previousMousePosition.y = e.clientY;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (this.isDragging && this.heart) {
        const deltaMove = {
          x: e.clientX - this.previousMousePosition.x,
          y: e.clientY - this.previousMousePosition.y
        };
        
        // Actualizar rotación objetivo en lugar de rotación directa
        this.targetRotation.y += deltaMove.x * 0.01;
        this.targetRotation.x += deltaMove.y * 0.01;
        
        // Limitar rotación en X para evitar inversiones extrañas
        this.targetRotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.targetRotation.x));
        
        this.previousMousePosition.x = e.clientX;
        this.previousMousePosition.y = e.clientY;
      }
    });
    
    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    });
    
    // También detener el arrastre si se sale del área
    this.container.addEventListener('mouseleave', () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    });
    
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoom = e.deltaY * 0.002; // Zoom más sensible
      this.camera.position.z = Math.max(1, Math.min(20, this.camera.position.z + zoom)); // Rango más amplio
    });
    
    // Doble clic para centrar y reiniciar vista
    this.container.addEventListener('dblclick', () => {
      this.targetRotation = { x: 0, y: 0 };
      this.camera.position.set(5, 3, 8);
      this.camera.lookAt(0, 0, 0);
    });
  }

  animate() {
    // Solo animar si el modelo está visible para optimizar rendimiento
    if (this.container.offsetParent !== null) {
      requestAnimationFrame(() => this.animate());
      
      if (this.heart) {
        // Aplicar rotación suave interpolada
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * this.rotationSpeed;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * this.rotationSpeed;
        
        // Rotación automática más lenta si no se está arrastrando
        if (!this.isDragging) {
          this.targetRotation.y += 0.002;
        }
        
        // Aplicar la rotación al modelo
        this.heart.rotation.x = this.currentRotation.x;
        this.heart.rotation.y = this.currentRotation.y;
        
        // Efecto de latido del corazón más sutil
        this.beatTime += 0.05;
        const beatScale = 1 + Math.sin(this.beatTime) * 0.03;
        const baseScale = this.heart.userData.baseScale || 1; // Usar escala original del modelo
        this.heart.scale.set(
          baseScale * beatScale, 
          baseScale * beatScale, 
          baseScale * beatScale
        );
      }
      
      this.renderer.render(this.scene, this.camera);
    }
  }

  resize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}

// Modelo 3D de Célula Detallada con Organelos
class Cell3DModel {
  constructor(container) {
    this.container = container;
    
    // Verificar soporte WebGL
    if (!detectWebGLSupport()) {
      console.warn('WebGL no soportado, usando fallback visual');
      createFallbackContent(container, 'cell');
      return;
    }
    
    try {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false,
        powerPreference: "default"
      });
      this.cell = null;
      
      this.init();
    } catch (error) {
      console.error('Error inicializando modelo 3D de célula:', error);
      createFallbackContent(container, 'cell');
    }
  }

  init() {
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    
    this.camera.position.set(0, 0, 8);
    
    this.setupLights();
    this.createDetailedCell();
    this.setupControls();
    
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);
    
    this.animate();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 5, 5);
    this.scene.add(mainLight);
    
    // Luz interna de la célula
    const cellLight = new THREE.PointLight(0x88ff88, 0.3);
    cellLight.position.set(0, 0, 0);
    this.scene.add(cellLight);
  }

  createDetailedCell() {
    const cellGroup = new THREE.Group();
    
    // Membrana celular (esfera translúcida)
    const membraneGeometry = new THREE.SphereGeometry(3, 32, 32);
    const membraneMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const membrane = new THREE.Mesh(membraneGeometry, membraneMaterial);
    cellGroup.add(membrane);
    
    // Núcleo
    const nucleusGeometry = new THREE.SphereGeometry(1.2, 20, 20);
    const nucleusMaterial = new THREE.MeshPhongMaterial({
      color: 0x8e44ad,
      shininess: 50,
      transparent: true,
      opacity: 0.8
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleus.position.set(0, 0, 0);
    cellGroup.add(nucleus);
    
    // Nucléolo
    const nucleolusGeometry = new THREE.SphereGeometry(0.3, 12, 12);
    const nucleolusMaterial = new THREE.MeshPhongMaterial({
      color: 0x2c3e50,
      shininess: 80
    });
    const nucleolus = new THREE.Mesh(nucleolusGeometry, nucleolusMaterial);
    nucleolus.position.set(0.2, 0.1, 0.3);
    cellGroup.add(nucleolus);
    
    // Mitocondrias (múltiples)
    this.createMitochondria(cellGroup);
    
    // Retículo endoplasmático
    this.createEndoplasmicReticulum(cellGroup);
    
    // Aparato de Golgi
    this.createGolgiApparatus(cellGroup);
    
    // Ribosomas
    this.createRibosomes(cellGroup);
    
    // Lisosomas
    this.createLysosomes(cellGroup);
    
    // Vacuolas
    this.createVacuoles(cellGroup);
    
    this.cell = cellGroup;
    this.scene.add(cellGroup);
  }

  createMitochondria(cellGroup) {
    const mitochondriaMaterial = new THREE.MeshPhongMaterial({
      color: 0xe74c3c,
      shininess: 60
    });
    
    // Crear varias mitocondrias
    const positions = [
      [1.5, 0.8, -1.2],
      [-1.8, -0.5, 1],
      [0.5, -1.5, -0.8],
      [-1, 1.2, 0.5],
      [2, -1, 1.5]
    ];
    
    positions.forEach(pos => {
      const mitoGeometry = new THREE.CapsuleGeometry(0.15, 0.6, 4, 8);
      const mitochondria = new THREE.Mesh(mitoGeometry, mitochondriaMaterial);
      mitochondria.position.set(pos[0], pos[1], pos[2]);
      mitochondria.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      cellGroup.add(mitochondria);
    });
  }

  createEndoplasmicReticulum(cellGroup) {
    const erMaterial = new THREE.MeshPhongMaterial({
      color: 0x27ae60,
      transparent: true,
      opacity: 0.7
    });
    
    // Red de membranas interconectadas
    for (let i = 0; i < 8; i++) {
      const tubeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 6);
      const tube = new THREE.Mesh(tubeGeometry, erMaterial);
      tube.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      );
      tube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      cellGroup.add(tube);
    }
  }

  createGolgiApparatus(cellGroup) {
    const golgiMaterial = new THREE.MeshPhongMaterial({
      color: 0xf39c12,
      shininess: 70
    });
    
    // Pilas de cisternas
    for (let i = 0; i < 5; i++) {
      const cisternGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 16);
      const cistern = new THREE.Mesh(cisternGeometry, golgiMaterial);
      cistern.position.set(1.2, 0.8 + i * 0.1, -0.5);
      cistern.rotation.x = Math.PI / 2;
      cellGroup.add(cistern);
    }
  }

  createRibosomes(cellGroup) {
    const ribosomeMaterial = new THREE.MeshPhongMaterial({
      color: 0x9b59b6,
      shininess: 100
    });
    
    // Ribosomas dispersos
    for (let i = 0; i < 30; i++) {
      const riboGeometry = new THREE.SphereGeometry(0.03, 6, 6);
      const ribosome = new THREE.Mesh(riboGeometry, ribosomeMaterial);
      ribosome.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );
      cellGroup.add(ribosome);
    }
  }

  createLysosomes(cellGroup) {
    const lysosomeMaterial = new THREE.MeshPhongMaterial({
      color: 0xe67e22,
      shininess: 80
    });
    
    const positions = [
      [-1.2, -1.8, 0.5],
      [1.5, -0.8, -1.5],
      [-0.5, 1.5, 1.2]
    ];
    
    positions.forEach(pos => {
      const lysoGeometry = new THREE.SphereGeometry(0.2, 12, 12);
      const lysosome = new THREE.Mesh(lysoGeometry, lysosomeMaterial);
      lysosome.position.set(pos[0], pos[1], pos[2]);
      cellGroup.add(lysosome);
    });
  }

  createVacuoles(cellGroup) {
    const vacuoleMaterial = new THREE.MeshPhongMaterial({
      color: 0x3498db,
      transparent: true,
      opacity: 0.5
    });
    
    const vacuoleGeometry = new THREE.SphereGeometry(0.4, 12, 12);
    const vacuole = new THREE.Mesh(vacuoleGeometry, vacuoleMaterial);
    vacuole.position.set(-1.5, 0.5, 1.8);
    cellGroup.add(vacuole);
  }

  setupControls() {
    // Variables para controles de rotación suave
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.rotationSpeed = 0.1;
    
    // Agregar indicador de interactividad
    const helpText = document.createElement('div');
    helpText.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      font-family: Arial, sans-serif;
      pointer-events: none;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);
      padding: 5px 8px;
      border-radius: 4px;
    `;
    helpText.innerHTML = 'Arrastra para rotar<br>Rueda para zoom<br>Doble clic para centrar';
    this.container.appendChild(helpText);
    
    this.container.style.cursor = 'grab';
    
    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.container.style.cursor = 'grabbing';
      this.previousMousePosition.x = e.clientX;
      this.previousMousePosition.y = e.clientY;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (this.isDragging && this.cell) {
        const deltaMove = {
          x: e.clientX - this.previousMousePosition.x,
          y: e.clientY - this.previousMousePosition.y
        };
        
        this.targetRotation.y += deltaMove.x * 0.01;
        this.targetRotation.x += deltaMove.y * 0.01;
        this.targetRotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.targetRotation.x));
        
        this.previousMousePosition.x = e.clientX;
        this.previousMousePosition.y = e.clientY;
      }
    });
    
    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    });
    
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoom = e.deltaY * 0.01;
      this.camera.position.z = Math.max(3, Math.min(15, this.camera.position.z + zoom));
    });
    
    // Doble clic para centrar y reiniciar vista
    this.container.addEventListener('dblclick', () => {
      this.targetRotation = { x: 0, y: 0 };
      this.camera.position.set(8, 5, 8);
      this.camera.lookAt(0, 0, 0);
    });
  }

  animate() {
    // Solo animar si está visible
    if (this.container.offsetParent !== null) {
      requestAnimationFrame(() => this.animate());
      
      if (this.cell) {
        // Aplicar rotación suave interpolada
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * this.rotationSpeed;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * this.rotationSpeed;
        
        // Rotación automática si no se está arrastrando
        if (!this.isDragging) {
          this.targetRotation.y += 0.002;
        }
        
        this.cell.rotation.x = this.currentRotation.x;
        this.cell.rotation.y = this.currentRotation.y;
      }
      
      this.renderer.render(this.scene, this.camera);
    }
  }

  resize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}

// Sistema Circulatorio 3D Completo
class CirculationSystem3DModel {
  constructor(container) {
    this.container = container;
    
    // Verificar soporte WebGL
    if (!detectWebGLSupport()) {
      console.warn('WebGL no soportado, usando fallback visual');
      createFallbackContent(container, 'circulation');
      return;
    }
    
    try {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false,
        powerPreference: "default"
      });
      this.circulationSystem = null;
      this.flowParticles = [];
      
      this.init();
    } catch (error) {
      console.error('Error inicializando modelo 3D de circulación:', error);
      createFallbackContent(container, 'circulation');
    }
  }

  init() {
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    
    this.camera.position.set(0, 0, 12);
    
    this.setupLights();
    this.createCirculationSystem();
    this.createBloodFlow();
    this.setupControls();
    
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);
    
    this.animate();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 5, 5);
    this.scene.add(mainLight);
    
    // Luz roja para arterias
    const arterialLight = new THREE.PointLight(0xff4444, 0.5);
    arterialLight.position.set(-3, 0, 0);
    this.scene.add(arterialLight);
    
    // Luz azul para venas
    const venousLight = new THREE.PointLight(0x4444ff, 0.5);
    venousLight.position.set(3, 0, 0);
    this.scene.add(venousLight);
  }

  createCirculationSystem() {
    const systemGroup = new THREE.Group();
    
    // Corazón central simplificado
    this.createSimpleHeart(systemGroup);
    
    // Circuito pulmonar
    this.createPulmonaryCircuit(systemGroup);
    
    // Circuito sistémico
    this.createSystemicCircuit(systemGroup);
    
    // Red capilar
    this.createCapillaryNetwork(systemGroup);
    
    this.circulationSystem = systemGroup;
    this.scene.add(systemGroup);
  }

  createSimpleHeart(systemGroup) {
    const heartGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const heartMaterial = new THREE.MeshPhongMaterial({
      color: 0xcc2936,
      shininess: 80
    });
    const heart = new THREE.Mesh(heartGeometry, heartMaterial);
    heart.position.set(0, 0, 0);
    systemGroup.add(heart);
  }

  createPulmonaryCircuit(systemGroup) {
    // Arteria pulmonar (sangre desoxigenada - azul)
    const pulmonaryArteryPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(-2, 2, 1),
      new THREE.Vector3(-4, 3, 0),
      new THREE.Vector3(-5, 3.5, -1)
    ]);
    
    const pulmonaryArteryGeometry = new THREE.TubeGeometry(pulmonaryArteryPath, 20, 0.1, 8, false);
    const pulmonaryArteryMaterial = new THREE.MeshPhongMaterial({
      color: 0x2196f3,
      shininess: 60
    });
    const pulmonaryArtery = new THREE.Mesh(pulmonaryArteryGeometry, pulmonaryArteryMaterial);
    systemGroup.add(pulmonaryArtery);
    
    // Venas pulmonares (sangre oxigenada - rojo)
    const pulmonaryVeinPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 3, 1),
      new THREE.Vector3(-4, 2.5, 0),
      new THREE.Vector3(-2, 1.5, -1),
      new THREE.Vector3(0, 0.5, 0)
    ]);
    
    const pulmonaryVeinGeometry = new THREE.TubeGeometry(pulmonaryVeinPath, 20, 0.08, 8, false);
    const pulmonaryVeinMaterial = new THREE.MeshPhongMaterial({
      color: 0xff1744,
      shininess: 60
    });
    const pulmonaryVein = new THREE.Mesh(pulmonaryVeinGeometry, pulmonaryVeinMaterial);
    systemGroup.add(pulmonaryVein);
    
    // Pulmones simplificados
    this.createLungs(systemGroup);
  }

  createSystemicCircuit(systemGroup) {
    // Aorta (sangre oxigenada - rojo)
    const aortaPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.8, 0),
      new THREE.Vector3(1, 2, 0),
      new THREE.Vector3(2, 3, 0),
      new THREE.Vector3(3, 3.5, 0),
      new THREE.Vector3(4, 3, 0),
      new THREE.Vector3(5, 2, 0),
      new THREE.Vector3(5, 0, 0),
      new THREE.Vector3(4, -2, 0),
      new THREE.Vector3(3, -3, 0)
    ]);
    
    const aortaGeometry = new THREE.TubeGeometry(aortaPath, 30, 0.12, 8, false);
    const aortaMaterial = new THREE.MeshPhongMaterial({
      color: 0xff1744,
      shininess: 60
    });
    const aorta = new THREE.Mesh(aortaGeometry, aortaMaterial);
    systemGroup.add(aorta);
    
    // Vena cava (sangre desoxigenada - azul)
    const venaCavaPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(3, -3.5, 0.5),
      new THREE.Vector3(2, -2, 0.5),
      new THREE.Vector3(1, 0, 0.5),
      new THREE.Vector3(0.5, 1, 0.5),
      new THREE.Vector3(0, 0.5, 0)
    ]);
    
    const venaCavaGeometry = new THREE.TubeGeometry(venaCavaPath, 25, 0.1, 8, false);
    const venaCavaMaterial = new THREE.MeshPhongMaterial({
      color: 0x2196f3,
      shininess: 60
    });
    const venaCava = new THREE.Mesh(venaCavaGeometry, venaCavaMaterial);
    systemGroup.add(venaCava);
  }

  createLungs(systemGroup) {
    const lungMaterial = new THREE.MeshPhongMaterial({
      color: 0xffc0cb,
      transparent: true,
      opacity: 0.6
    });
    
    // Pulmón izquierdo
    const leftLungGeometry = new THREE.SphereGeometry(1, 12, 12);
    leftLungGeometry.scale(0.8, 1.2, 0.6);
    const leftLung = new THREE.Mesh(leftLungGeometry, lungMaterial);
    leftLung.position.set(-4.5, 3, 0);
    systemGroup.add(leftLung);
    
    // Pulmón derecho
    const rightLungGeometry = new THREE.SphereGeometry(1, 12, 12);
    rightLungGeometry.scale(0.8, 1.2, 0.6);
    const rightLung = new THREE.Mesh(rightLungGeometry, lungMaterial);
    rightLung.position.set(-5.5, 3, 0);
    systemGroup.add(rightLung);
  }

  createCapillaryNetwork(systemGroup) {
    // Red capilar en órganos principales
    const capillaryMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b6b,
      transparent: true,
      opacity: 0.7
    });
    
    // Capilares en múltiples órganos
    const organPositions = [
      [4, 1, 0],   // Hígado
      [3.5, -1, 0], // Riñones
      [4.5, 0, 0],  // Intestinos
      [2, 3, 0]     // Cerebro
    ];
    
    organPositions.forEach(pos => {
      for (let i = 0; i < 10; i++) {
        const capillaryGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 4);
        const capillary = new THREE.Mesh(capillaryGeometry, capillaryMaterial);
        capillary.position.set(
          pos[0] + (Math.random() - 0.5) * 0.8,
          pos[1] + (Math.random() - 0.5) * 0.8,
          pos[2] + (Math.random() - 0.5) * 0.8
        );
        capillary.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        systemGroup.add(capillary);
      }
    });
  }

  createBloodFlow() {
    // Reducir partículas para mejor rendimiento (25 en lugar de 50)
    const particleGeometry = new THREE.SphereGeometry(0.02, 4, 4); // Menos segmentos
    
    for (let i = 0; i < 25; i++) {
      const isArterial = Math.random() > 0.5;
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: isArterial ? 0xff4444 : 0x4444ff
      });
      
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 2
      );
      
      // Información de flujo
      particle.userData = {
        speed: 0.01 + Math.random() * 0.02,
        path: isArterial ? 'arterial' : 'venous',
        time: Math.random() * Math.PI * 2
      };
      
      this.flowParticles.push(particle);
      this.scene.add(particle);
    }
  }

  setupControls() {
    // Variables para controles de rotación suave
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.rotationSpeed = 0.1;
    
    // Agregar indicador de interactividad
    const helpText = document.createElement('div');
    helpText.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      font-family: Arial, sans-serif;
      pointer-events: none;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);
      padding: 5px 8px;
      border-radius: 4px;
    `;
    helpText.innerHTML = 'Arrastra para rotar<br>Rueda para zoom<br>Doble clic para centrar';
    this.container.appendChild(helpText);
    
    this.container.style.cursor = 'grab';
    
    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.container.style.cursor = 'grabbing';
      this.previousMousePosition.x = e.clientX;
      this.previousMousePosition.y = e.clientY;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (this.isDragging && this.circulationSystem) {
        const deltaMove = {
          x: e.clientX - this.previousMousePosition.x,
          y: e.clientY - this.previousMousePosition.y
        };
        
        this.targetRotation.y += deltaMove.x * 0.01;
        this.targetRotation.x += deltaMove.y * 0.01;
        this.targetRotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.targetRotation.x));
        
        this.previousMousePosition.x = e.clientX;
        this.previousMousePosition.y = e.clientY;
      }
    });
    
    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    });
    
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoom = e.deltaY * 0.01;
      this.camera.position.z = Math.max(5, Math.min(20, this.camera.position.z + zoom));
    });
    
    // Doble clic para centrar y reiniciar vista
    this.container.addEventListener('dblclick', () => {
      this.targetRotation = { x: 0, y: 0 };
      this.camera.position.set(0, 0, 12);
      this.camera.lookAt(0, 0, 0);
    });
  }

  animate() {
    // Solo animar si está visible
    if (this.container.offsetParent !== null) {
      requestAnimationFrame(() => this.animate());
      
      if (this.circulationSystem) {
        // Aplicar rotación suave interpolada
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * this.rotationSpeed;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * this.rotationSpeed;
        
        // Rotación automática si no se está arrastrando
        if (!this.isDragging) {
          this.targetRotation.y += 0.001;
        }
        
        this.circulationSystem.rotation.x = this.currentRotation.x;
        this.circulationSystem.rotation.y = this.currentRotation.y;
      }
      
      // Animar flujo sanguíneo con menos partículas
      this.flowParticles.forEach((particle, index) => {
        // Solo animar cada segunda partícula para mejor rendimiento
        if (index % 2 === 0) {
          particle.userData.time += particle.userData.speed;
          
          if (particle.userData.path === 'arterial') {
            // Flujo arterial: desde el corazón hacia afuera
            particle.position.x = Math.cos(particle.userData.time) * 3;
            particle.position.y = Math.sin(particle.userData.time) * 2;
          } else {
            // Flujo venoso: hacia el corazón
            particle.position.x = -Math.cos(particle.userData.time) * 3;
            particle.position.y = Math.sin(particle.userData.time) * 2;
          }
        }
      });
      
      this.renderer.render(this.scene, this.camera);
    }
  }

  resize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}

// Diagrama de Fisiología Interactivo
class PhysiologyDiagramModel {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.diagram = null;
    this.animationTime = 0;
    this.selectedSystem = null;
    
    this.init();
  }

  init() {
    // Configurar renderer con optimizaciones de rendimiento
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = false; // Desactivar sombras para mejor rendimiento
    
    this.camera.position.set(0, 0, 15);
    this.camera.lookAt(0, 0, 0);
    
    this.setupLights();
    this.createPhysiologyDiagram();
    this.setupControls();
    
    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);
    
    this.animate();
  }

  setupLights() {
    // Iluminación optimizada
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 5, 5);
    this.scene.add(mainLight);
  }

  createPhysiologyDiagram() {
    this.diagram = new THREE.Group();
    
    // Centro: Cuerpo humano (representación simbólica)
    this.createHumanBody();
    
    // Sistemas de control alrededor
    this.createControlSystems();
    
    // Conectores que muestran interacciones
    this.createConnections();
    
    // Información flotante
    this.createFloatingLabels();
    
    this.scene.add(this.diagram);
  }

  createHumanBody() {
    // Crear una representación estilizada del cuerpo humano
    const bodyGroup = new THREE.Group();
    
    // Torso principal
    const torsoGeometry = new THREE.CylinderGeometry(1.2, 1.5, 4, 8);
    const torsoMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.8,
      shininess: 50
    });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.set(0, 0, 0);
    bodyGroup.add(torso);
    
    // Cabeza
    const headGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0x5ba3f5,
      transparent: true,
      opacity: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 3, 0);
    bodyGroup.add(head);
    
    // Brazos
    const armGeometry = new THREE.CylinderGeometry(0.3, 0.4, 2.5, 6);
    const armMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.7
    });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-2, 0.5, 0);
    leftArm.rotation.z = Math.PI / 6;
    bodyGroup.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(2, 0.5, 0);
    rightArm.rotation.z = -Math.PI / 6;
    bodyGroup.add(rightArm);
    
    // Piernas
    const legGeometry = new THREE.CylinderGeometry(0.4, 0.5, 3, 6);
    const legMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.7
    });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.6, -3.5, 0);
    bodyGroup.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.6, -3.5, 0);
    bodyGroup.add(rightLeg);
    
    this.diagram.add(bodyGroup);
    this.humanBody = bodyGroup;
  }

  createControlSystems() {
    this.controlSystems = [];
    
    // Definir los sistemas de control
    const systems = [
      {
        name: 'Sistema Nervioso',
        color: 0xffd700,
        position: { x: -6, y: 4, z: 0 },
        icon: '🧠'
      },
      {
        name: 'Sistema Endocrino',
        color: 0xff6b6b,
        position: { x: 6, y: 4, z: 0 },
        icon: '🧪'
      },
      {
        name: 'Sistema Cardiovascular',
        color: 0xff4757,
        position: { x: -6, y: 0, z: 0 },
        icon: '❤️'
      },
      {
        name: 'Sistema Respiratorio',
        color: 0x5352ed,
        position: { x: 6, y: 0, z: 0 },
        icon: '🫁'
      },
      {
        name: 'Sistema Renal',
        color: 0x00d2d3,
        position: { x: -6, y: -4, z: 0 },
        icon: '🔄'
      },
      {
        name: 'Homeostasis',
        color: 0x7bed9f,
        position: { x: 6, y: -4, z: 0 },
        icon: '⚖️'
      }
    ];
    
    systems.forEach((system, index) => {
      const systemGroup = this.createSystemNode(system, index);
      this.diagram.add(systemGroup);
      this.controlSystems.push({
        ...system,
        mesh: systemGroup,
        index
      });
    });
  }

  createSystemNode(system, index) {
    const systemGroup = new THREE.Group();
    
    // Nodo principal del sistema
    const nodeGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: system.color,
      shininess: 80,
      transparent: true,
      opacity: 0.9
    });
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    node.position.set(system.position.x, system.position.y, system.position.z);
    systemGroup.add(node);
    
    // Anillo exterior que pulsa
    const ringGeometry = new THREE.RingGeometry(1.2, 1.4, 16);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: system.color,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.copy(node.position);
    ring.rotation.x = Math.PI / 2;
    systemGroup.add(ring);
    
    // Partículas de actividad alrededor del nodo
    const particleCount = 8;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: system.color,
        transparent: true,
        opacity: 0.6
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      
      const angle = (i / particleCount) * Math.PI * 2;
      particle.userData = {
        angle: angle,
        radius: 2,
        speed: 0.02 + Math.random() * 0.02,
        originalY: system.position.y
      };
      
      systemGroup.add(particle);
      particles.push(particle);
    }
    
    systemGroup.userData = {
      system: system,
      node: node,
      ring: ring,
      particles: particles,
      originalPosition: { ...system.position }
    };
    
    return systemGroup;
  }

  createConnections() {
    this.connections = [];
    
    // Crear líneas que conectan cada sistema con el cuerpo central
    this.controlSystems.forEach((system) => {
      const points = [];
      points.push(new THREE.Vector3(system.position.x * 0.8, system.position.y * 0.8, 0));
      points.push(new THREE.Vector3(0, 0, 0));
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: system.color,
        transparent: true,
        opacity: 0.6
      });
      
      const line = new THREE.Line(geometry, material);
      this.diagram.add(line);
      this.connections.push({
        line: line,
        system: system,
        material: material
      });
    });
    
    // Crear conexiones entre sistemas (red de interacciones)
    for (let i = 0; i < this.controlSystems.length; i++) {
      for (let j = i + 1; j < this.controlSystems.length; j++) {
        const system1 = this.controlSystems[i];
        const system2 = this.controlSystems[j];
        
        const points = [];
        points.push(new THREE.Vector3(system1.position.x * 0.9, system1.position.y * 0.9, 0));
        points.push(new THREE.Vector3(system2.position.x * 0.9, system2.position.y * 0.9, 0));
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0x888888,
          transparent: true,
          opacity: 0.2
        });
        
        const line = new THREE.Line(geometry, material);
        this.diagram.add(line);
        this.connections.push({
          line: line,
          system1: system1,
          system2: system2,
          material: material,
          isInterconnection: true
        });
      }
    }
  }

  createFloatingLabels() {
    // Esta función podría expandirse para crear etiquetas 3D si es necesario
    // Por ahora, las etiquetas se manejarán con HTML overlay
  }

  setupControls() {
    // Variables para controles de rotación suave
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.rotationSpeed = 0.1;
    
    // Agregar indicador de interactividad
    const helpText = document.createElement('div');
    helpText.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      font-family: Arial, sans-serif;
      pointer-events: none;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);
      padding: 5px 8px;
      border-radius: 4px;
    `;
    helpText.innerHTML = 'Arrastra para rotar<br>Rueda para zoom<br>Click en sistemas';
    this.container.appendChild(helpText);
    
    this.container.style.cursor = 'grab';
    
    // Raycaster para detección de clicks
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    this.container.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.container.style.cursor = 'grabbing';
      this.previousMousePosition.x = e.clientX;
      this.previousMousePosition.y = e.clientY;
    });
    
    document.addEventListener('mousemove', (e) => {
      if (this.isDragging && this.diagram) {
        const deltaMove = {
          x: e.clientX - this.previousMousePosition.x,
          y: e.clientY - this.previousMousePosition.y
        };
        
        this.targetRotation.y += deltaMove.x * 0.01;
        this.targetRotation.x += deltaMove.y * 0.01;
        this.targetRotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, this.targetRotation.x));
        
        this.previousMousePosition.x = e.clientX;
        this.previousMousePosition.y = e.clientY;
      }
    });
    
    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    });
    
    this.container.addEventListener('mouseleave', () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    });
    
    this.container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoom = e.deltaY * 0.001;
      this.camera.position.z = Math.max(8, Math.min(25, this.camera.position.z + zoom));
    });
    
    // Click para seleccionar sistemas
    this.container.addEventListener('click', (e) => {
      if (!this.isDragging) {
        this.handleSystemClick(e);
      }
    });
    
    // Doble clic para centrar y reiniciar vista
    this.container.addEventListener('dblclick', () => {
      this.targetRotation = { x: 0, y: 0 };
      this.camera.position.set(0, 0, 15);
      this.camera.lookAt(0, 0, 0);
      this.selectedSystem = null;
      this.resetSystemHighlights();
    });
  }

  handleSystemClick(event) {
    // Convertir coordenadas del mouse a coordenadas normalizadas
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    this.raycaster.setFromCamera(this.mouse, this.camera);
    
    // Buscar intersecciones con los nodos de los sistemas
    const systemNodes = this.controlSystems.map(system => system.mesh.userData.node);
    const intersects = this.raycaster.intersectObjects(systemNodes);
    
    if (intersects.length > 0) {
      const clickedNode = intersects[0].object;
      const systemIndex = this.controlSystems.findIndex(
        system => system.mesh.userData.node === clickedNode
      );
      
      if (systemIndex !== -1) {
        this.selectSystem(systemIndex);
      }
    }
  }

  selectSystem(index) {
    this.selectedSystem = index;
    this.resetSystemHighlights();
    
    const selectedSystem = this.controlSystems[index];
    
    // Resaltar el sistema seleccionado
    selectedSystem.mesh.userData.node.material.emissive.setHex(0x444444);
    selectedSystem.mesh.userData.ring.material.opacity = 0.8;
    
    // Resaltar conexiones relacionadas
    this.connections.forEach(connection => {
      if (connection.system === selectedSystem || 
          connection.system1 === selectedSystem || 
          connection.system2 === selectedSystem) {
        connection.material.opacity = 1.0;
        connection.material.color.setHex(selectedSystem.color);
      }
    });
    
    // Mostrar información del sistema
    this.showSystemInfo(selectedSystem);
  }

  resetSystemHighlights() {
    this.controlSystems.forEach(system => {
      system.mesh.userData.node.material.emissive.setHex(0x000000);
      system.mesh.userData.ring.material.opacity = 0.3;
    });
    
    this.connections.forEach(connection => {
      if (connection.isInterconnection) {
        connection.material.opacity = 0.2;
        connection.material.color.setHex(0x888888);
      } else {
        connection.material.opacity = 0.6;
        connection.material.color.setHex(connection.system.color);
      }
    });
    
    this.hideSystemInfo();
  }

  showSystemInfo(system) {
    // Remover info anterior si existe
    this.hideSystemInfo();
    
    const infoDiv = document.createElement('div');
    infoDiv.id = 'system-info';
    infoDiv.style.cssText = `
      position: absolute;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      z-index: 1001;
      border-left: 4px solid #${system.color.toString(16)};
    `;
    
    const systemDescriptions = {
      'Sistema Nervioso': 'Controla y coordina las actividades del cuerpo mediante señales eléctricas rápidas.',
      'Sistema Endocrino': 'Regula funciones corporales mediante hormonas que actúan a largo plazo.',
      'Sistema Cardiovascular': 'Transporta sangre, oxígeno y nutrientes por todo el cuerpo.',
      'Sistema Respiratorio': 'Intercambia oxígeno y dióxido de carbono con el ambiente.',
      'Sistema Renal': 'Filtra la sangre, elimina desechos y mantiene el equilibrio de líquidos.',
      'Homeostasis': 'Mantiene las condiciones internas estables del cuerpo.'
    };
    
    infoDiv.innerHTML = `
      <h4 style="margin: 0 0 10px 0; color: #${system.color.toString(16)};">
        ${system.icon} ${system.name}
      </h4>
      <p style="margin: 0; font-size: 14px; line-height: 1.4;">
        ${systemDescriptions[system.name] || 'Sistema de control vital del cuerpo humano.'}
      </p>
    `;
    
    this.container.appendChild(infoDiv);
  }

  hideSystemInfo() {
    const existingInfo = document.getElementById('system-info');
    if (existingInfo) {
      existingInfo.remove();
    }
  }

  animate() {
    if (this.container.offsetParent !== null) {
      requestAnimationFrame(() => this.animate());
      
      this.animationTime += 0.01;
      
      if (this.diagram) {
        // Aplicar rotación suave interpolada
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * this.rotationSpeed;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * this.rotationSpeed;
        
        // Rotación automática si no se está arrastrando
        if (!this.isDragging) {
          this.targetRotation.y += 0.003;
        }
        
        this.diagram.rotation.x = this.currentRotation.x;
        this.diagram.rotation.y = this.currentRotation.y;
        
        // Animar sistemas de control
        this.controlSystems.forEach((system, index) => {
          const systemGroup = system.mesh;
          
          // Pulso del anillo
          const ring = systemGroup.userData.ring;
          const pulseScale = 1 + Math.sin(this.animationTime * 2 + index * 0.5) * 0.1;
          ring.scale.set(pulseScale, pulseScale, pulseScale);
          
          // Animar partículas orbitando
          systemGroup.userData.particles.forEach((particle, particleIndex) => {
            const userData = particle.userData;
            userData.angle += userData.speed;
            
            particle.position.x = system.position.x + Math.cos(userData.angle) * userData.radius;
            particle.position.y = system.position.y + Math.sin(userData.angle) * userData.radius;
            particle.position.z = Math.sin(userData.angle * 2) * 0.5;
          });
        });
        
        // Animar conexiones
        this.connections.forEach((connection, index) => {
          if (!connection.isInterconnection) {
            const pulse = (Math.sin(this.animationTime * 3 + index * 0.3) + 1) * 0.5;
            connection.material.opacity = 0.3 + pulse * 0.3;
          }
        });
        
        // Efecto de respiración en el cuerpo humano
        if (this.humanBody) {
          const breathScale = 1 + Math.sin(this.animationTime * 1.5) * 0.05;
          this.humanBody.scale.set(breathScale, breathScale, breathScale);
        }
      }
      
      this.renderer.render(this.scene, this.camera);
    }
  }

  cleanup() {
    this.hideSystemInfo();
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      // Limpiar geometrías y materiales
      this.scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
  }

  resize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}

// Funciones de inicialización para los modelos 3D mejorados
let models3D = {}; // Variable global para almacenar los modelos

function initializeModels() {
  // Los modelos se inicializarán cuando sean necesarios
  console.log('Sistema de modelos 3D mejorados cargado');
}

function initializeModelOnSlide(slideNumber) {
  switch(slideNumber) {
    case 1:
      // Corazón anatómico 3D
      const heartContainer = document.getElementById('heart-3d-container');
      if (heartContainer && !models3D.heart) {
        try {
          models3D.heart = new Heart3DModel(heartContainer);
          console.log('Modelo de corazón anatómico cargado');
        } catch (error) {
          console.error('Error cargando modelo de corazón:', error);
          heartContainer.innerHTML = '<p style="text-align: center; color: #666;">Error cargando modelo 3D</p>';
        }
      }
      break;
      
    case 2:
      // Diagrama de Fisiología Interactivo
      const diagramContainer = document.getElementById('physiology-diagram-container');
      if (diagramContainer && !models3D.diagram) {
        try {
          models3D.diagram = new PhysiologyDiagramModel(diagramContainer);
          console.log('Diagrama de fisiología interactivo cargado');
        } catch (error) {
          console.error('Error cargando diagrama de fisiología:', error);
          diagramContainer.innerHTML = '<p style="text-align: center; color: #666;">Error cargando modelo 3D</p>';
        }
      }
      break;
      
    case 3:
      // Célula detallada 3D
      const cellContainer = document.getElementById('cell-3d-container');
      if (cellContainer && !models3D.cell) {
        try {
          models3D.cell = new Cell3DModel(cellContainer);
          console.log('Modelo de célula detallada cargado');
        } catch (error) {
          console.error('Error cargando modelo de célula:', error);
          cellContainer.innerHTML = '<p style="text-align: center; color: #666;">Error cargando modelo 3D</p>';
        }
      }
      break;
      
    case 5:
      // Sistema circulatorio 3D
      const circulationContainer = document.getElementById('circulation-3d-container');
      if (circulationContainer && !models3D.circulation) {
        try {
          models3D.circulation = new CirculationSystem3DModel(circulationContainer);
          console.log('Modelo de sistema circulatorio cargado');
        } catch (error) {
          console.error('Error cargando modelo de circulación:', error);
          circulationContainer.innerHTML = '<p style="text-align: center; color: #666;">Error cargando modelo 3D</p>';
        }
      }
      break;
  }
}

function cleanupModels() {
  // Limpiar modelos cuando sea necesario para liberar memoria
  Object.values(models3D).forEach(model => {
    if (model && model.renderer) {
      // Limpiar geometrías y materiales
      if (model.scene) {
        model.scene.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
          if (object.texture) {
            object.texture.dispose();
          }
        });
      }
      
      // Limpiar renderer
      model.renderer.dispose();
      model.renderer.forceContextLoss();
    }
  });
  models3D = {};
}

// Pausar/reanudar animaciones según visibilidad
function pauseInactiveModels() {
  Object.entries(models3D).forEach(([key, model]) => {
    if (model && model.container) {
      const isVisible = model.container.offsetParent !== null;
      if (!isVisible && model.isAnimating) {
        model.isAnimating = false;
      } else if (isVisible && !model.isAnimating) {
        model.isAnimating = true;
      }
    }
  });
}

// Manejar redimensionamiento de ventana
function handleResize() {
  Object.values(models3D).forEach(model => {
    if (model && model.resize) {
      model.resize();
    }
  });
}

window.addEventListener('resize', handleResize);

export { Heart3DModel, Cell3DModel, CirculationSystem3DModel, PhysiologyDiagramModel, initializeModels, initializeModelOnSlide, cleanupModels };
