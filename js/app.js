'use strict';

/* ==========================================================================
   Binarydev · comportamiento del sitio
   1. CONFIG  → datos de la empresa (edita solo esto para cambiar contactos)
   2. TRAD    → textos en español e inglés
   3. Lógica  → idioma, tema, sonido, menú, scroll y formulario
   ========================================================================== */

/* ===== 1. Configuración ===== */
const CONFIG = {
  empresa: 'Binarydev',
  ciudad: 'Managua',
  pais: 'Nicaragua',

  /* WhatsApp: código de país + número, solo dígitos (ej. Nicaragua: 505XXXXXXXX) */
  telefono: '50586836902',
  correo: 'scriptdevsa@gmail.com',

  redes: {
    facebook: 'https://www.facebook.com/profile.php?id=61593092835244'
  },

  /* true = los clics suenan hasta que el visitante los silencie */
  sonidoPorDefecto: true
};

/* ===== 2. Traducciones =====
   Marcadores disponibles: {empresa} {ciudad} {pais} */
const TRAD = {
  es: {
    doc_title: 'Binarydev · Creación de sitios web para empresas',
    meta_desc: 'Binarydev diseña y desarrolla sitios web, tiendas en línea y aplicaciones a medida para empresas. Diseño profesional, rápido y adaptable a celulares.',
    skip: 'Saltar al contenido',
    logo_label: 'Binarydev, ir al inicio',
    nav_label: 'Navegación principal',
    nav_about: 'Nosotros',
    nav_services: 'Servicios',
    nav_process: 'Proceso',
    nav_projects: 'Proyectos',
    nav_contact: 'Contacto',
    lang_label: 'Idioma',
    lang_es: 'Español',
    lang_en: 'Inglés',
    menu_abrir: 'Abrir menú',
    menu_cerrar: 'Cerrar menú',
    theme_label: 'Cambiar entre modo claro y oscuro',
    sonido_off: 'Activar sonidos de clic',
    sonido_on: 'Silenciar sonidos de clic',
    wa_label: 'Contactar por WhatsApp',
    wa_title: 'Escríbenos por WhatsApp',
    wa_msg: 'Hola, me gustaría hablar sobre un sitio web para mi negocio.',

    hero_title: 'Sitios web que hacen crecer tu empresa',
    hero_text: 'En {empresa} diseñamos y desarrollamos sitios web, tiendas en línea y sistemas a medida para empresas que quieren vender más y verse profesionales.',
    btn_web: 'Quiero un sitio web',
    btn_projects: 'Ver proyectos',
    perk_1: 'Se ve bien en celular, tableta y computadora',
    perk_2: 'Rápido y preparado para aparecer en Google',
    perk_3: 'Soporte después del lanzamiento',
    code_brand: 'Tu marca',
    code_sell: 'Vende más',
    code_cta: 'Cotizar',

    about_title: 'Somos {empresa}',
    about_1: 'Somos un estudio de desarrollo web con base en <strong>{ciudad}, {pais}</strong>. Ayudamos a negocios y empresas a tener una presencia digital clara, rápida y fácil de administrar.',
    about_2: 'Primero entendemos tu negocio y a tus clientes; después escribimos el código. Así cada sitio que entregamos tiene un objetivo concreto: que te encuentren, confíen en ti y te contacten.',
    about_sign: '— Equipo {empresa}',
    val1_title: 'Diseño con propósito',
    val1_text: 'Cada pantalla se diseña para guiar a tu cliente hacia una acción: llamar, cotizar o comprar.',
    val2_title: 'Código limpio y rápido',
    val2_text: 'Sitios livianos, seguros y fáciles de mantener, que cargan bien incluso con internet lento.',
    val3_title: 'Acompañamiento real',
    val3_text: 'Te explicamos cada paso en lenguaje claro y seguimos contigo después de publicar.',

    services_title: 'Lo que hacemos',
    services_sub: 'Todo lo que tu empresa necesita para estar en línea, con un solo equipo.',
    s1_title: 'Sitios web corporativos',
    s1_text: 'Presenta tu empresa con un sitio a tu medida: claro, rápido y pensado para que tus clientes te contacten.',
    s1_a: 'Diseño exclusivo con tu marca',
    s1_b: 'Formulario de contacto y WhatsApp',
    s1_c: 'Optimización básica para Google',
    s2_title: 'Tiendas en línea',
    s2_text: 'Catálogo, carrito y pagos para vender tus productos las 24 horas, con un panel fácil de usar.',
    s3_title: 'Aplicaciones web a medida',
    s3_text: 'Sistemas de reservas, paneles de control y portales de clientes que se ajustan a cómo trabaja tu empresa.',
    s4_title: 'Rediseño y velocidad',
    s4_text: 'Renovamos sitios antiguos y mejoramos su rapidez, seguridad y posicionamiento en buscadores.',
    s5_title: 'Mantenimiento y soporte',
    s5_text: 'Hosting, dominio, copias de seguridad, actualizaciones y cambios de contenido cuando los necesites.',

    process_title: 'Cómo trabajamos',
    process_sub: 'Un proceso simple, en cuatro etapas, para que sepas siempre en qué punto está tu proyecto.',
    step1_title: 'Conversamos',
    step1_text: 'Entendemos tu negocio, tus clientes y lo que quieres lograr con tu sitio.',
    step2_title: 'Diseñamos',
    step2_text: 'Te mostramos un prototipo para que apruebes el estilo antes de programar.',
    step3_title: 'Desarrollamos',
    step3_text: 'Construimos el sitio, lo probamos en distintos dispositivos y lo optimizamos.',
    step4_title: 'Lanzamos y acompañamos',
    step4_text: 'Publicamos tu sitio, te enseñamos a usarlo y damos soporte continuo.',

    projects_title: 'Proyectos',
    projects_sub: 'Sitios reales que hemos construido. Haz clic en cualquiera para visitarlo.',
    visit_site: 'Visitar sitio',
    new_tab: '(se abre en una pestaña nueva)',
    p1_sector: 'Limpieza comercial',
    p1_title: 'Warriors of the Order',
    p1_desc: 'Sitio corporativo para una empresa de limpieza en Carlsbad, California, con una página por servicio y solicitud de cotizaciones.',
    p2_sector: 'Tienda en línea',
    p2_title: 'Yellow Brick Road',
    p2_desc: 'Tienda de manteca de karité y aceites naturales de Ghana, con catálogo, blog y recetas.',
    p3_sector: 'Turismo',
    p3_title: 'NicExplorer',
    p3_desc: 'Plataforma de turismo para descubrir hospedajes, restaurantes y experiencias verificadas en Nicaragua, con reservas por WhatsApp.',
    p4_sector: 'Paisajismo',
    p4_title: "Romero's Lawn Service",
    p4_desc: 'Sitio bilingüe para una empresa de jardinería en Banning, California, con servicios, galería y cotizaciones gratis.',
    p5_sector: 'Paisajismo',
    p5_title: 'EV Lawncare',
    p5_desc: 'Servicios de árboles, hardscapes, riego y cercas en Cumming, Georgia, con estimados gratis y contacto por mensaje.',
    github_btn: 'Ver más en GitHub',

    contact_title: 'Cuéntanos sobre tu proyecto',
    contact_text: 'Escríbenos y te respondemos con una propuesta clara. Trabajamos con empresas de <strong>{ciudad}</strong> y de cualquier país, de forma remota.',
    contact_email: 'Correo',
    form_name: 'Tu nombre',
    form_company: 'Empresa o negocio',
    form_service: '¿Qué necesitas?',
    opt_1: 'Un sitio web corporativo',
    opt_2: 'Una tienda en línea',
    opt_3: 'Una aplicación a medida',
    opt_4: 'Rediseñar mi sitio actual',
    opt_5: 'Otra cosa',
    form_message: 'Cuéntanos brevemente',
    form_send: 'Enviar por WhatsApp',
    form_note: 'Se abrirá WhatsApp con tu mensaje listo para enviar.',
    form_error: 'Escribe tu nombre y un mensaje breve para continuar.',
    wa_form_hi: 'Hola {empresa}, soy {nombre}',
    wa_form_from: ' de {negocio}',
    wa_form_topic: 'Me interesa: {servicio}.',

    footer_tag: 'Diseño y desarrollo web para empresas.',
    footer_nav: 'Secciones',
    footer_social: 'Síguenos en redes',
    social_email: 'Correo',
    social_whatsapp: 'Contactar por WhatsApp',
    footer_rights: 'Todos los derechos reservados.',
    footer_made: 'Hecho con',
    footer_city: 'en {ciudad}'
  },

  en: {
    doc_title: 'Binarydev · Website creation for businesses',
    meta_desc: 'Binarydev designs and builds websites, online stores and custom applications for businesses. Professional, fast and mobile-friendly design.',
    skip: 'Skip to content',
    logo_label: 'Binarydev, back to top',
    nav_label: 'Main navigation',
    nav_about: 'About',
    nav_services: 'Services',
    nav_process: 'Process',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    lang_label: 'Language',
    lang_es: 'Spanish',
    lang_en: 'English',
    menu_abrir: 'Open menu',
    menu_cerrar: 'Close menu',
    theme_label: 'Switch between light and dark mode',
    sonido_off: 'Enable click sounds',
    sonido_on: 'Mute click sounds',
    wa_label: 'Contact us on WhatsApp',
    wa_title: 'Message us on WhatsApp',
    wa_msg: 'Hello, I would like to talk about a website for my business.',

    hero_title: 'Websites that help your business grow',
    hero_text: 'At {empresa} we design and build websites, online stores and custom systems for companies that want to sell more and look professional.',
    btn_web: 'I want a website',
    btn_projects: 'View projects',
    perk_1: 'Looks great on phones, tablets and computers',
    perk_2: 'Fast and ready to show up on Google',
    perk_3: 'Support after launch',
    code_brand: 'Your brand',
    code_sell: 'Sell more',
    code_cta: 'Get a quote',

    about_title: 'We are {empresa}',
    about_1: 'We are a web development studio based in <strong>{ciudad}, {pais}</strong>. We help businesses and companies build a clear, fast and easy-to-manage online presence.',
    about_2: 'We start by understanding your business and your customers; then we write the code. That way every site we deliver has a clear goal: to be found, to earn trust and to get people to contact you.',
    about_sign: '— The {empresa} team',
    val1_title: 'Purposeful design',
    val1_text: 'Every screen is designed to guide your customer toward an action: call, request a quote or buy.',
    val2_title: 'Clean, fast code',
    val2_text: 'Lightweight, secure sites that are easy to maintain and load well even on slow connections.',
    val3_title: 'Real support',
    val3_text: 'We explain each step in plain language and stay with you after launch.',

    services_title: 'What we do',
    services_sub: 'Everything your company needs to get online, with a single team.',
    s1_title: 'Corporate websites',
    s1_text: 'Present your company with a custom site that is clear, fast and built so your customers get in touch.',
    s1_a: 'Exclusive design with your brand',
    s1_b: 'Contact form and WhatsApp',
    s1_c: 'Basic Google optimization',
    s2_title: 'Online stores',
    s2_text: 'Catalog, cart and payments to sell your products 24/7, with an easy-to-use admin panel.',
    s3_title: 'Custom web applications',
    s3_text: 'Booking systems, dashboards and customer portals that fit the way your company works.',
    s4_title: 'Redesign and speed',
    s4_text: 'We renew outdated sites and improve their speed, security and search ranking.',
    s5_title: 'Maintenance and support',
    s5_text: 'Hosting, domain, backups, updates and content changes whenever you need them.',

    process_title: 'How we work',
    process_sub: 'A simple four-step process so you always know where your project stands.',
    step1_title: 'We talk',
    step1_text: 'We learn about your business, your customers and what you want your site to achieve.',
    step2_title: 'We design',
    step2_text: 'We show you a prototype so you can approve the look before we start coding.',
    step3_title: 'We build',
    step3_text: 'We build the site, test it on different devices and optimize it.',
    step4_title: 'We launch and support',
    step4_text: 'We publish your site, teach you how to use it and provide ongoing support.',

    projects_title: 'Projects',
    projects_sub: "Real sites we've built. Click any of them to visit it.",
    visit_site: 'Visit site',
    new_tab: '(opens in a new tab)',
    p1_sector: 'Commercial cleaning',
    p1_title: 'Warriors of the Order',
    p1_desc: 'Corporate site for a cleaning company in Carlsbad, California, with a page for each service and quote requests.',
    p2_sector: 'Online store',
    p2_title: 'Yellow Brick Road',
    p2_desc: 'Store for pure shea butter and natural oils from Ghana, with a catalog, blog and recipes.',
    p3_sector: 'Tourism',
    p3_title: 'NicExplorer',
    p3_desc: 'Tourism platform to discover verified lodging, restaurants and experiences in Nicaragua, with bookings via WhatsApp.',
    p4_sector: 'Landscaping',
    p4_title: "Romero's Lawn Service",
    p4_desc: 'Bilingual site for a landscaping company in Banning, California, with services, a gallery and free quotes.',
    p5_sector: 'Landscaping',
    p5_title: 'EV Lawncare',
    p5_desc: 'Tree service, hardscapes, irrigation and fencing in Cumming, Georgia, with free estimates and quotes by text.',
    github_btn: 'See more on GitHub',

    contact_title: 'Tell us about your project',
    contact_text: 'Write to us and we will reply with a clear proposal. We work with companies in <strong>{ciudad}</strong> and from any other country, remotely.',
    contact_email: 'Email',
    form_name: 'Your name',
    form_company: 'Company or business',
    form_service: 'What do you need?',
    opt_1: 'A corporate website',
    opt_2: 'An online store',
    opt_3: 'A custom application',
    opt_4: 'Redesign my current site',
    opt_5: 'Something else',
    form_message: 'Tell us briefly',
    form_send: 'Send via WhatsApp',
    form_note: 'WhatsApp will open with your message ready to send.',
    form_error: 'Please enter your name and a short message to continue.',
    wa_form_hi: 'Hello {empresa}, I am {nombre}',
    wa_form_from: ' from {negocio}',
    wa_form_topic: 'I am interested in: {servicio}.',

    footer_tag: 'Web design and development for companies.',
    footer_nav: 'Sections',
    footer_social: 'Follow us',
    social_email: 'Email',
    social_whatsapp: 'Contact us on WhatsApp',
    footer_rights: 'All rights reserved.',
    footer_made: 'Made with',
    footer_city: 'in {ciudad}'
  }
};

/* ===== 3. Lógica ===== */
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
    $$('[data-accion="tema"]').forEach((b) => {
      b.setAttribute('aria-label', t('theme_label'));
      b.setAttribute('title', t('theme_label'));
    });

    aplicarEnlaces();
    pintarSonido();
    pintarMenu();
    if (errorForm && !errorForm.hidden) errorForm.textContent = t('form_error');
    if (guardar) almacen.guardar('idioma', idioma);
  };

  /* ---------- Tema claro / oscuro ---------- */
  const pintarTema = () => {
    const color = getComputedStyle(html).getPropertyValue('--bg').trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && color) meta.setAttribute('content', color);
  };

  const aplicarTema = (tema, guardar = true) => {
    html.classList.add('cambiando-tema');
    html.setAttribute('data-theme', tema);
    pintarTema();
    if (guardar) almacen.guardar('tema', tema);
    setTimeout(() => html.classList.remove('cambiando-tema'), 350);
  };

  const alternarTema = () =>
    aplicarTema(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');

  /* Si el visitante no eligió tema, seguimos al del sistema */
  if (window.matchMedia) {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const alCambiarSistema = (e) => {
      if (!almacen.leer('tema')) aplicarTema(e.matches ? 'dark' : 'light', false);
    };
    if (mq.addEventListener) mq.addEventListener('change', alCambiarSistema);
    else if (mq.addListener) mq.addListener(alCambiarSistema);
  }

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
          case 'tema': alternarTema(); break;
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

  /* ---------- Hero: animación de la "ventana" en bucle infinito ----------
     Ciclo: se escribe el código y se arma la vista (build) → se queda completa
     (hold) → se funde (erase) → pausa corta (restart) → vuelve a empezar.
     La coreografía (tiempos de escritura) vive en el CSS; aquí solo va el loop.
     Se pausa con la pestaña oculta o el hero fuera de pantalla, y respeta
     "reducir movimiento" (queda estático en su estado final). */
  (() => {
    const ventana = document.querySelector('.ventana');
    if (!ventana) return;

    /* Tiempos ajustables (ms). El de "build" NO se fija a mano: se mide del CSS. */
    const T_HOLD = 3000;    // cuánto se queda completa para poder leerla
    const T_ERASE = 700;    // duración del desvanecido (0.5–0.8 s)
    const T_RESTART = 500;  // pausa en blanco antes de reiniciar
    const BUILD_RESPALDO = 3800; // solo si no se pudiera medir del CSS

    /* El fundido usa esta variable para ir sincronizado con T_ERASE. */
    ventana.style.setProperty('--t-borrado', T_ERASE + 'ms');

    const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
    const DUR = { build: BUILD_RESPALDO, hold: T_HOLD, erase: T_ERASE, restart: T_RESTART };
    const SIGUIENTE = { build: 'hold', hold: 'erase', erase: 'restart', restart: 'build' };

    let fase = 'build';
    let transcurrido = 0;
    let ultimo = null;
    let raf = null;
    let pausado = false;
    let corriendo = false;
    let observador = null;
    let pestanaVisible = !document.hidden;
    let heroVisible = true;

    /* Convierte "0.42s" / "420ms" a milisegundos. */
    const aMs = (v) => {
      v = String(v).trim();
      if (v.endsWith('ms')) return parseFloat(v) || 0;
      if (v.endsWith('s')) return (parseFloat(v) || 0) * 1000;
      return parseFloat(v) || 0;
    };

    /* Mide cuánto dura la construcción leyendo delays y duraciones reales del CSS,
       así el loop no se desfasa si cambian los tiempos o se agregan líneas. */
    const medirConstruccion = () => {
      let max = 0;
      $$('.codigo .l, .vista .b', ventana).forEach((el) => {
        const cs = getComputedStyle(el);
        const delays = cs.animationDelay.split(',');
        const duraciones = cs.animationDuration.split(',');
        const n = Math.max(delays.length, duraciones.length);
        for (let i = 0; i < n; i++) {
          const t = aMs(delays[i % delays.length]) + aMs(duraciones[i % duraciones.length]);
          if (t > max) max = t;
        }
      });
      return max;
    };

    const aplicarFase = (f) => {
      fase = f;
      transcurrido = 0;
      if (f === 'build') {
        /* Reinicio limpio: oculta, fuerza reflow y vuelve a lanzar la coreografía. */
        ventana.classList.remove('borrando');
        ventana.classList.remove('reproduciendo');
        void ventana.offsetWidth;
        ventana.classList.add('reproduciendo');
        const medido = medirConstruccion();
        DUR.build = medido > 0 ? medido : BUILD_RESPALDO;
      } else if (f === 'erase') {
        ventana.classList.add('borrando'); // funde código + vista juntos
      } else if (f === 'restart') {
        /* Oculta los hijos mientras el contenedor sigue fundido (invisible): sin salto. */
        ventana.classList.remove('reproduciendo');
      }
      /* 'hold' no hace nada: 'reproduciendo' se mantiene y 'both' congela el estado final. */
    };

    const paso = (ahora) => {
      raf = requestAnimationFrame(paso);
      if (pausado) { ultimo = ahora; return; }
      if (ultimo == null) ultimo = ahora;
      transcurrido += ahora - ultimo;
      ultimo = ahora;
      if (transcurrido >= DUR[fase]) aplicarFase(SIGUIENTE[fase]);
    };

    const setPausado = (p) => {
      if (p === pausado) return;
      pausado = p;
      ventana.classList.toggle('pausado', p);
      ultimo = null; // evita un salto de tiempo al reanudar
      /* La transición del fundido NO se congela con animation-play-state; si la pausa
         cayó durante el borrado, al reanudar saltamos directo a 'restart' para no
         desincronizar el fundido. */
      if (!p && fase === 'erase') aplicarFase('restart');
    };

    const actualizarPausa = () => setPausado(!(pestanaVisible && heroVisible));
    const alCambiarVisibilidad = () => { pestanaVisible = !document.hidden; actualizarPausa(); };

    const iniciar = () => {
      if (corriendo) return;
      corriendo = true;
      html.classList.add('hero-js');
      pestanaVisible = !document.hidden;
      heroVisible = true;
      pausado = false;
      ultimo = null;
      aplicarFase('build');
      document.addEventListener('visibilitychange', alCambiarVisibilidad);
      observador = new IntersectionObserver((entradas) => {
        heroVisible = entradas[0].isIntersecting;
        actualizarPausa();
      }, { threshold: 0 });
      observador.observe(ventana);
      raf = requestAnimationFrame(paso);
    };

    const detener = () => {
      if (!corriendo) return;
      corriendo = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
      if (observador) { observador.disconnect(); observador = null; }
      ventana.classList.remove('reproduciendo', 'borrando', 'pausado');
      html.classList.remove('hero-js'); // deja el estado final estático y visible
    };

    /* Enciende o apaga según "reducir movimiento", y reacciona si cambia en caliente. */
    const aplicarPreferencia = () => { if (mqReduce.matches) detener(); else iniciar(); };
    if (mqReduce.addEventListener) mqReduce.addEventListener('change', aplicarPreferencia);
    else if (mqReduce.addListener) mqReduce.addListener(aplicarPreferencia);

    aplicarPreferencia();
  })();

  /* ---------- Estado inicial ---------- */
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
  aplicarIdioma(idioma, false);
  pintarTema();
  alScroll();
})();
