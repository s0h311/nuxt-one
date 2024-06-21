export default defineNuxtConfig({
  modules: ['@sidebase/nuxt-auth'],
  devtools: { enabled: true },
  auth: {
    provider: {
      type: 'authjs',
    },
  },
  runtimeConfig: {
    databaseConnectionString: '',
    auth: {
      secret: '',
      github: {
        clientId: '',
        clientSecret: '',
      },
      google: {
        clientId: '',
        clientSecret: '',
      },
    },
  },
})
