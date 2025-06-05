<template>
  <div class="view_signup">
    <h1> + FIT </h1>
    <div class="signup-container">
      <h2>REGÍSTRATE CON NOSOTROS</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form_group">
          <label for="username">NOMBRE:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form_group">
          <label for="email">CORREO:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form_group">
          <label for="password">CONTRASEÑA:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <p class="login-link">
          ¿YA TIENES UNA CUENTA?
          <router-link to="/login">INICIAR SESIÓN</router-link>
        </p>
        <button type="submit">CREAR CUENTA</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

const username = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const handleSubmit = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    await addDoc(collection(db, 'usuarios'), {
      uid: user.uid,
      nombre: username.value,
      email: email.value,
      creado: new Date()
    })
    router.push('/verificacion')

    username.value = ''
    email.value = ''
    password.value = ''
  } catch (error) {
    alert('Error al registrar: ' + error.message)
  }
}
</script>




<style scoped>
.view_signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url('@/assets/Fondo_Gym.jpeg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.signup-container {
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

h2 {
    text-align: center;
    font-weight: bold;
}

.form_group {
    margin-top: 30px;
}
label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 15px;
}
input[type="text"],
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
.login-link {
    text-align: right;
    margin-top: 10px;
    font-size: 12px;
    font-weight: bold;
}
.login-link > a {
    color: #008CFF;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
}
.login-link a:hover {
    color: #000000;
}
</style>