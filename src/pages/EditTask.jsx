import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTasks } from '../context/TaskContext.jsx'
import TaskForm from '../components/TaskForm.jsx'

export default function EditTask() {
  const { id } = useParams()
  const { tasks, updateTask } = useTasks()
  const nav = useNavigate()
  const task = tasks.find(t => t.id === Number(id))
  if (!task) return <Navigate to="/" />
  return (
    <TaskForm initial={task} submitLabel="Save" onSubmit={(t) => {
      updateTask(task.id, t); toast.success('Task updated'); nav('/')
    }} />
  )
}
