<template>
  <div class="container">
    <header class="header">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 42"
        @click="$router.push('/PantallaPrincipal')" class="back-icon">
        <path fill="#00bfff" fill-rule="evenodd"
          d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z" />
      </svg>
      <h1>Gestión de Usuarios</h1>
    </header>

    <div class="content-wrapper">
      <!-- Total de usuarios filtrando admin y entrenador -->
      <div class="stat-card">
        <span class="stat-value">{{ totalUsuarios }}</span>
        <span class="stat-label">Clientes Activos</span>
      </div>

      <!-- Tabla de usuarios normales -->
      <section class="user-section">
        <h2 class="section-title">Clientes</h2>
        <div class="table-scroll">
          <table class="usuarios-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="usuariosFiltrados.length === 0">
                <td colspan="2" class="empty-row">No hay clientes registrados.</td>
              </tr>
              <tr v-for="usuario in usuariosFiltrados" :key="usuario.uid" @click="abrirModalUsuario(usuario)">
                <td>{{ usuario.nombre }} {{ usuario.apellido }}</td>
                <td>{{ usuario.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Tabla de entrenadores -->
      <section class="user-section">
        <h2 class="section-title">Entrenadores</h2>
        <div class="table-scroll">
          <table class="usuarios-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="usuariosEntrenadores.length === 0">
                <td colspan="2" class="empty-row">No hay entrenadores registrados.</td>
              </tr>
              <tr v-for="usuario in usuariosEntrenadores" :key="usuario.uid" @click="abrirModalEntrenador(usuario)">
                <td>{{ usuario.nombre }} {{ usuario.apellido }}</td>
                <td>{{ usuario.email }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- Modal usuarios normales (CLIENTES) -->
    <div v-if="mostrarModalUsuario" class="modal-overlay" @click.self="cerrarModalUsuario">
      <div class="modal-content">
        <h3>Opciones para {{ usuarioSeleccionado?.nombre }}</h3>
        <div class="modal-buttons">
          <!-- Botones de asignar rutina/nutrición eliminados de la vista -->
          <button @click="verPerfil(usuarioSeleccionado)" class="btn-action primary">
            <span class="icon">👤</span> Ver Perfil
          </button>
        </div>
        <button class="btn-action secondary" @click="cerrarModalUsuario">Cerrar</button>
      </div>
    </div>

    <!-- Modal entrenadores -->
    <div v-if="mostrarModalEntrenador" class="modal-overlay" @click.self="cerrarModalEntrenador">
      <div class="modal-content">
        <h3>Opciones para {{ usuarioEntrenadorSeleccionado?.nombre }}</h3>
        <div class="modal-buttons">
          <button @click="pago(usuarioEntrenadorSeleccionado)" class="btn-action primary">
            <span class="icon">💳</span> Gestionar Pagos
          </button>
          <button @click="verPerfil(usuarioEntrenadorSeleccionado)" class="btn-action secondary">
            <span class="icon">👤</span> Ver Perfil
          </button>
        </div>
        <button class="btn-action danger" @click="cerrarModalEntrenador">Cerrar</button>
      </div>
    </div>

    <!-- Barra de navegación inferior -->
    <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/Gestion_U')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#000000"><path fill="currentColor" fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3m2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Gestion_P')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/PantallaPrincipal')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Perfil_U')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Configuracion')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path fill="currentColor" d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g>
</svg></button>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const usuarios = ref([])
const router = useRouter()
const db = getFirestore()

// Estados para modales
const mostrarModalUsuario = ref(false)
const mostrarModalEntrenador = ref(false)

// Seleccionados
const usuarioSeleccionado = ref(null)
const usuarioEntrenadorSeleccionado = ref(null)

// Computadas
const usuariosFiltrados = computed(() => {
  return usuarios.value.filter(u => u.rol !== 'admin' && u.rol !== 'entrenador')
})

const usuariosEntrenadores = computed(() => {
  return usuarios.value.filter(u => u.rol === 'entrenador')
})

const totalUsuarios = computed(() => usuariosFiltrados.value.length)

// Cargar datos
const cargarUsuarios = async () => {
  const usuariosSnapshot = await getDocs(collection(db, 'usuarios'))
  usuarios.value = usuariosSnapshot.docs.map(doc => ({
    uid: doc.id,
    ...doc.data()
  }))
}

// Abrir/Cerrar modal usuario
const abrirModalUsuario = (usuario) => {
  usuarioSeleccionado.value = usuario
  mostrarModalUsuario.value = true
}
const cerrarModalUsuario = () => {
  usuarioSeleccionado.value = null
  mostrarModalUsuario.value = false
}

// Abrir/Cerrar modal entrenador
const abrirModalEntrenador = (usuario) => {
  usuarioEntrenadorSeleccionado.value = usuario
  mostrarModalEntrenador.value = true
}
const cerrarModalEntrenador = () => {
  usuarioEntrenadorSeleccionado.value = null
  mostrarModalEntrenador.value = false
}

// Acciones
const asignarRutina = (usuario) => {
  cerrarModalUsuario()
  // Asumiendo que tu ruta se llama 'AsignarRutina' y acepta un parámetro (aunque tu vista AsignarRutina no parece usarlo)
  router.push('/A_Rutina') // Navegación simple a la vista de asignar
}

const asignarNutricion = (usuario) => {
  cerrarModalUsuario()
  // Asumiendo que tu ruta se llama 'AsignarPlanNutricion'
  router.push('/A_P_Nutricion') // Navegación simple
}

const verPerfil = (usuario) => {
  cerrarModalUsuario()
  cerrarModalEntrenador()
  // Asumiendo que tienes una ruta para ver el perfil de un usuario por ID
  router.push({ name: 'V_Perfil_U', params: { uid: usuario.uid } })
}

const pago = (usuario) => {
  cerrarModalEntrenador()
  // MEJORADO: Navega a la gestión de pagos en lugar de un alert
  router.push('/Gestion_P')
}

onMounted(cargarUsuarios)
</script>

<style scoped>
/* === BASE STYLES === */
.container {
  background-color: #0d1117;
  min-height: 100vh;
  padding: 20px 20px 100px;
  box-sizing: border-box;
  color: #c9d1d9;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #30363d;
}

.back-icon {
  position: absolute;
  left: 20px;
  cursor: pointer;
}

h1 {
  color: #00bfff;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: left;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 1px;
}

.content-wrapper {
  flex-grow: 1;
  height: calc(100vh - 140px);
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.content-wrapper::-webkit-scrollbar {
  display: none;
}

/* WebKit */

/* === STAT CARD === */
.stat-card {
  background: linear-gradient(145deg, #161b22, #1c2128);
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 15px 20px;
  text-align: center;
  margin-bottom: 25px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 900;
  color: #00bfff;
}

.stat-label {
  font-size: 0.8rem;
  color: #8b949e;
  text-transform: uppercase;
  margin-left: 10px;
}

/* === USER SECTIONS === */
.user-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #00bfff;
  border-left: 4px solid #00bfff;
  padding-left: 10px;
  font-weight: 700;
}

/* === TABLE STYLES === */
.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.usuarios-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #161b22;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.usuarios-table th,
.usuarios-table td {
  padding: 14px 16px;
  text-align: left;
}

.usuarios-table th {
  background: #0d1117;
  color: #8b949e;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.usuarios-table tbody tr {
  color: #c9d1d9;
  transition: all 0.3s ease;
  border-bottom: 1px solid #30363d;
}

.usuarios-table tbody tr:last-child {
  border-bottom: none;
}

.usuarios-table tbody tr:hover {
  background: #1c2128;
  cursor: pointer;
}

.empty-row {
  text-align: center !important;
  font-style: italic;
  color: #8b949e;
}

/* === MODAL === */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #161b22;
  border-radius: 16px;
  border: 1px solid #30363d;
  padding: 25px;
  max-width: 350px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #00bfff;
  font-weight: 700;
}

.modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.btn-action {
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-action.primary {
  background-color: #00bfff;
  color: #0d1117;
}

.btn-action.secondary {
  background-color: #21262d;
  color: #c9d1d9;
  border: 1px solid #30363d;
}

.btn-action.danger {
  background-color: #da3633;
  color: white;
}

.btn-action:hover {
  opacity: 0.9;
  transform: scale(1.02);
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

.nav-btn svg {
  width: 34px;
  height: 34px;
}

.nav-btn svg path {
  fill: currentColor;
}

.nav-btn.active {
  color: #00bfff;
  transform: scale(1.1);
}
</style>