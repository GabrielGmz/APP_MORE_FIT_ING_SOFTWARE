<template>
  <div class="view_perfil">
          <h2>{{ esEdicion ? 'EDITAR PERFIL' : 'COMPLETA TU PERFIL' }}</h2>
    <div class="perfil-container">
      <form class="perfil-form" @submit.prevent="guardarPerfil">

        <!-- Sección de Imagen -->
        <div class="imagen-perfil-wrapper">
          <div class="imagen-perfil">
            <img v-if="imagenUrl" :src="imagenUrl" alt="Perfil" class="foto-usuario" />
            <!-- Placeholder si no hay imagen -->
            <div v-else class="foto-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
                <path fill="#30363d"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>

            <label class="input-imagen" :class="{ 'disabled': cargando }">
              <input type="file" accept="image/*" @change="handleFileChange" :disabled="cargando" />
              <span class="icono-camara">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="white"
                    d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5z" />
                </svg>
              </span>
            </label>
          </div>
          <p v-if="errorImagen" class="error-text">{{ errorImagen }}</p>
        </div>

        <!-- Campos -->
        <div class="form-grid">
          <div class="form-group">
            <label>Nombre</label>
            <input type="text" placeholder="NOMBRE" v-model="nombre" required class="modern-input" />
          </div>
          <div class="form-group">
            <label>Apellido</label>
            <input type="text" placeholder="APELLIDO" v-model="apellido" required class="modern-input" />
          </div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" placeholder="EMAIL" v-model="email" disabled class="modern-input disabled" />
        </div>

        <div class="form-row">
          <div class="form-group half">
            <label>Edad</label>
            <input type="number" placeholder="EDAD" min="0" v-model="edad" required class="modern-input" />
          </div>
          <div class="form-group half sexo-section">
            <label>Sexo</label>
            <div class="sexo-botones">
              <button type="button" class="sexo-btn" @click="seleccionarSexo('masculino')"
                :class="{ activo: sexo === 'masculino' }"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  width="26" height="26" viewBox="0 0 48 48">
                  <path fill="#2196F3" d="M30.793 4.186H34.793V26.228H30.793z" transform="rotate(44.992 32.795 15.209)">
                  </path>
                  <path fill="#2196F3"
                    d="M18 42L18 42c-3.206 0-6.219-1.248-8.485-3.515C7.248 36.219 6 33.205 6 30s1.248-6.219 3.515-8.485C11.781 19.248 14.794 18 18 18s6.219 1.248 8.485 3.515c4.68 4.679 4.68 12.292 0 16.971C24.218 40.752 21.205 42 18 42zM18 22c-2.137 0-4.146.832-5.657 2.343-3.119 3.119-3.119 8.195 0 11.314C13.854 37.168 15.862 38 18 38c2.137 0 4.146-.832 5.657-2.343 3.119-3.119 3.119-8.195 0-11.314C22.146 22.832 20.137 22 18 22zM25 6H42V10H25z">
                  </path>
                  <path fill="#2196F3" d="M38 6H42V23H38z"></path>
                </svg></button>
              <button type="button" class="sexo-btn" @click="seleccionarSexo('femenino')"
                :class="{ activo: sexo === 'femenino' }"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  width="26" height="26" viewBox="0 0 48 48">
                  <path fill="#FF1744"
                    d="M26,25.9c2.4-0.4,4.7-1.5,6.5-3.3c2.3-2.3,3.5-5.3,3.5-8.5c0-3.2-1.2-6.2-3.5-8.5c-2.3-2.3-5.3-3.5-8.5-3.5c-3.2,0-6.2,1.2-8.5,3.5l0,0c-2.3,2.3-3.5,5.3-3.5,8.5c0,5.9,4.3,10.9,10,11.8V34l-8,0l0,4l8,0v8h4v-8l8,0v-4l-8,0V25.9z M16,14.1c0-2.1,0.8-4.1,2.3-5.7c1.5-1.5,3.5-2.3,5.7-2.3c4.4,0,8,3.6,8,8c0,2.1-0.8,4.1-2.3,5.7c-1.5,1.5-3.5,2.3-5.7,2.3C19.6,22.1,16,18.5,16,14.1z">
                  </path>
                </svg></button>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group half">
            <label>Altura (cm)</label>
            <input type="number" placeholder="ALTURA" min="0" v-model="altura" required class="modern-input" />
          </div>
          <div class="form-group half">
            <label>Peso (kg)</label>
            <input type="number" placeholder="PESO" min="0" v-model="peso" required class="modern-input" />
          </div>
        </div>

        <div class="btns">
          <button class="btn_cancel" @click="router.back()">CANCELAR</button>
          <button type="submit" class="btn-action" :disabled="cargando">
            <span v-if="cargando">GUARDANDO...</span>
            <span v-else>{{ esEdicion ? 'GUARDAR' : 'SIGUIENTE' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { db, auth } from '@/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

const nombre = ref('')
const apellido = ref('')
const email = ref('')
const edad = ref('')
const altura = ref('')
const peso = ref('')
const sexo = ref('')
const imagenUrl = ref('')
const userId = ref('')
const esEdicion = ref(false)
const cargando = ref(false)
const errorImagen = ref('')

const router = useRouter()

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userId.value = user.uid
    email.value = user.email || ''

    const refUsuario = doc(db, 'usuarios', user.uid)
    const docSnap = await getDoc(refUsuario)

    if (docSnap.exists()) {
      const datos = docSnap.data()
      nombre.value = datos.nombre || ''
      apellido.value = datos.apellido || ''
      edad.value = datos.edad || ''
      altura.value = datos.altura || ''
      peso.value = datos.peso || ''
      sexo.value = datos.sexo || ''
      imagenUrl.value = datos.imagen || ''

      if (datos.nombre) esEdicion.value = true
    }
  } else {
    // Manejar usuario no autenticado si es necesario
  }
})

function seleccionarSexo(valor) {
  sexo.value = valor
}

// --- MANEJO DE IMAGEN (CONVERSIÓN A BASE64) ---
function handleFileChange(e) {
  const file = e.target.files[0]
  errorImagen.value = ''

  if (file) {
    // VALIDACIÓN DE TAMAÑO (Máximo 800KB para asegurar que entre en Firestore)
    if (file.size > 800 * 1024) {
      errorImagen.value = 'La imagen es demasiado grande. Máximo 800KB.'
      return
    }

    // Convertir a Base64
    const reader = new FileReader()
    reader.onload = (e) => {
      // El resultado es una string larga: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      imagenUrl.value = e.target.result
    }
    reader.onerror = (err) => {
      console.error("Error leyendo archivo", err)
      errorImagen.value = 'Error al procesar la imagen.'
    }
    reader.readAsDataURL(file)
  }
}

async function guardarPerfil() {
  if (!userId.value) return alert('No se detectó usuario')
  if (!sexo.value) return alert('Selecciona tu sexo')

  cargando.value = true

  const perfil = {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    edad: parseInt(edad.value),
    altura: parseInt(altura.value),
    peso: parseInt(peso.value),
    sexo: sexo.value,
    imagen: imagenUrl.value // Guardamos la string base64 directamente en Firestore
  }

  try {
    // Usamos merge: true para no borrar otros campos (como rutinas o roles)
    await setDoc(doc(db, 'usuarios', userId.value), perfil, { merge: true })

    alert('Perfil guardado exitosamente')

    if (esEdicion.value) {
      router.push('/Perfil_U_C')
    } else {
      router.push('/Info_Salud') // Asegúrate que esta ruta existe
    }
  } catch (error) {
    console.error('Error al guardar el perfil:', error)
    // Si el error es por tamaño, Firestore suele dar un error específico de quota o tamaño de documento
    if (error.message && error.message.includes('exceeds the maximum allowed size')) {
      alert('Error: La imagen seleccionada es demasiado pesada para guardarla sin Storage. Intenta con una más pequeña.');
    } else {
      alert('Error al guardar perfil. Intenta nuevamente.')
    }
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.view_perfil {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: #0d1117;
  /* Fondo oscuro base */
}

.perfil-container {
  width: 100%;
  max-width: 340px;
  padding: 2rem 1.5rem;
  border-radius: 24px;
  background-color: #161b22;
  /* Tarjeta flotante */
  border: 1px solid #30363d;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  position: relative;
  color: #c9d1d9;
  margin-top: 20px;
}

h2 {
  color: #00bfff;
  font-weight: 900;
  text-align: center;
  margin-top: 0;

  font-size: 1.3rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* === IMAGEN DE PERFIL === */
.imagen-perfil-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.8rem;
}

.imagen-perfil {
  position: relative;
  width: 120px;
  height: 120px;
}

.foto-usuario,
.foto-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #00bfff;
  box-shadow: 0 0 25px rgba(0, 191, 255, 0.2);
}

.foto-placeholder {
  background-color: #0d1117;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-imagen {
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  transition: transform 0.2s;
}

.input-imagen:hover {
  transform: scale(1.1);
}

.input-imagen input {
  display: none;
}

.icono-camara {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #00bfff;
  border-radius: 50%;
  border: 3px solid #161b22;
  /* Para separarlo visualmente de la foto */
}

.error-text {
  color: #ff4d4d;
  font-size: 0.85rem;
  margin-top: 10px;
}

/* === FORMULARIO === */
.perfil-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-group.half {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.8rem;
  color: #00bfff;
  font-weight: bold;
  margin-bottom: 8px;
  margin-left: 10px;
  text-transform: uppercase;
}

.modern-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #30363d;
  background-color: #0d1117;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.modern-input:focus {
  border-color: #00bfff;
  box-shadow: 0 0 0 3px rgba(0, 191, 255, 0.15);
}

.modern-input.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #1c2128;
}

/* === SEXO === */
.sexo-botones {
  display: flex;
  gap: 10px;
  width: 100%;
  height: 45px;
}

.sexo-btn {
  flex: 1;
  border-radius: 12px;
  border: 1px solid #30363d;
  background-color: #0d1117;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sexo-btn:hover {
  border-color: #00bfff;
}

.sexo-btn.activo {
  border-color: #00bfff;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
  transform: scale(1.05);
}

/* === BOTONES ACCIÓN === */
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.btn-action {
  margin-top: 0;
  padding: 14px;
  font-size: 14px;
  background-color: #00bfff;
  color: #090c10;
  border: none;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  width: 100%;
  max-width: 200px;
}

.btn-action:hover:not(:disabled) {
  background-color: #33c9ff;
  box-shadow: 0 0 25px rgba(0, 191, 255, 0.4);
}

.btn-action:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn_cancel {
  padding: 14px;
  font-size: 14px;
  background-color: #444c56;
  color: #c9d1d9;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  width: 100%;
  max-width: 145px;
}
.btn_cancel:hover {
  background-color: #5a626e;
  box-shadow: 0 0 15px rgba(90, 98, 110, 0.4);
}

</style>