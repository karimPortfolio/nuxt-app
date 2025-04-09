import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: [
    '@/assets/css/main.css',
  ],

  
  mdi: {
    defaultSize: 22,
  },
  
  modules: ['nuxt-mdi', 'nuxt-quasar-ui', '@prisma/nuxt'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})