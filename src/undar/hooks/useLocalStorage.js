import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (!item) window.localStorage.setItem(key, JSON.stringify(initialValue))
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error al obtener el valor de localStorage:', error)
      return initialValue
    }
  })

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (valueToStore === null) window.localStorage.removeItem(key)
      else window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error al guardar el valor en localStorage:', error)
    }
  }

  const refreshValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      if (!item) {
        window.localStorage.setItem(key, JSON.stringify(initialValue))
        setStoredValue(initialValue)
        return initialValue
      } else {
        setStoredValue(JSON.parse(item))
        return JSON.parse(item)
      }
    } catch (error) {
      console.error('Error al obtener el valor de localStorage:', error)
      return initialValue
    }
  }

  return [storedValue, setValue, refreshValue]
}
