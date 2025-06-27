# Presentación de Fisiología Humana - Modelos 3D Mejorados

Sitio web estilo diapositivas para el curso de fisiología sobre "Organización Funcional del Cuerpo Humano y Control del Medio Interno" (Capítulo 2, Unidad I).

## ✨ Características Principales

### 🎮 Modelos 3D Interactivos Mejorados
- **Corazón Anatómico 3D**: Modelo detallado con 4 cámaras, arterias, venas y sistema coronario
- **Célula 3D Completa**: Núcleo, mitocondrias, retículo endoplasmático, Golgi, ribosomas y más organelos
- **Sistema Circulatorio 3D**: Circuito completo pulmonar y sistémico con flujo sanguíneo animado

### 🎨 Diseño Médico Profesional
- Paleta de colores azul científica
- Animaciones suaves y transiciones
- Diagramas médicos animados
- Interfaz responsive para todos los dispositivos

### 🧭 Navegación Intuitiva
- Controles de teclado (flechas, espacio)
- Botones de navegación
- Indicadores de progreso
- Navegación por puntos
- Soporte táctil para móviles

## 🔬 Contenido de las Diapositivas

1. **Portada** - Modelo 3D de corazón anatómico
2. **Definición de Fisiología** - Conceptos fundamentales
3. **Células y Medio Interno** - Modelo 3D de célula con organelos
4. **Homeostasis** - Mecanismos de mantenimiento
5. **Sistema de Transporte** - Modelo 3D del sistema circulatorio
6. **Sistemas de Regulación** - Diagrama animado de sistemas corporales
7. **Mecanismos de Control** - Retroalimentación y valores críticos
8. **Automatismo del Organismo** - Interrelación celular

## 🚀 Características Técnicas

### Modelos 3D Mejorados
- **Anatomía realista** basada en referencias médicas
- **Interactividad completa**: rotación, zoom, animaciones
- **Efectos visuales**: latido cardíaco, flujo sanguíneo, rotación celular
- **Optimización de rendimiento** para dispositivos móviles

### Diagramas Médicos
- **Animaciones CSS** para sistemas corporales
- **Representación simplificada** de sistemas nerviosos y endocrinos
- **Efectos visuales** para transmisión nerviosa y actividad glandular

## 🛠️ Tecnologías

- **Vite** - Desarrollo rápido y HMR
- **Three.js** - Gráficos 3D y modelos anatómicos
- **CSS3** - Animaciones y efectos visuales
- **JavaScript ES6+** - Lógica de presentación
- **Responsive Design** - Compatible con todos los dispositivos

## 📁 Estructura del Proyecto

```
bros-diapos/
├── public/
│   └── images/           # Imágenes médicas (agregar aquí)
├── src/
│   ├── main.js          # Lógica principal
│   ├── style.css        # Estilos y animaciones
│   ├── models3d-improved.js  # Modelos 3D mejorados
├── index.html           # Estructura de diapositivas
└── README.md
```

## 🎯 Instalación y Uso

### Prerrequisitos
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
Abre http://localhost:5173/ en tu navegador

### Construcción
```bash
npm run build
```

## 📸 Imágenes Requeridas

Agrega estas imágenes médicas en `/public/images/`:
- `sistema-cardiovascular.jpg` - Para slide 6 (sistemas de regulación)
- `sistemas-corporales.jpg` - Para slide 8 (automatismo)

## 🎮 Controles de Navegación

### Teclado
- ←/→ - Slide anterior/siguiente
- Espacio - Siguiente slide
- Inicio/Fin - Primera/última slide

### Mouse
- Clic en botones de navegación
- Clic en puntos indicadores
- Scroll en modelos 3D para zoom
- Arrastre en modelos 3D para rotación

### Móvil/Tablet
- Deslizar izquierda/derecha
- Tocar controles de navegación
- Gestos táctiles en modelos 3D

## 🎨 Personalización

### Colores del Tema Médico
```css
--primary-blue: #0f4c75;
--secondary-blue: #3282b8;
--accent-blue: #bbe1fa;
--medical-red: #cc2936;
```

### Velocidad de Animaciones
Las animaciones pueden ajustarse en `style.css` modificando las duraciones de `animation` y `transition`.

## 🔬 Modelos 3D Detallados

### Corazón Anatómico
- 4 cámaras cardíacas diferenciadas
- Aorta con curva realista
- Sistema pulmonar completo
- Venas cavas superior e inferior
- Arterias coronarias
- Efecto de latido animado

### Célula Completa
- Núcleo con nucléolo
- Mitocondrias múltiples
- Retículo endoplasmático
- Aparato de Golgi
- Ribosomas dispersos
- Lisosomas y vacuolas

### Sistema Circulatorio
- Circuito pulmonar y sistémico
- Flujo sanguíneo animado
- Diferenciación arterial/venosa por color
- Red capilar en órganos
- Representación de intercambio gaseoso

## 📱 Compatibilidad

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Móviles iOS/Android
- ✅ Tablets

## 🎓 Uso Educativo

Esta presentación está diseñada específicamente para:
- Cursos de fisiología médica
- Estudiantes de medicina y enfermería
- Profesores de ciencias de la salud
- Presentaciones académicas
- Material de estudio visual

## 📄 Licencia

Proyecto educativo libre para uso académico.
