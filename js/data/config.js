'use strict';

/* ==========================================================================
   Binarydev · datos de la empresa
   Edita SOLO este archivo para cambiar contactos, ciudad o redes.
   Lo lee js/app.js (se carga antes que app.js, ver index.html).
   ========================================================================== */

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
