import { Router } from 'express'
const router = Router()

router.post('/', (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos incompletos' })
  }

  setTimeout(() => {
    res.json({ success: true, message: 'Mensaje enviado correctamente' })
  }, 1000)
})

export default router
