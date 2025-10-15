<template>
  <div class="container">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 42 42"
      @click="$router.push('/P_P_Entrenador')" style="position: absolute; top: 35px; left: 15px; cursor: pointer;">
      <path fill="#00bfff" fill-rule="evenodd"
        d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z" />
    </svg>
    <h1>Asignar Plan de Nutrición</h1>

    <div>
      <label for="cliente">Selecciona un usuario:</label>
      <select v-model="clienteSeleccionado" @change="cargarPlanes">
        <option value="" disabled>-- --</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre || 'Sin Nombre' }} ({{ cliente.email || 'Sin Email' }})
        </option>
      </select>
    </div>

    <div class="loading" v-if="cargando">
      <div class="loadbar"></div>
    </div>

    <div v-else>
      <button class="add-btn" @click="abrirModal">Enviar Plan</button>

      <div class="rutina-info" v-if="planes.length === 0">No hay planes asignados.</div>

      <ul v-else>
        <li v-for="plan in planes" :key="plan.id">
          <h3>{{ plan.titulo }}</h3>
          <p><strong>Instrucciones:</strong> {{ plan.instrucciones }}</p>
          <p><strong>Comidas:</strong> {{ plan.comidas }}</p>
          <button @click="editarPlan(plan)">Editar</button>
          <button @click="eliminarPlan(plan.id)">Eliminar</button>
        </li>
      </ul>
    </div>

    <!-- Modal -->
    <div v-if="modalVisible" class="modal">
      <div class="modal-content">
        <h2>{{ planEditando ? "Editar Plan" : "Asignar Plan" }}</h2>
        <form @submit.prevent="guardarPlanModal">
          <div>
            <label for="titulo">Título:</label>
            <input v-model="planForm.titulo" type="text" id="titulo" required />
          </div>
          <div>
            <label for="instrucciones">Instrucciones:</label>
            <textarea v-model="planForm.instrucciones" id="instrucciones" required></textarea>
          </div>
          <div>
            <label for="comidas">Comidas:</label>
            <input v-model="planForm.comidas" type="text" id="comidas" required />
          </div>
          <div class="modal-actions">
            <button class="save-btn" type="submit">Enviar</button>
            <button class="cancel-btn" type="button" @click="cerrarModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <nav class="bottom-nav">
    <button class="nav-btn" @click="$router.push('/Perfil_U')"><svg xmlns="http://www.w3.org/2000/svg" width="200"
        height="200" viewBox="0 0 24 24" fill="#000000">
        <path fill="#000000" fill-rule="evenodd"
          d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3m2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z"
          clip-rule="evenodd" />
      </svg></button>
    <button class="nav-btn" @click="$router.push('/P_P_Entrenador')"><svg xmlns="http://www.w3.org/2000/svg" width="34"
        height="34" viewBox="0 0 1024 1025">
        <path fill="currentColor"
          d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z" />
      </svg></button>
    <button class="nav-btn" @click="$router.push('/Configuracion')"><svg xmlns="http://www.w3.org/2000/svg" x="0px"
        y="0px" width="34" height="34" viewBox="0,0,256,256">
        <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
          stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none"
          font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
          <g transform="scale(5.12,5.12)">
            <path
              d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z">
            </path>
          </g>
        </g>
      </svg></button>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { db } from "@/firebase"
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"

const clientes = ref([])
const clienteSeleccionado = ref("")
const planes = ref([])
const cargando = ref(true)

const modalVisible = ref(false)
const planEditando = ref(null)
const planForm = ref({
  titulo: "",
  instrucciones: "",
  comidas: ""
})

// 🔹 Cargar lista de clientes SIN rol
const cargarClientesSinRoles = async () => {
  try {
    const usuariosRef = collection(db, "usuarios")
    const clientesSnap = await getDocs(usuariosRef)

    clientes.value = clientesSnap.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(u => !u.rol || u.rol.trim() === "")
  } catch (error) {
    console.error("Error cargando clientes sin roles:", error)
  }
}

// 🔹 Cargar planes del cliente seleccionado
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

// 🔹 Modal
const abrirModal = () => {
  planEditando.value = null
  planForm.value = { titulo: "", instrucciones: "", comidas: "" }
  modalVisible.value = true
}
const cerrarModal = () => {
  modalVisible.value = false
}

// 🔹 Editar plan
const editarPlan = (plan) => {
  planEditando.value = plan
  planForm.value = { ...plan }
  modalVisible.value = true
}

// 🔹 Guardar plan (igual que el sistema de rutinas)
const guardarPlanModal = async () => {
  if (!clienteSeleccionado.value) return alert("Selecciona un cliente")
  if (!planForm.value.titulo.trim() || !planForm.value.instrucciones.trim() || !planForm.value.comidas.trim()) {
    return alert("Todos los campos son obligatorios")
  }

  try {
    console.log("Guardando plan nutricional para cliente:", clienteSeleccionado.value)
    const planesRef = collection(db, "usuarios", clienteSeleccionado.value, "planesNutricion")

    if (planEditando.value) {
      if (!planEditando.value.id) throw new Error("ID de plan vacío")
      const planDocRef = doc(planesRef, planEditando.value.id)
      await updateDoc(planDocRef, { ...planForm.value, fecha: new Date() })
      alert("Plan actualizado correctamente")
    } else {
      await addDoc(planesRef, { ...planForm.value, fecha: new Date() })
      alert("Plan agregado correctamente")
    }

    cerrarModal()
    await cargarPlanes()
  } catch (error) {
    console.error("Error guardando plan:", error)
    alert("Ocurrió un error al guardar el plan: " + error.message)
  }
}

// 🔹 Eliminar plan
const eliminarPlan = async (id) => {
  if (!confirm("¿Eliminar este plan?")) return
  try {
    await deleteDoc(doc(db, "usuarios", clienteSeleccionado.value, "planesNutricion", id))
    await cargarPlanes()
    alert("Plan eliminado correctamente")
  } catch (error) {
    console.error("Error eliminando plan:", error)
    alert("Ocurrió un error al eliminar el plan")
  }
}

// 🔹 Inicial
onMounted(async () => {
  await cargarClientesSinRoles()
  cargando.value = false
})
</script>


<style scoped>
/* Mantener mismo estilo del ejemplo anterior */
.container {
  background-color: #000a12;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  padding: 2rem 1rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
}

h1 {
  font-weight: 900;
  text-align: center;
  color: #00bfff;
  font-size: 1.6rem;
  margin: 0 auto;
  margin-bottom: 0.5rem;
  width: 100%;
  max-width: 470px;
  padding-bottom: 2rem;
}

label {
  color: white;
  font-weight: bold;
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
  box-shadow: 0 0 10px rgba(0, 234, 255, 0.5);
  padding: 2px;
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
  0% {
    left: -30%;
  }

  50% {
    left: 50%;
  }

  100% {
    left: 100%;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: rgb(0, 0, 0);
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  color: white;
  box-shadow: 0 0 10px rgba(62, 62, 62, 0.5);
  backdrop-filter: blur(5px);
}

.modal-content form div {
  margin-bottom: 10px;
}

.modal-content form label {
  display: block;
  margin-bottom: 5px;
  color: white;
  font-weight: bold;
}

.modal-content form input,
.modal-content form textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #040015;
  color: white;
  border: 1px solid #444;
  font-size: 1rem;
  backdrop-filter: blur(2px);
}

.modal-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

select {
  width: 100%;
  padding: 8px;
  margin: 10px 0 20px 0;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #000000;
  color: white;
  border: 1px solid #444;
  font-size: 1rem;
  height: 40px;
  backdrop-filter: blur(2px);
}

.add-btn,
.save-btn {
  padding: 10px 15px;
  background-color: #008CFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover,
.save-btn:hover {
  background-color: #070038;
}

.cancel-btn {
  padding: 10px 15px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background-color: #e60000;
}

.rutina-info {
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
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
