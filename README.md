# Binarydev · sitio web

Sitio **estático** (HTML + CSS + JavaScript, sin framework ni build). Se publica en
**GitHub Pages**. Idioma principal español, con inglés incluido por JavaScript.

> Rediseño en curso (rama `rediseno-despiece`): tema único cálido (naranja ámbar +
> azul del logo), tipografía display condensada y, más adelante, el hero "sitio
> despiezado". El detalle de cada fase está en `ESTADO-MEJORAS.md` (interno).

## Cómo correrlo en local

No necesita instalar nada. Desde la carpeta del sitio:

```bash
python -m http.server 8765 --bind 127.0.0.1
# abrir http://127.0.0.1:8765/index.html   (usa ?v=N para saltar la caché)
```

Conviene usar un servidor (no abrir el archivo con `file://`) para que los scripts
de `js/data/` carguen bien.

## Estructura

```
binarydev/
├── index.html              # estructura y textos base (español)
├── css/estilos.css         # tokens de color, tipografías, componentes y responsive
├── js/
│   ├── app.js              # comportamiento (idioma, menú, scroll, proyectos, formulario)
│   └── data/               # CONTENIDO separado del código
│       ├── config.js       #   datos de la empresa (WhatsApp, correo, redes, ciudad)
│       └── i18n.js         #   todos los textos en español e inglés (objeto TRAD)
├── fonts/                  # Anton (display), Onest (texto), JetBrains Mono (código)
├── img/                    # logo, favicons, imagen OG y capturas de proyectos
└── favicon.ico
```

**Para cambiar un contacto** edita solo `js/data/config.js`.
**Para cambiar un texto** edítalo en `js/data/i18n.js`, en **ambos** idiomas (`es` y `en`).

## Colores y tipografía

Todo el color vive en **tokens CSS** dentro de `:root` (`css/estilos.css`, sección
"Tokens"). Hay **un solo tema** (claro, cálido): no hay modo oscuro ni botón para
cambiarlo. Cambia las variables (`--bg`, `--brand`, `--brand-2`, …) y todo el sitio
se actualiza.

- Acento principal: naranja ámbar `--brand: #f26a1b`.
- Color de apoyo: azul del logo `--brand-2: #1e6feb`.
- Títulos grandes: fuente **Anton** (`--f-display`). Texto normal: **Onest** (`--f-cuerpo`).

## Variables de entorno

Ninguna. Es un sitio estático sin backend: el formulario de contacto arma un mensaje
y abre WhatsApp (no envía nada a un servidor). Por eso no hay `.env`.

## Cómo publicar (GitHub Pages)

Los cambios en la rama `main` se publican solos en
`https://d-byte-56.github.io/binarydev/` (GitHub Pages tarda ~1–2 min).

```bash
git add -A
git commit -m "..."
git push origin main
```

El rediseño se trabaja en la rama `rediseno-despiece` y **no** se publica hasta que
se apruebe y se una a `main`.
