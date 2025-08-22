export function appendFormDataRecursively(formData, data, parentKey = '') {
  if (data instanceof File) {
    formData.append(parentKey, data)
  } else if (Array.isArray(data)) {
    data.forEach((item, index) => {
      appendFormDataRecursively(formData, item, `${parentKey}[${index}]`)
    })
  } else if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key

      // Detectar archivo proveniente de AntD Upload
      if (key === 'originFileObj' && value instanceof File) {
        formData.append(parentKey, value)
      } else {
        appendFormDataRecursively(formData, value, newKey)
      }
    })
  } else if (data !== undefined && data !== null) {
    formData.append(parentKey, data)
  }
}
