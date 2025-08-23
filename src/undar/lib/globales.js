let getConfig;
try {
  // eslint-disable-next-line global-require
  ({ getConfig } = require('@edx/frontend-platform'));
} catch {
  getConfig = () => ({ STUDIO_BASE_URL: 'http://localhost:3000' });
}
export const API_URL = getConfig().STUDIO_BASE_URL;
// eslint-disable-next-line no-console
console.log('🚀 ~ file: globales.js:12 ~ API_URL:', API_URL);

export const keysLocalStorage = {
  usuario: 'usuario',
};

export const states = {
  Activo: 'Activo',
  Inconcluso: 'Inconcluso',
  Disponible: 'Disponible',
  Suspendido: 'Suspendido',
  Inactivo: 'Inactivo',
  Finalizado: 'Finalizado',
};

export const tiposExamen = {
  Sync: 'Sync',
  Async: 'Async',
};

export const tipoNivelDelogro = {
  Porcentaje: 'Porcentaje',
  Rango: 'Rango',
};
