import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import colors from 'vuetify/es5/util/colors'
import backend from './api/backend'

Vue.config.productionTip = false
Vue.prototype.$backend = backend

Vue.use(Vuetify, {
  iconfont: 'mdi', // 'md' || 'mdi' || 'fa' || 'fa4'
  theme: {
    primary: colors.amber.darken3, // #E53935
    secondary: colors.lime.darken4, // #FFCDD2
    accent: colors.blueGrey.lighten4 // #3F51B5
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
