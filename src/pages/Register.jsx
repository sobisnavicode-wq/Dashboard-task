import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const submit = (e) => {
    e.preventDefault()
    const r = register(form)
    if (r.ok) { toast.success('Account created! Please log in.'); nav('/login') }
    else toast.error(r.msg)
  }

  return (
    <div className="auth-wrap">
      <motion.div className="auth-card"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
          <UserPlus color="#6366f1" /><h1>Create account</h1>
        </div>
        <p className="sub">Start managing your tasks today</p>
        <form onSubmit={submit}>
          <div className="field">
            <label>Full name</label>
            <input required value={form.name}
              onChange={e=>setForm({...form, name:e.target.value})} placeholder="Jane Doe"/>
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" required value={form.email}
              onChange={e=>setForm({...form, email:e.target.value})} placeholder="you@example.com"/>
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" required minLength={4} value={form.password}
              onChange={e=>setForm({...form, password:e.target.value})} placeholder="At least 4 characters"/>
          </div>
          <button className="btn btn-block" type="submit">Register</button>
        </form>
        <p className="auth-foot">Already have an account? <Link to="/login">Sign in</Link></p>
      </motion.div>
    </div>
  )
}
