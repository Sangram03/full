import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import Events from './components/Events.tsx'
import Blog from './components/Blog'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import AdminPanel from './components/AdminPanel'
import Login from './components/Login'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header />
            <main className="max-w-5xl mx-auto p-4 pt-8">
              <Routes>
                <Route path="/" element={<Events />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
                {/* Catch unmatched routes and redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
