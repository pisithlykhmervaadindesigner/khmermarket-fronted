export default defineNuxtConfig({
    ssr: false,
    
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL,
            appName: process.env.APP_NAME || 'KhmerMarket'
        }
    },
    
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt'
    ]
})