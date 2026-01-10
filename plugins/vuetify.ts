// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    ssr: false, // Disable SSR for now to simplify debugging
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#1976D2',
            secondary: '#FF9800',
            error: '#F44336',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)

  return {
    provide: {
      vuetify
    }
  }
})
