import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Pencil, Trash2, Paperclip, Eye } from 'lucide-react'
import { toast } from 'react-toastify'
import { useTasks } from '../context/TaskContext.jsx'

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks()
  const nav = useNavigate()

  const remove = () => {
    if (confirm('Delete this task?')) {
      deleteTask(task.id); toast.success('Task deleted')
    }
  }

  const priClass = task.priority === 'P0' ? 'p0' : task.priority === 'P1' ? 'p1' : 'p2'
  const statusClass = task.status?.toLowerCase().replace(' ', '-')

  return (
    <motion.div className="task-card"
      layout
      initial={{ opacity: 0, scale: .95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: .9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: .25 }}>
      <div className={`task-banner ${priClass}`}>
        <span className="pri">{task.priority}</span>
        {task.title}
      </div>
      <p className="task-desc">{task.description}</p>
      <div className="dates">
        <div><strong>Start</strong>{task.startDate || '—'}</div>
        <div><strong>End</strong>{task.endDate || '—'}</div>
      </div>
      {task.attachment && (
        <div className="attachment">
          <Paperclip size={14} /> {task.attachment.name}
        </div>
      )}
      <div className="task-foot">
        <span className={`status-pill ${statusClass}`}>{task.status}</span>
        <div className="icon-btns">
          <button className="icon-btn" title="View" onClick={()=>nav(`/task/${task.id}`)}><Eye size={16}/></button>
          <Link to={`/edit/${task.id}`} className="icon-btn" title="Edit"><Pencil size={16}/></Link>
          <button className="icon-btn danger" title="Delete" onClick={remove}><Trash2 size={16}/></button>
        </div>
      </div>
    </motion.div>
  )
}
