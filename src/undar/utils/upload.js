import { message, Upload } from 'antd'

export const normFile = e => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.file
}

export const beforeUpload = file => {
  const isValidSize = file.size / 1024 / 1024 < 2 // Convierte bytes a MB
  if (!isValidSize) {
    message.error('El archivo debe pesar menos de 2MB')
    return Upload.LIST_IGNORE
  }
  return false
}
