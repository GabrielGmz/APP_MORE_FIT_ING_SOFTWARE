import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import login from '../views/Auth/login.vue'
import register from '../views/Auth/signup.vue'
import recuperacion from '../views/Auth/recuperacion.vue'
import verificacion from '../views/Auth/verificacion.vue'

import Gestion_P from '../views/Pago/Admin/Gestion_P.vue'
import Membresias from '../views/Pago/Admin/Membresias.vue'
import Membresias_C from '../views/Pago/Cliente/Membresias_C.vue'

import Completar_P from '../views/Perfil/Completar_P.vue'
import Conocimiento from '../views/Perfil/Conocimiento.vue'
import DiaPecho from '../views/Perfil/DiaPecho.vue'
import Entrenamiento from '../views/Perfil/Entrenamiento.vue'
import GenerarRutina from '../views/Perfil/GenerarRutina.vue'
import Informacion_C from '../views/Perfil/Informacion_C.vue'
import Notificaciones from '../views/Perfil/Notificaciones.vue'
import objetivos from '../views/Perfil/objetivos.vue'
import OneSerie from '../views/Perfil/OneSerie.vue'
import Perfil_U_C from '../views/Perfil/Perfil_U_C.vue'
import Perfil_U from '../views/Perfil/Perfil_U.vue'
import PlanCompleto from '../views/Perfil/PlanCompleto.vue'
import planNutricion from '../views/Perfil/planNutricion.vue'
import V_Perfil_U from '../views/Perfil/V_Perfil_U.vue'

import Configuracion from '../views/Principal/Admin/Configuracion.vue'
import Gestion_U from '../views/Principal/Admin/Gestion_U.vue'
import PantallaPrincipal from '../views/Principal/Admin/PantallaPrincipal.vue'

import Configuracion_C from '../views/Principal/Cliente/Configuracion_C.vue'
import P_Principal_C from '../views/Principal/Cliente/P_Principal_C.vue'
import Rutina_view from '../views/Principal/Cliente/Rutina_view.vue'
import Rutinas_C from '../views/Principal/Cliente/Rutinas_C.vue'

import A_Mancuernas from '../views/Principal/Ejercicios/A_Mancuernas.vue'
import Dominadas from '../views/Principal/Ejercicios/Dominadas.vue'
import P_Banca_Plana from '../views/Principal/Ejercicios/P_Banca_Plana.vue'
import P_Banca from '../views/Principal/Ejercicios/P_Banca.vue'

import A_P_Nutricion from '../views/Principal/Entrenador/A_P_Nutricion.vue'
import A_Rutina from '../views/Principal/Entrenador/A_Rutina.vue'
import G_Usuarios from '../views/Principal/Entrenador/G_Usuarios.vue'
import P_P_Entrenador from '../views/Principal/Entrenador/P_P_Entrenador.vue'
import Rutinas from '../views/Principal/Entrenador/Rutinas.vue'
import Ver_Progreso from '../views/Principal/Entrenador/Ver_Progreso.vue'

import Home from '../views/Home.vue'

describe('App.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('login.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(login)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('register.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(register)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('recuperacion.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(recuperacion)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('verificacion.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(verificacion)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Gestion_P.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Gestion_P)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Membresias.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Membresias)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Membresias_C.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Membresias_C)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Completar_P.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Completar_P)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Conocimiento.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Conocimiento)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('DiaPecho.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(DiaPecho)
    expect(wrapper.exists()).toBe(true)
  })
})
describe('Entrenamiento.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Entrenamiento)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('GenerarRutina.vue', () => {
    it('se renderiza correctamente', () => {
        const wrapper = mount(GenerarRutina)
        expect(wrapper.exists()).toBe(true)
    })
})

describe('Informacion_C.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Informacion_C)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Notificaciones.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Notificaciones)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('objetivos.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(objetivos)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('OneSerie.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(OneSerie)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Perfil_U_C.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Perfil_U_C)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Perfil_U.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Perfil_U)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('PlanCompleto.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(PlanCompleto)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('planNutricion.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(planNutricion)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('V_Perfil_U.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(V_Perfil_U)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Configuracion.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Configuracion)
    expect(wrapper.exists()).toBe(true)
  })
})
describe('Gestion_U.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Gestion_U)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('PantallaPrincipal.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(PantallaPrincipal)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Configuracion_C.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Configuracion_C)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('P_Principal_C.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(P_Principal_C)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Rutina_view.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Rutina_view)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Rutinas_C.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Rutinas_C)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('A_Mancuernas.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(A_Mancuernas)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Dominadas.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Dominadas)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('P_Banca_Plana.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(P_Banca_Plana)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('P_Banca.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(P_Banca)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('A_P_Nutricion.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(A_P_Nutricion)
    expect(wrapper.exists()).toBe(true)
  })
})
describe('A_Rutina.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(A_Rutina)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('G_Usuarios.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(G_Usuarios)
    expect(wrapper.exists()).toBe(true)
  })
})
describe('P_P_Entrenador.vue', () => {
    it('se renderiza correctamente', () => {
        const wrapper = mount(P_P_Entrenador)
        expect(wrapper.exists()).toBe(true)
    })
})

describe('Rutinas.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Rutinas)
    expect(wrapper.exists()).toBe(true)
  })
})

describe('Ver_Progreso.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Ver_Progreso)
    expect(wrapper.exists()).toBe(true)
  })
})
describe('Home.vue', () => {
  it('se renderiza correctamente', () => {
    const wrapper = mount(Home)
    expect(wrapper.exists()).toBe(true)
  })
})

