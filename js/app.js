'use strict';

/* ==========================================================================
   Binarydev · comportamiento del sitio
   Los datos y textos viven aparte (se cargan ANTES que este archivo):
     · js/data/config.js  → CONFIG (contactos, ciudad, redes)
     · js/data/i18n.js     → TRAD (textos español/inglés)
   Aquí solo va la lógica: idioma, sonido, menú, scroll, proyectos y formulario.
   Tema único (claro): ya no hay modo oscuro ni botón para cambiarlo.
   ========================================================================== */

(() => {
  const IDIOMAS = ['es', 'en'];
  const html = document.documentElement;
  const cabecera = document.getElementById('cabecera');
  const progreso = document.getElementById('progreso');
  const btnMenu = document.querySelector('[data-accion="hamburguesa"]');
  const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

  /* Almacenamiento seguro (falla en silencio si está bloqueado) */
  const almacen = {
    leer(k) {
      try { return localStorage.getItem(k); } catch (e) { return null; }
    },
    guardar(k, v) {
      try { localStorage.setItem(k, v); } catch (e) {}
    }
  };

  /* ---------- Idioma ---------- */
  let idioma = IDIOMAS.includes(almacen.leer('idioma')) ? almacen.leer('idioma') : 'es';
  const datos = { empresa: CONFIG.empresa, ciudad: CONFIG.ciudad, pais: CONFIG.pais };

  const rellenar = (texto, extra = {}) =>
    texto.replace(/\{(\w+)\}/g, (m, k) => (k in extra ? extra[k] : k in datos ? datos[k] : m));

  const t = (clave, extra) => {
    const texto = TRAD[idioma][clave];
    return texto === undefined ? clave : rellenar(texto, extra);
  };

  const aplicarEnlaces = () => {
    $$('[data-enlace]').forEach((a) => {
      const tipo = a.dataset.enlace;
      if (tipo === 'whatsapp') {
        a.href = 'https://wa.me/' + CONFIG.telefono + '?text=' + encodeURIComponent(t('wa_msg'));
      } else if (tipo === 'correo') {
        a.href = 'mailto:' + CONFIG.correo;
      } else if (CONFIG.redes[tipo]) {
        a.href = CONFIG.redes[tipo];
      }
    });

    /* Botones "Cotizar este paquete": abren WhatsApp con el paquete ya escrito */
    $$('[data-paquete]').forEach((a) => {
      a.href = 'https://wa.me/' + CONFIG.telefono + '?text=' + encodeURIComponent(t('wa_pack_' + a.dataset.paquete));
    });
  };

  const aplicarIdioma = (nuevo, guardar = true) => {
    idioma = nuevo;
    html.setAttribute('lang', idioma);
    document.title = t('doc_title');
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('meta_desc'));

    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((par) => {
        const [attr, clave] = par.split(':');
        if (attr && clave) el.setAttribute(attr.trim(), t(clave.trim()));
      });
    });

    $$('.idioma__btn').forEach((b) => {
      const activo = b.dataset.lang === idioma;
      b.setAttribute('aria-pressed', String(activo));
      b.setAttribute('title', t('lang_' + b.dataset.lang));
    });

    aplicarEnlaces();
    pintarSonido();
    pintarMenu();
    if (errorForm && !errorForm.hidden) errorForm.textContent = t('form_error');
    if (guardar) almacen.guardar('idioma', idioma);
  };

  /* ---------- Sonido de clics ---------- */
  const guardadoSonido = almacen.leer('sonido');
  let sonidoActivo = guardadoSonido === null ? CONFIG.sonidoPorDefecto : guardadoSonido === '1';
  let audioCtx = null;
  let ultimoSonido = 0;

  function pintarSonido() {
    $$('[data-accion="sonido"]').forEach((b) => {
      const etiqueta = t(sonidoActivo ? 'sonido_on' : 'sonido_off');
      b.setAttribute('aria-pressed', String(sonidoActivo));
      b.setAttribute('aria-label', etiqueta);
      b.setAttribute('title', etiqueta);
    });
  }

  const reproducirClick = () => {
    if (!sonidoActivo) return;
    const ahora = performance.now();
    if (ahora - ultimoSonido < 70) return;
    ultimoSonido = ahora;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const inicio = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const ganancia = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, inicio);
      osc.frequency.exponentialRampToValueAtTime(380, inicio + 0.08);
      ganancia.gain.setValueAtTime(0.0001, inicio);
      ganancia.gain.exponentialRampToValueAtTime(0.09, inicio + 0.006);
      ganancia.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.11);
      osc.connect(ganancia);
      ganancia.connect(audioCtx.destination);
      osc.start(inicio);
      osc.stop(inicio + 0.13);
    } catch (e) {}
  };

  const alternarSonido = () => {
    sonidoActivo = !sonidoActivo;
    almacen.guardar('sonido', sonidoActivo ? '1' : '0');
    pintarSonido();
  };

  /* ---------- Menú móvil ---------- */
  function pintarMenu() {
    const abierto = cabecera.classList.contains('abierto');
    btnMenu.setAttribute('aria-expanded', String(abierto));
    btnMenu.setAttribute('aria-label', t(abierto ? 'menu_cerrar' : 'menu_abrir'));
  }

  const abrirMenu = (abrir) => {
    cabecera.classList.toggle('abierto', abrir);
    pintarMenu();
  };

  /* ---------- Sección activa en el menú ---------- */
  const enlacesMenu = $$('.menu a[data-seccion]');
  const marcarSeccion = (id) => {
    enlacesMenu.forEach((a) => {
      if (a.dataset.seccion === id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) marcarSeccion(e.target.dataset.seccionObs);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    $$('[data-seccion-obs]').forEach((s) => obs.observe(s));
  }

  /* ---------- Proyectos: capturas, entrada animada e inclinación 3D ---------- */
  const tarjetas = $$('.proyecto');
  const sinMovimiento = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Las capturas son imágenes locales (img/proyectos/*.webp): al cargar mostramos la captura
     y, si alguna falla, dejamos el nombre del proyecto como respaldo. */
  $$('img[data-captura]').forEach((img) => {
    const pantalla = img.closest('.captura__pantalla');
    const marcarCargada = () => pantalla.classList.add('cargada');
    img.addEventListener('load', marcarCargada);
    img.addEventListener('error', () => pantalla.classList.add('sin-captura'));
    if (img.complete && img.naturalWidth > 0) marcarCargada();
  });

  /* Entrada escalonada al aparecer en pantalla */
  const grilla = document.querySelector('.proyectos');
  if (grilla && !sinMovimiento && 'IntersectionObserver' in window) {
    grilla.classList.add('animar');
    const obsProy = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obsProy.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );
    tarjetas.forEach((c) => obsProy.observe(c));
  }

  /* Inclinación 3D siguiendo el cursor (solo con mouse) */
  const conMouse = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (conMouse && !sinMovimiento) {
    tarjetas.forEach((c) => {
      const enlace = c.querySelector('.proyecto__enlace');
      let cuadro = 0;
      c.addEventListener('pointermove', (e) => {
        if (cuadro) return;
        cuadro = requestAnimationFrame(() => {
          cuadro = 0;
          const r = c.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          enlace.style.setProperty('--ry', ((x - 0.5) * 8).toFixed(2) + 'deg');
          enlace.style.setProperty('--rx', ((0.5 - y) * 6).toFixed(2) + 'deg');
          enlace.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
          enlace.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        });
      });
      c.addEventListener('pointerleave', () => {
        enlace.style.setProperty('--rx', '0deg');
        enlace.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* En pantallas táctiles (sin hover) la captura se desliza sola en bucle
     mientras la tarjeta está a la vista; con mouse se conserva el hover. */
  if (!conMouse && !sinMovimiento && 'IntersectionObserver' in window) {
    const obsVista = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          e.target.classList.toggle('en-vista', e.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    tarjetas.forEach((c) => obsVista.observe(c));
  }

  /* ---------- Aparición al hacer scroll ----------
     La clase .reveal (que oculta el elemento) se agrega SOLO aquí, así que sin JS o
     con "reducir movimiento" nada se oculta. [data-revelar] anima un elemento suelto;
     [data-revelar-grupo] anima a sus hijos de forma escalonada. */
  if (!sinMovimiento && 'IntersectionObserver' in window) {
    const obsRevelar = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    const revelar = (el, i = 0) => {
      el.classList.add('reveal');
      if (i) el.style.setProperty('--reveal-delay', i * 80 + 'ms');
      obsRevelar.observe(el);
    };

    $$('[data-revelar]').forEach((el) => revelar(el));
    $$('[data-revelar-grupo]').forEach((grupo) => {
      Array.prototype.forEach.call(grupo.children, (hijo, i) => revelar(hijo, i));
    });
  }

  /* ---------- Scroll: cabecera compacta + barra de progreso ---------- */
  let pendiente = false;
  const alScroll = () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      const y = window.scrollY || 0;
      cabecera.classList.toggle('es-scroll', y > 12);
      const max = html.scrollHeight - window.innerHeight;
      progreso.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    });
  };
  window.addEventListener('scroll', alScroll, { passive: true });
  window.addEventListener('resize', alScroll);

  /* ---------- FAQ: acordeón ---------- */
  $$('.faq__boton').forEach((boton) => {
    const panel = document.getElementById(boton.getAttribute('aria-controls'));
    if (!panel) return;
    boton.addEventListener('click', () => {
      const abierto = boton.getAttribute('aria-expanded') === 'true';
      boton.setAttribute('aria-expanded', String(!abierto));
      panel.hidden = abierto;
      reproducirClick();
    });
  });

  /* ---------- Formulario → WhatsApp ---------- */
  const form = document.getElementById('formulario');
  const errorForm = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('validado');
      if (!form.checkValidity()) {
        errorForm.textContent = t('form_error');
        errorForm.hidden = false;
        const primero = form.querySelector(':invalid');
        if (primero) primero.focus();
        return;
      }
      errorForm.hidden = true;

      const campo = (n) => form.elements[n].value.trim();
      const servicio = form.elements.servicio;
      const opcion = servicio.options[servicio.selectedIndex].textContent;

      let saludo = t('wa_form_hi', { nombre: campo('nombre') });
      if (campo('empresa')) saludo += t('wa_form_from', { negocio: campo('empresa') });
      const mensaje = saludo + '. ' + t('wa_form_topic', { servicio: opcion }) + '\n\n' + campo('mensaje');

      const url = 'https://wa.me/' + CONFIG.telefono + '?text=' + encodeURIComponent(mensaje);
      window.open(url, '_blank', 'noopener');
    });

    form.addEventListener('input', () => {
      if (!errorForm.hidden && form.checkValidity()) errorForm.hidden = true;
    });
  }

  /* ---------- Eventos globales (delegados) ---------- */
  document.addEventListener(
    'click',
    (e) => {
      const el = e.target.closest('[data-accion]');
      if (el) {
        switch (el.dataset.accion) {
          case 'sonido': alternarSonido(); break;
          case 'hamburguesa': abrirMenu(!cabecera.classList.contains('abierto')); break;
          case 'idioma': aplicarIdioma(el.dataset.lang); break;
          case 'logo': abrirMenu(false); break;
        }
      }
      /* Cerrar el menú móvil al elegir una sección o tocar fuera de la cabecera */
      if (e.target.closest('.menu a') || !e.target.closest('#cabecera')) abrirMenu(false);
      if (e.target.closest('a, button')) reproducirClick();
    },
    true
  );

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cabecera.classList.contains('abierto')) {
      abrirMenu(false);
      btnMenu.focus();
    }
  });

  /* Al pasar a escritorio, el menú desplegable se cierra */
  if (window.matchMedia) {
    const escritorio = matchMedia('(min-width: 961px)');
    const alCambiar = (e) => { if (e.matches) abrirMenu(false); };
    if (escritorio.addEventListener) escritorio.addEventListener('change', alCambiar);
    else if (escritorio.addListener) escritorio.addListener(alCambiar);
  }

  /* ---------- Estado inicial ---------- */
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
  aplicarIdioma(idioma, false);
  alScroll();
})();
