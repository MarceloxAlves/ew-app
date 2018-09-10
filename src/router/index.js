import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CriarConta from '@/components/CriarConta'
import Login from '@/components/Login'
import Painel from '@/components/Painel'
import Salas from '@/components/Salas'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home',  component: Home },
    { path: '/account', name: 'CriarConta',  component: CriarConta },
    { path: '/login', name: 'Login',  component: Login },
    { path: '/painel', name: 'Painel',  component: Painel },
    { path: '/salas', name: 'Salas',  component: Salas }
  ]
})
