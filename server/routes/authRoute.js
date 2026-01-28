import express from 'express'
const router = express.Router()

// NOTE: Intentionally insecure implementation for demo purposes:
// - No rate limiting or lockouts (allows unlimited login attempts)
// - Plaintext password storage (no hashing)
// - Detailed error messages returned to client

router.post('/signup', async (req, res) => {
  try {
    const db = req.app.locals.db
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' })

    const existing = await db.collection('users').findOne({ username })
    if (existing) return res.status(400).json({ message: 'Username already exists' })

    const result = await db.collection('users').insertOne({ username, password })
    return res.json({ message: 'Signup successful', userId: result.insertedId })
  } catch (err) {
    // Intentionally logging full error and returning to client (insecure)
    console.error('Signup error:', err)
    return res.status(500).json({ message: String(err) })
  }
})

router.post('/login', async (req, res) => {
  try {
    const db = req.app.locals.db
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'Username and password required' })

    const user = await db.collection('users').findOne({ username })
    if (!user) {
      // Detailed error: tells whether username exists
      console.error('Login failed - username not found for:', username)
      return res.status(400).json({ message: 'Username not found' })
    }

    if (user.password !== password) {
      // Detailed error: informs password incorrect
      console.error('Login failed - incorrect password for:', username)
      return res.status(400).json({ message: 'Password incorrect' })
    }

    // Return a dummy token (insecure) and user info
    const token = `insecure-token-${user._id}`
    return res.json({ message: 'Login successful', token, user: { id: user._id, username: user.username } })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: String(err) })
  }
})

export default router
