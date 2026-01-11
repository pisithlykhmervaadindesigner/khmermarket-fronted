import { defineStore } from 'pinia'
import type { User } from '~/types/auth'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  loading: boolean
}

// Type for API responses
interface LoginResponse {
  access_token: string
  refresh_token?: string
  expires_in?: number
  user?: User
}

interface RefreshResponse {
  access_token: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated && !!state.token
  },

  actions: {
    async login(credentials: { email: string; password: string }) {
      this.loading = true
      try {
        const config = useRuntimeConfig()
        
        console.log('Attempting login with:', config.public.apiBaseUrl)
        
        const response = await $fetch<LoginResponse>('/api/v1/auth/login', {
          method: 'POST',
          body: credentials,
          baseURL: config.public.apiBaseUrl
        })
        
        console.log('Login response:', response)
        
        if (response.access_token) {
          this.token = response.access_token
          this.refreshToken = null // Backend doesn't provide refresh token
          this.user = null // Backend doesn't provide user data
          this.isAuthenticated = true
          
          console.log('Authentication successful, token set:', !!this.token)
          
          // Store only access token in localStorage for persistence
          if (process.client) {
            localStorage.setItem('auth_token', response.access_token)
          }
          
          return response
        } else {
          throw new Error('Invalid login response')
        }
      } catch (error: any) {
        console.error('Login error details:', error)
        // Only logout on authentication errors, not on network/validation errors
        if (error?.status === 401 || error?.status === 403) {
          this.logout()
        }
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        const config = useRuntimeConfig()
        
        await $fetch('/api/v1/auth/logout', {
          method: 'POST',
          baseURL: config.public.apiBaseUrl
        })
        
        console.log('Logout successful')
      } catch (error) {
        console.error('Logout API error:', error)
      } finally {
        this.user = null
        this.token = null
        this.refreshToken = null
        this.isAuthenticated = false
        
        // Clear localStorage
        if (process.client) {
          localStorage.removeItem('auth_token')
        }
      }
    },

    async initializeAuth() {
      if (process.client) {
        const token = localStorage.getItem('auth_token')
        
        console.log('initializeAuth - Found token in localStorage:', !!token)
        console.log('initializeAuth - Token value:', token?.substring(0, 20) + '...')
        
        if (token) {
          this.token = token
          this.refreshToken = null
          this.user = null
          this.isAuthenticated = true
          
          console.log('initializeAuth - Set auth state:')
          console.log('  - token:', !!this.token)
          console.log('  - isAuthenticated:', this.isAuthenticated)
          console.log('  - isLoggedIn:', this.isLoggedIn)
        } else {
          console.log('initializeAuth - No token found, user not authenticated')
        }
      }
    }
  }
})
