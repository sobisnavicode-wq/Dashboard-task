import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const u = localStorage.getItem('current_user')
    if (u) setUser(JSON.parse(u))
    setReady(true)
  }, [])

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === email)) {
      return { ok: false, msg: 'Email already registered' }
    }
    const newUser = { id: Date.now(), name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    return { ok: true }
  }

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { ok: false, msg: 'Invalid credentials' }
    const safe = { id: found.id, name: found.name, email: found.email }
    setUser(safe)
    localStorage.setItem('current_user', JSON.stringify(safe))
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('current_user')
  }

  return (
    <AuthContext.Provider value={{ user, ready, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
