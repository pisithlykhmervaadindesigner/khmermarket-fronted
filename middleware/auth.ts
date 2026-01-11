export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  console.log('Auth middleware - Route:', to.path)
  console.log('Auth middleware - Is logged in:', authStore.isLoggedIn)
  console.log('Auth middleware - Has token:', !!authStore.token)
  
  // Check if the route requires authentication
  const isAuthRequired = to.meta.auth !== false
  
  // If authentication is required and user is not logged in
  if (isAuthRequired && !authStore.isLoggedIn) {
    console.log('Auth middleware - Redirecting to login')
    return navigateTo('/login')
  }
  
  // If user is logged in and trying to access login page
  if (to.path === '/login' && authStore.isLoggedIn) {
    console.log('Auth middleware - Redirecting to home')
    return navigateTo('/')
  }
  
  console.log('Auth middleware - Allowing access')
})
