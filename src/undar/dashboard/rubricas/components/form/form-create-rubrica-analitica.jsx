import { Form, Input } from 'antd'
import React from 'react'
import FormBase from '../../../../components/form/form-base'
import { FaPlusCircle } from 'react-icons/fa'
import ButtonPrimary from '../../../../components/buttons/button-primary'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL, tipoNivelDelogro } from '../../../../lib/globales'
import { useNavigate } from 'react-router'
import { useSessionStorage } from '../../../../hooks/useSessionStorage'
import { LuLoaderCircle } from 'react-icons/lu'
import FormCreateIndicadores from './form-create-indicadores'

const FormCreateRubricaAnalitica = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { fetchData, isloading } = useFetchData()
  const [usuario] = useSessionStorage('usuario')

  function handleFinish(values) {
    const data = {
      ...values,
      user_id: usuario.id,
      indicadores: {
        create: values.indicadores.map(indicador => {
          const { niveles_de_logro, ...rest } = indicador
          return {
            ...rest,
            niveles_de_logro: {
              create: niveles_de_logro.map(level => {
                const { desde: _, hasta, ...rest } = level
                const porcentaje = (hasta * 100) / 20
                return {
                  ...rest,
                  nota: `${porcentaje}`,
                  tipo: tipoNivelDelogro.Porcentaje,
                }
              }),
            },
          }
        }),
      },
    }

    fetchData({
      method: 'POST',
      url: `${API_URL}/rubrica/analitica`,
      data,
      msgSuccess: 'Rúbrica creada correctamente',
      onSuccess: () => {
        form.resetFields()
        navigate('/examenes')
      },
    })
  }

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
              ) : (
                <FaPlusCircle />
              )}
              <span className='text-nowrap'>Crear Rúbrica</span>
            </ButtonPrimary>
          </div>
        </div>
        <FormCreateIndicadores form={form} />
      </FormBase>
    </div>
  )
}

FormCreateRubricaAnalitica.defaultProps = {}

FormCreateRubricaAnalitica.propTypes = {}

export default FormCreateRubricaAnalitica
