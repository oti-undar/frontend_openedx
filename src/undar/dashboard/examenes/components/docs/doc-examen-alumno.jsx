import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import { getTotalObtenido } from '../table/columns-alumnos-inscritos'

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    color: 'black',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  sectionTitle: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    position: 'relative',
  },
  sectionPreguntas: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  styleRespuesta: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
})

const DocExamenAlumno = ({ examenSeleccionado, alumnoSeleccionado, title }) => {
  console.log(
    '🚀 ~ file: table-detalles-alumno-examen.jsx:8 ~ examenSeleccionado:',
    examenSeleccionado
  )
  console.log(
    '🚀 ~ file: table-detalles-alumno-examen.jsx:8 ~ alumnoSeleccionado:',
    alumnoSeleccionado
  )
  const preguntasResueltas = alumnoSeleccionado?.preguntas_resueltas ?? []

  const total_puntos =
    examenSeleccionado?.preguntas?.reduce(
      (acc, item) => acc + item.puntos,
      0
    ) ?? 1

  const total_obtenido = getTotalObtenido({
    preguntas_resueltas: preguntasResueltas,
  })
  const notaFinal = ((total_obtenido * 20) / total_puntos).toFixed(0)
  return (
    <Document title={title}>
      <Page size='A4' style={styles.page}>
        <View style={styles.sectionTitle}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {examenSeleccionado?.title || ''}
          </Text>
          <Text
            style={{
              fontSize: 10,
              opacity: 0.5,
            }}
          >
            {examenSeleccionado?.curso?.name || ''}
          </Text>
          <View
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              fontSize: 14,
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
              }}
            >
              Nota:
            </Text>
            <Text>{notaFinal}</Text>
          </View>
        </View>
        {examenSeleccionado?.description && (
          <Text
            style={{
              fontSize: 10,
              textAlign: 'justify',
            }}
          >
            {examenSeleccionado?.description}
          </Text>
        )}
        <View style={styles.sectionPreguntas}>
          {preguntasResueltas.map((pr, index) => {
            const puntaje = ((pr?.pregunta?.puntos ?? 1) * 20) / total_puntos
            const correcta = pr?.respuesta && pr?.respuesta?.correcta
            return (
              <View key={index}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 6,
                    fontSize: 9,
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>{index + 1}.</Text>
                  <Text style={{ fontWeight: 600 }}>
                    {pr?.pregunta?.title || ''}
                  </Text>
                  <Text style={{ fontStyle: 'italic' }}>
                    ({correcta ? puntaje.toFixed(0) : 0})
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    marginLeft: 12,
                    fontSize: 8,
                  }}
                >
                  <View style={styles.styleRespuesta}>
                    <Text style={{ fontWeight: 'bold' }}>Respuesta:</Text>
                    <Text>{pr?.respuesta?.respuesta || ''}</Text>
                  </View>
                  <View style={styles.styleRespuesta}>
                    <Text style={{ fontWeight: 'bold' }}>
                      Respuesta Correcta:
                    </Text>
                    <Text>
                      {pr?.pregunta?.respuestas?.find(r => r.correcta)
                        ?.respuesta || ''}
                    </Text>
                  </View>
                  {pr?.respuesta?.retroalimentacion && (
                    <View style={styles.styleRespuesta}>
                      <Text style={{ fontWeight: 'bold' }}>
                        Retroalimentación:
                      </Text>
                      <Text>{pr?.respuesta?.retroalimentacion || ''}</Text>
                    </View>
                  )}
                </View>
              </View>
            )
          })}
        </View>
      </Page>
    </Document>
  )
}

DocExamenAlumno.defaultProps = {}

DocExamenAlumno.propTypes = {
  examenSeleccionado: PropTypes.object,
  alumnoSeleccionado: PropTypes.object,
  title: PropTypes.string,
}

export default DocExamenAlumno
