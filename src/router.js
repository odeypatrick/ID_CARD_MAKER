import { createRouter, createWebHistory } from "vue-router"
// Routes
import Dashboard from './routes/dashboard/Dashboard'
import NewCard from './routes/card/NewCard'
import History from './routes/history/History'
import Settings from './routes/settings/Setting'
import Login from './routes/auth/Login'
import Edit from './routes/dashboard/components/Edit'
import store from './store/store'

const routes = [
    {
        path: '/',
        name: "home",
        component: Dashboard,
        beforeEnter(to, from, next) {
            if(store.state.token){
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/login',
        name: "login",
        component: Login,
        beforeEnter(to, from, next) {
            if(!store.state.token){
                next()
            } else {
                next('/')
            }
        }
    },
    {
        path: '/edit/:id',
        name: "edit",
        component: Edit,
        beforeEnter(to, from, next) {
            if(store.state.token){
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/newcard',
        name: "newcard",
        component: NewCard,
        beforeEnter(to, from, next) {
            if(store.state.token){
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/history',
        name: "history",
        component: History,
        beforeEnter(to, from, next) {
            if(store.state.token){
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/settings',
        name: "settings",
        component: Settings,
        beforeEnter(to, from, next) {
            if(store.state.token){
                next()
            } else {
                next('/login')
            }
        }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(),
    
})

export default router;