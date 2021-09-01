import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Inquiry from '../views/Inquiry.vue'
import Add from '../views/Add.vue'
import Events from '../views/Events.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/inquiry',
        name: 'Inquiry',
        component: Inquiry
    },
    {
        path: '/add',
        name: 'Add',
        component: Add
    },
    {
        path: '/events',
        name: 'Events',
        component: Events
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (to.hash) {
            return  {
   
                      el: to.hash,
                      behavior: 'smooth',
                    }
              
            } else {
          return {left: 0, top: 0, behavior: 'smooth'}
        }
    
    }
})

export default router

