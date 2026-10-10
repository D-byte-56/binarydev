'use strict';

/* ==========================================================================
   Binarydev · hero "sitio despiezado" (animación automática)
   Al cargar, la ventana aparece DESPIEZADA: las 5 capas 3D entran una a una,
   flotando, y luego se JUNTAN en una sola pantalla terminada. Dura ~2.6 s con
   easing suave (power3/expo). Ya NO depende del scroll: la sección mide 100vh
   y el scroll queda libre (un solo gesto baja a "Nosotros").
   - Si el visitante hace scroll ANTES de que termine, la animación salta
     rápido al estado final (no se corta a medias ni se reinicia).
   - El botón "Ver de nuevo" la reproduce otra vez.
   Solo anima transform/opacity. Requiere GSAP (ScrollTrigger ya no se usa).
   Con "reducir movimiento" o sin JS/GSAP, el HTML/CSS ya muestran la ventana
   armada y los títulos como lista legible: no se toca nada.
   El movimiento se adapta por tamaño con gsap.matchMedia (móvil: menos
   inclinación y separación).
   ========================================================================== */

(function () {
  var seccion = document.querySelector('.despiece');
  if (!seccion || !window.gsap) return;

  // Con "reducir movimiento": no animamos. El CSS ya deja la ventana armada
  // y los títulos como una lista legible.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var pila = seccion.querySelector('[data-pila]');
  var capas = gsap.utils.toArray('.capa', seccion);            // 5 capas
  var titulares = seccion.querySelector('[data-titulares]');
  var caps = gsap.utils.toArray('.despiece__cap', titulares);   // 5 + 1 (cierre)
  var tags = gsap.utils.toArray('.capa__tag', seccion);
  var hint = seccion.querySelector('[data-hint]');
  var progreso = seccion.querySelector('[data-progreso]');
  var replay = seccion.querySelector('[data-replay]');
  if (!pila || capas.length === 0 || caps.length === 0) return;

  var N = capas.length;              // 5
  var ULTIMO = caps.length - 1;      // índice del cierre (CTA)
  function capaIdx(el) { return +el.dataset.capa; }

  // Modo animado: los títulos se superponen (cross-fade); el contador 1/5 y el
  // "desplázate…" no aplican sin scroll → se ocultan.
  titulares.classList.add('js-overlay');
  if (hint) gsap.set(hint, { display: 'none' });
  if (progreso) gsap.set(progreso, { display: 'none' });

  /* ---- Título de la izquierda (cross-fade entre caps) ---- */
  var capActual = 0;
  caps.forEach(function (c, i) {
    gsap.set(c, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 14 });
  });
  function mostrarCap(idx) {
    if (idx === capActual) return;
    gsap.to(caps[capActual], { opacity: 0, y: -12, duration: 0.3, overwrite: true });
    gsap.to(caps[idx], { opacity: 1, y: 0, duration: 0.45, overwrite: true });
    capActual = idx;
  }

  /* ---- Línea de tiempo (se reconstruye por tamaño con matchMedia) ---- */
  var tl = null;

  function construir(p) {
    if (replay) gsap.set(replay, { autoAlpha: 0 });

    // Estado inicial: pila inclinada; capas en su sitio "despiezado" pero
    // invisibles y un poco más abajo (para que entren flotando).
    gsap.set(pila, {
      transformPerspective: 1400,
      rotateX: p.rotX, rotateZ: p.rotZ, rotateY: p.rotY, scale: p.scale
    });
    gsap.set(capas, {
      transformOrigin: '50% 50%', force3D: true, willChange: 'transform',
      z: function (i, el) { return (N - 1 - capaIdx(el)) * p.z; },
      x: function (i, el) { return capaIdx(el) * p.x; },
      y: function (i, el) { return capaIdx(el) * p.y + 28; },
      opacity: 0
    });
    gsap.set(tags, { opacity: 0 });

    tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: function () {
        quitarListeners();
        if (replay) gsap.to(replay, { autoAlpha: 1, duration: 0.4 });
      }
    });

    // FASE 1 — las capas aparecen DESPIEZADAS, una a una, flotando hacia arriba
    tl.to(capas, {
      y: function (i, el) { return capaIdx(el) * p.y; },
      opacity: 1,
      duration: 0.6,
      stagger: 0.13
    }, 0.1);
    // Las etiquetas (Diseño, Código, SEO…) acompañan a cada capa
    tl.to(tags, { opacity: 1, duration: 0.4, stagger: 0.13 }, 0.28);
    // Leve flote del conjunto mientras están separadas
    tl.to(pila, { rotateZ: p.rotZ2, rotateY: p.rotY2, duration: 0.9, ease: 'sine.inOut' }, 0.35);

    // FASE 2 — se JUNTAN en una sola ventana y la pila se endereza
    var tJoin = 1.35;
    tl.to(pila, { rotateX: 0, rotateZ: 0, rotateY: 0, scale: 1, duration: 1.15, ease: 'expo.out' }, tJoin);
    tl.to(capas, { z: 0, y: 0, x: 0, duration: 1.15, stagger: 0.04, ease: 'expo.out' }, tJoin);
    tl.to(tags, { opacity: 0, duration: 0.35 }, tJoin + 0.05);
    // El mensaje de la izquierda pasa al cierre (CTA) al terminar de armarse
    tl.call(mostrarCap, [ULTIMO], tJoin + 0.45);

    tl.timeScale(1.25); // un poco más rápida (~2.1 s en vez de ~2.66 s)
    return tl;
  }

  /* Escritorio: despiece amplio e inclinado. Móvil: compacto, poca rotación. */
  var mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', function () {
    construir({ z: 74, y: 20, x: -6, rotX: 52, rotZ: -22, rotZ2: -10, rotY: 6, rotY2: -4, scale: 1 });
  });
  mm.add('(max-width: 900px)', function () {
    construir({ z: 30, y: 8, x: -2, rotX: 26, rotZ: -8, rotZ2: -5, rotY: 0, rotY2: 0, scale: 0.86 });
  });

  /* ---- Saltar al estado final si el usuario hace scroll antes de tiempo ---- */
  var EVENTOS = ['wheel', 'touchmove', 'keydown'];
  function onIntento(e) {
    if (e.type === 'keydown') {
      var k = e.key;
      if (k !== 'ArrowDown' && k !== 'PageDown' && k !== ' ' && k !== 'Spacebar' && k !== 'End') return;
    }
    saltarAlFinal();
  }
  function ponerListeners() {
    EVENTOS.forEach(function (ev) { window.addEventListener(ev, onIntento, { passive: true }); });
  }
  function quitarListeners() {
    EVENTOS.forEach(function (ev) { window.removeEventListener(ev, onIntento); });
  }
  function saltarAlFinal() {
    quitarListeners();
    if (tl && tl.progress() < 1) {
      // Acelera hasta el final (no corta a medias ni reinicia)
      tl.tweenTo(tl.duration(), { duration: 0.35, ease: 'power2.out' });
    }
  }
  ponerListeners();

  /* ---- Botón "Ver de nuevo" ---- */
  if (replay) {
    replay.addEventListener('click', function () {
      gsap.to(replay, { autoAlpha: 0, duration: 0.2 });
      mostrarCap(0);
      if (tl) tl.restart();
      ponerListeners();
    });
  }
})();
