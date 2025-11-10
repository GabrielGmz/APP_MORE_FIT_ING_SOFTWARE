<template>
  <div class="container">
    <div class="title">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 42 42"
        @click="$router.push('/P_P_Entrenador')" style="position: relative; top:0; left: 5px; cursor: pointer;">
        <path fill="#00bfff" fill-rule="evenodd"
          d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z" />
      </svg>
      <h1>Asignar Rutina a Cliente</h1>
    </div>

    <div>
      <label for="cliente">Selecciona un cliente:</label>
      <select v-model="clienteSeleccionado" @change="cargarRutinas">
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
      <button class="add-btn" @click="abrirModal">Agregar Rutina</button>

      <div class="rutina-info" v-if="rutinas.length === 0">No hay rutinas asignadas.</div>

      <ul class="rutinas" v-else>
        <li class="card" v-for="rutina in rutinas" :key="rutina.id">
          <h3>{{ rutina.titulo }}</h3>
          <p> {{ rutina.dificultad }}</p>
          <div class="btn-options">
            <button class="edit_btn" @click="editarRutina(rutina)">Editar</button>
            <button class="delete_btn" @click="eliminarRutina(rutina.id)">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal -->
    <div v-if="modalVisible" class="modal">
      <div class="modal-content">
        <h2>{{ rutinaEditando ? "Editar Rutina" : "Agregar Rutina" }}</h2>
        <form @submit.prevent="guardarRutinaModal">
          <div>
            <label for="titulo">Título:</label>
            <input v-model="rutinaForm.titulo" type="text" id="titulo" required />
          </div>
          <div>
            <label for="instrucciones">Instrucciones:</label>
            <textarea v-model="rutinaForm.instrucciones" id="instrucciones" required></textarea>
          </div>
          <div>
            <label for="repeticiones">Repeticiones:</label>
            <input v-model="rutinaForm.repeticiones" type="text" id="repeticiones" required />
          </div>
          <div>
            <label for="dificultad">Nivel de Dificultad:</label>
            <select v-model="rutinaForm.dificultad" id="dificultad" required>
              <option value="" disabled>-- Selecciona un nivel --</option>
              <option value="facil">Fácil</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>
          <div class="modal-actions">
            <button class="save-btn" type="submit">Guardar</button>
            <button class="cancel-btn" type="button" @click="cerrarModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
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
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore"

const clientes = ref([])
const clienteSeleccionado = ref("")
const rutinas = ref([])
const cargando = ref(true)

const modalVisible = ref(false)
const rutinaEditando = ref(null)
const rutinaForm = ref({
  titulo: "",
  instrucciones: "",
  repeticiones: ""
})

// Cargar lista de clientes SIN rol
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

// 🔹 Cargar rutinas del cliente seleccionado
const cargarRutinas = async () => {
  if (!clienteSeleccionado.value) return
  cargando.value = true
  try {
    const rutinasSnap = await getDocs(collection(db, "usuarios", clienteSeleccionado.value, "rutinas"))
    rutinas.value = rutinasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error cargando rutinas:", error)
  }
  cargando.value = false
}

// 🔹 Modal
const abrirModal = () => {
  rutinaEditando.value = null
  rutinaForm.value = { titulo: "", instrucciones: "", repeticiones: "", dificultad: "" }
  modalVisible.value = true
}
const cerrarModal = () => {
  modalVisible.value = false
}

// 🔹 Editar rutina
const editarRutina = (rutina) => {
  rutinaEditando.value = rutina
  rutinaForm.value = { ...rutina }
  modalVisible.value = true
}

// 🔹 Guardar rutina (mejorado)
const guardarRutinaModal = async () => {
  if (!clienteSeleccionado.value) return alert("Selecciona un cliente")
  if (!rutinaForm.value.titulo.trim() || !rutinaForm.value.instrucciones.trim() || !rutinaForm.value.repeticiones.trim()) {
    return alert("Todos los campos son obligatorios")
  }

  try {
    console.log("Guardando rutina para cliente:", clienteSeleccionado.value)
    const rutinasRef = collection(db, "usuarios", clienteSeleccionado.value, "rutinas")

    if (rutinaEditando.value) {
      if (!rutinaEditando.value.id) throw new Error("ID de rutina vacío")
      const rutinaDocRef = doc(rutinasRef, rutinaEditando.value.id)
      await updateDoc(rutinaDocRef, { ...rutinaForm.value, fecha: new Date() })
      alert("Rutina actualizada correctamente")
    } else {
      await addDoc(rutinasRef, { ...rutinaForm.value, fecha: new Date() })
      alert("Rutina agregada correctamente")
    }

    cerrarModal()
    await cargarRutinas()
  } catch (error) {
    console.error("Error guardando rutina:", error)
    alert("Ocurrió un error al guardar la rutina: " + error.message)
  }
}

// 🔹 Eliminar rutina
const eliminarRutina = async (id) => {
  if (!confirm("¿Eliminar esta rutina?")) return
  try {
    await deleteDoc(doc(db, "usuarios", clienteSeleccionado.value, "rutinas", id))
    await cargarRutinas()
  } catch (error) {
    console.error("Error eliminando rutina:", error)
    alert("Ocurrió un error al eliminar la rutina")
  }
}

// 🔹 Inicial
onMounted(async () => {
  await cargarClientesSinRoles()
  cargando.value = false
})
</script>


<style scoped>
.container {
  background-color: #0d1117;
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

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1rem;
}

h1 {
  text-align: center;
  color: #00bfff;
  font-size: 1.6rem;
  margin: 0 auto;
  margin-bottom: 0.5rem;
  font-weight: 900;
  width: 100%;
  max-width: 470px;

  
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

.rutinas {
  list-style: none;
  padding: 0px;
  margin: 0px;
  gap: 1rem;
  max-height: 60vh;
  text-transform: uppercase;
  overflow-y: auto;
  scrollbar-width: none;
}

.card {
  display: flex;
  list-style: none;
  padding: 1rem;
  margin: 1rem auto;
  background-color: rgba(0, 0, 0, 0.577);
  backdrop-filter: blur(2px);
  color: rgb(255, 255, 255);
  border-radius: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 350px;
  width: 100%;
  height: auto;
  justify-content: space-between;
}

.card > h3 {
  margin: 0.5rem 0;
  font-size: 10px;
  color: #00bfff;
  font-weight: 900;
}

.card > p {
  margin: 0.5rem 0;
  font-size: 10px;
  font-weight: 900;
}

.edit_btn {
  padding: 8px 12px;
  background-color: #008CFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 8px;
  font-size: 12px;
}

.edit_btn:hover {
  background-color: #070038;
}

.delete_btn {
  padding: 08px 12px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
}

.delete_btn:hover {
  background-color: #e60000;
}

.card li {
  margin-bottom: 1rem;
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

.add-btn {
  padding: 10px 15px;
  background-color: #008CFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background-color: #070038;
}

.rutina-info {
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
}

.save-btn {
  padding: 10px 15px;
  background-color: #008CFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

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
