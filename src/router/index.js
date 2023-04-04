import { createRouter, createWebHistory } from 'vue-router'
import Auth from "../components/Auth.vue" 
import AppLogin from "../components/AppLogin.vue";
import AppRegister from "../components/AppRegister.vue";
import User from "../components/User.vue"
import Home from "../components/Home.vue"
import About from "../components/About.vue"
import store from '../store/index';


const routes = [
  { 
    path: '/login', 
    name: 'auth', 
    component: Auth, 
    children: [
      { 
        path: ':', 
        name: 'login', 
        component: AppLogin,
      },
      { 
        path: '/register', 
        name: 'register', 
        component: AppRegister,
      },
    ]
  },
  { 
    path: '/', 
    name: 'user', 
    component: User, 
    children: [
      {
        path: ':', 
        name: 'home', 
        component: Home,
      },
      {
        path: '/about', 
        name: 'about', 
        component: About
      },
    ],
    beforeEnter(to, from, next){
      if(store.getters.isAuthentication){
        next() 
      }else{
        next({name: 'login'})
      }
    },
  },
  { path: '/:pathMatch(.*)*', redirect: "/"}
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
