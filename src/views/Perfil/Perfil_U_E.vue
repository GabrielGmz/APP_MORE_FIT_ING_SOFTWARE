<template>
  <div class="container">
    <header class="header">
      <h1>Mi Perfil</h1>
    </header>

    <div v-if="cargando" class="loading">
      <div class="loadbar"></div>
    </div>

    <div v-else-if="perfilExiste" class="content-wrapper">

      <!-- Tarjeta Principal de Perfil -->
      <div class="profile-card">
        <div class="profile-header">
          <div class="avatar-container">
            <img v-if="perfil.imagen" :src="perfil.imagen" alt="Foto de perfil" class="avatar-img" />
            <!-- Placeholder si no hay imagen -->
            <div v-else class="avatar-placeholder">
              {{ obtenerIniciales(perfil.nombre, perfil.apellido) }}
            </div>
          </div>
          <h2 class="user-name">{{ perfil.nombre }} {{ perfil.apellido }}</h2>
          <p class="user-email">{{ perfil.email }}</p>
        </div>

        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-label">Edad</span>
            <span class="stat-value">{{ perfil.edad || '--' }} <small>años</small></span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Sexo</span>
            <span class="stat-value capitalize">{{ perfil.sexo || '--' }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Altura</span>
            <span class="stat-value">{{ perfil.altura || '--' }} <small>cm</small></span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Peso</span>
            <span class="stat-value">{{ perfil.peso || '--' }} <small>kg</small></span>
          </div>
        </div>
      </div>

      <!-- Botón de Acción -->
      <button class="edit-btn" @click="$router.push('/Completar_P_E')">
        EDITAR PERFIL
      </button>

    </div>

    <div v-else class="empty-state">
      <p>No se encontró información de perfil.</p>
      <button class="edit-btn" @click="$router.push('/Completar_P_E')">Completar Ahora</button>
    </div>
  </div>
    <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/P_P_Entrenador')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg></button>
        <button class="nav-btn" @click="$router.push('/Ver_Progreso')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 32 32">
<path fill="currentColor" d="M 15.458984 3.0117188 A 13 13 0 0 0 16 29 A 13.015 13.015 0 0 0 29 16 A 13 13 0 0 0 15.458984 3.0117188 z M 16 5 A 11.013 11.013 0 0 1 27 16 A 11 11 0 1 1 16 5 z M 12.960938 9.9980469 A 0.993 0.993 0 0 0 12.142578 10.484375 L 9.4335938 15 L 7 15 A 1 1 0 0 0 7 17 L 10 17 A 1 1 0 0 0 10.857422 16.515625 L 12.820312 13.242188 L 16.070312 21.371094 A 1 1 0 0 0 16.853516 21.988281 A 0.9 0.9 0 0 0 17 22 A 1 1 0 0 0 17.779297 21.625 L 21.480469 17 L 25 17 A 1 1 0 0 0 25 15 L 21 15 A 1 1 0 0 0 20.21875 15.371094 L 17.291016 19.03125 L 13.929688 10.625 A 1 1 0 0 0 13.080078 10 A 0.993 0.993 0 0 0 12.960938 9.9980469 z"></path>
</svg></button>
<button class="nav-btn" @click="$router.push('/Perfil_U_E')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Configuracion_E')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill="#currentColor" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path fill="currentColor" d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g>
</svg></button>
    </nav>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { db, auth } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const perfil = ref({})
const cargando = ref(true)
const perfilExiste = ref(false)

// Función auxiliar para obtener iniciales si no hay foto
const obtenerIniciales = (nombre, apellido) => {
  let iniciales = (nombre ? nombre[0] : '') + (apellido ? apellido[0] : '');
  return iniciales.toUpperCase() || 'US';
}

async function fetchPerfil(uid) {
  try {
    // Intenta obtener también el email del usuario autenticado
    const userAuth = auth.currentUser;
    const email = userAuth ? userAuth.email : '';

    const usuarioDoc = doc(db, 'usuarios', uid)
    const docSnap = await getDoc(usuarioDoc)

    if (docSnap.exists()) {
      perfil.value = { ...docSnap.data(), email } || {}
      perfilExiste.value = true
    } else {
      perfil.value = { email }
      perfilExiste.value = false
    }
  } catch (err) {
    console.error('Error fetching perfil:', err)
    perfil.value = {}
    perfilExiste.value = false
  } finally {
    cargando.value = false
  }
}

const unsubscribe = onAuthStateChanged(auth, (user) => {
  cargando.value = true
  if (user && user.uid) {
    fetchPerfil(user.uid)
  } else {
    perfil.value = {}
    perfilExiste.value = false
    cargando.value = false
  }
})

onUnmounted(() => {
  if (typeof unsubscribe === 'function') unsubscribe()
})
</script>


<style scoped>
.container {
  background-color: #0d1117;
  min-height: 100vh;
  padding: 20px 20px 100px;
  box-sizing: border-box;
  color: #c9d1d9;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 1px solid #30363d;
  padding-bottom: 15px;
}

.header h1 {
  color: #00bfff;
  font-size: 1.2rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  margin-top: 20px;
  letter-spacing: 1px;
}

/* === LOADING === */
.loading {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  width: 100%;
}

.loadbar {
  width: 40px;
  height: 40px;
  border: 4px solid #30363d;
  border-top-color: #00bfff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* === PROFILE CARD === */
.content-wrapper {
  width: 100%;
  max-width: 500px;
  /* Ancho máximo para que no se estire demasiado en PC */
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.content-wrapper > button {
  align-self: center;
}

.profile-card {
  background: linear-gradient(145deg, #161b22, #1c2128);
  border: 1px solid #30363d;
  border-radius: 24px;
  padding: 30px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  text-align: center;
}

.avatar-container {
  margin-bottom: 15px;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #00bfff;
  box-shadow: 0 0 25px rgba(0, 191, 255, 0.3);
}

.avatar-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #21262d;
  border: 4px solid #30363d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: #00bfff;
}

.user-name {
  margin: 0;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
}

.user-email {
  margin: 5px 0 0 0;
  color: #8b949e;
  font-size: 0.9rem;
}

/* === STATS GRID === */
.profile-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
}

.stat-item {
  background-color: #0d1117;
  border: 1px solid #30363d;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
}

.stat-item:hover {
  border-color: #00bfff;
  transform: translateY(-2px);
}

.stat-label {
  font-size: 14px;
  text-transform: uppercase;
  color: #8b949e;
  margin-bottom: 5px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 900;
  color: white;
}

.stat-value small {
  font-size: 0.9rem;
  font-weight: normal;
  color: #8b949e;
}

.capitalize {
  text-transform: capitalize;
}

/* === BOTÓN EDITAR === */
.edit-btn {
  background-color: #00bfff;
  color: #090c10;
  border: none;
  padding: 16px;
  width: 100%;
  max-width: fit-content;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 191, 255, 0.2);
}

.edit-btn:hover {
  background-color: #33c9ff;
  box-shadow: 0 6px 20px rgba(0, 191, 255, 0.4);
  transform: translateY(-2px);
}

/* === EMPTY STATE === */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #8b949e;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

/* === NAV === */
.bottom-nav {
  background-color: rgba(0, 0, 0, 0); /* Semi-transparente oscuro */
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #585b5ea0;
  z-index: 100;
}

.nav-btn {
  background: none;
  border: none;
  color: #8b949e;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 5px;
}
.nav-btn:hover {
  color: #e6edf3;
}
.nav-btn.active {
  color: #00bfff;
  transform: scale(1.1);
}
</style>
