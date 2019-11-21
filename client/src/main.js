import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp, faArrowDown, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

library.add(faArrowUp)
library.add(faArrowDown)
library.add(faPen)
library.add(faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueQuillEditor /* { default global options } */)
Vue.use(VueSweetalert2)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
