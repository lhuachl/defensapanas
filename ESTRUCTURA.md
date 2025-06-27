# Estructura del Proyecto de Fisiología

## 📁 Archivos Principales

### 🎯 Presentación Principal (`index.html`)
- **Capítulo 1**: "Organización Funcional del Cuerpo Humano"
- **9 slides totales**:
  1. Portada (con modelo de corazón)
  2. Definición de Fisiología (con enlace al Cap. 2)
  3. Células y Medio Interno (con modelo de célula)
  4. Homeostasis
  5. Transporte (con sistema circulatorio)
  6. Regulación
  7. Control
  8. Automatismo
  9. **NUEVO**: Navegación al siguiente capítulo

### 🔬 Capítulo Detallado (`capitulo2.html`)
- **Capítulo 2**: "La Célula y sus Funciones"
- **12 slides detallados**
- Enlace de regreso a la presentación principal

## 🎨 Modelos Visuales (Sin WebGL)

### 📍 Ubicación de Modelos:
- **Slide 1**: Corazón pulsante (`#heart-3d-container`)
- **Slide 2**: Diagrama de fisiología (`#physiology-diagram-container`)
- **Slide 3**: Célula interactiva (`#cell-3d-container`) 
- **Slide 5**: Sistema circulatorio (`#circulation-3d-container`)

### 🔧 Archivos Técnicos:
- `src/models-visual.js` - Sistema de modelos visuales (reemplaza WebGL)
- `src/main.js` - Lógica de navegación (actualizado para 9 slides)
- `src/style.css` - Estilos principales + navegación
- `src/capitulo2.css` - Estilos específicos del capítulo 2
- `src/capitulo2.js` - Navegación del capítulo 2

## 🚀 Navegación

### ➡️ Desde Presentación Principal:
- **Slide 2** → Enlace directo al Capítulo 2
- **Slide 9** → Página de navegación completa

### ⬅️ Desde Capítulo 2:
- **Header** → Botón "Volver a Presentación Principal"

## ✅ Estado Actual:
- ✅ Servidor de desarrollo corriendo en `http://localhost:5173`
- ✅ 9 slides en la presentación principal
- ✅ Modelos visuales funcionando sin WebGL
- ✅ Navegación bidireccional entre capítulos
- ✅ Responsive design
- ✅ Controles de teclado y táctiles

## 🐛 Verificaciones Pendientes:
- [ ] Confirmar que todos los modelos cargan correctamente
- [ ] Verificar navegación fluida entre slides
- [ ] Testear enlaces entre capítulos
- [ ] Revisar responsive en diferentes dispositivos
