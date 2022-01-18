import {createRouter, createWebHistory} from 'vue-router'
import { supabase } from "../supabase"
import Dash from '../views/Dash.vue'
import Auth from '../views/Auth.vue'
import Profile from '../views/Profile.vue'
import Inquiry from '../views/Inquiry.vue'
import Add from '../views/Add.vue'
import Events from '../views/Events.vue'
import AddBlog from '../views/AddBlog.vue'
import BlogAdmin from '../views/BlogAdmin.vue'
import BlogEdit from '../views/BlogEdit.vue'
import EventEdit from '../views/EventEdit.vue'
import RepliedTo from '../views/RepliedTo.vue'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dash,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Auth,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }

    },
    {
        path: '/inquiry',
        name: 'Inquiry',
        component: Inquiry,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/add',
        name: 'Add',
        component: Add,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/events',
        name: 'Events',
        component: Events,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/addblog',
        name: 'AddBlog',
        component: AddBlog,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/blogadmin',
        name: 'blogadmin',
        component: BlogAdmin,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/replied',
        name: 'replied',
        component: RepliedTo,
        meta: {
            requiresAuth: true
        }
    },
    { path: '/blogedit/:id', 
      component: BlogEdit,
      meta: {
        requiresAuth: true
    }
    },
    { path: '/eventedit/:id', 
    component: EventEdit,
    meta: {
        requiresAuth: true
    }
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
    
    },
 
})

router.beforeEach((to, from, next) => {
    const currentUser = supabase.auth.user();
    const requiresAuth = to.matched.some
    (record => record.meta.requiresAuth);
    if(requiresAuth && !currentUser) next('login');
    else if(!requiresAuth && currentUser) next("/");
    else next();
  })

export default router

