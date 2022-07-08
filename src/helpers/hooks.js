import { useState } from "react"

/**
 * Отправляет данные по совпавшим номерам на сервер 
 * @returns функцию для запуска запроса, статус ответа от сервера и ошибку
 */
export const useFetch = () => {
  const [ status, setStatus ] = useState(null)
  const [ isError, setIsError ] = useState(false)

  const triggerFetch = (body) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        setStatus(response.status)
        setIsError(false)

        return response.json()
      })
      .catch(() => setIsError(true))
  }

  const data = {
    status,
    isError,
  }

  return [ 
    triggerFetch, 
    data
  ]
}