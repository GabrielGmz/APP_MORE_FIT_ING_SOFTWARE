<template>
  <div class="container">
    <button @click="router.back()" class="btn-back">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 489 628">
        <path fill="" d="M489 65v563L0 347z" />
      </svg>
    </button>
    <div class="form-container">
      <h2>CUAL ES TU OBJETIVO</h2>
      <div class="btn_objetivo">
        <button class="btn_objetivo_item" @click="objetivo = 'ganancia muscular'"
          :class="{ activo: objetivo === 'ganancia muscular' }">
          <span>💪</span> GANANCIA MUSCULAR
        </button>
        <button class="btn_objetivo_item" @click="objetivo = 'perdida de grasa'"
          :class="{ activo: objetivo === 'perdida de grasa' }">
          <span>🔥</span> PERDIDA DE GRASA
        </button>
        <button class="btn_objetivo_item" @click="objetivo = 'mantenerte en forma'"
          :class="{ activo: objetivo === 'mantenerte en forma' }">
          <span>🏃‍♂️</span> MANTENERTE EN FORMA
        </button>
      </div>
      <h4>RECUERDA PEDIR AYUDA A UN ENTRENADOR SI NO TE SIENTES SEGURO DE TU OBJETIVO</h4>
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
import { setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const objetivo = ref('')
const userId = ref('')
const router = useRouter()

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
    await setDoc(refUsuario, { objetivo: objetivo.value }, { merge: true })
    router.push('/planNutricion')
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

h2,
h4 {
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
  display: flex;
  align-items: center;
}

.btn_objetivo_item span {
  font-size: 35px;
  margin-right: 10px;
  vertical-align: middle;
  align-content: center;
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