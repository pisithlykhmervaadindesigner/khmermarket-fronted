<template>
  <v-app>
    <!-- Top Navigation Bar -->
    <v-app-bar color="primary" dark class="elevation-2">
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <div class="d-flex align-center justify-space-between">
              <!-- Welcome Message -->
              <div class="d-flex align-center">
                <v-icon class="mr-2">mdi-view-dashboard</v-icon>
                <span class="text-h6">{{ t('welcome') }}</span>
              </div>
              
              <!-- Navigation Items -->
              <div class="d-flex align-center">
                <v-btn variant="text" @click="router.push('/')" class="text-white">
                  <v-icon class="mr-2">mdi-home</v-icon>
                  {{ t('home') }}
                </v-btn>
                
                <v-btn variant="text" @click="router.push('/dashboard')" class="text-white">
                  <v-icon class="mr-2">mdi-view-dashboard</v-icon>
                  {{ t('dashboard') }}
                </v-btn>
                
                <v-btn variant="text" @click="router.push('/profile')" class="text-white">
                  <v-icon class="mr-2">mdi-account</v-icon>
                  {{ t('profile') }}
                </v-btn>
                
                <v-btn variant="text" @click="router.push('/settings')" class="text-white">
                  <v-icon class="mr-2">mdi-cog</v-icon>
                  {{ t('settings') }}
                </v-btn>
                
                <v-divider vertical class="mx-2"></v-divider>
                
                <v-btn variant="text" @click="handleLogout" class="text-red">
                  <v-icon class="mr-2">mdi-logout</v-icon>
                  {{ t('logout') }}
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    
    <!-- Main Dashboard Content -->
    <v-main class="grey lighten-5">
      <v-container class="py-8">
        <!-- Welcome Section -->
        <v-row class="mb-6">
          <v-col cols="12">
            <v-card class="elevation-2">
              <v-card-text class="pa-6">
                <div class="d-flex align-center justify-space-between">
                  <div>
                    <h1 class="text-h4 font-weight-bold mb-2">
                      {{ t('welcomeBack') }}, {{ t('user') }}! 👋
                    </h1>
                    <p class="text-subtitle-1 text-medium-emphasis">
                      {{ t('dashboardSubtitle') }}
                    </p>
                  </div>
                  <div class="text-center">
                    <v-avatar size="80" color="primary" class="mb-2">
                      <v-icon size="40" color="white">mdi-account</v-icon>
                    </v-avatar>
                    <p class="text-subtitle-2">{{ t('memberSince') }}</p>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        
        <!-- Stats Cards -->
        <v-row class="mb-6">
          <v-col cols="12" sm="6" md="3">
            <v-card class="elevation-2 text-center pa-4">
              <v-icon size="48" color="primary" class="mb-2">mdi-shopping</v-icon>
              <h3 class="text-h4 font-weight-bold primary--text">{{ stats.orders }}</h3>
              <p class="text-subtitle-1 text-medium-emphasis">{{ t('totalOrders') }}</p>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="elevation-2 text-center pa-4">
              <v-icon size="48" color="success" class="mb-2">mdi-currency-usd</v-icon>
              <h3 class="text-h4 font-weight-bold success--text">${{ stats.totalSpent }}</h3>
              <p class="text-subtitle-1 text-medium-emphasis">{{ t('totalSpent') }}</p>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="elevation-2 text-center pa-4">
              <v-icon size="48" color="warning" class="mb-2">mdi-heart</v-icon>
              <h3 class="text-h4 font-weight-bold warning--text">{{ stats.wishlist }}</h3>
              <p class="text-subtitle-1 text-medium-emphasis">{{ t('wishlistItems') }}</p>
            </v-card>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-card class="elevation-2 text-center pa-4">
              <v-icon size="48" color="info" class="mb-2">mdi-star</v-icon>
              <h3 class="text-h4 font-weight-bold info--text">{{ stats.reviews }}</h3>
              <p class="text-subtitle-1 text-medium-emphasis">{{ t('reviews') }}</p>
            </v-card>
          </v-col>
        </v-row>
        
        <!-- Recent Activity and Quick Actions -->
        <v-row>
          <v-col cols="12" md="8">
            <v-card class="elevation-2">
              <v-card-title class="pa-4">
                <v-icon class="mr-2">mdi-history</v-icon>
                {{ t('recentActivity') }}
              </v-card-title>
              <v-card-text class="pa-4">
                <v-list>
                  <v-list-item v-for="activity in recentActivities" :key="activity.id">
                    <template v-slot:prepend>
                      <v-icon :color="activity.color">{{ activity.icon }}</v-icon>
                    </template>
                    <v-list-item-title>{{ activity.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ activity.description }}</v-list-item-subtitle>
                    <template v-slot:append>
                      <span class="text-caption text-medium-emphasis">{{ activity.time }}</span>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col cols="12" md="4">
            <v-card class="elevation-2">
              <v-card-title class="pa-4">
                <v-icon class="mr-2">mdi-lightning-bolt</v-icon>
                {{ t('quickActions') }}
              </v-card-title>
              <v-card-text class="pa-4">
                <div class="d-flex flex-column gap-2">
                  <v-btn variant="outlined" color="primary" block @click="router.push('/products')">
                    <v-icon class="mr-2">mdi-shopping</v-icon>
                    {{ t('browseProducts') }}
                  </v-btn>
                  
                  <v-btn variant="outlined" color="success" block @click="router.push('/orders')">
                    <v-icon class="mr-2">mdi-package</v-icon>
                    {{ t('viewOrders') }}
                  </v-btn>
                  
                  <v-btn variant="outlined" color="warning" block @click="router.push('/wishlist')">
                    <v-icon class="mr-2">mdi-heart</v-icon>
                    {{ t('viewWishlist') }}
                  </v-btn>
                  
                  <v-btn variant="outlined" color="info" block @click="router.push('/profile')">
                    <v-icon class="mr-2">mdi-account</v-icon>
                    {{ t('editProfile') }}
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Translation function
const t = (key: string) => {
  const translations: Record<string, string> = {
    'welcome': 'KhmerMarket',
    'dashboard': 'Dashboard',
    'welcomeBack': 'Welcome Back',
    'home': 'Home',
    'profile': 'Profile',
    'settings': 'Settings',
    'logout': 'Logout',
    'user': 'User',
    'dashboardSubtitle': 'Here\'s what\'s happening with your account today',
    'memberSince': 'Member since 2024',
    'totalOrders': 'Total Orders',
    'totalSpent': 'Total Spent',
    'wishlistItems': 'Wishlist Items',
    'reviews': 'Reviews',
    'recentActivity': 'Recent Activity',
    'quickActions': 'Quick Actions',
    'browseProducts': 'Browse Products',
    'viewOrders': 'View Orders',
    'viewWishlist': 'View Wishlist',
    'editProfile': 'Edit Profile'
  }
  return translations[key] || key
}

// Mock stats data
const stats = ref({
  orders: 24,
  totalSpent: 1247.89,
  wishlist: 8,
  reviews: 15
})

// Mock recent activities
const recentActivities = ref([
  {
    id: 1,
    icon: 'mdi-shopping',
    color: 'primary',
    title: 'Order #1234 Delivered',
    description: 'Your package was successfully delivered',
    time: '2 hours ago'
  },
  {
    id: 2,
    icon: 'mdi-heart',
    color: 'warning',
    title: 'Added to Wishlist',
    description: 'Wireless Headphones added to your wishlist',
    time: '5 hours ago'
  },
  {
    id: 3,
    icon: 'mdi-star',
    color: 'info',
    title: 'Review Submitted',
    description: 'You rated "Smart Watch" 4 stars',
    time: '1 day ago'
  },
  {
    id: 4,
    icon: 'mdi-currency-usd',
    color: 'success',
    title: 'Payment Successful',
    description: 'Payment of $89.99 processed successfully',
    time: '2 days ago'
  }
])

const handleLogout = async () => {
  await authStore.logout()
  await router.push('/login')
}
</script>
