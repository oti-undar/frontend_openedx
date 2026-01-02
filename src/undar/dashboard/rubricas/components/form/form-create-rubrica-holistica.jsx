import { Form, Input } from 'antd'
import React, { useEffect } from 'react'
import FormBase from '../../../../components/form/form-base'
import FormCreateNivelesDeLogro from './form-create-niveles-de-logro'
import { FaEdit, FaPlusCircle } from 'react-icons/fa'
import ButtonPrimary from '../../../../components/buttons/button-primary'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL } from '../../../../lib/globales'
import { useNavigate } from 'react-router'
import { LuLoaderCircle } from 'react-icons/lu'
import { getUserAuth } from '../../../../utils/api-openEdx'
import PropTypes from 'prop-types'
import FormAdicionalesRubrica from './form-adicionales-rubrica'
import { useLanguage } from '../../../../../context/useLanguaje'

const FormCreateRubricaHolistica = ({ rubrica_holistica }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { fetchData, isloading } = useFetchData()
  const { t } = useLanguage()

  const user_id = getUserAuth().userId

  function handleFinish(values) {
    const data = {
      ...values,
      user_id,
      niveles_de_logro: {
        create: values.niveles_de_logro.map((level) => {
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

    fetchData({
      method: rubrica_holistica ? 'PUT' : 'POST',
      url: `${API_URL()}/rubrica/holistica${
        rubrica_holistica ? `/${rubrica_holistica.id}` : ''
      }`,
      data,
      msgSuccess: rubrica_holistica
        ? t.rubrics.create.successEdit
        : t.rubrics.create.successCreate,
      onSuccess: () => {
        form.resetFields()
        navigate('/examenes')
      },
    })
  }

  useEffect(() => {
    form.resetFields()
    if (rubrica_holistica) {
      form.setFieldsValue({
        ...rubrica_holistica,
        niveles_de_logro: rubrica_holistica.niveles_de_logro.map((level) => ({
          ...level,
          desde: level.nota.split('-')[0],
          hasta: level.nota.split('-')[1],
        })),
      })
    } else {
      form.setFieldsValue({
        niveles_de_logro: [{}, {}, {}, {}],
      })
    }
  }, [form, rubrica_holistica])

  return (
    <div>
      <FormBase
        form={form}
        onSubmit={handleFinish}
        className='text-gray-700 flex flex-col'
      >
        <div className='flex justify-between gap-4 w-full'>
          <div className='flex gap-4 w-full'>
            <h2 className='text-2xl font-semibold text-nowrap'>
              {t.rubrics.create.identifierHolistic}
            </h2>
            <Form.Item
              hasFeedback
              name='name'
              className='w-full max-w-[600px]'
              rules={[
                {
                  required: true,
                  message: t.rubrics.create.identifierError,
                },
              ]}
            >
              <Input
                size='large'
                allowClear
                placeholder={t.rubrics.create.identifierPlaceholder}
              />
            </Form.Item>
          </div>
          <div className='flex float-right mb-7'>
            <ButtonPrimary size='large' type='submit' disabled={isloading}>
              {isloading ? (
                <LuLoaderCircle className='animate-spin' />
              ) : rubrica_holistica ? (
                <FaEdit />
              ) : (
                <FaPlusCircle />
              )}
              <span className='text-nowrap'>
                {rubrica_holistica
                  ? t.rubrics.create.submitEdit
                  : t.rubrics.create.submitCreate}
              </span>
            </ButtonPrimary>
          </div>
        </div>
        <FormAdicionalesRubrica />
        <FormCreateNivelesDeLogro />
      </FormBase>
    </div>
  )
}

FormCreateRubricaHolistica.defaultProps = {}

FormCreateRubricaHolistica.propTypes = {
  rubrica_holistica: PropTypes.object,
}

export default FormCreateRubricaHolistica
