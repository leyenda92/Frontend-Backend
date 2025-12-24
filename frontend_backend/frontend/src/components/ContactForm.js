import { useState } from 'react'
import api from '../api/axios'
import { useHttp } from '../hooks/useHttp'

export default function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const { loading, error, success, request } = useHttp()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = e => {
    e.preventDefault()
    request(() => api.post('/contact', form))
  }

  return (
    <form onSubmit={submit}>
      <input name="name" placeholder="Nombre" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <textarea name="message" placeholder="Mensaje" onChange={handleChange} required />

      <button disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>

      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>Mensaje enviado ✔</p>}
    </form>
  )
}
