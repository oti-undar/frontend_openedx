let getConfig
try {
  // eslint-disable-next-line no-undef
  ;({ getConfig } = require('@edx/frontend-platform'))
} catch {
  getConfig = () => ({ STUDIO_BASE_URL: 'http://localhost' })
}
export const API_URL = () => `${getConfig().STUDIO_BASE_URL}:3000`

export const keysLocalStorage = {
  usuario: 'usuario',
}

export const states = {
  Activo: 'Activo',
  Inconcluso: 'Inconcluso',
  Disponible: 'Disponible',
  Suspendido: 'Suspendido',
  Inactivo: 'Inactivo',
  Finalizado: 'Finalizado',
}

export const tiposExamen = {
  Sync: 'Sync',
  Async: 'Async',
}

export const tipoNivelDelogro = {
  Porcentaje: 'Porcentaje',
  Rango: 'Rango',
}
