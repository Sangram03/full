import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_PASSWORD = 'admin123' // In a real app, this would be handled securely

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminAuthenticated') === 'true'
  })

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('isAdminAuthenticated', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAdminAuthenticated')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
