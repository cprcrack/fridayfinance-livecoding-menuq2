// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  telemetry: false,

  modules: ['@vueuse/nuxt'],

  css: ['~/assets/css/tailwind.css', '~/assets/css/index.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
