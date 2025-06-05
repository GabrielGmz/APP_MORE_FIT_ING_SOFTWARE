<template>
  <div class="view_perfil">
    <div class="perfil-container">
      <h2>COMPLETA TU PERFIL</h2>
      <form class="perfil-form" @submit.prevent="guardarPerfil">
        <!-- Vista previa -->
        <div class="imagen-perfil">
          <div class="icono-perfil">
            <img v-if="imagenUrl" :src="imagenUrl" alt="Perfil" style="width: 100px; height: 100px; border-radius: 9999px;" />
          </div>
          <label class="input-imagen">
            <input type="file" accept="image/*" @change="handleFileChange" />
            <span class="icono-camara"></span>
          </label>
        </div>

        <div class="form-group">
          <input type="text" placeholder="NOMBRE" v-model="nombre" />
        </div>
        <div class="form-group">
          <input type="text" placeholder="APELLIDO" v-model="apellido" />
        </div>
        <div class="form-group">
          <input type="number" placeholder="EDAD" min="0" v-model="edad" />
        </div>
        <div class="form-group sexo">
          <div class="sexo-botones">
            <button type="button" class="sexo-btn" @click="seleccionarSexo('masculino')" :class="{ activo: sexo === 'masculino' }">👨</button>
            <button type="button" class="sexo-btn" @click="seleccionarSexo('femenino')" :class="{ activo: sexo === 'femenino' }">👩</button>
          </div>
        </div>
        <div class="form-group">
          <input type="number" placeholder="ALTURA" min="0" v-model="altura" />
        </div>
        <div class="form-group">
          <input type="number" placeholder="PESO" min="0" v-model="peso" />
        </div>
        <button type="submit">SIGUIENTE</button>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { db, auth } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const nombre = ref('')
const apellido = ref('')
const edad = ref('')
const altura = ref('')
const peso = ref('')
const sexo = ref('')
const imagenUrl = ref('')
const userId = ref('')

onAuthStateChanged(auth, (user) => {
  if (user) {
    userId.value = user.uid
  } else {
    alert('Usuario no autenticado')
  }
})

function seleccionarSexo(valor) {
  sexo.value = valor
}


function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    imagenUrl.value = URL.createObjectURL(file)
  }
}


async function guardarPerfil() {
  if (!userId.value) {
    alert('No se detectó usuario')
    return
  }

  const perfil = {
    nombre: nombre.value,
    apellido: apellido.value,
    edad: parseInt(edad.value),
    altura: parseInt(altura.value),
    peso: parseInt(peso.value),
    sexo: sexo.value,
    imagen: imagenUrl.value
  }

  try {
    await setDoc(doc(db, 'usuarios', userId.value), perfil)
    alert('Perfil guardado exitosamente')
    this.$router.push('./objetivos')
  } catch (error) {
    console.error('Error al guardar el perfil:', error)
    alert('Error al guardar perfil')
  }
}
</script>




<style scoped>
.view_perfil {
  background-image: url('@/assets/Fondo_Gym.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.perfil-container {
  width: 100%;
  max-width: 300px;
  padding: 2rem;
  border-radius: 20px;
  background-color:#ffffff40;
  color: white;
  backdrop-filter: blur(2px);
  text-align: center;
  justify-content: center;
}

h2 {
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

.imagen-perfil {
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.icono-perfil {
  width: 100px;
  height: 100px;
  border-radius: 9999px;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  background-image: url('https://img.icons8.com/?size=100&id=98957&format=png&color=000000');
}

.input-imagen {
  position: absolute;
  bottom: 0;
  right: 30%;
  cursor: pointer;
}

.input-imagen input {
  display: none;
}

.icono-camara {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #007bff;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 75%;
  background-image: url('https://img.icons8.com/?size=100&id=dlNRF98qYou3&format=png&color=000000');
}

.perfil-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.2rem;
}

input {
  width: 90%;
  max-width: 350px;
  padding: 0.7rem;
  border-radius: 23px;
  border: 1px solid #ccc;
  background-color: #D9D9D9;
  color: black;
  font-weight: bold;
  text-align: center;
  font-size: 1rem;
}

.sexo {
  display: flex;
  justify-content: center;
}

.sexo-botones {
  display: flex;
  gap: 1rem;
}

.sexo-btn {
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  border: none;
  background-color: #555;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.sexo-btn.activo {
  background-color: #007bff;
}

button[type="submit"] {
  margin-top: 1rem;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 23px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
    max-width: 250px;
    margin: 0 auto;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>