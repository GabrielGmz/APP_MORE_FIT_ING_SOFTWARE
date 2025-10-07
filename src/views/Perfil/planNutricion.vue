<template>
    <div class="container">
        <button @click="router.back()" class="btn-back">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 489 628"><path fill="" d="M489 65v563L0 347z"/></svg>
      </button>
        <div class="form-container">
        <h2>PLAN DE NUTRICION</h2>
        <div class="btn_nutricion">
            <button class="btn_nutricion_item" @click="planN = 'proteinas'" :class="{ activo: planN === 'proteinas' }">
                <span>🥩</span> PROTEINAS <br> UNA DIETA RICA EN PROTEINAS DE ALTA CALIDAD  
            </button>
            <button class="btn_nutricion_item" @click="planN = 'grasa_fibra'" :class="{ activo: planN === 'grasa_fibra' }">
                <span>🥑</span> GRASAS Y FIBRAS <br> ALIMENTOS NUTRITIVOS Y CONTROLANDO LAS PORCIONES
            </button>
            <button class="btn_nutricion_item" @click="planN = 'saludable'" :class="{ activo: planN === 'saludable' }">
                <span>🥗</span> ALIMENTACION SALUDABLE Y EQUILIBRADA <br> ASEGURA LA INGESTA DE VITAMINAS Y MINERALES
            </button>
        </div>
        <h4>RECUERDA PEDIR AYUDA A UN ENTRENADOR SI NO TE SIENTES SEGURO DE TU OBJETIVO</h4>
        <div class="btn_nutricion">
            <button class="btn_guardar_nut" @click="guardarPlanN">SIGUIENTE</button>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

const planN = ref('')
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

async function guardarPlanN() {
  const user = auth.currentUser
  if (!user) {
    alert('Debes iniciar sesión.')
    return
  }

  if (!planN.value) {
    alert('Selecciona un plan de nutrición.')
    return
  }

  try {
    const userRef = doc(db, 'usuarios', user.uid)
    await updateDoc(userRef, { planN: planN.value })
    router.push('/Conocimiento')
  } catch (e) {
    if (e.code === 'permission-denied') {
      alert('No tienes permisos para guardar. Revisa las reglas de Firestore.')
    } else {
      alert('Error al guardar: ' + (e.message || e))
    }
  }
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
.form-container {
    width: 100%;
    max-width: 300px;
    margin: 80px auto;
    padding: 2rem;
    border-radius: 8px;
    background-color: #ffffff40;
    color: white;
    height: auto;
    backdrop-filter: blur(2px);
}
h2, h4 {
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}
.btn_nutricion {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
}
.btn_nutricion_item {
    width: 100%;
    height: 100px;
    padding: 0.7rem;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 23px;
    font-size: 14px;
    display: flex;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    text-align: center;
    align-items: center;
}
.btn_nutricion_item span {
    font-size: 30px;
    vertical-align: middle;
    margin-right: 10px;
    align-content: center;
}
.btn_nutricion_item.activo {
    background-color: #ff5722;
    color: white;
}
.btn_nutricion_item:hover {
    background-color: #ff5722;
    color: white;
}
.btn_guardar_nut {
    width: 100%;
    height: 50px;
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
.btn_guardar_nut:hover {
    background-color: #000000;
    color: white;
}
.btn-back {
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.btn-back svg {
    fill: white;
    width: 36px;
    height: 36px;
    transition: fill 0.3s ease;
  }
.btn-back:hover svg {
    fill: #008CFF;
}
</style>