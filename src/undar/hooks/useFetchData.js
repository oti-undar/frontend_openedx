import { message } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function useFetchData() {
  const [isloading, setLoading] = useState(false)
  const [isfinish, setFinish] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState()
  const key = uuidv4()

  function fetchData({
    method,
    url,
    data = {},
    msgSuccess,
    onSuccess = () => {},
    onError = () => {},
    onFinish = () => {},
    headers,
    others,
  }) {
    setResponse(undefined)
    setLoading(true)

    axios({
      method,
      url,
      data,
      headers,
      ...others,
    })
      .then(response => {
        if (msgSuccess)
          message.open({
            key,
            type: 'success',
            content: msgSuccess,
            duration: 3,
          })
        setResponse(response.data)
        onSuccess(response.data)
      })
      .catch(error => {
        setError(error)
        onError(error)
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        setFinish(true)
        onFinish()
      })
  }

  return { isloading, response, isfinish, error, setError, fetchData }
}
