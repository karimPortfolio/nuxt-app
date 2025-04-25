import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },

  css: [
    '@/assets/css/main.css',
  ],

  routeRules: {
    '/api/**': {
      middleware: ['auth']
    }
  },
  
  mdi: {
    defaultSize: 22,
  },
  
  modules: [
    'nuxt-mdi',
    'nuxt-quasar-ui',
    '@prisma/nuxt',
    '@pinia/nuxt',
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  quasar: {
    plugins: ['Notify', 'Dialog', 'Dark'],
    cssAddon: true,
    // iconSet: 'material-symbols-rounded',
    config: {
      notify: {
        position: 'top-right',
        progress: true,
      },
    },
    sassVariables: '@/assets/css/quasar-variables.scss',

    // components: {
    //   defaults: {
    //     QInput: {
    //       dense: true,
    //       outlined: true,
    //     }
    //   }
    // },
    // sassVariables: ''
  },
})