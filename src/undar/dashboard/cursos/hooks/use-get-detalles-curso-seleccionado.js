import { useEffect } from 'react'
import useFetchData from '../../../hooks/useFetchData'
import { API_URL } from '../../../lib/globales'

export const useGetDetallesCursoSeleccionado = ({ cursoSeleccionado }) => {
  const { response, fetchData: fetchAlumnos, isloading } = useFetchData()
  useEffect(() => {
    fetchAlumnos({
      method: 'GET',
      url: `${API_URL()}/curso/${cursoSeleccionado?.id}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursoSeleccionado])

  return {
    response,
    isloading,
  }
}
