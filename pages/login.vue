<template>
  <v-container fluid class="login-container">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" sm="8" md="6" lg="4" xl="3">
        <v-card class="elevation-8 pa-6">
          <v-card-title class="text-center mb-6">
            <h2 class="text-h4 font-weight-bold primary--text">
              {{ t('login.title') }}
            </h2>
            <p class="text-subtitle-1 text-medium-emphasis mt-2">
              {{ t('login.subtitle') }}
            </p>
          </v-card-title>

          <v-form @submit.prevent="handleLogin" ref="loginForm">
            <v-text-field
              v-model="form.email"
              :label="t('login.email')"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              :rules="emailRules"
              :error-messages="errors.email"
              class="mb-4"
              :disabled="loading"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :label="t('login.password')"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              :rules="passwordRules"
              :error-messages="errors.password"
              class="mb-4"
              :disabled="loading"
            ></v-text-field>

            <v-checkbox
              v-model="form.rememberMe"
              :label="t('login.rememberMe')"
              color="primary"
              class="mb-4"
              :disabled="loading"
            ></v-checkbox>

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :loading="loading"
              class="mb-4"
            >
              {{ t('login.signIn') }}
            </v-btn>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div class="text-center">
            <p class="text-medium-emphasis mb-2">
              {{ t('login.noAccount') }}
            </p>
            <v-btn
              variant="outlined"
              color="primary"
              @click="router.push('/register')"
              :disabled="loading"
            >
              {{ t('login.signUp') }}
            </v-btn>
          </div>

          <div class="text-center mt-4">
            <v-btn
              variant="text"
              color="primary"
              size="small"
              @click="router.push('/forgot-password')"
              :disabled="loading"
            >
              {{ t('login.forgotPassword') }}
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

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

    <!-- Error Snackbar -->
    <v-snackbar
      v-model="showError"
      color="error"
      timeout="5000"
      location="top"
    >
      <v-icon start>mdi-alert-circle</v-icon>
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
  auth: false
})

const router = useRouter()
const authStore = useAuthStore()

// Form data
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

// Form validation
const loginForm = ref()
const showPassword = ref(false)
const loading = ref(false)

// Error handling
const errors = reactive({
  email: '',
  password: ''
})

// Snackbar state
const showSuccess = ref(false)
const showError = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Validation rules
const emailRules = [
  (v: string) => !!v || 'Email is required',
  (v: string) => /.+@.+\..+/.test(v) || 'Email must be valid'
]

const passwordRules = [
  (v: string) => !!v || 'Password is required',
  (v: string) => v.length >= 6 || 'Password must be at least 6 characters'
]

// Simple translation function
const t = (key: string) => {
  const translations: Record<string, string> = {
    'login.title': 'Welcome Back',
    'login.subtitle': 'Sign in to continue to your account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.rememberMe': 'Remember me',
    'login.signIn': 'Sign In',
    'login.noAccount': "Don't have an account?",
    'login.signUp': 'Sign Up',
    'login.forgotPassword': 'Forgot Password?',
    'login.success': 'Login successful!',
    'login.failed': 'Login failed',
    'validation.emailRequired': 'Email is required',
    'validation.emailInvalid': 'Email must be valid',
    'validation.passwordRequired': 'Password is required',
    'validation.passwordMinLength': 'Password must be at least 6 characters'
  }
  return translations[key] || key
}

// Clear errors
const clearErrors = () => {
  errors.email = ''
  errors.password = ''
}

// Handle login
const handleLogin = async () => {
  clearErrors()
  
  const { valid } = await loginForm.value.validate()
  if (!valid) return

  loading.value = true

  try {
    await authStore.login({
      email: form.email,
      password: form.password
    })

    successMessage.value = t('login.success')
    showSuccess.value = true

    // Redirect to index page after successful login
    setTimeout(() => {
      router.push('/')
    }, 1500)

  } catch (error: any) {
    console.error('Login error:', error)
    
    // Handle different error types
    if (error.data) {
      // Backend validation errors
      if (error.data.email) {
        errors.email = error.data.email[0]
      }
      if (error.data.password) {
        errors.password = error.data.password[0]
      }
      if (error.data.detail || error.data.message) {
        errorMessage.value = error.data.detail || error.data.message
      } else {
        errorMessage.value = t('login.failed')
      }
    } else if (error.message) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = t('login.failed')
    }
    
    showError.value = true
  } finally {
    loading.value = false
  }
}

// Check if already logged in and redirect
onMounted(() => {
  if (authStore.isLoggedIn) {
    router.push('/')
  }
})
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.fill-height {
  min-height: 100vh;
}

.v-card {
  border-radius: 16px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}
</style>
