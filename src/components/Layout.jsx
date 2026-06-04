import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ListChecks, CheckCircle2, Clock, ClipboardList, CloudUpload, PlusCircle, LineChart, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Layout() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const out = () => { logout(); nav('/login') }

  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink to="/" end title="Tasks"><ListChecks size={22} /></NavLink>
        <NavLink to="/" title="Board"><LayoutDashboard size={22} /></NavLink>
        <NavLink to="/" title="Done"><CheckCircle2 size={22} /></NavLink>
        <NavLink to="/" title="Pending"><ClipboardList size={22} /></NavLink>
        <NavLink to="/" title="Schedule"><Clock size={22} /></NavLink>
        <NavLink to="/" title="Storage"><CloudUpload size={22} /></NavLink>
        <NavLink to="/add" title="Add"><PlusCircle size={22} /></NavLink>
        <NavLink to="/" title="Reports"><LineChart size={22} /></NavLink>
        <button onClick={out} title="Logout" style={{ marginTop: 'auto' }}><LogOut size={22} /></button>
      </aside>
      <main className="main">
        <div className="topbar">
          <h1>Task Board</h1>
          <div className="user-chip"><User size={16} />{user?.name}</div>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
