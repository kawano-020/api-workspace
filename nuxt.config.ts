import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'server',

  router: {
    // https://nuxtjs.org/deployments/github-pages/
    base: process.env.NODE_ENV === 'production' ? '/workspace/' : '',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - WorkSpace',
    title: 'WorkSpace',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://composition-api.nuxtjs.org/getting-started/setup
    '@nuxtjs/composition-api/module',
    // https://github.com/nuxt-community/vuetify-module#setup
    [
      '@nuxtjs/vuetify',
      {
        defaultAssets: {
          font: false,
        },
      },
    ],
  ],

  // Vuetify module configuration
  // https://github.com/nuxt-community/vuetify-module#options
  vuetify: {
    customVariables: [],
    treeShake: true,
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: colors.grey.darken4,
        },
      },
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
