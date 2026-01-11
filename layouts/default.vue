<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-container class="d-flex align-center">
        <v-app-bar-title>
          <span class="cursor-pointer" @click="router.push('/')">
            KhmerMarket
          </span>
        </v-app-bar-title>
        
        <v-spacer></v-spacer>
        
        <!-- Navigation for authenticated users -->
        <div v-if="authStore.isLoggedIn" class="d-flex align-center">
          <v-btn variant="text" @click="router.push('/dashboard')">
            <v-icon>mdi-view-dashboard</v-icon>
            <span class="ml-2">Dashboard</span>
          </v-btn>
          
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="router.push('/profile')">
                <v-list-item-title>
                  <v-icon class="mr-2">mdi-account</v-icon>
                  Profile
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="router.push('/settings')">
                <v-list-item-title>
                  <v-icon class="mr-2">mdi-cog</v-icon>
                  Settings
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item @click="handleLogout">
                <v-list-item-title class="text-red">
                  <v-icon class="mr-2">mdi-logout</v-icon>
                  Logout
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        
        <!-- Navigation for non-authenticated users -->
        <div v-else class="d-flex align-center">
          <v-btn variant="text" @click="router.push('/login')">
            Login
          </v-btn>
          <v-btn variant="outlined" class="ml-2" @click="router.push('/register')">
            Register
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>
    
    <v-main>
      <slot />
    </v-main>
    
    <!-- Success Snackbar -->
    <v-snackbar
      v-model="showSuccess"
      color="success"
      timeout="3000"
      location="top"
    >
      <v-icon start>mdi-check-circle</v-icon>
      {{ successMessage }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Success notification state
const showSuccess = ref(false)
const successMessage = ref('')

const handleLogout = async () => {
  try {
    await authStore.logout()
    successMessage.value = 'Logged out successfully!'
    showSuccess.value = true
    
    // Redirect after showing success message
    setTimeout(() => {
      router.push('/login')
    }, 1000)
  } catch (error) {
    console.error('Logout failed:', error)
    // Still redirect to login even if logout API fails
    router.push('/login')
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
