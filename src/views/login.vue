<template>
  <div class="viewlogin">
    <h1> + FIT </h1>
    <div class="login-container">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">CORREO ELECTRONICO</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">CONTRASEÑA</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <p class="recovery-link">
          ¿OLVIDASTE TU CONTRASEÑA?
          <router-link to="/recuperacion">RECUPERAR</router-link>
        </p>
        <button type="submit">INICIAR SESIÓN</button>
        <p v-if="error" class="error">{{ error }}</p>
        <p class="register-link">
          ¿NO POSEES UNA CUENTA?
          <router-link to="/signup">REGISTRARSE</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()

const login = async () => {
  try {
    error.value = null
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    if (!user.emailVerified) {
      error.value = 'Debes verificar tu correo electrónico antes de iniciar sesión.'
      return
    }

    alert('Inicio de sesión exitoso ✅')
    router.push('./perfil')
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      error.value = 'Usuario no encontrado'
    } else if (err.code === 'auth/wrong-password') {
      error.value = 'Contraseña incorrecta'
    } else {
      error.value = 'Error: ' + err.message
    }
  }
}
</script>



<style scoped>
.viewlogin {
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

.login-container {
    max-width: 260px;
    margin: 80px auto;
    padding: 2rem;
    border-radius: 8px;
    background-color: #ffffff40;
    color: white;
    height: auto;
    backdrop-filter: blur(2px);
}
h1 {
    text-align: center;
    font-size: 55px;
    color: #008CFF;
    font-weight: 900;
    padding-top: 60px;
}
.form-group {
    margin-top: 35px;
}
label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 15px;
}
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
    border-radius: 23px;
    background-color: #D9D9D9;
    border: 1px solid #ccc;
    font-size: 1rem;
}
button {
    width: 100%;
    padding: 0.7rem;
    background-color: #000000;
    color: #fff;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 20px;
    max-width: 170px;
    margin: 0 auto;
    transition: background 0.3s ease;
    font-weight: bold;
    font-size: 15px;
    justify-content: center;
    display: flex;
}
button:hover {
    background: #008CFF;
}
.error {
    color: #ff0000;
    margin-top: 1rem;
    text-align: center;
}

.recovery-link {
    text-align: right;
    font-size: 12px;
    font-weight: bold;
}

.recovery-link > a {
    color: #008CFF;
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: bold;
}

.recovery-link > a:hover {
    color: #000000;
}

.register-link {
    margin-top: 1rem;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
}

.register-link > a {
    color: #008CFF;
    text-decoration: none;
    transition: all 0.3s ease;
    font-weight: bold;
}

.register-link > a:hover {
    color: #000000;
}
</style>