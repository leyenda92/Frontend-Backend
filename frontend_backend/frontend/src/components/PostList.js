import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useHttp } from '../hooks/useHttp'

export default function PostList() {
  const [posts, setPosts] = useState([])
  const { loading, error, request } = useHttp()

  useEffect(() => {
    request(() => api.get('/posts'))
      .then(res => setPosts(res.data))
  }, [])

  const likePost = id => {
    request(() => api.post(`/posts/${id}/like`))
      .then(res => {
        setPosts(posts.map(p => p.id === id ? res.data : p))
      })
  }

  return (
    <div>
      <h2>Posts</h2>

      {posts.map(post => (
        <div key={post.id}>
          <strong>{post.title}</strong>
          <p>❤️ {post.likes}</p>

          <button onClick={() => likePost(post.id)} disabled={loading}>
            {loading ? '...' : 'Like'}
          </button>
        </div>
      ))}

      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  )
}
