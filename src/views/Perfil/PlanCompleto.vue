<template>
    <div class="container">
        <div class="content-container" v-if="!loading">
            <h2>TU PLAN ESTA LISTO</h2>

            <div class="grafica" v-if="plan.graficaUrl">
                <img :src="plan.graficaUrl" alt="Gráfica de progreso" />
            </div>

            <div class="info" v-if="plan.objetivo || plan.planN || plan.conocimiento">
                <h3>OBJETIVO</h3>
                <p>{{ plan.objetivo || '' }}</p>

                <h3>PLAN DE NUTRICION</h3>
                <p>{{ plan.planN || '' }}</p>

                <h3>NIVEL DE EXPERIENCIA</h3>
                <p>{{ plan.conocimiento || '' }}</p>
            </div>

            <div v-else>
                <p>No se encontró un plan disponible.</p>
            </div>
            <div class="btn">
                <button class="btn_comenzar" @click="$router.push('/Entrenamiento')">COMENZAR RETO</button>
            </div>
        </div>

        <div v-else>
            <p>Cargando plan...</p>
        </div>
    </div>
    <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/PantallaPrincipal')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg></button>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { db, auth } from '@/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const userId = ref('')
const loading = ref(true)
const plan = ref({
    objetivo: '',
    planN: '',
    conocimiento: '',
    graficaUrl: ''
})

onAuthStateChanged(auth, (user) => {
    if (user) {
        userId.value = user.uid
        cargarPlan()
    } else {
        loading.value = false
        alert('Usuario no autenticado')
    }
})

function cargarPlan() {
    if (!userId.value) {
        loading.value = false
        return
    }

    const refUsuario = doc(db, 'usuarios', userId.value)

    // Escucha en tiempo real los cambios
    onSnapshot(refUsuario, (docSnap) => {
        loading.value = false

        if (docSnap.exists()) {
            const data = docSnap.data()

            plan.value.objetivo = data.objetivo || ''
            plan.value.planN = data.planN || ''
            plan.value.conocimiento = data.conocimiento || ''
            plan.value.graficaUrl = data.graficaUrl || ''
        } else {
            // No existe documento usuario
            plan.value = { objetivo: '', planN: '', conocimiento: '', graficaUrl: '' }
        }
    }, (error) => {
        loading.value = false
        console.error('Error cargando plan:', error)
    })
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #000a12;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.content-container {
    width: 100%;
    max-width: 300px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: 80px auto;
    padding: 2rem;
    color: white;
    height: auto;
}

h2 {
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
}

.grafica {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 23px;
    background-color: beige;
}

.grafica img {
    width: 100%;
    border-radius: 23px;
    height: 200px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
}

.info {
    text-align: center;
    margin-top: 20px;
    border-radius: 23px;
    background-color: rgba(0, 0, 0, 0.581);
    padding: 1.5rem;
    box-shadow: 0 4px 8px rgb(0, 0, 0);
    height: auto;
    justify-items: center;
    align-content: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-transform: uppercase;
    backdrop-filter: blur(2px);
}

h3 {
    font-weight: bold;
    margin-bottom: 0.5rem;
}

p {
    margin: 0;
    font-size: 1.2rem;
    color: #f0f0f0;
}
.btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.btn_comenzar {
    width: 100%;
    padding: 0.7rem;
    background-color: #008CFF;
    color: white;
    border: none;
    border-radius: 23px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
}
.btn_comenzar:hover {
    background-color: #000000;
    color: white;
}
.bottom-nav {
  background-color: rgba(35, 35, 35, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  position: sticky;
  bottom: 0;
  left: 0;
    width: 100%;
  max-width: 470px;
    margin: 0 auto;
}

.nav-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.nav-btn:hover {
  color: #008CFF;
}
.nav-btn svg {
  width: 34px;
  height: 34px;
}
.nav-btn svg path {
  fill: currentColor;
}
.nav-btn.active {
  color: #008CFF;
}
.nav-btn.active svg path {
  fill: #008CFF;
}
</style>