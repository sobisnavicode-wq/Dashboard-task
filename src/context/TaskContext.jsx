import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext.jsx'

const TaskContext = createContext()
export const useTasks = () => useContext(TaskContext)

export function TaskProvider({ children }) {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const key = user ? `tasks_${user.id}` : null

  useEffect(() => {
    if (!key) { setTasks([]); setLoading(false); return }
    setLoading(true)
    // Simulate async load for skeleton UX
    const t = setTimeout(() => {
      const raw = localStorage.getItem(key)
      setTasks(raw ? JSON.parse(raw) : [])
      setLoading(false)
    }, 700)
    return () => clearTimeout(t)
  }, [key])

  const persist = (next) => {
    setTasks(next)
    if (key) localStorage.setItem(key, JSON.stringify(next))
  }

  const addTask = (t) => persist([{ ...t, id: Date.now() }, ...tasks])
  const updateTask = (id, patch) =>
    persist(tasks.map(t => t.id === id ? { ...t, ...patch } : t))
  const deleteTask = (id) => persist(tasks.filter(t => t.id !== id))

  return (
    <TaskContext.Provider value={{ tasks, loading, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}
