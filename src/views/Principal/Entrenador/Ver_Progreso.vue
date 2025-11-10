<template>
  <div class="container">
    <!-- Botón volver -->
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 42 42"
      @click="$router.push('/P_P_Entrenador')"
      style="position: absolute; top: 35px; left: 15px; cursor: pointer;">
      <path fill="#00bfff" fill-rule="evenodd"
        d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z" />
    </svg>

    <h1>Progreso del Cliente</h1>

    <!-- Selección de cliente -->
    <div>
      <label for="cliente">Selecciona un cliente:</label>
      <select v-model="clienteSeleccionado" @change="cargarProgreso">
        <option value="" disabled>-- --</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre || 'Sin Nombre' }} ({{ cliente.email || 'Sin Email' }})
        </option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="cargando" class="loading">
      <div class="loadbar"></div>
    </div>

    <!-- Contenido cuando se selecciona un cliente -->
    <div v-else-if="clienteSeleccionado">
      <!-- Card del Cliente -->
      <div class="cliente-card">
        <h2>{{ clienteSeleccionadoInfo.nombre || 'Sin Nombre' }}</h2>
        <p><strong>Email:</strong> {{ clienteSeleccionadoInfo.email || 'Sin Email' }}</p>
        <p><strong>Edad:</strong> {{ clienteSeleccionadoInfo.edad || '-' }} años</p>
        <p><strong>Peso inicial:</strong> {{ clienteSeleccionadoInfo.peso || '-' }} kg</p>
      </div>

      <!-- Planes asignados -->
      <div class="planes">
        <h3>Planes Asignados</h3>
        <ul>
          <li v-for="plan in planes" :key="plan.id" class="plan-card">
            <strong>{{ plan.titulo }}</strong> - {{ plan.comidas }} comidas
            <p>{{ plan.instrucciones }}</p>
          </li>
        </ul>
      </div>

      <!-- Progreso -->
      <div class="progreso">
        <h3>Progreso</h3>
        <ul>
          <li v-for="avance in avances" :key="avance.id" class="avance-card">
            <p>
              <strong>{{ new Date(avance.fecha.seconds * 1000).toLocaleDateString() }}:</strong>
              Peso: {{ avance.peso }} kg, IMC: {{ avance.imc }}, Observaciones: {{ avance.observaciones }}
            </p>
            <div class="barra-progreso">
              <div class="barra-llenada" :style="{ width: avance.porcentaje + '%' }"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="rutina-info">Selecciona un cliente para ver el progreso</div>
  </div>
    <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/P_P_Entrenador')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg></button>
        <button class="nav-btn" @click="$router.push('/Ver_Progreso')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
<path d="M 15.458984 3.0117188 A 13 13 0 0 0 16 29 A 13.015 13.015 0 0 0 29 16 A 13 13 0 0 0 15.458984 3.0117188 z M 16 5 A 11.013 11.013 0 0 1 27 16 A 11 11 0 1 1 16 5 z M 12.960938 9.9980469 A 0.993 0.993 0 0 0 12.142578 10.484375 L 9.4335938 15 L 7 15 A 1 1 0 0 0 7 17 L 10 17 A 1 1 0 0 0 10.857422 16.515625 L 12.820312 13.242188 L 16.070312 21.371094 A 1 1 0 0 0 16.853516 21.988281 A 0.9 0.9 0 0 0 17 22 A 1 1 0 0 0 17.779297 21.625 L 21.480469 17 L 25 17 A 1 1 0 0 0 25 15 L 21 15 A 1 1 0 0 0 20.21875 15.371094 L 17.291016 19.03125 L 13.929688 10.625 A 1 1 0 0 0 13.080078 10 A 0.993 0.993 0 0 0 12.960938 9.9980469 z"></path>
</svg></button>
<button class="nav-btn" @click="$router.push('/Perfil_U_E')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Configuracion_E')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g>
</svg></button>
    </nav>
</template>


<script setup>
import { ref, onMounted } from "vue"
import { db } from "@/firebase"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"

const clientes = ref([])
const clienteSeleccionado = ref("")
const clienteSeleccionadoInfo = ref({})
const planes = ref([])
const avances = ref([])
const cargando = ref(false)

// 🔹 Cargar clientes sin rol
const cargarClientesSinRoles = async () => {
  try {
    const usuariosRef = collection(db, "usuarios")
    const clientesSnap = await getDocs(usuariosRef)
    clientes.value = clientesSnap.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(u => !u.rol || u.rol.trim() === "")
  } catch (error) {
    console.error("Error cargando clientes:", error)
  }
}

// 🔹 Cargar progreso
const cargarProgreso = async () => {
  if (!clienteSeleccionado.value) return
  cargando.value = true
  try {
    // Info del cliente
    const clienteDoc = await getDoc(doc(db, "usuarios", clienteSeleccionado.value))
    clienteSeleccionadoInfo.value = clienteDoc.exists() ? clienteDoc.data() : {}

    // Planes asignados
    const planesSnap = await getDocs(collection(db, "usuarios", clienteSeleccionado.value, "planesNutricion"))
    planes.value = planesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    // Avances
    const avancesSnap = await getDocs(collection(db, "usuarios", clienteSeleccionado.value, "avances"))
    avances.value = avancesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error cargando progreso:", error)
  }
  cargando.value = false
}

onMounted(async () => {
  await cargarClientesSinRoles()
})
</script>

<style scoped>
.container {
  background-color: #000a12;
  height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  color: #00bfff;
  margin-bottom: 1rem;
  font-weight: 900;
}

label {
  color: white;
  font-weight: bold;
}

select {
  width: 100%;
  padding: 8px;
  margin: 10px 0 20px 0;
  border-radius: 5px;
  background-color: #000;
  color: white;
  border: 1px solid #444;
}

.loading {
  width: 100%;
  max-width: 100px;
  height: 8px;
  background: #9dfff2;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  margin: 20px auto;
}

.loadbar {
  width: 30%;
  height: 100%;
  background: linear-gradient(90deg, #0062ff, #9ac7ff);
  position: relative;
  animation: mover 1.5s infinite;
  border-radius: 10px;
}

@keyframes mover {
  0% { left: -30%; }
  50% { left: 50%; }
  100% { left: 100%; }
}

/* Card Cliente */
.cliente-card {
  background-color: #040015;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.5);
  margin-bottom: 20px;
  color: white;
}
.cliente-card h2 { color: #00bfff; margin-bottom: 10px; }
.cliente-card p { margin: 4px 0; }

/* Card Planes */
.plan-card {
  background-color: #040015;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0,191,255,0.3);
}

/* Card Avances */
.avance-card {
  background-color: #040015;
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0,191,255,0.3);
}

.barra-progreso {
  width: 100%;
  background: #222;
  height: 10px;
  border-radius: 5px;
  margin-top: 5px;
}

.barra-llenada {
  height: 100%;
  background: #00bfff;
  border-radius: 5px;
}

.planes h3, .progreso h3 {
  color: #ffffff;
  margin-bottom: 10px;
    border-bottom: 2px solid #00bfff;
    padding-bottom: 5px;
    font-weight: 800;
}

.rutina-info {
  color: white;
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
}

.bottom-nav {
  background-color: rgba(35, 35, 35, 0.5);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  position: sticky;
  bottom: 0;
  left: 0;
    width: 100%;
  max-width: 470px;
    margin: 0 auto;
}

.nav-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease;
}
.nav-btn:hover {
  color: #008CFF;
}
.nav-btn svg {
  width: 34px;
  height: 34px;
}
.nav-btn svg path {
  fill: currentColor;
}
.nav-btn.active {
  color: #008CFF;
}
.nav-btn.active svg path {
  fill: #008CFF;
}
</style>
