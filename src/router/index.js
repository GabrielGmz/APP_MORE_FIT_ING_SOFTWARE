import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/login.vue'
import Signup from '@/views/signup.vue'
import recuperacion from '@/views/Recuperacion/recuperacion.vue'
import Verificacion from '@/views/Verificacion/verificacion.vue'
import perfil from '@/views/Perfil/perfil.vue'
import Objetivos from '@/views/Perfil/objetivos.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/verificacion', name: 'VerificacionCorreo', component: Verificacion},
  { path: '/recuperacion', name: 'Recuperacion', component: recuperacion },
  { path: '/perfil', name: 'Perfil', component: perfil },
  { path: '/objetivos', name: 'Objetivos', component: Objetivos}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
