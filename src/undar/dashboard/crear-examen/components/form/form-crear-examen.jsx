import { Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import FormBase from '../../../../components/form/form-base'
import FormCrearPreguntas from './form-crear-preguntas'
import FormAjustesExamen from './form-ajustes-examen'
import { FaPlusCircle } from 'react-icons/fa'
import ButtonPrimary from '../../../../components/buttons/button-primary'
import useFetchData from '../../../../hooks/useFetchData'
import { API_URL, states, tiposExamen } from '../../../../lib/globales'
import SelectCurso from '../../../../components/selects/select-curso'
import { useGetStates } from '../../../../hooks/use-get-states'
import { appendFormDataRecursively } from '../../../../utils/form-data'
import { useNavigate } from 'react-router-dom'
import { LuLoaderCircle } from 'react-icons/lu'
import FormSeleccionarRubrica from './form-seleccionar-rubrica'
import { getUserAuth } from '../../../../utils/api-openEdx'

const FormCrearExamen = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { fetchData, isloading } = useFetchData()
  const { estados } = useGetStates()

  const user_id = getUserAuth().userId

  const [rubrica, setRubrica] = useState()

  function handleFinish(values) {
    const data = {
      ...values,
      rubrica_holistica_id: values.rubrica_holistica_id?.id,
      rubrica_analitica_id: values.rubrica_analitica_id?.id,
      state_id: estados.find(state => state.name === states.Activo).id,
      user_id,
    }

    const formData = new FormData()
    appendFormDataRecursively(formData, data)

    fetchData({
      method: 'POST',
      url: `${API_URL()}/examen`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      msgSuccess: 'Examen creado correctamente',
      onSuccess: () => {
        form.resetFields()
        navigate('/examenes')
      },
    })
  }

  return (
    <FormBase
      form={form}
      onSubmit={handleFinish}
      className='text-gray-700 flex flex-col'
      initialValues={{
        preguntas: [
          {
            respuestas: [{}, {}, {}, {}],
          },
        ],
      }}
    >
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-4 items-center'>
          <h1 className='text-4xl font-bold text-gray-700 h-fit text-nowrap mb-7'>
            Crear Examen
          </h1>
          <SelectCurso />
          <Form.Item hasFeedback name='tipo_examen' className='w-full'>
            <Select
              className='min-w-96'
              showSearch
              size='large'
              placeholder='Tipo de Examen (Independiente por defecto)'
              options={Object.values(tiposExamen).map(tipo => ({
                value: tipo,
                label:
                  tipo === tiposExamen.Sync
                    ? 'Junto con los alumnos'
                    : 'Cada alumno independiente',
              }))}
            />
          </Form.Item>
        </div>
        <div className='flex gap-4 mb-6'>
          <ButtonPrimary size='large' type='submit' disabled={isloading}>
            {isloading ? (
              <LuLoaderCircle className='animate-spin' />
            ) : (
              <FaPlusCircle />
            )}
            Crear Examen
          </ButtonPrimary>
        </div>
      </div>
      <div className='grid grid-cols-5 gap-10 size-full'>
        <div className='col-span-3'>
          <div className='flex gap-4 w-full'>
            <h2 className='text-2xl font-semibold text-nowrap'>
              Título del Examen:
            </h2>
            <Form.Item
              hasFeedback
              name='title'
              className='w-full'
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese el título del examen',
                },
              ]}
            >
              <Input
                size='large'
                allowClear
                placeholder='Ingrese el título del examen'
              />
            </Form.Item>
          </div>
          <FormSeleccionarRubrica form={form} setRubrica={setRubrica} />
          <div className='flex flex-col gap-2 w-full'>
            <h2 className='text-xl font-semibold '>Descripción del Examen:</h2>
            <Form.Item hasFeedback name='description' className='w-full'>
              <Input.TextArea
                style={{ resize: 'none' }}
                size='large'
                rows={5}
                allowClear
                placeholder='Ingrese la descripción del examen'
              />
            </Form.Item>
          </div>
          <FormAjustesExamen form={form} />
        </div>
        <div className='col-span-2 h-[calc(100dvh-130px)]'>
          <FormCrearPreguntas form={form} rubrica={rubrica} />
        </div>
      </div>
    </FormBase>
  )
}

FormCrearExamen.defaultProps = {}

FormCrearExamen.propTypes = {}

export default FormCrearExamen
