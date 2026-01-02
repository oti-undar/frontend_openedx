import { DatePicker, Form, InputNumber, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { FaClock } from 'react-icons/fa'
import { formatDayjsToUTC, presetsDatePicker } from '../../../../utils/date'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { useLanguage } from '../../../../../context/useLanguaje'

const FormInicioExamen = ({ form, onChangeFecha, examen }) => {
  const { t } = useLanguage()

  const [modoInicio, setModoInicio] = useState(
    examen?.inicio_examen ? 'fecha' : 'manual'
  )
  const [modoTiempo, setModoTiempo] = useState('m')
  const [tiempo, setTiempo] = useState(null)
  const [fecha, setFecha] = useState(
    examen?.inicio_examen
      ? dayjs(examen?.inicio_examen).format('YYYY-MM-DD HH:mm:ss')
      : null
  )

  const primerResetConExamen = useRef(true)

  useEffect(() => {
    if (examen?.inicio_examen) {
      setModoInicio('fecha')
      setFecha(
        dayjs(examen.inicio_examen).local().format('YYYY-MM-DD HH:mm:ss')
      )
    }
  }, [examen])

  useEffect(() => {
    if (primerResetConExamen.current && examen?.inicio_examen)
      primerResetConExamen.current = false
    else resetValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modoInicio])

  useEffect(() => {
    if (tiempo) {
      setFecha(
        tiempo ? formatDayjsToUTC(dayjs().add(tiempo, modoTiempo)) : null
      )
    }
  }, [modoTiempo, tiempo])

  useEffect(() => {
    form.setFieldValue('inicio_examen', fecha)
    onChangeFecha(fecha)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fecha])

  function resetValues() {
    setModoTiempo('m')
    setTiempo(null)
    setFecha(null)
  }

  return (
    <div>
      <h2 className='text-xl font-semibold pb-2'>
        {t.createExam.settings.examStart}
      </h2>

      <div className='flex gap-2 items-center'>
        <Select
          className='w-1/2'
          placeholder={t.createExam.settings.startMode}
          value={modoInicio}
          prefix={<FaClock className='text-lime-500 mr-1' />}
          onChange={setModoInicio}
          options={[
            {
              value: 'manual',
              label: t.createExam.settings.manualStart,
            },
            {
              value: 'tiempo',
              label: t.createExam.settings.timeStart,
            },
            {
              value: 'fecha',
              label: t.createExam.settings.dateStart,
            },
          ]}
        />

        {modoInicio === 'tiempo' && (
          <div className='animate-fade-right animate-ease-in-out animate-duration-500 flex gap-2 items-center relative'>
            <InputNumber
              type='number'
              controls={false}
              placeholder='0'
              value={tiempo}
              onChange={setTiempo}
            />
            <Select
              className='w-32'
              placeholder={t.createExam.settings.minutes}
              value={modoTiempo}
              onChange={setModoTiempo}
              options={[
                {
                  value: 'm',
                  label: t.createExam.settings.minutes,
                },
                {
                  value: 'h',
                  label: t.createExam.settings.hours,
                },
                {
                  value: 'd',
                  label: t.createExam.settings.days,
                },
              ]}
            />
            {fecha && (
              <div className='absolute right-2 -top-5 text-xs text-gray-500 animate-flip-up animate-duration-500 animate-ease-in-out'>
                {dayjs(fecha).local().format('DD/MM/YYYY h:mm A')}
              </div>
            )}
          </div>
        )}

        {modoInicio === 'fecha' && (
          <DatePicker
            showTime={{ format: 'h:mm A' }}
            format='DD/MM/YYYY h:mm A'
            presets={presetsDatePicker}
            className='animate-fade-right animate-ease-in-out animate-duration-500'
            placeholder={t.createExam.settings.startDate}
            value={fecha ? dayjs(fecha).local() : null}
            onChange={(value) => {
              setFecha(formatDayjsToUTC(value))
            }}
          />
        )}

        <Form.Item name='inicio_examen' hidden />
      </div>
    </div>
  )
}

FormInicioExamen.defaultProps = {}

FormInicioExamen.propTypes = {
  form: PropTypes.object.isRequired,
  onChangeFecha: PropTypes.func.isRequired,
  examen: PropTypes.object,
}

export default FormInicioExamen
