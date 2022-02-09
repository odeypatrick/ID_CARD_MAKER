import { createRouter, createWebHistory } from "vue-router"
// Routes
import Dashboard from './routes/dashboard/Dashboard'
import NewCard from './routes/card/NewCard'
import History from './routes/history/History'
import Settings from './routes/settings/Setting'
import Login from './routes/auth/Login'
import Edit from './routes/dashboard/components/Edit'
import EditVendor from './routes/dashboard/components/EditVendor'
import EditVisitor from './routes/dashboard/components/EditVisitor'
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
        path: '/editvisitor/:id',
        name: "editvisitor",
        component: EditVisitor,
        beforeEnter(to, from, next) {
            if(store.state.token){
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/editvendor/:id',
        name: "editvendor",
        component: EditVendor,
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