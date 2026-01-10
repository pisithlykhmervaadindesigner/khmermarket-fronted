// nuxt.config.ts
export default defineNuxtConfig({
    // Make sure Nuxt 3 knows the current compatibility date
    compatibilityDate: '2026-01-10',

    ssr: false, // Optional: disable server-side rendering if you want client-side only

    // CSS
    css: [
        'vuetify/styles',
        '@mdi/font/css/materialdesignicons.css',
        '~/assets/css/main.css'
    ],

    // Build options
    build: {
        transpile: ['vuetify']
    },

    // Modules
    modules: [
        '@pinia/nuxt',
        '@vueuse/nuxt',
        ['@nuxtjs/i18n', {
            langDir: 'locales/', // ✅ point to your current folder
            lazy: true,          // load JSON files lazily
            locales: [
                { code: 'en', file: 'en.json', name: 'English' },
                { code: 'km', file: 'km.json', name: 'ភាសាខ្មែរ' }
            ],
            defaultLocale: 'en',
            strategy: 'prefix_except_default',
            detectBrowserLanguage: {
                useCookie: true,
                cookieKey: 'i18n_redirected',
                redirectOn: 'root'
            }
        }]
    ],

    // Vite config (optional)
    vite: {
        define: {
            'process.env.DEBUG': 'false'
        },
        optimizeDeps: {
            include: ['crypto-js'],
            exclude: ['crypto']
        }
    }
})