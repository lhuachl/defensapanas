import * as THREE from 'three';

// Configuración global para todos los modelos
const MODEL_CONFIG = {
  antialias: true,
  alpha: true,
  clearColor: 0x000000,
  clearAlpha: 0
};

// Clase base para modelos 3D
class Base3DModel {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.options = {
      width: options.width || this.container.clientWidth,
      height: options.height || this.container.clientHeight || 400,
      ...options
    };
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.model = null;
    this.animationId = null;
    this.isInitialized = false;
    
    this.mouse = { x: 0, y: 0 };
    this.isMouseDown = false;
    this.rotationSpeed = 0.01;
  }

  init() {
    if (!this.container) return;
    
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupLights();
    this.createModel();
    this.setupControls();
    this.startAnimation();
    this.hideLoading();
    
    this.isInitialized = true;
  }

  setupScene() {
    this.scene = new THREE.Scene();
  }

  setupCamera() {
    const aspect = this.options.width / this.options.height;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.z = 5;
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer(MODEL_CONFIG);
    this.renderer.setSize(this.options.width, this.options.height);
    this.renderer.setClearColor(MODEL_CONFIG.clearColor, MODEL_CONFIG.clearAlpha);
    this.container.appendChild(this.renderer.domElement);
  }

  setupLights() {
    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Luz direccional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    // Luz puntual
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-1, -1, 1);
    this.scene.add(pointLight);
  }

  setupControls() {
    this.renderer.domElement.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.renderer.domElement.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });

    this.renderer.domElement.addEventListener('mousemove', (e) => {
      if (!this.isMouseDown) return;

      const deltaX = e.clientX - this.mouse.x;
      const deltaY = e.clientY - this.mouse.y;

      if (this.model) {
        this.model.rotation.y += deltaX * this.rotationSpeed;
        this.model.rotation.x += deltaY * this.rotationSpeed;
      }

      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.renderer.domElement.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoom = e.deltaY > 0 ? 1.1 : 0.9;
      this.camera.position.z *= zoom;
      this.camera.position.z = Math.max(2, Math.min(10, this.camera.position.z));
    });
  }

  startAnimation() {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.updateAnimation();
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  updateAnimation() {
    // Override en clases hijas para animaciones específicas
  }

  hideLoading() {
    const loading = this.container.querySelector('.model-loading');
    if (loading) {
      loading.style.display = 'none';
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer && this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }

  resize(width, height) {
    if (!this.isInitialized) return;
    
    this.options.width = width;
    this.options.height = height;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

// Modelo 3D del Corazón
class Heart3DModel extends Base3DModel {
  createModel() {
    const heartGroup = new THREE.Group();

    // Crear geometría básica del corazón usando esferas y formas
    const heartGeometry = this.createHeartGeometry();
    const heartMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xcc2936,
      shininess: 30,
      transparent: true,
      opacity: 0.9
    });
    
    const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
    heartGroup.add(heartMesh);

    // Agregar vasos principales
    this.addBloodVessels(heartGroup);
    
    this.model = heartGroup;
    this.scene.add(this.model);
  }

  createHeartGeometry() {
    const heartShape = new THREE.Shape();
    
    // Crear forma de corazón usando curvas
    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
    heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
    heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
    heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);

    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    };

    return new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  }

  addBloodVessels(heartGroup) {
    // Arteria principal (Aorta)
    const aortaGeometry = new THREE.CylinderGeometry(0.1, 0.15, 2, 8);
    const aortaMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
    const aorta = new THREE.Mesh(aortaGeometry, aortaMaterial);
    aorta.position.set(0.3, 1, 0);
    aorta.rotation.z = Math.PI / 6;
    heartGroup.add(aorta);

    // Venas principales
    const veinGeometry = new THREE.CylinderGeometry(0.12, 0.12, 1.5, 8);
    const veinMaterial = new THREE.MeshPhongMaterial({ color: 0x4ecdc4 });
    const vein = new THREE.Mesh(veinGeometry, veinMaterial);
    vein.position.set(-0.3, 0.8, 0);
    vein.rotation.z = -Math.PI / 4;
    heartGroup.add(vein);
  }

  updateAnimation() {
    if (this.model && !this.isMouseDown) {
      // Rotación automática suave
      this.model.rotation.y += 0.005;
      
      // Efecto de latido
      const scale = 1 + Math.sin(Date.now() * 0.008) * 0.05;
      this.model.scale.set(scale, scale, scale);
    }
  }
}

// Modelo 3D de Célula
class Cell3DModel extends Base3DModel {
  createModel() {
    const cellGroup = new THREE.Group();

    // Membrana celular
    const membraneGeometry = new THREE.SphereGeometry(1, 32, 32);
    const membraneMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x88c999,
      transparent: true,
      opacity: 0.3,
      wireframe: false
    });
    const membrane = new THREE.Mesh(membraneGeometry, membraneMaterial);
    cellGroup.add(membrane);

    // Núcleo
    const nucleusGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const nucleusMaterial = new THREE.MeshPhongMaterial({ color: 0x2c5aa0 });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    nucleus.position.set(0, 0, 0);
    cellGroup.add(nucleus);

    // Mitocondrias
    this.addMitochondria(cellGroup);
    
    // Retículo endoplasmático
    this.addEndoplasmicReticulum(cellGroup);

    this.model = cellGroup;
    this.scene.add(this.model);
  }

  addMitochondria(cellGroup) {
    for (let i = 0; i < 6; i++) {
      const mitoGeometry = new THREE.CapsuleGeometry(0.05, 0.2, 4, 8);
      const mitoMaterial = new THREE.MeshPhongMaterial({ color: 0xff9800 });
      const mitochondria = new THREE.Mesh(mitoGeometry, mitoMaterial);
      
      // Posición aleatoria dentro de la célula
      const angle = (i / 6) * Math.PI * 2;
      const radius = 0.4 + Math.random() * 0.3;
      mitochondria.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.5,
        Math.sin(angle) * radius
      );
      mitochondria.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      cellGroup.add(mitochondria);
    }
  }

  addEndoplasmicReticulum(cellGroup) {
    const erGeometry = new THREE.TorusGeometry(0.6, 0.02, 8, 100);
    const erMaterial = new THREE.MeshPhongMaterial({ color: 0x9c27b0 });
    
    for (let i = 0; i < 3; i++) {
      const er = new THREE.Mesh(erGeometry, erMaterial);
      er.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      er.scale.set(
        0.8 + Math.random() * 0.4,
        0.8 + Math.random() * 0.4,
        0.8 + Math.random() * 0.4
      );
      cellGroup.add(er);
    }
  }

  updateAnimation() {
    if (this.model && !this.isMouseDown) {
      this.model.rotation.y += 0.003;
      this.model.rotation.x += 0.001;
    }
  }
}

// Modelo 3D del Sistema Circulatorio
class CirculationSystem3DModel extends Base3DModel {
  createModel() {
    const systemGroup = new THREE.Group();

    // Corazón central simplificado
    const heartGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.5);
    const heartMaterial = new THREE.MeshPhongMaterial({ color: 0xcc2936 });
    const heart = new THREE.Mesh(heartGeometry, heartMaterial);
    systemGroup.add(heart);

    // Sistema de vasos sanguíneos
    this.createVascularNetwork(systemGroup);
    
    // Capilares (representación simplificada)
    this.createCapillaryNetwork(systemGroup);

    this.model = systemGroup;
    this.scene.add(this.model);
    
    // Ajustar cámara para vista completa
    this.camera.position.set(3, 2, 5);
    this.camera.lookAt(0, 0, 0);
  }

  createVascularNetwork(systemGroup) {
    // Arteria principal
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(1, 1.5, 0),
      new THREE.Vector3(2, 0.5, 0)
    );
    
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.1, 8, false);
    const arteryMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b });
    const artery = new THREE.Mesh(tubeGeometry, arteryMaterial);
    systemGroup.add(artery);

    // Vena de retorno
    const veinCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(2, 0.5, 0),
      new THREE.Vector3(1, -1, 0),
      new THREE.Vector3(0, -0.4, 0)
    );
    
    const veinGeometry = new THREE.TubeGeometry(veinCurve, 20, 0.08, 8, false);
    const veinMaterial = new THREE.MeshPhongMaterial({ color: 0x4ecdc4 });
    const vein = new THREE.Mesh(veinGeometry, veinMaterial);
    systemGroup.add(vein);
  }

  createCapillaryNetwork(systemGroup) {
    // Red capilar simplificada
    for (let i = 0; i < 20; i++) {
      const capillaryGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 4);
      const capillaryMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffab00,
        transparent: true,
        opacity: 0.7
      });
      const capillary = new THREE.Mesh(capillaryGeometry, capillaryMaterial);
      
      capillary.position.set(
        1.5 + (Math.random() - 0.5) * 1,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 0.5
      );
      capillary.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      systemGroup.add(capillary);
    }
  }

  updateAnimation() {
    if (this.model && !this.isMouseDown) {
      this.model.rotation.y += 0.004;
    }
  }
}

// Función para inicializar todos los modelos
export function initializeModels() {
  const models = {};

  // Verificar si los contenedores existen antes de inicializar
  if (document.getElementById('heart-3d-container')) {
    models.heart = new Heart3DModel('heart-3d-container');
  }
  
  if (document.getElementById('cell-3d-container')) {
    models.cell = new Cell3DModel('cell-3d-container');
  }
  
  if (document.getElementById('circulation-3d-container')) {
    models.circulation = new CirculationSystem3DModel('circulation-3d-container');
  }

  return models;
}

// Función para inicializar modelos cuando se cambia de slide
export function initializeModelOnSlide(slideNumber, models) {
  setTimeout(() => {
    switch(slideNumber) {
      case 1:
        if (models.heart && !models.heart.isInitialized) {
          models.heart.init();
        }
        break;
      case 3:
        if (models.cell && !models.cell.isInitialized) {
          models.cell.init();
        }
        break;
      case 5:
        if (models.circulation && !models.circulation.isInitialized) {
          models.circulation.init();
        }
        break;
    }
  }, 500); // Pequeño delay para asegurar que el slide esté visible
}

// Función para limpiar modelos
export function cleanupModels(models) {
  Object.values(models).forEach(model => {
    if (model && model.destroy) {
      model.destroy();
    }
  });
}
