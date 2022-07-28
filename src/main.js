import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import MSDialogNoitice from './components/base/MSDialogNoitice.vue'
import MSLoading from './components/base/MSLoading.vue'

import quasarUserOptions from './quasar-user-options'
import axios from 'axios'

createApp(App).component('MSDialogNoitice',MSDialogNoitice).component('MSLoading',MSLoading).use(Quasar, quasarUserOptions).use(store).use(router,axios).mount('#app')
