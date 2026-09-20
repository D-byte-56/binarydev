# Sitio web de Binarydev · Documentación

Sitio estático (HTML + CSS + JavaScript). No necesita instalar nada: abre `index.html` en el navegador
o sube la carpeta completa a cualquier hosting.

```
binarydev/
├── index.html          # Estructura y textos base (español)
├── favicon.ico
├── css/estilos.css     # Colores, tipografías, componentes y responsive
├── js/app.js           # CONFIG (tus datos), traducciones ES/EN y comportamiento
├── img/                # logo-mark.png (tu logo), favicon-32.png, apple-touch-icon.png
└── fonts/              # Unbounded, Onest y JetBrains Mono (alojadas en el sitio)
```

## 1. Datos de contacto (lo primero que debes editar)

Todo está en el objeto `CONFIG` al inicio de `js/app.js`:

| Campo | Qué es |
| --- | --- |
| `telefono` | WhatsApp con código de país, solo dígitos (Nicaragua: `505XXXXXXXX`) |
| `correo` | Correo de contacto |
| `redes` | Enlaces de Facebook, GitHub, LinkedIn y X |
| `ciudad`, `pais` | Se muestran en "Nosotros", Contacto y pie de página |
| `sonidoPorDefecto` | `true` = los clics suenan hasta que el visitante los silencie; `false` = silencio |

Actualmente `telefono`, `correo` y `redes` tienen valores de ejemplo: cámbialos antes de publicar.

## 2. Textos e idiomas

Los textos en español e inglés están en `TRAD` (`js/app.js`). Cada elemento del HTML tiene
`data-i18n="clave"`; edita esa clave **en ambos idiomas**. Marcadores disponibles: `{empresa}`,
`{ciudad}`, `{pais}`. Los textos con negritas usan `data-i18n-html`.

## 3. Logo

La barra usa `img/logo-mark.png` (isotipo recortado de tu PNG) junto al nombre "BINARY DEV" en texto,
que cambia de color según el tema. Para cambiar el logo, reemplaza ese archivo (alto recomendado: 132 px)
y ajusta `width`/`height` en las etiquetas `<img class="marca__img">`.

## 4. Colores

En `css/estilos.css`, sección "Tokens": `:root` es el modo claro y `html[data-theme='dark']` el oscuro.
Cambia solo esas variables (`--bg`, `--surface`, `--ink`, `--brand`, ...) y todo el sitio se actualiza.

## 5. Proyectos

Son 4 tarjetas interactivas, cada una enlaza a un sitio real y se abre en una pestaña nueva.
En `index.html` (sección `#proyectos`) cada proyecto es un `<article class="proyecto">` con:

- `href` del enlace `.proyecto__enlace` → la URL del sitio.
- `.captura__url` → el dominio que se muestra en la barra del navegador.
- `<img data-captura>` → la vista previa. Es una **imagen local** guardada en `img/proyectos/`
  (ej. `img/proyectos/warriors.webp`): una captura larga del sitio en formato `.webp`, con proporción
  900×1500. Al cargar, `app.js` le agrega la clase `cargada` a `.captura__pantalla`; si la imagen
  falla, le agrega `sin-captura` y se muestra el nombre del proyecto como respaldo.
- `--acc` en el `style` → color del respaldo que se ve si la captura no carga.
- Textos en `TRAD` (`p1_*` a `p4_*`, en ambos idiomas) y etiquetas de tecnología en `<ul class="etiquetas">`.

**Cómo se generan las capturas:** hay una herramienta aparte en `../herramientas-capturas`
(fuera de la carpeta del sitio, para no subir `node_modules` al hosting). Usa Playwright para abrir
cada sitio y sharp para optimizar la imagen. Para regenerarlas todas:

```bash
cd ../herramientas-capturas
npm install          # solo la primera vez
npx playwright install chromium   # solo la primera vez
npm run capturas                  # genera las 4 imágenes en binarydev/img/proyectos/
```

Para regenerar solo una: `npm run capturas warriors` (o el `id` que quieras). Las imágenes se guardan
directamente en `img/proyectos/{id}.webp` y deben pesar menos de ~200 KB cada una.

**Animaciones:** entrada escalonada al hacer scroll, inclinación 3D que sigue al cursor, reflejo de luz,
desplazamiento de la captura hacia abajo al pasar el mouse (o al enfocar con teclado) y botón "Visitar sitio".
En celulares el botón queda siempre visible. Todo se desactiva si el visitante pidió reducir movimiento.

**Para agregar un proyecto nuevo:**
1. En `../herramientas-capturas/capturar.mjs`, suma una línea al arreglo `SITIOS`
   con su `id` y su `url` (ej. `{ id: 'nuevo', url: 'https://...' }`) y ejecuta
   `npm run capturas nuevo` para generar `img/proyectos/nuevo.webp`.
2. En `index.html`, copia un `<article class="proyecto">`, cambia `--i` (orden de la animación),
   el `href`, el `.captura__url` y el `src` del `<img data-captura>` a `img/proyectos/nuevo.webp`.
3. Crea sus claves `p5_*` en `TRAD` (`js/app.js`), en español e inglés.

## 6. Formulario de contacto

Arma un mensaje con nombre, empresa, servicio y detalle, y abre WhatsApp con él listo para enviar
(no requiere servidor). Usa `CONFIG.telefono`.

## 7. Funciones incluidas

Modo claro/oscuro (respeta el del sistema y se recuerda), idioma ES/EN, sonido de clics activable,
menú hamburguesa en móvil (cierra con Escape o al tocar fuera), cabecera compacta al bajar,
sección activa resaltada, barra de progreso de scroll, WhatsApp flotante, respeto de
`prefers-reduced-motion` y navegación por teclado.
