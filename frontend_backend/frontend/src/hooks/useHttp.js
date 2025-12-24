import { useState } from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const request = async (fn) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await fn()
      setSuccess(true)
      return res
    } catch (err) {
      setError(err.error || 'Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, success, request }
}
