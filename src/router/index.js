import Vue from 'vue'
import VueRouter from 'vue-router'
import GeneralLayout from '../layout/GeneralLayout.vue'
import pages from './pages'


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: GeneralLayout,
    redirect: "/tcp",
    children: [
      ...pages,
    ]
  },
  {
    path: '*',
    redirect: 'tcp',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
