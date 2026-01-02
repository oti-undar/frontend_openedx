import React, { useEffect } from 'react'
import { Form, Select } from 'antd'
import useFetchData from '../../hooks/useFetchData'
import { API_URL } from '../../lib/globales'
import qs from 'qs'
import { getUserAuth } from '../../utils/api-openEdx'
import { useLanguage } from '../../../context/useLanguaje'

const SelectCurso = () => {
  const { response, fetchData } = useFetchData()
  const { t } = useLanguage()

  const user_id = getUserAuth().userId

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
          message: t.components.selectCourse.error,
        },
      ]}
    >
      <Select
        className='min-w-96'
        showSearch
        size='large'
        placeholder={t.components.selectCourse.placeholder}
        options={(response ?? []).map((curso) => ({
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
