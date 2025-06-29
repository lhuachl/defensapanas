// Sistema de partículas de fondo animadas
import { gsap } from 'gsap';

export class BackgroundParticles {
  constructor() {
    this.particles = [];
    this.particleCount = 50;
    this.container = null;
    this.isRunning = false;
  }

  init() {
    this.createContainer();
    this.createParticles();
    this.startAnimation();
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'background-particles';
    document.body.appendChild(this.container);
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle();
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'bg-particle';
    
    // Posición aleatoria
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight + Math.random() * 100;
    
    // Tamaño y opacidad aleatoria
    const size = Math.random() * 4 + 2;
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Colores de la paleta
    const colors = ['#FFD700', '#1a73e8', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      opacity: ${opacity};
      animation-delay: ${Math.random() * 20}s;
    `;
    
    this.container.appendChild(particle);
    this.particles.push(particle);
    
    // Animar partícula
    this.animateParticle(particle);
  }

  animateParticle(particle) {
    const duration = Math.random() * 15 + 10;
    const drift = (Math.random() - 0.5) * 200;
    
    gsap.fromTo(particle, 
      {
        y: window.innerHeight + 50,
        rotation: 0,
        scale: 0
      },
      {
        y: -50,
        x: `+=${drift}`,
        rotation: 360,
        scale: 1,
        duration: duration,
        ease: "none",
        repeat: -1,
        delay: Math.random() * 10
      }
    );
  }

  startAnimation() {
    this.isRunning = true;
  }

  stopAnimation() {
    this.isRunning = false;
    gsap.killTweensOf(this.particles);
  }

  destroy() {
    this.stopAnimation();
    if (this.container) {
      this.container.remove();
    }
    this.particles = [];
  }
}

export const backgroundParticles = new BackgroundParticles();
