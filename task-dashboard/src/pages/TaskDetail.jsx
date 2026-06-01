import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Paperclip } from 'lucide-react'
import { useTasks } from '../context/TaskContext.jsx'

export default function TaskDetail() {
  const { id } = useParams()
  const { tasks } = useTasks()
  const t = tasks.find(t => t.id === Number(id))
  if (!t) return <Navigate to="/" />

  return (
    <motion.div className="panel"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Link to="/" className="btn btn-ghost" style={{ paddingLeft: 0 }}>
        <ArrowLeft size={16} style={{verticalAlign:'middle'}}/> Back
      </Link>
      <h2 style={{ marginTop: 12 }}>{t.title}</h2>
      <p style={{ marginTop: 8, color: '#374151' }}>{t.description}</p>
      <div style={{ display:'flex', gap: 20, marginTop: 16, flexWrap:'wrap' }}>
        <div><strong>Priority:</strong> {t.priority}</div>
        <div><strong>Status:</strong> {t.status}</div>
        <div><strong>Start:</strong> {t.startDate || '—'}</div>
        <div><strong>End:</strong> {t.endDate || '—'}</div>
      </div>
      {t.attachment && (
        <div style={{ marginTop: 16 }}>
          <strong><Paperclip size={14} style={{verticalAlign:'middle'}}/> Attachment</strong>
          <div className="attachment" style={{ marginTop: 8, display:'inline-flex' }}>
            <a href={t.attachment.data} download={t.attachment.name} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <Download size={14}/> {t.attachment.name}
            </a>
          </div>
        </div>
      )}
    </motion.div>
  )
}
