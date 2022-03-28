import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from '@/views/MainPage.vue'
import Emulate from '@/views/Emulate.vue'

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
    }
]

const router = new VueRouter({
    routes
})
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') return next()
//     // 获取token,查看是否登录
//     else{
//         if(!sessionStorage.getItem("userInfo")){
//             return next('/login')
//         }
//     }
//     next()
// })
export default router