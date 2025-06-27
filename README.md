# Bros Diapos - Presentación Web Moderna

Una presentación web estilo diapositivas con diseño moderno y navegación intuitiva, perfecta para explicar contenido de forma visual y atractiva.

## 🎯 Características

- **Diseño estilo presentación** con navegación fluida entre slides
- **Interfaz minimalista** completamente enfocada en el contenido
- **Transiciones suaves** con animaciones CSS modernas
- **Totalmente responsive** - se adapta a cualquier dispositivo
- **Múltiples formas de navegación**:
  - Botones de flecha (← →)
  - Puntos indicadores
  - Teclado (flechas, números 1-5, espaciador)
  - Gestos táctiles (swipe en móviles)
  - Doble click para pantalla completa

## 🚀 Tecnologías Utilizadas

- **Vite** - Build tool rápido y moderno
- **HTML5, CSS3, JavaScript** - Stack web puro
- **CSS Grid & Flexbox** - Layout responsive
- **CSS Animations** - Transiciones suaves
- **Touch Events** - Soporte móvil completo

## 📱 Responsive Design

El sitio está optimizado para:
- 📱 Dispositivos móviles (< 480px)
- 📟 Tablets (< 768px)
- 💻 Laptops y desktop (> 768px)

## 🎮 Controles de Navegación

### Teclado
- `→` / `Espacio` - Siguiente slide
- `←` - Slide anterior
- `1-5` - Ir directamente al slide específico
- `Home` - Primer slide
- `End` - Último slide
- `F11` - Pantalla completa
- `Doble click` - Alternar pantalla completa

### Móvil
- **Swipe izquierda** - Siguiente slide
- **Swipe derecha** - Slide anterior
- **Tap en puntos** - Navegación directa

## 📋 Estructura de Slides

1. **Portada** - Presentación principal
2. **Introducción** - Lista de características
3. **Características** - Grid de tarjetas
4. **Datos** - Estadísticas importantes
5. **Conclusión** - Cierre y contacto

## 🛠️ Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## 🎨 Personalización

### Agregar nuevos slides
1. Agrega el HTML del slide en `index.html`
2. Actualiza `totalSlides` en `main.js`
3. Agrega un nuevo punto en `.dot-navigation`

### Cambiar estilos
- Modifica `src/style.css` para personalizar colores, fuentes y animaciones
- Utiliza las variables CSS para cambios globales

### Contenido
- Reemplaza los emojis placeholder con imágenes reales
- Actualiza textos y títulos según tu contenido
- Modifica la información de contacto

## 🎭 Animaciones Incluidas

- **slideUp** - Aparición suave del contenido
- **slideInLeft** - Entrada lateral de elementos de lista
- **fadeInUp** - Aparición de tarjetas desde abajo
- **bounceIn** - Efecto rebote para estadísticas

## 🌟 Características Avanzadas

- **Precarga de slides** para mejor rendimiento
- **Intersection Observer** para animaciones optimizadas
- **Soporte para efectos de sonido** (comentado)
- **API pública** para control externo
- **Barra de progreso** visual
- **Contador de slides** en tiempo real

## 📖 API de Control

```javascript
// Funciones disponibles globalmente
window.presentationControls = {
  nextSlide(),          // Ir al siguiente slide
  prevSlide(),          // Ir al slide anterior
  goToSlide(number),    // Ir a slide específico
  toggleFullscreen(),   // Alternar pantalla completa
  getCurrentSlide(),    // Obtener slide actual
  getTotalSlides()      // Obtener total de slides
}
```

## 🎯 Casos de Uso Ideales

- Presentaciones corporativas
- Portfolios creativos
- Demos de productos
- Tutoriales paso a paso
- Presentaciones educativas
- Pitches de startups

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**¡Perfecto para presentaciones que impresionen!** ✨
