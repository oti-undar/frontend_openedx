import React, { useEffect } from 'react'
import { Select } from 'antd'
import useFetchData from '../../hooks/useFetchData'
import { API_URL } from '../../lib/globales'
import qs from 'qs'
import PropTypes from 'prop-types'
import { getUserAuth } from '../../utils/api-openEdx'
import { useLanguage } from '../../../context/useLanguaje'

const SelectRubrica = ({ tipoRubrica, onChange, rubrica }) => {
  const { response, fetchData } = useFetchData()
  const { t } = useLanguage()

  const user_id = getUserAuth().userId

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
      placeholder={t.components.selectRubric.placeholder}
      options={(response ?? []).map((rubrica) => ({
        value: rubrica.id,
        label: rubrica.name,
      }))}
      onChange={(value) =>
        onChange(response.find((rubrica) => rubrica.id === value))
      }
      value={rubrica?.id}
    />
  )
}

SelectRubrica.defaultProps = {
  onChange: () => {},
}

SelectRubrica.propTypes = {
  tipoRubrica: PropTypes.oneOf(['holistica', 'analitica']).isRequired,
  onChange: PropTypes.func.isRequired,
  rubrica: PropTypes.object.isRequired,
}

export default SelectRubrica
