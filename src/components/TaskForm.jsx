import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Paperclip, X } from 'lucide-react'

const fileToData = (file) => new Promise((res, rej) => {
  const r = new FileReader()
  r.onload = () => res({ name: file.name, type: file.type, size: file.size, data: r.result })
  r.onerror = rej
  r.readAsDataURL(file)
})

export default function TaskForm({ initial, onSubmit, submitLabel = 'Add' }) {
  const nav = useNavigate()
  const [form, setForm] = useState(initial || {
    title: '', description: '', startDate: '', endDate: '',
    status: 'Pending', priority: 'P1', attachment: null
  })

  const handleFile = async (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (f.size > 2 * 1024 * 1024) { alert('Max file size 2MB'); return }
    const data = await fileToData(f)
    setForm({ ...form, attachment: data })
  }

  const submit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <motion.form className="modal" onSubmit={submit}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      style={{ margin: '0 auto' }}>
      <h2>{submitLabel === 'Add' ? 'Add New Task' : 'Edit Task'}</h2>
      <div className="field">
        <label>Title</label>
        <input required value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Task title"/>
      </div>
      <div className="field">
        <label>Description</label>
        <textarea rows={3} value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Task description"/>
      </div>
      <div className="field">
        <label>Start Date</label>
        <input type="date" value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})}/>
      </div>
      <div className="field">
        <label>End Date</label>
        <input type="date" value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})}/>
      </div>
      <div className="field">
        <label>Status</label>
        <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
          <option>Pending</option><option>In Progress</option><option>Completed</option>
        </select>
      </div>
      <div className="field">
        <label>Priority</label>
        <select value={form.priority} onChange={e=>setForm({...form, priority:e.target.value})}>
          <option>P0</option><option>P1</option><option>P2</option>
        </select>
      </div>
      <div className="field">
        <label>Attachment (max 2MB)</label>
        {form.attachment ? (
          <div className="attachment" style={{ justifyContent:'space-between' }}>
            <span><Paperclip size={14}/> {form.attachment.name}</span>
            <button type="button" className="icon-btn danger" onClick={()=>setForm({...form, attachment:null})}><X size={14}/></button>
          </div>
        ) : (
          <input type="file" onChange={handleFile}/>
        )}
      </div>
      <div style={{ display:'flex', gap:10, marginTop: 8 }}>
        <button type="button" className="btn btn-ghost" onClick={()=>nav('/')}>Cancel</button>
        <button type="submit" className="btn btn-block">{submitLabel}</button>
      </div>
    </motion.form>
  )
}
