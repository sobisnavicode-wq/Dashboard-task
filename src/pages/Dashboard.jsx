import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Filter, X, Plus } from 'lucide-react'
import { useTasks } from '../context/TaskContext.jsx'
import TaskCard from '../components/TaskCard.jsx'
import TaskSkeleton from '../components/TaskSkeleton.jsx'

export default function Dashboard() {
  const { tasks, loading } = useTasks()
  const [showFilter, setShowFilter] = useState(false)
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const filtered = useMemo(() => {
    return tasks.filter(t => {
      if (status !== 'all' && t.status !== status) return false
      if (priority !== 'all' && t.priority !== priority) return false
      if (from && t.startDate && t.startDate < from) return false
      if (to && t.endDate && t.endDate > to) return false
      return true
    })
  }, [tasks, status, priority, from, to])

  return (
    <>
      <div className="controls">
        <button className="filter-btn" onClick={()=>setShowFilter(s=>!s)}>
          {showFilter ? <X size={18}/> : <Filter size={18}/>}
        </button>
        <Link to="/add" className="btn"><Plus size={14} style={{verticalAlign:'middle'}}/> New Task</Link>
        <span className="count">All Task ({filtered.length})</span>
      </div>

      <AnimatePresence>
        {showFilter && (
          <motion.div className="panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}>
            <h3>Sort</h3>
            <div className="panel-row">
              <select value={status} onChange={e=>setStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <select value={priority} onChange={e=>setPriority(e.target.value)}>
                <option value="all">All Priority</option>
                <option>P0</option><option>P1</option><option>P2</option>
              </select>
            </div>
            <h3 style={{ marginTop: 14 }}>Filter</h3>
            <div className="panel-row">
              <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
              <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="task-grid">
          {Array.from({length: 4}).map((_,i)=><TaskSkeleton key={i}/>)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">
          No tasks found. <Link to="/add">Add a new task</Link>
        </div>
      ) : (
        <div className="task-grid">
          <AnimatePresence>
            {filtered.map(t => <TaskCard key={t.id} task={t} />)}
          </AnimatePresence>
        </div>
      )}
    </>
  )
}
