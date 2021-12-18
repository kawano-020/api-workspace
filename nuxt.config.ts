import colors from 'vuetify/es5/util/colors'
import { GithubInfo } from './lib/githubInfo'
const githubInfo = new GithubInfo()
const faviconName = 'favicon.ico'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  target: 'server',

  router: {
    // https://nuxtjs.org/deployments/github-pages/
    base:
      process.env.NODE_ENV === 'production'
        ? `/${githubInfo.repositoryName}/`
        : '',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
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
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          process.env.NODE_ENV === 'production'
            ? `/${githubInfo.repositoryName}/${faviconName}`
            : `/${faviconName}`,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: '@/assets/scss/_base.scss', lang: 'scss' }],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/markdownit'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/repositories',
    '@/plugins/route',
    '@/plugins/stat-image',
    '@/plugins/utils',
  ],

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

  // Markdonwit module configuration
  // https://github.com/nuxt-community/markdownit-module
  markdownit: {
    runtime: true,
  },

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
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
