export interface User {
  id: string
  email: string
  name?: string
  role?: string
  avatar?: string
  phone?: string
  address?: string
  created_at?: string
  updated_at?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token?: string
  user: User
  token_type?: string
  expires_in?: number
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
  phone?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  loading: boolean
}
