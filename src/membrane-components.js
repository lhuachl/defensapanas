// ===== COMPONENTES INTERACTIVOS PARA MEMBRANAS Y TRANSPORTE =====

import { gsap } from 'gsap';

export class MembraneComponents {
  constructor() {
    this.init();
  }

  init() {
    this.createInteractiveMembranes();
    this.createMoleculeAnimations();
    this.createTransportAnimations();
  }

  // ===== MEMBRANA INTERACTIVA 3D =====
  createInteractiveMembranes() {
    const membraneContainer = document.querySelector('.membrane-visual');
    if (!membraneContainer) return;

    // Crear estructura 3D mejorada
    membraneContainer.innerHTML = `
      <div class="interactive-membrane-3d">
        <div class="membrane-layer top-layer">
          <div class="phospholipid-heads"></div>
          <div class="phospholipid-tails"></div>
        </div>
        
        <div class="membrane-proteins-layer">
          <div class="protein channel-protein" data-type="canal">
            <div class="protein-label">Canal de Na⁺</div>
            <div class="ion-flow">
              <div class="ion sodium">Na⁺</div>
              <div class="ion sodium">Na⁺</div>
            </div>
          </div>
          
          <div class="protein transporter-protein" data-type="transportador">
            <div class="protein-label">Transportador</div>
            <div class="molecule-binding">
              <div class="molecule glucose">Glucosa</div>
            </div>
          </div>
          
          <div class="protein pump-protein" data-type="bomba">
            <div class="protein-label">Bomba Na⁺/K⁺</div>
            <div class="atp-site">
              <div class="atp-molecule">ATP</div>
            </div>
          </div>
        </div>
        
        <div class="membrane-layer bottom-layer">
          <div class="phospholipid-tails"></div>
          <div class="phospholipid-heads"></div>
        </div>
        
        <div class="membrane-controls">
          <button class="control-btn" data-action="rotate">🔄 Rotar</button>
          <button class="control-btn" data-action="zoom">🔍 Zoom</button>
          <button class="control-btn" data-action="animate">▶️ Animar</button>
        </div>
      </div>
    `;

    this.setupMembraneInteractions();
  }

  setupMembraneInteractions() {
    const membrane = document.querySelector('.interactive-membrane-3d');
    const proteins = document.querySelectorAll('.protein');
    const controls = document.querySelectorAll('.control-btn');

    // Interacciones con proteínas
    proteins.forEach(protein => {
      protein.addEventListener('mouseenter', () => {
        this.highlightProtein(protein);
      });

      protein.addEventListener('mouseleave', () => {
        this.unhighlightProtein(protein);
      });

      protein.addEventListener('click', () => {
        this.showProteinInfo(protein);
      });
    });

    // Controles de membrana
    controls.forEach(control => {
      control.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.executeMembraneAction(action, membrane);
      });
    });
  }

  highlightProtein(protein) {
    gsap.to(protein, {
      scale: 1.1,
      boxShadow: '0 0 20px var(--primary-yellow)',
      duration: 0.3,
      ease: 'power2.out'
    });

    // Mostrar información flotante
    const label = protein.querySelector('.protein-label');
    gsap.to(label, {
      opacity: 1,
      y: -10,
      duration: 0.3
    });
  }

  unhighlightProtein(protein) {
    gsap.to(protein, {
      scale: 1,
      boxShadow: '0 4px 20px rgba(30, 64, 175, 0.3)',
      duration: 0.3
    });

    const label = protein.querySelector('.protein-label');
    gsap.to(label, {
      opacity: 0,
      y: 0,
      duration: 0.3
    });
  }

  showProteinInfo(protein) {
    const type = protein.dataset.type;
    const info = this.getProteinInfo(type);
    
    // Crear modal informativo
    this.createInfoModal(info);
  }

  executeMembraneAction(action, membrane) {
    switch (action) {
      case 'rotate':
        this.rotateMembraneView(membrane);
        break;
      case 'zoom':
        this.zoomMembraneView(membrane);
        break;
      case 'animate':
        this.animateTransportProcesses(membrane);
        break;
    }
  }

  rotateMembraneView(membrane) {
    gsap.to(membrane, {
      rotationY: '+=360',
      duration: 3,
      ease: 'power2.inOut'
    });
  }

  zoomMembraneView(membrane) {
    const isZoomed = membrane.classList.contains('zoomed');
    
    gsap.to(membrane, {
      scale: isZoomed ? 1 : 1.5,
      duration: 0.8,
      ease: 'power2.inOut'
    });

    membrane.classList.toggle('zoomed');
  }

  animateTransportProcesses(membrane) {
    // Animar flujo de iones
    const ions = membrane.querySelectorAll('.ion');
    const molecules = membrane.querySelectorAll('.molecule');
    const atp = membrane.querySelectorAll('.atp-molecule');

    // Timeline para procesos coordinados
    const tl = gsap.timeline({ repeat: 2 });

    // Iones moviéndose a través de canales
    tl.to(ions, {
      y: -50,
      opacity: 0.5,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.inOut'
    })
    .to(ions, {
      y: 50,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.inOut'
    }, '-=0.5');

    // Moléculas siendo transportadas
    tl.to(molecules, {
      x: 30,
      rotation: 180,
      duration: 1.5,
      ease: 'power2.inOut'
    }, '-=1')
    .to(molecules, {
      x: -30,
      rotation: 360,
      duration: 1.5,
      ease: 'power2.inOut'
    });

    // ATP siendo consumido
    tl.to(atp, {
      scale: 0.5,
      opacity: 0.3,
      duration: 0.5,
      ease: 'power2.in'
    }, '-=1')
    .to(atp, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });
  }

  // ===== ANIMACIONES DE MOLÉCULAS =====
  createMoleculeAnimations() {
    const moleculeContainers = document.querySelectorAll('.molecules');
    
    moleculeContainers.forEach(container => {
      const molecules = container.querySelectorAll('.molecule');
      
      molecules.forEach((molecule, index) => {
        // Movimiento browniano simulado
        gsap.to(molecule, {
          x: () => gsap.utils.random(-30, 30),
          y: () => gsap.utils.random(-30, 30),
          rotation: () => gsap.utils.random(-180, 180),
          duration: () => gsap.utils.random(2, 5),
          ease: 'none',
          repeat: -1,
          repeatRefresh: true,
          delay: index * 0.5
        });

        // Interacción al hover
        molecule.addEventListener('mouseenter', () => {
          gsap.to(molecule, {
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
        });

        molecule.addEventListener('mouseleave', () => {
          gsap.to(molecule, {
            scale: 1,
            duration: 0.3
          });
        });
      });
    });
  }

  // ===== ANIMACIONES DE TRANSPORTE =====
  createTransportAnimations() {
    // Crear visualización de gradientes
    this.createGradientVisualization();
    
    // Animar flechas de dirección
    this.animateDirectionArrows();
    
    // Crear efectos de energía
    this.createEnergyEffects();
  }

  createGradientVisualization() {
    const gradientContainers = document.querySelectorAll('.concentration-diagram');
    
    gradientContainers.forEach(container => {
      // Crear partículas para mostrar concentración
      const highConc = container.querySelector('.high-concentration');
      const lowConc = container.querySelector('.low-concentration');
      
      if (highConc && lowConc) {
        this.addConcentrationParticles(highConc, 20);
        this.addConcentrationParticles(lowConc, 5);
      }
    });
  }

  addConcentrationParticles(container, count) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'concentration-particles';
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'concentration-particle';
      particle.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--primary-blue);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      
      particlesContainer.appendChild(particle);
      
      // Animar partícula
      gsap.to(particle, {
        x: () => gsap.utils.random(-20, 20),
        y: () => gsap.utils.random(-20, 20),
        duration: () => gsap.utils.random(3, 6),
        ease: 'none',
        repeat: -1,
        repeatRefresh: true,
        delay: i * 0.2
      });
    }
    
    container.appendChild(particlesContainer);
  }

  animateDirectionArrows() {
    const arrows = document.querySelectorAll('.passive-arrow, .active-arrow');
    
    arrows.forEach(arrow => {
      // Efecto de pulso continuo
      gsap.to(arrow, {
        opacity: 0.5,
        duration: 1,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      });

      // Movimiento de traslación
      gsap.to(arrow, {
        x: 20,
        duration: 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      });
    });
  }

  createEnergyEffects() {
    // Crear efectos de ATP y energía
    const atpElements = document.querySelectorAll('.atp-site, .energy-source');
    
    atpElements.forEach(element => {
      // Crear partículas de energía
      const energyParticle = document.createElement('div');
      energyParticle.className = 'energy-particle';
      energyParticle.innerHTML = '⚡';
      energyParticle.style.cssText = `
        position: absolute;
        font-size: 1.2rem;
        color: var(--primary-yellow);
        pointer-events: none;
        z-index: 10;
      `;
      
      element.appendChild(energyParticle);
      
      // Animar partícula de energía
      gsap.to(energyParticle, {
        y: -30,
        opacity: 0,
        scale: 1.5,
        duration: 2,
        ease: 'power2.out',
        repeat: -1,
        delay: Math.random() * 2
      });
    });
  }

  // ===== INFORMACIÓN DE PROTEÍNAS =====
  getProteinInfo(type) {
    const proteinData = {
      canal: {
        title: 'Canal Proteico',
        description: 'Permite el paso selectivo de iones específicos',
        characteristics: [
          'Permeabilidad selectiva',
          'Regulación por voltaje o ligandos',
          'Transporte pasivo'
        ]
      },
      transportador: {
        title: 'Proteína Transportadora',
        description: 'Facilita el transporte de moléculas específicas',
        characteristics: [
          'Cambio conformacional',
          'Especificidad molecular',
          'Puede ser activo o pasivo'
        ]
      },
      bomba: {
        title: 'Bomba de Iones',
        description: 'Transporte activo que requiere energía (ATP)',
        characteristics: [
          'Contra gradiente de concentración',
          'Consumo de ATP',
          'Mantenimiento de gradientes'
        ]
      }
    };

    return proteinData[type] || {};
  }

  createInfoModal(info) {
    // Crear modal con información detallada
    const modal = document.createElement('div');
    modal.className = 'protein-info-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>${info.title}</h3>
          <button class="close-modal">×</button>
        </div>
        <div class="modal-body">
          <p>${info.description}</p>
          <ul>
            ${info.characteristics?.map(char => `<li>${char}</li>`).join('') || ''}
          </ul>
        </div>
      </div>
      <div class="modal-overlay"></div>
    `;

    document.body.appendChild(modal);

    // Animar aparición
    gsap.fromTo(modal, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );

    gsap.fromTo(modal.querySelector('.modal-content'),
      { scale: 0.8, y: 50 },
      { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );

    // Event listeners para cerrar
    modal.querySelector('.close-modal').addEventListener('click', () => {
      this.closeModal(modal);
    });

    modal.querySelector('.modal-overlay').addEventListener('click', () => {
      this.closeModal(modal);
    });
  }

  closeModal(modal) {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => modal.remove()
    });
  }
}

// ===== EXPORTAR =====
export default MembraneComponents;
