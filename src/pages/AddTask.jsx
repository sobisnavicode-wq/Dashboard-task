import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTasks } from '../context/TaskContext.jsx'
import TaskForm from '../components/TaskForm.jsx'

export default function AddTask() {
  const { addTask } = useTasks()
  const nav = useNavigate()
  return (
    <TaskForm submitLabel="Add" onSubmit={(t) => {
      addTask(t); toast.success('Task added'); nav('/')
    }} />
  )
}
