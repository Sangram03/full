import { Calendar, Trophy, Phone, Settings, Sun, Moon, LogOut, BookOpen } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated, logout } = useAuth()

  const navItems = [
    { path: '/', label: 'Events', icon: Calendar },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/achievements', label: 'Achievements', icon: Trophy },
    { path: '/contact', label: 'Contact', icon: Phone },
  ]

  return (
    <header className="bg-indigo-600 dark:bg-gray-800 text-white py-6 px-4 shadow-md">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Campus Hub</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            {isAuthenticated && (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
        <nav className="flex gap-6">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                ${location.pathname === path 
                  ? 'bg-white/20' 
                  : 'hover:bg-white/10'
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              to="/admin"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                ${location.pathname === '/admin'
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
                }`}
            >
              <Settings className="w-5 h-5" />
              <span>Admin</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
