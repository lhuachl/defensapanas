(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(s){if(s.ep)return;s.ep=!0;const i=o(s);fetch(s.href,i)}})();let r={};function L(t){t.innerHTML=`
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
  `;const e=t.querySelector(".heart-shape");e&&e.addEventListener("click",()=>{e.classList.add("clicked"),setTimeout(()=>e.classList.remove("clicked"),600)})}function S(t){t.innerHTML=`
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
  `}function w(t){t.innerHTML=`
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
  `}function b(t){t.innerHTML=`
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
  `;const e=t.querySelectorAll(".system");e.forEach(o=>{o.addEventListener("click",()=>{e.forEach(i=>i.classList.remove("active")),o.classList.add("active");const c=t.querySelector(".homeostasis-center"),s=o.querySelector("span").textContent;c.innerHTML=`
        <h4>⚖️ ${s}</h4>
        <p>Contribuye al control homeostático</p>
      `})})}class C{constructor(e){this.container=e,L(e),console.log("Modelo visual de corazón cargado")}resize(){}cleanup(){this.container&&(this.container.innerHTML="")}}class M{constructor(e){this.container=e,S(e),console.log("Modelo visual de célula cargado")}resize(){}cleanup(){this.container&&(this.container.innerHTML="")}}class z{constructor(e){this.container=e,w(e),console.log("Modelo visual de circulación cargado")}resize(){}cleanup(){this.container&&(this.container.innerHTML="")}}class k{constructor(e){this.container=e,b(e),console.log("Diagrama visual de fisiología cargado")}resize(){}cleanup(){this.container&&(this.container.innerHTML="")}}function p(t){try{switch(console.log(`Inicializando modelo para slide ${t}`),t){case 1:const e=document.getElementById("heart-3d-container");e&&!r.heart&&(console.log("Creando modelo de corazón..."),r.heart=new C(e));break;case 2:const o=document.getElementById("physiology-diagram-container");o&&!r.diagram&&(console.log("Creando diagrama de fisiología..."),r.diagram=new k(o));break;case 3:const c=document.getElementById("cell-3d-container");c&&!r.cell&&(console.log("Creando modelo de célula..."),r.cell=new M(c));break;case 5:const s=document.getElementById("circulation-3d-container");s&&!r.circulation&&(console.log("Creando sistema circulatorio..."),r.circulation=new z(s));break;default:console.log(`No hay modelo específico para slide ${t}`);break}}catch(e){console.error("Error inicializando modelo visual:",e)}}function I(){Object.values(r).forEach(t=>{if(t&&t.resize)try{t.resize()}catch(e){console.warn("Error en resize:",e)}})}window.resizeListenerAdded||(window.addEventListener("resize",I),window.resizeListenerAdded=!0);let n=1;const l=9;let h={};const D=document.querySelectorAll(".slide"),g=document.querySelectorAll(".dot"),y=document.getElementById("prevBtn"),E=document.getElementById("nextBtn"),H=document.querySelector(".progress-fill"),B=document.getElementById("currentSlide"),O=document.getElementById("totalSlides");function u(){D.forEach((e,o)=>{e.classList.remove("active","prev"),o+1===n?e.classList.add("active"):o+1<n&&e.classList.add("prev")}),g.forEach((e,o)=>{e.classList.toggle("active",o+1===n)});const t=n/l*100;H.style.width=`${t}%`,B.textContent=n,O.textContent=l,y.disabled=n===1,E.disabled=n===l,p(n)}function v(){n<l&&(n++,u())}function f(){n>1&&(n--,u())}function d(t){t>=1&&t<=l&&(n=t,u())}document.addEventListener("DOMContentLoaded",()=>{u(),E.addEventListener("click",v),y.addEventListener("click",f),g.forEach((i,a)=>{i.addEventListener("click",()=>{d(a+1)})}),document.addEventListener("keydown",i=>{switch(i.key){case"ArrowRight":case" ":i.preventDefault(),v();break;case"ArrowLeft":i.preventDefault(),f();break;case"Home":i.preventDefault(),d(1);break;case"End":i.preventDefault(),d(l);break;default:const a=parseInt(i.key);a>=1&&a<=l&&(i.preventDefault(),d(a))}});let t=0,e=0;document.addEventListener("touchstart",i=>{t=i.touches[0].clientX}),document.addEventListener("touchend",i=>{e=i.changedTouches[0].clientX,o()});function o(){const a=t-e;Math.abs(a)>50&&(a>0?v():f())}const c={threshold:.1,rootMargin:"0px 0px -100px 0px"},s=new IntersectionObserver(i=>{i.forEach(a=>{a.isIntersecting&&(a.target.style.animationPlayState="running")})},c);document.querySelectorAll(".list-item, .feature-card, .stat-item").forEach(i=>{s.observe(i)}),u(),p(1),window.addEventListener("resize",()=>{Object.values(h).forEach(i=>{if(i&&i.resize){const a=document.getElementById(i.containerId);a&&i.resize(a.clientWidth,a.clientHeight)}})}),window.addEventListener("beforeunload",()=>{cleanupModels(h)})});function m(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}document.addEventListener("keydown",t=>{t.key==="F11"&&(t.preventDefault(),m())});document.addEventListener("dblclick",()=>{m()});window.presentationControls={nextSlide:v,prevSlide:f,goToSlide:d,toggleFullscreen:m,getCurrentSlide:()=>n,getTotalSlides:()=>l};
