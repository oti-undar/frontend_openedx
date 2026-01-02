import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd'
import SelectRubrica from '../../../../components/selects/select-rubrica'
import { useLanguage } from '../../../../../context/useLanguaje'

const FormSeleccionarRubrica = ({
  form,
  rubrica,
  setRubrica,
  setTipoRubrica,
  tipoRubrica,
}) => {
  const { t } = useLanguage()

  useEffect(() => {
    form.setFieldValue(`rubrica_${tipoRubrica}_id`, undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoRubrica])
  return (
    <div className='flex gap-2 w-full'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold '>{t.createExam.rubric.type}</h2>
        <Select
          className='w-52'
          showSearch
          placeholder={t.createExam.rubric.placeholderType}
          options={[
            {
              value: 'holistica',
              label: t.createExam.rubric.holistic,
            },
            {
              value: 'analitica',
              label: t.createExam.rubric.analytic,
            },
          ]}
          value={tipoRubrica}
          onChange={setTipoRubrica}
        />
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <h2 className='text-lg font-semibold '>{t.createExam.rubric.rubric}</h2>
        <Form.Item
          hasFeedback
          name={`rubrica_${tipoRubrica}_id`}
          rules={[
            {
              required: true,
              message: t.createExam.rubric.rubricError,
            },
          ]}
        >
          <SelectRubrica
            tipoRubrica={tipoRubrica}
            rubrica={rubrica}
            onChange={setRubrica}
          />
        </Form.Item>
      </div>
    </div>
  )
}

FormSeleccionarRubrica.defaultProps = {}

FormSeleccionarRubrica.propTypes = {
  form: PropTypes.object.isRequired,
  rubrica: PropTypes.object.isRequired,
  setRubrica: PropTypes.func.isRequired,
  setTipoRubrica: PropTypes.func.isRequired,
  tipoRubrica: PropTypes.string.isRequired,
}

export default FormSeleccionarRubrica
