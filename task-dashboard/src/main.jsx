import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </BrowserRouter>
)
