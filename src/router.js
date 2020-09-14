import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router); //Зарегистрировать как плагин

export default new Router({
    mode: 'history', //для того чтобы у нас были обычные слеши в петях
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/todos',
            component: () => import('./views/Todos') //lazyloading
        }
    ]
})