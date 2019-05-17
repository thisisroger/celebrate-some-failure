import Vue from 'vue'
import VuePlyr from 'vue-plyr'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAmazon, faItunesNote, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faInfoCircle, faSignOutAlt, faArrowAltCircleUp, faArrowAltCircleLeft, faSearch, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as resources from './resources'
import resource from './plugins/resource'
import deviceQueries from './plugins/device-queries'
import Pace from 'pace-progress'
import VueLocalStorage from 'vue-localstorage'
import VueAnalytics from 'vue-analytics'

library.add(faAmazon, faItunesNote, faYoutube, faInfoCircle, faSignOutAlt, faArrowAltCircleUp, faArrowAltCircleLeft, faSearch, faWindowClose)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueLocalStorage)

Vue.use(resource, {
  resources,
  endpoint: '/static/api'
})

Vue.use(VueAnalytics, {
  id: 'UA-140388051-1',
  checkDuplicatedScript: true
})

Vue.use(VuePlyr)

Vue.use(deviceQueries, {
  phone: 'max-width: 567px',
  tablet: 'min-width: 568px',
  mobile: 'max-width: 1024px',
  laptop: 'min-width: 1025px',
  desktop: 'min-width: 1280px',
  monitor: 'min-width: 1448px'
})

new Vue({
  router,
  render: h => h(App),
  mounted() {
    Pace.start()
    Pace.on('hide', () => {
      document.dispatchEvent(new Event('app.rendered'));
    })
  }
}).$mount('#app')
