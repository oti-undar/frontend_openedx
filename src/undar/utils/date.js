import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const presetsDatePicker = [
  { label: 'Mañana', value: dayjs().add(1, 'd') },
  { label: 'En 2 días', value: dayjs().add(2, 'd') },
  { label: 'En 3 días', value: dayjs().add(3, 'd') },
  { label: 'Próxima Semana', value: dayjs().add(1, 'week') },
  { label: 'Próximo Mes', value: dayjs().add(1, 'month') },
]

export function formatDayjsToUTC(date) {
  if (!date) return null
  return dayjs(Number(date)).utc().format('YYYY-MM-DD HH:mm:ss')
}
