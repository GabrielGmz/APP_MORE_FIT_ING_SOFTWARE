<template>
  <div class="container">
    <div class="title">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 42 42"
        @click="$router.push('/P_P_Entrenador')" class="back-icon">
        <path fill="#00bfff" fill-rule="evenodd"
          d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z" />
      </svg>
      <h1>Plan de Nutrición</h1>
    </div>

    <div>
      <label for="cliente">Selecciona un cliente:</label>
      <select v-model="clienteSeleccionado" @change="cargarPlanes">
        <option value="" disabled>-- Selecciona --</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre || 'Sin Nombre' }} ({{ cliente.email || 'Sin Email' }})
        </option>
      </select>
    </div>

    <div class="loading" v-if="cargando">
      <div class="loadbar"></div>
    </div>

    <div v-else class="content-wrapper">
      <!-- Botón principal deshabilitado si no hay cliente seleccionado -->
      <button class="add-btn" @click="abrirModal" :disabled="!clienteSeleccionado">
        NUEVO PLAN
      </button>

      <div class="rutina-info" v-if="planes.length === 0">No hay planes asignados a este cliente.</div>

      <ul class="rutinas" v-else>
        <li class="card" v-for="plan in planes" :key="plan.id">
          <div>
            <h3>{{ plan.titulo }}</h3>
            <!-- Mostramos un resumen breve de las comidas -->
            <p class="plan-summary">{{ plan.comidas.substring(0, 50) }}...</p>
          </div>
          <div class="btn-options">
            <button class="edit_btn" @click="verDetalles(plan)"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0,0,256,256">
<g fill="#0067ff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M6,2c-1.1,0 -2,0.9 -2,2v16c0,1.1 0.9,2 2,2h5.51953c-0.47,-0.6 -0.83008,-1.27 -1.08008,-2h-4.43945v-16h12v6.0293l2,0.41016v-6.43945c0,-1.1 -0.9,-2 -2,-2zM8,7v2h8v-2zM8,11v2h3.51953c0.6,-0.82 1.36977,-1.5 2.25977,-2zM17.5,12c-1.29898,0 -2.50638,0.45447 -3.44922,1.22461c-1.25569,1.00341 -2.05078,2.55374 -2.05078,4.27539c0,0.20596 0.01221,0.41254 0.03711,0.61523c0.30714,2.74402 2.64153,4.88477 5.46289,4.88477c1.15452,0 2.22665,-0.36019 3.11328,-0.97266l1.92969,1.92969l1.41406,-1.41406l-1.92969,-1.92969c0.61246,-0.88663 0.97266,-1.95876 0.97266,-3.11328c0,-3.02815 -2.47185,-5.5 -5.5,-5.5zM18,14.04883c1.70748,0.24018 3,1.67089 3,3.45117c0,1.95185 -1.54815,3.5 -3.5,3.5c-1.77737,0 -3.2086,-1.30192 -3.45312,-3h3.95313zM8,15v2h2.0293c0.03,-0.7 0.17016,-1.37 0.41016,-2z"></path></g></g>
</svg></button>
            <button class="delete_btn" @click="eliminarPlan(plan.id)"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0,0,256,256">
<g fill="#ff0000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M13,3c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-5.98633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5.98633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805zM6,8v16c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-16z"></path></g></g>
</svg></button>
          </div>
        </li>
      </ul>
    </div>

    <!-- ================= MODAL ================= -->
    <div v-if="modalVisible" class="modal">
      <!-- Clase 'wide-modal' para selección de plantillas -->
      <div class="modal-content" :class="{ 'wide-modal': !planSeleccionado || !planSeleccionado.id }">

        <h2 v-if="!planSeleccionado">SELECCIONA UN PLAN NUTRICIONAL</h2>
        <h2 v-else>{{ planSeleccionado.titulo }}</h2>

        <!-- VISTA 1: Grid de Plantillas de Nutrición -->
        <div v-if="!planSeleccionado" class="rutina-grid">
          <div v-for="plantilla in plantillasNutricion" :key="plantilla.titulo" class="template-card nutrition-card"
            @click="seleccionarPlan(plantilla)">
            <div class="template-header">
              <h3>{{ plantilla.titulo }}</h3>
              <!-- Icono o badge opcional para nutrición -->
              <span class="nutrition-badge">🍎</span>
            </div>
            <p class="template-summary">{{ plantilla.resumen }}</p>
          </div>
        </div>

        <!-- VISTA 2: Detalles del Plan Seleccionado -->
        <div v-else class="details-view">
          <div class="form-group">
            <label>Instrucciones Generales:</label>
            <div class="info-box">
              {{ planSeleccionado.instrucciones }}
            </div>
          </div>

          <div class="form-group">
            <label>Distribución de Comidas:</label>
            <div class="info-box">
              {{ planSeleccionado.comidas }}
            </div>
          </div>

          <div class="modal-actions">
            <!-- Mostrar 'Asignar' solo si es una plantilla nueva -->
            <button v-if="!planSeleccionado.id" class="save-btn" type="button" @click="guardarPlanModal">CONFIRMAR
              </button>
            <button class="cancel-btn" type="button" @click="planSeleccionado = null">VOLVER</button>
            <button class="cancel-btn close-final" type="button" @click="cerrarModal">CERRAR</button>
          </div>
        </div>

      </div>
    </div>

  </div>

  <nav class="bottom-nav">
    <button class="nav-btn" @click="$router.push('/P_P_Entrenador')">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025">
        <path fill="currentColor"
          d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z" />
      </svg>
    </button>
    <button class="nav-btn" @click="$router.push('/Ver_Progreso')">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 32 32">
        <path fill="currentColor"
          d="M 15.458984 3.0117188 A 13 13 0 0 0 16 29 A 13.015 13.015 0 0 0 29 16 A 13 13 0 0 0 15.458984 3.0117188 z M 16 5 A 11.013 11.013 0 0 1 27 16 A 11 11 0 1 1 16 5 z M 12.960938 9.9980469 A 0.993 0.993 0 0 0 12.142578 10.484375 L 9.4335938 15 L 7 15 A 1 1 0 0 0 7 17 L 10 17 A 1 1 0 0 0 10.857422 16.515625 L 12.820312 13.242188 L 16.070312 21.371094 A 1 1 0 0 0 16.853516 21.988281 A 0.9 0.9 0 0 0 17 22 A 1 1 0 0 0 17.779297 21.625 L 21.480469 17 L 25 17 A 1 1 0 0 0 25 15 L 21 15 A 1 1 0 0 0 20.21875 15.371094 L 17.291016 19.03125 L 13.929688 10.625 A 1 1 0 0 0 13.080078 10 A 0.993 0.993 0 0 0 12.960938 9.9980469 z" />
      </svg>
    </button>
    <button class="nav-btn" @click="$router.push('/Perfil_U_E')">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
        <path fill="currentColor" fill-rule="evenodd"
          d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z"
          clip-rule="evenodd" />
      </svg>
    </button>
    <button class="nav-btn" @click="$router.push('/Configuracion_E')">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0,0,256,256">
        <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
          stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none"
          font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
          <g transform="scale(5.12,5.12)">
            <path
              d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z">
            </path>
          </g>
        </g>
      </svg>
    </button>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { db } from "@/firebase"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"

const clientes = ref([])
const clienteSeleccionado = ref("")
const planes = ref([])
const cargando = ref(true)
const modalVisible = ref(false)
const planSeleccionado = ref(null)

// --- PLANTILLAS DE NUTRICIÓN ---
const plantillasNutricion = ref([
  {
    titulo: "Equilibrio General",
    resumen: "Balance de macros para mantenimiento.",
    instrucciones: "Enfoque en alimentos enteros. Mantener hidratación constante (2.5L agua/día). Evitar procesados.",
    comidas: "Desayuno: Avena con frutas y nueces. Almuerzo: Pollo a la plancha con quinoa y verduras. Cena: Pescado al horno con ensalada verde. Snacks: Yogur griego o fruta."
  },
  {
    titulo: "Pérdida de Grasa (Déficit)",
    resumen: "Reducción calórica controlada, alto en proteína.",
    instrucciones: "Priorizar proteína en cada comida para saciedad. Reducir carbohidratos refinados. Aumentar fibra.",
    comidas: "Desayuno: Tortilla de claras con espinacas. Almuerzo: Ensalada grande con atún y aderezo ligero. Cena: Pechuga de pavo con brócoli al vapor. Snacks: Rodajas de pepino o apio."
  },
  {
    titulo: "Ganancia Muscular (Superávit)",
    resumen: "Aumento calórico para hipertrofia.",
    instrucciones: "Consumir más calorías de las que se queman. Carbohidratos complejos antes y después de entrenar.",
    comidas: "Desayuno: Huevos enteros, pan integral, aguacate. Almuerzo: Pasta integral con carne magra y salsa de tomate. Cena: Salmón con arroz integral y espárragos. Pre-entreno: Plátano con crema de cacahuete."
  },
  {
    titulo: "Vegetariano Flexible",
    resumen: "Alto en vegetales, incluye lácteos/huevos.",
    instrucciones: "Asegurar fuentes completas de proteína vegetal (combinar legumbres + cereales).",
    comidas: "Desayuno: Tostadas con aguacate y huevo poché. Almuerzo: Lentejas estofadas con arroz. Cena: Tofu salteado con verduras variadas. Snacks: Frutos secos variados."
  }
]);

// --- Lógica de Firebase ---
const cargarClientesSinRoles = async () => {
  try {
    const usuariosRef = collection(db, "usuarios")
    const clientesSnap = await getDocs(usuariosRef)
    clientes.value = clientesSnap.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(u => !u.rol || u.rol === "cliente")
  } catch (error) {
    console.error("Error cargando clientes:", error)
  }
}

const cargarPlanes = async () => {
  if (!clienteSeleccionado.value) return
  cargando.value = true
  try {
    const planesSnap = await getDocs(collection(db, "usuarios", clienteSeleccionado.value, "planesNutricion"))
    planes.value = planesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error cargando planes:", error)
  }
  cargando.value = false
}

// --- Lógica del Modal ---
const abrirModal = () => {
  // El botón ya está deshabilitado si no hay cliente, pero por seguridad:
  if (!clienteSeleccionado.value) return
  planSeleccionado.value = null
  modalVisible.value = true
}

const cerrarModal = () => {
  modalVisible.value = false
  planSeleccionado.value = null
}

const seleccionarPlan = (plantilla) => {
  planSeleccionado.value = { ...plantilla }
}

const verDetalles = (plan) => {
  planSeleccionado.value = { ...plan, id: plan.id }
  modalVisible.value = true
}

const guardarPlanModal = async () => {
  if (!clienteSeleccionado.value || !planSeleccionado.value) return;
  try {
    await addDoc(collection(db, "usuarios", clienteSeleccionado.value, "planesNutricion"), {
      ...planSeleccionado.value,
      fechaAsignacion: new Date().toISOString()
    })
    alert("Plan nutricional asignado correctamente.")
    cerrarModal()
    await cargarPlanes()
  } catch (error) {
    console.error("Error asignando plan:", error)
    alert("Error al asignar el plan.")
  }
}

const eliminarPlan = async (id) => {
  if (!confirm("¿Eliminar este plan nutricional?")) return
  try {
    await deleteDoc(doc(db, "usuarios", clienteSeleccionado.value, "planesNutricion", id))
    await cargarPlanes()
  } catch (error) { console.error(error) }
}

onMounted(async () => {
  await cargarClientesSinRoles()
  cargando.value = false
})
</script>

<style scoped>
/* === ESTILOS GENERALES (Base oscura idéntica a Rutinas) === */
.container {
  background-color: #0d1117;
  min-height: 100vh;
  padding: 20px 20px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: white;
  margin:auto 0;
}

.title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  margin-top: 20px;
}

.back-icon {
  cursor: pointer;
  margin-right: 10px;
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: auto 0;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
}

h1 {
  text-align: left;
  color: #00bfff;
  font-size: 1rem;
  margin: 0 0 0 10px;
  font-weight: 900;
  text-transform: uppercase;
}

label {
  color: #ccc;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: block;
}

select {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #1c2128;
  color: white;
  border: 1px solid #30363d;
  font-size: 1rem;
  outline: none;
}

/* === LISTA DE PLANES ASIGNADOS === */
.rutinas {
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card {
  background-color: #161b22;
  border: 1px solid #30363d;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card h3 {
  margin: 0 0 5px 0;
  color: #00bfff;
  font-size: 0.9rem;
}

.plan-summary {
  margin: 0;
  font-size: 0.75rem;
  color: #b5c0cb;
}

/* === BOTONES === */
.add-btn {
  width: 100%;
  max-width: fit-content;
  padding: 15px;
  background-color: #00bfff;
  color: #0d1117;
  border: none;
  border-radius: 8px;
  font-weight: 900;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  margin-bottom: 15px;
}

.add-btn:hover:not(:disabled) {
  background-color: #7ee7ff;
}

.add-btn:disabled {
  background-color: #30363d;
  color: #b5c0cb;
  cursor: not-allowed;
}

.btn-options {
  display: flex;
  gap: 8px;
}

.edit_btn,
.delete_btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
  transition: opacity 0.2s;
}

.edit_btn {
  background-color: #00bfff00;
  color: #0d1117;
}

.delete_btn {
  background-color: #00000000;
  color: white;
}

.edit_btn:hover,
.delete_btn:hover {
  opacity: 0.8;
}

/* === MODAL === */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: #161b22;
  border: 1px solid #30363d;
  padding: 25px;
  border-radius: 16px;
  width: 90%;
  max-width: 350px;
  max-height: 85vh;
  overflow-y: auto;
  color: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
}

.modal-content.wide-modal {
  max-width: 350px;
}

.modal-content h2 {
  color: #00bfff;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
}

/* === GRID DE PLANTILLAS NUTRICIÓN === */
.rutina-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.template-card {
  background-color: #0d1117;
  border: 1px solid #30363d;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.template-card:hover {
  border-color: #00bfff;
  transform: translateY(-2px);
}

.template-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.template-header h3 {
  margin: 0;
  font-size: 1rem;
  color: white;
}

.nutrition-badge {
  font-size: 1.2rem;
}

.template-summary {
  font-size: 0.85rem;
  color: #8b949e;
  margin: 0;
  line-height: 1.4;
}

/* === VISTA DETALLES === */
.details-view .form-group {
  margin-bottom: 15px;
}

.details-view label {
  color: #00bfff;
}

.info-box {
  background: #0d1117;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #30363d;
  white-space: pre-wrap;
  font-size: 0.95rem;
  color: #c9d1d9;
}

.modal-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #30363d;
}

.save-btn,
.cancel-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  flex-grow: 1;
}

.save-btn {
  background-color: #238636;
  color: white;
}

.cancel-btn {
  background-color: #21262d;
  color: #c9d1d9;
  border: 1px solid #30363d;
}

.cancel-btn.close-final {
  background-color: #da3633;
  color: white;
  border: none;
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
  color: #00bfff;
}

/* LOADING */
.loading {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
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
</style>
