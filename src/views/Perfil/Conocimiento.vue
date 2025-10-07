<template>
    <div class="container">
        <button @click="router.back()" class="btn-back">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 489 628"><path fill="" d="M489 65v563L0 347z"/></svg>
      </button>
        <div class="form-container">
            <h2>¿CUAL ES TU NIVEL DE 
CONOCIMINETO EN 
EL MUNDO FITNESS?</h2>
            <div class="btn_conocimiento">
            <button class="btn_conocimiento_item" @click="conocimiento = 'principiante'" :class="{ activo: conocimiento === 'principiante' }">
                PRINCIPIANTE <br> <span>⭐</span>
            </button>
            <button class="btn_conocimiento_item" @click="conocimiento = 'intermedio'" :class="{ activo: conocimiento === 'intermedio' }">
                INTERMEDIO <br> <span>⭐⭐</span>
            </button>
            <button class="btn_conocimiento_item" @click="conocimiento = 'avanzado'" :class="{ activo: conocimiento === 'avanzado' }">
                AVANZADO <br> <span>⭐⭐⭐</span>
            </button>
        </div>
        <div class="btn_conocimiento">
            <button class="btn_guardar_con" @click="guardarConocimiento">SIGUIENTE</button>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

const conocimiento = ref('')
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const guardarConocimiento = async () => {
  const user = auth.currentUser
  if (!user) {
    alert('Debes iniciar sesión.')
    return
  }

  if (!conocimiento.value) {
    alert('Selecciona un nivel de conocimiento.')
    return
  }

  try {
    const userRef = doc(db, 'usuarios', user.uid)
    await updateDoc(userRef, { conocimiento: conocimiento.value })
    router.push('/GenerarRutina')
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
h2 {
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}
.btn_conocimiento {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
}
.btn_conocimiento_item {
    width: 100%;
    height: 100px;
    padding: 0.7rem;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 23px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.btn_conocimiento_item span {
    font-size: 20px;
    margin-top: 10px;
}
.btn_conocimiento_item.activo {
    background-color: #4CAF50;
    color: white;
}
.btn_conocimiento_item:hover {
    background-color: #4CAF50;
    color: white;
}
.btn_guardar_con {
    width: 100%;
    height: 50px;
    padding: 0.7rem;
    background-color: #008CFF;
    color: white;
    border: none;
    border-radius: 23px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
}
.btn_guardar_con:hover {
    background-color: #000000;
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