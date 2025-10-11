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

export const toUploadFile = file => ({
  uid: file.name + '-' + file.lastModified,
  name: file.name,
  status: 'done',
  originFileObj: file,
})

export async function urlToFile(url) {
  const res = await fetch(url)
  const blob = await res.blob()
  const filename = url.split('/').pop() || 'file'
  return new File([blob], filename, { type: blob.type })
}
