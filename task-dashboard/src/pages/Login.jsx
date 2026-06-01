import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { LogIn, Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const submit = (e) => {
    e.preventDefault()
    const r = login(form)
    if (r.ok) { toast.success('Welcome back!'); nav('/') }
    else toast.error(r.msg)
  }

  return (
    <div className="auth-wrap">
      <motion.div className="auth-card"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
          <LogIn color="#6366f1" /><h1>Sign in</h1>
        </div>
        <p className="sub">Welcome back to your Task Board</p>
        <form onSubmit={submit}>
          <div className="field">
            <label><Mail size={12} style={{verticalAlign:'middle'}}/> Email</label>
            <input type="email" required value={form.email}
              onChange={e=>setForm({...form, email:e.target.value})} placeholder="you@example.com"/>
          </div>
          <div className="field">
            <label><Lock size={12} style={{verticalAlign:'middle'}}/> Password</label>
            <input type="password" required value={form.password}
              onChange={e=>setForm({...form, password:e.target.value})} placeholder="••••••••"/>
          </div>
          <button className="btn btn-block" type="submit">Login</button>
        </form>
        <p className="auth-foot">No account? <Link to="/register">Register</Link></p>
      </motion.div>
    </div>
  )
}
