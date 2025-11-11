/**
 * Authentication context providing user state and auth operations
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '../lib/api-client'
import type { User, AuthTokens, LoginCredentials, RegisterData, AuthState } from '../types'

interface AuthContextValue extends AuthState {
  // eslint-disable-next-line no-unused-vars
  login: (credentials: LoginCredentials) => Promise<void>
  // eslint-disable-next-line no-unused-vars
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Load tokens and user on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedTokens = apiClient.loadTokens()
      if (storedTokens) {
        try {
          const currentUser = await apiClient.getCurrentUser()
          setUser(currentUser)
          setTokens(storedTokens)
        } catch {
          // Token expired or invalid
          apiClient.setTokens(null)
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    const { user: loggedInUser, tokens: authTokens } = await apiClient.login(credentials)
    apiClient.setTokens(authTokens)
    setUser(loggedInUser)
    setTokens(authTokens)
    navigate('/')
  }

  const register = async (data: RegisterData) => {
    const { user: registeredUser, tokens: authTokens } = await apiClient.register(data)
    apiClient.setTokens(authTokens)
    setUser(registeredUser)
    setTokens(authTokens)
    navigate('/')
  }

  const logout = async () => {
    await apiClient.logout()
    setUser(null)
    setTokens(null)
    navigate('/login')
  }

  const value: AuthContextValue = {
    user,
    tokens,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
