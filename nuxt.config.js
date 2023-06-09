export default {
  ssr: true,
  head: {
    title: 'test-task',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [

  ],
  plugins: [

  ],
  components: true,
  buildModules: [

  ],
  modules: [
    '@nuxtjs/axios'
  ],
  build: {

  },
  axios: {
    baseURL: 'https://api.quwi.com/v2'
  },
}