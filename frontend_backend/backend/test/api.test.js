import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  timeout: 5000
})

const log = (msg) => console.log(`\n🧪 ${msg}`)

const runTests = async () => {
  console.log('🚀 Iniciando pruebas completas API...\n')

  // 1️⃣ GET POSTS
  try {
    log('Obteniendo posts')
    const res = await api.get('/posts')
    console.log('✅ Posts obtenidos:', res.data)
  } catch (err) {
    console.error('❌ ERROR GET /posts', err.message)
  }

  // 2️⃣ LIKE POST (con manejo de error de red)
  try {
    log('Dando like a post ID 1')
    const res = await api.post('/posts/1/like')
    console.log(`❤️ Like OK | Likes actuales: ${res.data.likes}`)
  } catch (err) {
    console.error('❌ ERROR LIKE (esperable a veces):', err.response?.data || err.message)
  }

  // 3️⃣ MULTIPLES LIKES (prueba de estados)
  log('Probando múltiples likes (simulación real)')
  for (let i = 0; i < 5; i++) {
    try {
      const res = await api.post('/posts/1/like')
      console.log(`👍 Like #${i + 1} | Total: ${res.data.likes}`)
    } catch (err) {
      console.error('⚠️ Error de red controlado')
    }
  }

  // 4️⃣ FORMULARIO CONTACTO (OK)
  try {
    log('Enviando formulario de contacto')
    const res = await api.post('/contact', {
      name: 'Haku',
      email: 'haku@test.com',
      message: 'Probando comunicación frontend-backend'
    })
    console.log('✅ Contacto enviado:', res.data.message)
  } catch (err) {
    console.error('❌ ERROR CONTACTO', err.response?.data || err.message)
  }

  // 5️⃣ FORMULARIO CONTACTO (ERROR VALIDACIÓN)
  try {
    log('Probando validación (campos vacíos)')
    await api.post('/contact', {
      name: '',
      email: '',
      message: ''
    })
  } catch (err) {
    console.error('✅ Error validación capturado:', err.response.data.error)
  }

  console.log('\n🎉 PRUEBAS FINALIZADAS')
}

runTests()
