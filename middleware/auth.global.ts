// Global authentication middleware
export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip middleware on server side
  if (process.server) return
  
  const authStore = useAuthStore()
  
  // Initialize auth before checking login status
  await authStore.initializeAuth()
  
  console.log('Auth middleware - Route:', to.path)
  console.log('Auth middleware - Is logged in:', authStore.isLoggedIn)
  console.log('Auth middleware - Has token:', !!authStore.token)
  
  // List of public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password']
  
  // If trying to access protected route and not logged in
  if (!publicRoutes.includes(to.path) && !authStore.isLoggedIn) {
    console.log('Auth middleware - Redirecting to login')
    return navigateTo('/login')
  }
  
  // If logged in and trying to access login page
  if (to.path === '/login' && authStore.isLoggedIn) {
    console.log('Auth middleware - Redirecting to home')
    return navigateTo('/')
  }
  
  console.log('Auth middleware - Allowing access')
})
