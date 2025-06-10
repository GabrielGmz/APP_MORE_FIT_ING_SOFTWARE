import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/login.vue'
import Signup from '@/views/signup.vue'
import recuperacion from '@/views/Recuperacion/recuperacion.vue'
import Verificacion from '@/views/Verificacion/verificacion.vue'
import perfil from '@/views/Perfil/perfil.vue'
import Objetivos from '@/views/Perfil/objetivos.vue'
import PlanNutricion from '@/views/Perfil/planNutricion.vue'
import Conocimiento from '@/views/Perfil/Conocimiento.vue'
import GenerarRutina from '@/views/Perfil/GenerarRutina.vue'
import PlanCompleto from '@/views/Perfil/PlanCompleto.vue'
import Entrenamiento from '@/views/Perfil/Entrenamiento.vue'
import DiaPecho from '@/views/Perfil/DiaPecho.vue'
import PantallaPrincipal from '@/views/Principal/PantallaPrincipal.vue'
import Rutinas from '@/views/Principal/Rutinas.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/verificacion', name: 'VerificacionCorreo', component: Verificacion},
  { path: '/recuperacion', name: 'Recuperacion', component: recuperacion },
  { path: '/perfil', name: 'Perfil', component: perfil },
  {path: '/pantallaPrincipal', name: 'PantallaPrincipal', component: PantallaPrincipal},
  { path: '/rutinas', name: 'Rutinas', component: Rutinas },
  { path: '/objetivos', name: 'Objetivos', component: Objetivos},
  { path: '/planNutricion', name: 'planNutricion', component: PlanNutricion},
  { path: '/Conocimiento', name: 'Conocimiento', component: Conocimiento },
  { path: '/GenerarRutina', name: 'GenerarRutina', component: GenerarRutina },
  { path: '/PlanCompleto', name: 'PlanCompleto', component: PlanCompleto },
  { path: '/Entrenamiento', name: 'Entrenamiento', component: Entrenamiento },
  { path: '/DiaPecho', name: 'DiaPecho', component: DiaPecho }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
