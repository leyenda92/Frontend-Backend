import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

import contactRoutes from './routes/contact.routes.js'
import postRoutes from './routes/posts.routes.js'

dotenv.config()

const app = express()

app.use(helmet())
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/api/contact', contactRoutes)
app.use('/api/posts', postRoutes)
app.get('/', (req, res) => {
  res.send('🚀 Backend funcionando correctamente')
})

app.listen(4000, () => {
  console.log('✅ Backend corriendo en http://localhost:4000')
})
