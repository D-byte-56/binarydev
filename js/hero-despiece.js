'use strict';

/* ==========================================================================
   Binarydev · hero "sitio despiezado"
   Al hacer scroll, la ventana se separa en capas 3D (Diseño → Código → SEO →
   Seguridad → Velocidad) y con cada una entra su título; al final se vuelve a
   armar y aparece el cierre. Solo anima transform/opacity.
   Requiere GSAP + ScrollTrigger (se cargan antes). Si no hay JS, GSAP o el
   visitante pidió "reducir movimiento", NO se toca nada: el HTML/CSS ya muestran
   la ventana armada y los títulos como una lista legible.
   ========================================================================== */

(function () {
  var seccion = document.querySelector('.despiece');
  if (!seccion || !window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  var pila = seccion.querySelector('[data-pila]');
  var capas = gsap.utils.toArray('.capa', seccion);          // 5 capas
  var titulares = seccion.querySelector('[data-titulares]');
  var caps = gsap.utils.toArray('.despiece__cap', titulares); // 5 + 1 (cierre)
  var tags = gsap.utils.toArray('.capa__tag', seccion);
  var progNum = seccion.querySelector('[data-prog-num]');
  var progreso = seccion.querySelector('[data-progreso]');
  var hint = seccion.querySelector('[data-hint]');
  if (!pila || capas.length === 0 || caps.length === 0) return;

  var N_CAPAS = capas.length;        // 5
  var PASO_Z = 74;                   // separación en Z entre capas (px)

  // Cada capa al frente según su índice (0 = Diseño, al frente; 4 = Velocidad, al fondo)
  function zDe(i) { return (N_CAPAS - 1 - i) * PASO_Z; }

  /* ---- Estado inicial (armado) aplicado con JS, nunca en CSS ---- */
  gsap.set(pila, { rotateX: 0, rotateZ: 0, rotateY: 0, transformPerspective: 1500 });
  capas.forEach(function (capa) {
    gsap.set(capa, { z: 0, y: 0, x: 0, opacity: 1, transformOrigin: '50% 50%', willChange: 'transform' });
  });
  gsap.set(tags, { opacity: 0 });
  caps.forEach(function (c, i) { gsap.set(c, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 14 }); });

  // Con JS los títulos se superponen y se cruzan uno a uno
  titulares.classList.add('js-overlay');

  /* ---- Título visible (cross-fade) ---- */
  var capActual = 0;
  function mostrarCap(idx) {
    if (idx === capActual) return;
    gsap.to(caps[capActual], { opacity: 0, y: -12, duration: 0.3, overwrite: true });
    gsap.to(caps[idx], { opacity: 1, y: 0, duration: 0.35, overwrite: true });
    capActual = idx;
  }

  /* ---- Resaltar la capa activa (las demás se atenúan) ---- */
  var capaActiva = -2;
  function resaltar(idx) {
    if (idx === capaActiva) return;
    capaActiva = idx;
    capas.forEach(function (capa) {
      var i = +capa.dataset.capa;
      var op = idx < 0 ? 1 : (i === idx ? 1 : 0.4);
      gsap.to(capa, { opacity: op, duration: 0.3, overwrite: 'auto' });
    });
  }

  /* ---- Timeline de la escena (transform) controlada por el scroll ----
     Estructura temporal: [0–1] explota · [1–6] se mantiene y gira suave ·
     [6–7] se vuelve a armar. El scrub mapea el scroll a estos 7 "tiempos". */
  var tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: seccion,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: function (self) { actualizar(self.progress); }
    }
  });

  // Explosión (tilt del conjunto + separación de capas)
  tl.to(pila, { rotateX: 54, rotateZ: -24, duration: 1 }, 0);
  capas.forEach(function (capa) {
    var i = +capa.dataset.capa;
    tl.to(capa, { z: zDe(i), y: i * 20, x: i * -6, duration: 1 }, 0);
  });
  tl.to(tags, { opacity: 1, duration: 0.5, ease: 'none' }, 0.35);

  // Se mantiene separado y gira muy despacio mientras se leen las capas
  tl.to(pila, { rotateZ: -8, rotateY: 6, duration: 5, ease: 'none' }, 1);

  // Se vuelve a armar + se ocultan las etiquetas
  tl.to(pila, { rotateX: 0, rotateZ: 0, rotateY: 0, duration: 1 }, 6);
  capas.forEach(function (capa) {
    tl.to(capa, { z: 0, y: 0, x: 0, duration: 1 }, 6);
  });
  tl.to(tags, { opacity: 0, duration: 0.5, ease: 'none' }, 6);

  /* ---- Mapa de progreso → título + número + resaltado ---- */
  var EXPLODE = 0.12;   // hasta aquí: explotando (título 1)
  var REARMAR = 0.86;   // desde aquí: se arma + cierre
  function actualizar(p) {
    if (p < EXPLODE) {
      mostrarCap(0); resaltar(-1);
      if (progNum) progNum.textContent = '1';
      if (progreso) gsap.set(progreso, { opacity: 1 });
      if (hint) gsap.set(hint, { opacity: 1 });
      return;
    }
    if (p >= REARMAR) {
      mostrarCap(caps.length - 1); resaltar(-1);
      if (progreso) gsap.set(progreso, { opacity: 0 });
      if (hint) gsap.set(hint, { opacity: 0 });
      return;
    }
    var seg = (p - EXPLODE) / ((REARMAR - EXPLODE) / N_CAPAS);
    var idx = Math.min(N_CAPAS - 1, Math.max(0, Math.floor(seg)));
    mostrarCap(idx);
    resaltar(idx);
    if (progNum) progNum.textContent = String(idx + 1);
    if (progreso) gsap.set(progreso, { opacity: 1 });
    if (hint) gsap.set(hint, { opacity: 0 });
  }

  // Recalcular medidas cuando todo cargó (fuentes, imágenes)
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
