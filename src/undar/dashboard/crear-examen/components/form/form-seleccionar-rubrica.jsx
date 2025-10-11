import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd'
import SelectRubrica from '../../../../components/selects/select-rubrica'

const FormSeleccionarRubrica = ({
  form,
  rubrica,
  setRubrica,
  setTipoRubrica,
  tipoRubrica,
}) => {
  useEffect(() => {
    form.setFieldValue(`rubrica_${tipoRubrica}_id`, undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoRubrica])
  return (
    <div className='flex gap-2 w-full'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold '>Tipo de Rúbrica</h2>
        <Select
          className='w-52'
          showSearch
          placeholder='Tipo de rubrica'
          options={[
            {
              value: 'holistica',
              label: 'Holística',
            },
            {
              value: 'analitica',
              label: 'Analítica',
            },
          ]}
          value={tipoRubrica}
          onChange={setTipoRubrica}
        />
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <h2 className='text-lg font-semibold '>Rubrica</h2>
        <Form.Item
          hasFeedback
          name={`rubrica_${tipoRubrica}_id`}
          rules={[
            {
              required: true,
              message: 'Por favor ingrese la rúbrica',
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
