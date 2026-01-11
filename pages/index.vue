<template>
  <v-app>
    <!-- Top Navigation Bar (only when logged in) -->
    <v-app-bar color="primary" dark v-if="authStore.isLoggedIn" class="elevation-2">
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <div class="d-flex align-center justify-space-between">
              <!-- Welcome Message -->
              <div class="d-flex align-center">
                <v-icon class="mr-2">mdi-store</v-icon>
                <span class="text-h6">{{ t('welcome') }}</span>
              </div>
              
              <!-- Consistent Navigation Items -->
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
    
    <!-- Main Content -->
    <v-container fluid class="pa-0">
      <!-- Hero Section -->
      <v-parallax
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
          :height="$vuetify.display.mdAndUp ? 500 : 400"
      >
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" md="10" lg="8" class="text-center">
              <h1 class="text-h4 text-md-h3 text-lg-h2 font-weight-bold text-white mb-4">
                {{ t('welcome') }}
              </h1>
              <p class="text-h6 text-md-h5 text-white mb-6">
                {{ t('heroSubtitle') }}
              </p>
              <v-btn
                  color="primary"
                  size="x-large"
                  @click="router.push('/products')"
                  class="mt-4"
              >
                {{ t('startShopping') }}
                <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>

    <!-- Categories Section -->
    <v-container class="py-8 py-md-12">
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 text-md-h3 text-center mb-6 mb-md-8">
            {{ t('popularCategories') }}
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            v-for="category in categories"
            :key="category.id"
            cols="6"
            sm="4"
            md="3"
        >
          <v-card
              class="mx-auto category-card"
              @click="router.push(`/categories/${category.id}`)"
          >
            <v-img
                :src="category.image"
                height="200"
                cover
            ></v-img>
            <v-card-title class="text-center">
              {{ t(category.label) }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Featured Products -->
    <v-container class="py-12 grey lighten-5">
      <v-row>
        <v-col cols="12">
          <h2 class="text-h3 text-center mb-8">{{ t('featuredProducts') }}</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            v-for="product in featuredProducts"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
          <v-card class="product-card">
            <v-img
                :src="product.image"
                height="250"
                cover
            >
              <v-chip
                  v-if="product.discount"
                  color="red"
                  class="ma-2"
                  prepend-icon="mdi-sale"
              >
                -{{ product.discount }}%
              </v-chip>
            </v-img>

            <v-card-title>
              {{ product.name }}
            </v-card-title>

            <v-card-subtitle>
              <v-rating
                  :model-value="product.rating"
                  color="amber"
                  density="compact"
                  half-increments
                  readonly
                  size="small"
              ></v-rating>
              <span class="ml-2">({{ product.reviews }})</span>
            </v-card-subtitle>

            <v-card-text>
              <div class="d-flex align-center">
                <span class="text-h6 primary--text">
                  ${{ product.price }}
                </span>
                <span
                    v-if="product.originalPrice"
                    class="text-decoration-line-through ml-2 grey--text"
                >
                  ${{ product.originalPrice }}
                </span>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                  color="primary"
                  variant="outlined"
                  block
                  @click="addToCart(product)"
              >
                {{ t('addToCart') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <v-col cols="12" class="text-center">
          <v-btn
              variant="text"
              color="primary"
              @click="router.push('/products')"
              class="px-0"
          >
            {{ t('viewAllProducts') }} <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Why Choose Us -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12">
          <h2 class="text-h3 text-center mb-8">{{ t('whyChoose.title') }}</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="text-center pa-6" flat>
            <v-icon size="64" color="primary">mdi-truck-fast</v-icon>
            <v-card-title>{{ t('whyChoose.fastDelivery.title') }}</v-card-title>
            <v-card-text>
              {{ t('whyChoose.fastDelivery.description') }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="text-center pa-6" flat>
            <v-icon size="64" color="primary">mdi-shield-check</v-icon>
            <v-card-title>{{ t('whyChoose.securePayment.title') }}</v-card-title>
            <v-card-text>
              {{ t('whyChoose.securePayment.description') }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="text-center pa-6" flat>
            <v-icon size="64" color="primary">mdi-account-group</v-icon>
            <v-card-title>{{ t('whyChoose.localSellers.title') }}</v-card-title>
            <v-card-text>
              {{ t('whyChoose.localSellers.description') }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Newsletter -->
    <v-container fluid class="primary py-12">
      <v-row justify="center">
        <v-col cols="12" md="6" class="text-center">
          <h3 class="text-h4 white--text mb-4">
            {{ t('newsletter') }}
          </h3>
          <p class="white--text mb-6">
            {{ t('newsletterDescription') }}
          </p>
          <v-form @submit.prevent="subscribeNewsletter">
            <v-row>
              <v-col cols="12" sm="8">
                <v-text-field
                    v-model="email"
                    :label="t('yourEmail')"
                    type="email"
                    variant="solo"
                    hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-btn
                    color="secondary"
                    size="large"
                    type="submit"
                    block
                    height="56"
                >
                  {{ t('subscribe') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Logout functionality
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
    router.push('/login')
  }
}

// Simple translation function
const t = (key: string) => {
  const translations: Record<string, string> = {
    'welcome': 'KhmerMarket',
    'heroSubtitle': 'Your trusted marketplace for quality products',
    'popularCategories': 'Popular Categories',
    'featuredProducts': 'Featured Products',
    'addToCart': 'Add to Cart',
    'viewAllProducts': 'View All Products',
    'whyChoose.title': 'Why Choose Us',
    'whyChoose.fastDelivery.title': 'Fast Delivery',
    'whyChoose.fastDelivery.description': 'Quick and reliable delivery to your doorstep',
    'whyChoose.securePayment.title': 'Secure Payment',
    'whyChoose.securePayment.description': 'Safe and secure payment methods',
    'whyChoose.localSellers.title': 'Local Sellers',
    'whyChoose.localSellers.description': 'Support local businesses and sellers',
    'newsletter': 'Subscribe to Our Newsletter',
    'newsletterDescription': 'Get the latest updates and exclusive offers',
    'yourEmail': 'Your email',
    'subscribe': 'Subscribe',
    'startShopping': 'Start Shopping',
    'categories.electronics': 'Electronics',
    'categories.fashion': 'Fashion',
    'categories.food': 'Food & Groceries',
    'categories.home': 'Home & Garden',
    'loggedIn': 'Logged in',
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'settings': 'Settings',
    'logout': 'Logout',
    'home': 'Home',
    'products': 'Products',
    'categories': 'Categories',
    'myOrders': 'My Orders',
    'wishlist': 'Wishlist'
  }
  return translations[key] || key
}

// Categories
const categories = [
  { id: 1, label: 'categories.electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { id: 2, label: 'categories.fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400' },
  { id: 3, label: 'categories.food', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400' },
  { id: 4, label: 'categories.home', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' }
]

// Featured products
const featuredProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    price: 49.99,
    originalPrice: 79.99,
    discount: 38,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: 'Smart Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    rating: 4.3,
    reviews: 89
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    price: 39.99,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    reviews: 234
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    rating: 4.2,
    reviews: 156
  }
]

// Newsletter
const email = ref('')

// Add product to cart
const addToCart = (product: any) => {
  console.log('Added to cart:', product.name)
}

// Subscribe newsletter
const subscribeNewsletter = () => {
  if (email.value) {
    console.log('Subscribed with email:', email.value)
    alert(t('subscribe') + ' success!')
    email.value = ''
  }
}
</script>

<style scoped>
.category-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
}

.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card .v-card-text {
  flex-grow: 1;
}
</style>