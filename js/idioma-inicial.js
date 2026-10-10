// Aplica el idioma guardado antes del primer pintado (evita parpadeos).
// Externo (no inline) para permitir una CSP con script-src 'self' sin 'unsafe-inline'.
(function () {
  try {
    var l = localStorage.getItem('idioma');
    if (l === 'es' || l === 'en') document.documentElement.setAttribute('lang', l);
  } catch (e) {}
})();
