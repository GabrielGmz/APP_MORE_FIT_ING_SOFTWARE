<template>
  <div class="view_verif">

  <div class="verificacion-container">
    <h2>VERIFICACIÓN DE CORREO</h2>
    <button :disabled="botonDeshabilitado" @click="enviarVerificacion">
      {{ botonDeshabilitado ? `Reenviar en ${contador}s` : 'ENVIAR CORREO' }}
    </button>
    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    <button @click="$router.push('/login')">VOLVER AL LOGIN</button>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sendEmailVerification, getAuth } from 'firebase/auth'

const mensaje = ref('')
const botonDeshabilitado = ref(false)
const contador = ref(0)
const auth = getAuth()
const user = auth.currentUser

async function enviarVerificacion() {
  try {
    await sendEmailVerification(user)
    mensaje.value = 'Correo de verificación enviado. Revisa tu bandeja de entrada. Una vez verificado, podrás iniciar sesión.'
    
    botonDeshabilitado.value = true
    contador.value = 90
    const interval = setInterval(() => {
      contador.value--
      if (contador.value <= 0) {
        clearInterval(interval)
        botonDeshabilitado.value = false
      }
    }, 1000)
  } catch (error) {
    mensaje.value = 'Error al enviar el correo de verificación.'
  }
}
</script>

<style scoped>
.view_verif {
  background-image: url('@/assets/Fondo_Gym.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.verificacion-container {
  max-width: 260px;
  margin: 80px auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #ffffff40;
  color: white;
  height: auto;
  backdrop-filter: blur(2px);
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: bold;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  font-weight: bold;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

button:hover:enabled {
  background-color: #0056b3;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.mensaje {
  margin-top: 1.5rem;
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-align: center;
}
</style>
