import Vue from "vue"
import Dashboard from "./views/dashboard";
import Login from "./views/login"
import Loading from "./views/loading"
import Register from "./views/register"
import VueRouter from 'vue-router'
import fs from './services/firebase_service';
fs.init = false;
const auth = (next) => {

    if (fs.init == false) {
        fs.onInit(() => {
            vr.replace("/");
        })
        next("/loading");
    } else {
        if (fs.getCurrentUser() == null) next("/login");
        else next();
    }


}

const routes = [{
        path: '/',
        component: Dashboard,
        beforeEnter: (to, from, next) => auth(next)
    },
    {
        path: '/dash/:id',
        component: Dashboard,
        beforeEnter: (to, from, next) => auth(next)
    },
    {
        path: '/login',
        component: Login,
        //beforeEnter: (to, from, next) => auth(next)
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/loading',
        component: Loading,
        //beforeEnter: (to, from, next) => auth(next)
    },
];
var vr = new VueRouter({
    mode: 'history',
    routes
});


export default vr;