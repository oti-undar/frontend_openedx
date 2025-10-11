import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import FormBase from '../../../../components/form/form-base'
import { FaEdit, FaPlusCircle } from 'react-icons/fa'
import ButtonPrimary from '../../../../components/buttons/button-primary'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL } from '../../../../lib/globales'
import { useNavigate } from 'react-router'
import { LuLoaderCircle } from 'react-icons/lu'
import FormCreateIndicadores from './form-create-indicadores'
import { getUserAuth } from '../../../../utils/api-openEdx'
import PropTypes from 'prop-types'
import FormAdicionalesRubrica from './form-adicionales-rubrica'

const FormCreateRubricaAnalitica = ({ rubrica_analitica }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { fetchData, isloading } = useFetchData()

  const user_id = getUserAuth().userId

  function handleFinish(values) {
    const data = {
      ...values,
      user_id,
      indicadores: {
        create: values.indicadores.map(indicador => {
          const { niveles_de_logro, ...rest } = indicador
          return {
            ...rest,
            id: undefined,
            rubrica_analitica_id: undefined,
            niveles_de_logro: {
              create: niveles_de_logro.map(level => {
                const { desde, hasta, ...rest } = level
                return {
                  ...rest,
                  nota: `${desde}-${hasta}`,
                  id: undefined,
                  rubrica_holistica_id: undefined,
                  indicador_id: undefined,
                }
              }),
            },
          }
        }),
      },
    }

    fetchData({
      method: rubrica_analitica ? 'PUT' : 'POST',
      url: `${API_URL()}/rubrica/analitica${
        rubrica_analitica ? `/${rubrica_analitica.id}` : ''
      }`,
      data,
      msgSuccess: rubrica_analitica
        ? 'Rúbrica actualizada correctamente'
        : 'Rúbrica creada correctamente',
      onSuccess: () => {
        form.resetFields()
        navigate('/examenes')
      },
    })
  }

  useEffect(() => {
    form.resetFields()
    if (rubrica_analitica) {
      form.setFieldsValue({
        ...rubrica_analitica,
        indicadores: rubrica_analitica.indicadores.map(indicador => ({
          ...indicador,
          niveles_de_logro: indicador.niveles_de_logro.map(level => ({
            ...level,
            desde: level.nota.split('-')[0],
            hasta: level.nota.split('-')[1],
          })),
        })),
      })
    } else {
      form.setFieldsValue({
        indicadores: [
          { niveles_de_logro: [{}, {}, {}, {}] },
          { niveles_de_logro: [{}, {}, {}, {}] },
        ],
      })
    }
  }, [form, rubrica_analitica])

  return (
    <div>
      <FormBase
        form={form}
        onSubmit={handleFinish}
        className='text-gray-700 flex flex-col'
        initialValues={{
          indicadores: [
            { niveles_de_logro: [{}, {}, {}, {}] },
            { niveles_de_logro: [{}, {}, {}, {}] },
          ],
        }}
      >
        <div className='flex justify-between gap-4 w-full'>
          <div className='flex gap-4 w-full'>
            <h2 className='text-2xl font-semibold text-nowrap'>
              Identificador de la Rúbrica Analítica:
            </h2>
            <Form.Item
              hasFeedback
              name='name'
              className='w-full max-w-[600px]'
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese el identificador de la Rúbrica',
                },
              ]}
            >
              <Input
                size='large'
                allowClear
                placeholder='Un identificador para reconocer a la Rúbrica creada'
              />
            </Form.Item>
          </div>
          <div className='flex float-right mb-7'>
            <ButtonPrimary size='large' type='submit' disabled={isloading}>
              {isloading ? (
                <LuLoaderCircle className='animate-spin' />
              ) : rubrica_analitica ? (
                <FaEdit />
              ) : (
                <FaPlusCircle />
              )}
              <span className='text-nowrap'>
                {rubrica_analitica ? 'Editar' : 'Crear'} Rúbrica
              </span>
            </ButtonPrimary>
          </div>
        </div>
        <FormAdicionalesRubrica />
        <FormCreateIndicadores form={form} />
      </FormBase>
    </div>
  )
}

FormCreateRubricaAnalitica.defaultProps = {}

FormCreateRubricaAnalitica.propTypes = {
  rubrica_analitica: PropTypes.object,
}

export default FormCreateRubricaAnalitica
