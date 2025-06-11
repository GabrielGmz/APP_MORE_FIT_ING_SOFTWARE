import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/login.vue'
import Signup from '@/views/signup.vue'
import recuperacion from '@/views/Recuperacion/recuperacion.vue'
import P_Espera from '@/views/Recuperacion/P_Espera.vue'
import Nueva_Pass from '@/views/Recuperacion/Nueva_Pass.vue'
import Verificacion from '@/views/Verificacion/verificacion.vue'
import Completar_P from '@/views/Perfil/Completar_P.vue'
import Objetivos from '@/views/Perfil/objetivos.vue'
import PlanNutricion from '@/views/Perfil/planNutricion.vue'
import Conocimiento from '@/views/Perfil/Conocimiento.vue'
import GenerarRutina from '@/views/Perfil/GenerarRutina.vue'
import PlanCompleto from '@/views/Perfil/PlanCompleto.vue'
import Entrenamiento from '@/views/Perfil/Entrenamiento.vue'
import DiaPecho from '@/views/Perfil/DiaPecho.vue'
import PantallaPrincipal from '@/views/Principal/PantallaPrincipal.vue'
import Perfil_U from '@/views/Perfil/Perfil_U.vue'
import Rutinas from '@/views/Principal/Rutinas.vue'
import Rutina_view from '@/views/Principal/Rutina_view.vue'
import P_Banca from '@/views/Principal/Ejercicios/P_Banca.vue'
import P_Banca_Plana from '@/views/Principal/Ejercicios/P_Banca_Plana.vue'
import A_Mancuernas from '@/views/Principal/Ejercicios/A_Mancuernas.vue'
import Dominadas from '@/views/Principal/Ejercicios/Dominadas.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/verificacion', name: 'VerificacionCorreo', component: Verificacion},
  { path: '/recuperacion', name: 'Recuperacion', component: recuperacion },
  { path: '/P_Espera', name: 'P_Espera', component: P_Espera },
  { path: '/Nueva_Pass', name: 'Nueva_Pass', component: Nueva_Pass },
  { path: '/Completar_P', name: 'CompletarPerfil', component: Completar_P },
  { path: '/pantallaPrincipal', name: 'PantallaPrincipal', component: PantallaPrincipal},
  { path: '/Perfil_U', name: 'Perfil_U', component: Perfil_U },
  { path: '/rutinas', name: 'Rutinas', component: Rutinas },
  { path: '/Rutina_view', name: 'Rutina_view', component: Rutina_view },
  { path: '/P_Banca', name: 'P_Banca', component: P_Banca },
  { path: '/P_Banca_Plana', name: 'P_Banca_Plana', component: P_Banca_Plana },
  { path: '/A_Mancuernas', name: 'A_Mancuernas', component: A_Mancuernas },
  { path: '/Dominadas', name: 'Dominadas', component: Dominadas },
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
