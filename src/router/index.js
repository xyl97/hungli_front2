import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Lgoin from '@/components/emp/Lgoin.vue'

import index from '@/components/emp/Index.vue'
import Home from '@/components/emp/Home.vue'
//
const emp =()=>import('../components/emp/Emp.vue')
const emplist =()=>import('@/components/emp/EmpList.vue')
const empCount =()=>import('../components/emp/EmpCount.vue')
Vue.use(VueRouter)

const routes = [
  {
   path: '/',
   name: 'Login',
   component: Lgoin
 },

  {
    path: '/index',
    name: 'Index',
    component: index,
    children:[
      {
        path:'/',
        name: 'home',
        component:Home
      },
      {
        path:'/emp',
        name: 'emp',
        component:emp,
        children:[{
          path:'emplist',
          name:'emplist',
          component:emplist
        },
          {
            path: 'empCount',
            name: 'empCount',
            component:empCount
          }


       ]
      }
    ]
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Lgoin
  // },



  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  // {
  //   path: '/list',
  //   name: 'StudentList',
  //   component: StudentList
  //
  // },
  // {
  //   path: '/lgoin',
  //   name: 'Login',
  //   component: Lgoin
  //
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
