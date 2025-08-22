import { useState } from 'react'

export const useSessionStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key)
      if (!item)
        window.sessionStorage.setItem(key, JSON.stringify(initialValue))
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error al obtener el valor de sessionStorage:', error)
      return initialValue
    }
  })

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (valueToStore === null) window.sessionStorage.removeItem(key)
      else window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error al guardar el valor en sessionStorage:', error)
    }
  }

  const refreshValue = () => {
    try {
      const item = window.sessionStorage.getItem(key)
      if (!item) {
        window.sessionStorage.setItem(key, JSON.stringify(initialValue))
        setStoredValue(initialValue)
        return initialValue
      } else {
        setStoredValue(JSON.parse(item))
        return JSON.parse(item)
      }
    } catch (error) {
      console.error('Error al obtener el valor de sessionStorage:', error)
      return initialValue
    }
  }

  return [storedValue, setValue, refreshValue]
}
