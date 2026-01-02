import React, { useState } from 'react'
import { beforeUpload, normFile, toUploadFile } from '../../../../utils/upload'
import { Form, InputNumber, Upload } from 'antd'
import { FaImage } from 'react-icons/fa6'
import FormInicioExamen from './form-inicio-examen'
import PropTypes from 'prop-types'
import FormFinalExamen from './form-final-examen'
import { tiposExamen } from '../../../../lib/globales'
import { useLanguage } from '../../../../../context/useLanguaje'

const FormAjustesExamen = ({ form, examen, archivos, setArchivos }) => {
  const tipo_examen = Form.useWatch('tipo_examen', form)
  const [fechaInicio, setFechaInicio] = useState(null)
  const { t } = useLanguage()

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='col-span-1 flex flex-col gap-4'>
        <div className='flex gap-2 items-center'>
          <div className='font-semibold text-nowrap text-2xl'>
            {t.createExam.settings.examWeight}
          </div>
          <Form.Item className='mb-0' hasFeedback name='peso'>
            <InputNumber
              className='w-full'
              type='number'
              precision={0}
              controls={false}
              placeholder={t.createExam.settings.defaultWeight}
              min={1}
              max={100}
            />
          </Form.Item>
        </div>
        {tipo_examen !== tiposExamen.Solo &&
          tipo_examen !== tiposExamen.Alumno && (
            <>
              <FormInicioExamen
                form={form}
                onChangeFecha={setFechaInicio}
                examen={examen}
              />
              <FormFinalExamen
                form={form}
                inicio_examen={fechaInicio}
                examen={examen}
              />
            </>
          )}
      </div>
      <div className='col-span-1'>
        <Form.Item
          className='w-full'
          name='archivo'
          valuePropName='file'
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            className='w-full h-[calc(100dvh-500px)] flex flex-col'
            name='files'
            fileList={
              archivos?.principal ? [toUploadFile(archivos?.principal)] : []
            }
            beforeUpload={(file) => {
              setArchivos((prev) => ({
                ...prev,
                principal: file,
              }))
              return beforeUpload(file)
            }}
            onRemove={() =>
              setArchivos((prev) => ({ ...prev, principal: null }))
            }
            accept='.jpg, .jpeg, .png, .webp, .gif, .mp4, .mkv, .webm, .ogg, .oga, .mp3, .wav, .aac'
            maxCount={1}
            listType='picture'
          >
            <div className='flex flex-col gap-2 justify-center items-center'>
              <FaImage size={80} className='text-gray-500' />
              <div className='flex flex-col text-slate-400 font-semibold text-lg'>
                <div className='-mb-2'>{t.createExam.settings.upload}</div>
                <div>{t.createExam.settings.mediaType}</div>
              </div>
            </div>
            <div className='text-gray-400'>
              {t.createExam.questions.uploadDrag}
            </div>
          </Upload.Dragger>
        </Form.Item>
      </div>
    </div>
  )
}

FormAjustesExamen.defaultProps = {}

FormAjustesExamen.propTypes = {
  form: PropTypes.object.isRequired,
  examen: PropTypes.object,
  archivos: PropTypes.object,
  setArchivos: PropTypes.func.isRequired,
}

export default FormAjustesExamen
