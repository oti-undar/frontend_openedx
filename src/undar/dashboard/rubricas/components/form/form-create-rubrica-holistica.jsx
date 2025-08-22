import { Form, Input } from 'antd'
import React from 'react'
import FormBase from '../../../../components/form/form-base'
import FormCreateNivelesDeLogro from './form-create-niveles-de-logro'
import { FaPlusCircle } from 'react-icons/fa'
import ButtonPrimary from '../../../../components/buttons/button-primary'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL, tipoNivelDelogro } from '../../../../lib/globales'
import { useNavigate } from 'react-router'
import { useSessionStorage } from '../../../../hooks/useSessionStorage'
import { LuLoaderCircle } from 'react-icons/lu'

const FormCreateRubricaHolistica = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { fetchData, isloading } = useFetchData()
  const [usuario] = useSessionStorage('usuario')

  function handleFinish(values) {
    const data = {
      ...values,
      user_id: usuario.id,
      niveles_de_logro: {
        create: values.niveles_de_logro.map(level => {
          const { desde, hasta, ...rest } = level
          return {
            ...rest,
            nota: `${desde}-${hasta}`,
            tipo: tipoNivelDelogro.Rango,
          }
        }),
      },
    }

    fetchData({
      method: 'POST',
      url: `${API_URL}/rubrica/holistica`,
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
          niveles_de_logro: [{}, {}, {}, {}],
        }}
      >
        <div className='flex justify-between gap-4 w-full'>
          <div className='flex gap-4 w-full'>
            <h2 className='text-2xl font-semibold text-nowrap'>
              Identificador de la Rúbrica Holística:
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
        <FormCreateNivelesDeLogro />
      </FormBase>
    </div>
  )
}

FormCreateRubricaHolistica.defaultProps = {}

FormCreateRubricaHolistica.propTypes = {}

export default FormCreateRubricaHolistica
