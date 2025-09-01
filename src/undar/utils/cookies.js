import Cookies from 'js-cookie'

export function validarOCrearCookieActualizarData({
  onCreateCookie = () => {},
} = {}) {
  const cookie = Cookies.get('actualizar_data')
  if (!cookie) {
    const ahora = new Date()
    const finDia = new Date(ahora)
    finDia.setHours(23, 59, 59, 999) // Expira al final del día

    const segundosRestantes = (finDia - ahora) / 1000 / 60 / 60 / 24 // días fraccionados

    Cookies.set('actualizar_data', 'true', { expires: segundosRestantes })
    onCreateCookie()
  }
}
