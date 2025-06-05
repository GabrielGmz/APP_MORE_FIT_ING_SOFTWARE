<template>
    <div class="container">
        <div class="form-container">
        <h2>CUAL ES TU OBJETIVO</h2>
        <div class="btn_objetivo">
            <button class="btn_objetivo_item" @click="objetivo = 'ganancia muscular'" :class="{ activo: objetivo === 'ganancia muscular' }">
                <span>💪</span> GANANCIA MUSCULAR
            </button>
            <button class="btn_objetivo_item" @click="objetivo = 'perdida de grasa'" :class="{ activo: objetivo === 'perdida de grasa' }">
                <span>🔥</span> PERDIDA DE GRASA
            </button>
            <button class="btn_objetivo_item" @click="objetivo = 'mantenerte en forma'" :class="{ activo: objetivo === 'mantenerte en forma' }">
                <span>🏃‍♂️</span> MANTENERTE EN FORMA
            </button>
            <button class="btn_objetivo_item" @click="objetivo = 'mejorar rendimiento'" :class="{ activo: objetivo === 'mejorar rendimiento' }">
                <span>⚡</span> MEJORAR RENDIMIENTO
            </button>
        </div>
        <div class="btn_objetivo">
            <button class="btn_guardar_obj" @click="guardarObjetivo">SIGUIENTE</button>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { db, auth } from '@/firebase'
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const objetivo = ref('')
const userId = ref('')

onAuthStateChanged(auth, (user) => {
  if (user) {
    userId.value = user.uid

    const docRef = doc(db, 'usuarios', user.uid)
    onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data()
        if (data.objetivo) {
          objetivo.value = data.objetivo
        }
      }
    })
  } else {
    alert('Usuario no autenticado')
  }
})

async function guardarObjetivo() {
  if (!userId.value) {
    alert('No se detectó usuario')
    return
  }

  try {
    const refUsuario = doc(db, 'usuarios', userId.value)
    await updateDoc(refUsuario, { objetivo: objetivo.value })
    alert('Objetivo guardado exitosamente')

  } catch (error) {
    console.error('Error al guardar objetivo:', error)
    alert('Error al guardar el objetivo')
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
    background-image: url("@/assets/Fondo_Gym.jpeg");
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
h2 {
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}
.btn_objetivo {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
}
.btn_objetivo_item {
    width: 100%;
    height: 100px;
    padding: 0.7rem;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 23px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
}
.btn_objetivo_item span {
    font-size: 35px;
    margin-right: 30px;
    vertical-align: middle;
    display: inline-block;
    
}
.btn_objetivo_item.activo {
    background-color: #008CFF;
    color: white;
}
.btn_objetivo_item:hover {
    background-color: #008CFF;
    color: white;
}
.btn_objetivo_item:active {
    transform: scale(0.98);
}
.btn_objetivo_item:focus {
    outline: none;
}
.btn_objetivo_item:focus-visible {
    outline: 2px solid #008CFF;
    outline-offset: 2px;
}

.btn_guardar_obj {
    width: 100%;
    padding: 0.7rem;
    background-color: #008CFF;
    color: #fff;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 20px;
    max-width: 170px;
    margin: 0 auto;
    transition: background 0.3s ease;
    font-weight: bold;
}
.btn_guardar_obj:hover {
    background: #000000;
}
</style>