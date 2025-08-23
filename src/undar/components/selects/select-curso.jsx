import React, { useEffect } from 'react'
import { Form, Select } from 'antd'
import useFetchData from '../../hooks/useFetchData'
import { API_URL } from '../../lib/globales'
import qs from 'qs'
import { useSessionStorage } from '../../hooks/useSessionStorage'

const SelectCurso = () => {
  const { response, fetchData } = useFetchData()

  const [usuario] = useSessionStorage('usuario')
  const user_id = usuario.id

  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/curso?${qs.stringify({
        user_id,
      })}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Form.Item
      hasFeedback
      name='curso_id'
      rules={[
        {
          required: true,
          message: 'Por favor ingrese el curso al que pertenece el examen',
        },
      ]}
    >
      <Select
        className='min-w-96'
        showSearch
        size='large'
        placeholder='Curso al que pertenece el examen'
        options={(response ?? []).map(curso => ({
          value: curso.id,
          label: curso.name,
        }))}
      />
    </Form.Item>
  )
}

SelectCurso.defaultProps = {}

SelectCurso.propTypes = {}

export default SelectCurso
