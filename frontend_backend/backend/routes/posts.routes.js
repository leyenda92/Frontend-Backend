import { Router } from 'express'
const router = Router()

let posts = [
  { id: 1, title: 'Post 1', likes: 0 },
  { id: 2, title: 'Post 2', likes: 0 }
]

router.get('/', (req, res) => {
  res.json(posts)
})

router.post('/:id/like', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id))
  if (!post) return res.status(404).json({ error: 'Post no encontrado' })

  // Simular error de red
  if (Math.random() < 0.2) {
    return res.status(500).json({ error: 'Error de red simulado' })
  }

  post.likes++
  res.json(post)
})

export default router
