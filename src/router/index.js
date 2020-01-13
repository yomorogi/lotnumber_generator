import Vue from 'vue'
import VueRouter from 'vue-router'
import Result from '../components/Result.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/top',
    name: 'top',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Top.vue')
  }
]

//オブジェクト生成時にmodeにhistoryを指定する
const router = new VueRouter({
  routes, mode: 'history',
})

export default router
