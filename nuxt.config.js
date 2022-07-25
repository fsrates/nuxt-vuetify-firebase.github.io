require('dotenv');
const colors = require('vuetify/es5/util/colors').default;

module.exports = {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  publicRuntimeConfig: {
    apiKey: 'AIzaSyB2WDp0suSTCLXGlVoI8Mreo3YSZYVrWmg',
    authDomain: 'fs-exchange.firebaseapp.com',
    databaseURL: 'https://fs-exchange-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'fs-exchange',
    storageBucket: 'fs-exchange.appspot.com',
    messagingSenderId: '632523912329',
    appId: '1:632523912329:web:32012615c76e1996328258',
    measurementId: 'G-PBZ617DDY4'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt-vuetify-firebase.github.io',
    title: 'nuxt-vuetify-firebase.github.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { ref: 'stylesheet', href: 'https://materialdesignicons.com/icon' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: './plugins/vuetify.js', ssr: true },
    { src: './plugins/axios.js' },
    { src: './plugins/firebase.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['cookie-universal-nuxt', { parseJSON: false }],
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/firebase'
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyB2WDp0suSTCLXGlVoI8Mreo3YSZYVrWmg',
      authDomain: 'fs-exchange.firebaseapp.com',
      databaseURL: 'https://fs-exchange-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'fs-exchange',
      storageBucket: 'fs-exchange.appspot.com',
      messagingSenderId: '632523912329',
      appId: '1:632523912329:web:32012615c76e1996328258',
      measurementId: 'G-PBZ617DDY4'
    },
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged'
        },
        ssr: {
          // retrieved credentials from GOOGLE_APPLICATION_CREDENTIALS env variable
          // C:\Users\Chonthicha Yaver\Downloads
          credential: process.env.GOOGLE_APPLICATION_CREDENTIALS
        }
      },
      database: true,
      storage: true,
      messaging: true
    },
    onFirebaseHosting: false
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.baseURL || 'http://localhost:3000'
  },

  env: {
    GOOGLE_APPLICATION_CREDENTIALS: './assets/service-account.json',
    authUrl: process.env.AUTH_URL || 'https://fs-exchange.firebaseapp.com',
    baseURL: process.env.baseURL || 'http://localhost:3000'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    },
    workbox: {
      importScripts: [
        '/firebase-auth-sw.js',
        '/sw.js'
      ]
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {}
  }
};
