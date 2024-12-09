import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(password)) {
      navigate('/admin')
    } else {
      setError('Invalid password')
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-100 dark:bg-gray-700 p-3 rounded-full mb-4">
            <Lock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
