export const useAuth = () => {
  const config = useRuntimeConfig()
  const { $fetch } = useNuxtApp()

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await $fetch('/api/v1/auth/login', {
        method: 'POST',
        body: credentials,
        baseURL: config.public.apiBaseUrl
      })
      
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/v1/auth/logout', {
        method: 'POST',
        baseURL: config.public.apiBaseUrl
      })
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    login,
    logout
  }
}
