import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AddTask from './pages/AddTask.jsx'
import EditTask from './pages/EditTask.jsx'
import TaskDetail from './pages/TaskDetail.jsx'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext.jsx'

export default function App() {
  const { ready } = useAuth()
  if (!ready) return null
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  )
}
