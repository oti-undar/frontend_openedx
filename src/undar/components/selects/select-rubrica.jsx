import React, { useEffect } from 'react'
import { Select } from 'antd'
import useFetchData from '../../hooks/useFetchData'
import { API_URL } from '../../lib/globales'
import qs from 'qs'
import { useSessionStorage } from '../../hooks/useSessionStorage'
import PropTypes from 'prop-types'

const SelectRubrica = ({ tipoRubrica, onChange }) => {
  const { response, fetchData } = useFetchData()

  const [usuario] = useSessionStorage('usuario')
  const user_id = usuario.id

  useEffect(() => {
    fetchData({
      method: 'GET',
      url: `${API_URL()}/rubrica/${tipoRubrica}?${qs.stringify({
        user_id,
      })}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoRubrica])

  return (
    <Select
      className='min-w-96'
      showSearch
      placeholder='Rubrica'
      options={(response ?? []).map(rubrica => ({
        value: rubrica.id,
        label: rubrica.name,
      }))}
      onChange={value =>
        onChange(response.find(rubrica => rubrica.id === value))
      }
    />
  )
}

SelectRubrica.defaultProps = {
  onChange: () => {},
}

SelectRubrica.propTypes = {
  tipoRubrica: PropTypes.oneOf(['holistica', 'analitica']).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SelectRubrica
