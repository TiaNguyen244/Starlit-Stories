import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const resp = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const json = await resp.json()
      if (!resp.ok) {
        // Intentionally show server message and log full response (insecure behavior)
        console.error('Login failed response:', json)
        setError(json.message || 'Login failed')
        return
      }

      // store token and redirect to homepage
      localStorage.setItem('token', json.token)
      localStorage.setItem('username', json.user?.username || '')
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)
      setError(String(err))
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary" type="submit">Login</button>
            <Link to="/signup" className="btn btn-link">Sign up</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
