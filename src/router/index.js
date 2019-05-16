import Vue from 'vue'
import Router from 'vue-router'
import Series from '../components'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'feed',
    component: Series
  },
  {
    path: '/episode/:episode',
    name: 'episode',
    props: true,
    component: Series
  },
  {
    path: '/by/:guest',
    name: 'guest',
    props: true,
    component: Series
  }]
})
