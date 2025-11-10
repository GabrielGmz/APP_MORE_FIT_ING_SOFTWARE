import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import LoginView from "../views/Auth/login.vue";
import Signup from "@/views/Auth/signup.vue";
import recuperacion from "@/views/Auth/recuperacion.vue";
import Verificacion from "@/views/Auth/verificacion.vue";
import Completar_P from "@/views/Perfil/Completar_P.vue";
import Objetivos from "@/views/Perfil/objetivos.vue";
import PlanNutricion from "@/views/Perfil/planNutricion.vue";
import Conocimiento from "@/views/Perfil/Conocimiento.vue";
import GenerarRutina from "@/views/Perfil/GenerarRutina.vue";
import PlanCompleto from "@/views/Perfil/PlanCompleto.vue";
import Entrenamiento from "@/views/Perfil/Entrenamiento.vue";
import DiaPecho from "@/views/Perfil/DiaPecho.vue";
import PantallaPrincipal from "@/views/Principal/Admin/PantallaPrincipal.vue";
import Perfil_U from "@/views/Perfil/Perfil_U.vue";
import A_Rutina from "@/views/Principal/Entrenador/A_Rutina.vue";
import Rutina_view from "@/views/Principal/Cliente/Rutina_view.vue";
import P_Banca from "@/views/Principal/Ejercicios/P_Banca.vue";
import P_Banca_Plana from "@/views/Principal/Ejercicios/P_Banca_Plana.vue";
import A_Mancuernas from "@/views/Principal/Ejercicios/A_Mancuernas.vue";
import Dominadas from "@/views/Principal/Ejercicios/Dominadas.vue";
import Gestion_P from "@/views/Pago/Admin/Gestion_P.vue";
import Membresias from "@/views/Pago/Admin/Membresias.vue";
import Configuracion from "@/views/Principal/Admin/Configuracion.vue";
import Gestion_U from "@/views/Principal/Admin/Gestion_U.vue";
import V_Perfil_U from "@/views/Perfil/V_Perfil_U.vue";
import Informacion_C from "@/views/Perfil/Informacion_C.vue";
import Notificaciones from "@/views/Perfil/Notificaciones.vue";
import A_P_Nutricion from "@/views/Principal/Entrenador/A_P_Nutricion.vue";
import G_Usuarios from "@/views/Principal/Entrenador/G_Usuarios.vue";
import P_P_Entrenador from "@/views/Principal/Entrenador/P_P_Entrenador.vue";
import P_Principal_C from "@/views/Principal/Cliente/P_Principal_C.vue";
import Ver_Progreso from "@/views/Principal/Entrenador/Ver_Progreso.vue";
import Rutinas_C from "@/views/Principal/Cliente/Rutinas_C.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/signup", name: "Signup", component: Signup },
  {
    path: "/verificacion",
    name: "VerificacionCorreo",
    component: Verificacion,
  },
  { path: "/recuperacion", name: "Recuperacion", component: recuperacion },
  { path: "/Completar_P", name: "CompletarPerfil", component: Completar_P },
  {
    path: "/pantallaPrincipal",
    name: "PantallaPrincipal",
    component: PantallaPrincipal,
  },
  { path: "/Gestion_U", name: "Gestion_U", component: Gestion_U },
  { path: "/Perfil_U", name: "Perfil_U", component: Perfil_U },
  { path: "/V_Perfil_U/:uid", name: "V_Perfil_U", component: V_Perfil_U },
  {
    path: "/rutinas/:uid",
    name: "Rutinas",
    component: () => import("@/views/Principal/Entrenador/Rutinas.vue"),
  },
  { path: "/Rutina_view", name: "Rutina_view", component: Rutina_view },
  { path: "/P_Banca", name: "P_Banca", component: P_Banca },
  { path: "/P_Banca_Plana", name: "P_Banca_Plana", component: P_Banca_Plana },
  { path: "/A_Mancuernas", name: "A_Mancuernas", component: A_Mancuernas },
  { path: "/Dominadas", name: "Dominadas", component: Dominadas },
  { path: "/objetivos", name: "Objetivos", component: Objetivos },
  { path: "/planNutricion", name: "planNutricion", component: PlanNutricion },
  { path: "/Conocimiento", name: "Conocimiento", component: Conocimiento },
  { path: "/GenerarRutina", name: "GenerarRutina", component: GenerarRutina },
  { path: "/PlanCompleto", name: "PlanCompleto", component: PlanCompleto },
  { path: "/Entrenamiento", name: "Entrenamiento", component: Entrenamiento },
  { path: "/DiaPecho", name: "DiaPecho", component: DiaPecho },
  { path: "/Gestion_P", name: "Gestion_P", component: Gestion_P },
  { path: "/Membresias", name: "Membresias", component: Membresias },
  { path: "/Configuracion", name: "Configuracion", component: Configuracion },
  { path: "/Informacion_C", name: "Informacion_C", component: Informacion_C },
  {
    path: "/Notificaciones",
    name: "Notificaciones",
    component: Notificaciones,
  },
  {
    path: '/A_P_Nutricion',
    name: 'A_P_Nutricion',
    component: A_P_Nutricion,
  },
  {
    path: "/G_Usuarios",
    name: "G_Usuarios",
    component: G_Usuarios,
  },
  {
    path: "/P_P_Entrenador",
    name: "P_P_Entrenador",
    component: P_P_Entrenador,
  },
  {
    path: "/P_Principal_C",
    name: "P_Principal_C",
    component: P_Principal_C,
  },
  {
    path: "/A_Rutina",
    name: "A_Rutina",
    component: A_Rutina,
  },
  {
    path: "/Ver_Progreso",
    name: "Ver_Progreso",
    component: Ver_Progreso,
  },
  {
    path: "/Rutinas_C",
    name: "Rutinas_C",
    component: Rutinas_C,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
