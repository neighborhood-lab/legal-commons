/**
 * API client for communicating with the Legal Commons backend
 */

import type { User, AuthTokens, LoginCredentials, RegisterData, ApiError } from '../types'

const API_BASE_URL =
  (import.meta.env?.VITE_API_URL as string | undefined) || 'http://localhost:3000/api'

class ApiClient {
  private accessToken: string | null = null
  private refreshToken: string | null = null

  setTokens(tokens: AuthTokens | null) {
    if (tokens) {
      this.accessToken = tokens.accessToken
      this.refreshToken = tokens.refreshToken
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tokens', JSON.stringify(tokens))
      }
    } else {
      this.accessToken = null
      this.refreshToken = null
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('tokens')
      }
    }
  }

  loadTokens(): AuthTokens | null {
    if (typeof window === 'undefined') return null
    const stored = window.localStorage.getItem('tokens')
    if (stored) {
      try {
        const tokens = JSON.parse(stored) as AuthTokens
        this.accessToken = tokens.accessToken
        this.refreshToken = tokens.refreshToken
        return tokens
      } catch {
        return null
      }
    }
    return null
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options?.headers as Record<string, string>) || {}),
    }

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        message: 'An unexpected error occurred',
      }))
      throw error
    }

    return response.json()
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<{
    user: User
    tokens: AuthTokens
  }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async register(data: RegisterData): Promise<{
    user: User
    tokens: AuthTokens
  }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async refreshAccessToken(): Promise<AuthTokens> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available')
    }

    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: this.refreshToken }),
    })
  }

  async getCurrentUser(): Promise<User> {
    return this.request('/auth/me')
  }

  async logout(): Promise<void> {
    this.setTokens(null)
  }
}

export const apiClient = new ApiClient()
