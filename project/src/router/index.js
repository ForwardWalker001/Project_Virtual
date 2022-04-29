import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from '@/views/MainPage.vue'
import Emulate from '@/views/Emulate.vue'
import ScoreMang from '@/views/ScoreMang.vue'

import { getStorage } from '../util/StorageMan'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',     // 实验介绍页面
        name : 'index',
        component: MainPage
    },
    {
        path: '/webGlpage',  // 风电模型路由
        name: 'webGlpage',
        component: Emulate
    },
    {
        path: '/ScoreMang',
        name: 'ScoreMang',
        component: ScoreMang
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/index') return next()
    // 查看是否登录
    const loginUser = getStorage('userInfo')
    if ( !loginUser ) return next('/index')
    next()
})
export default router