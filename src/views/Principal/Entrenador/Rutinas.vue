<template>
  <div class="container">
    <!-- Título -->
    <div class="title">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
        viewBox="0 0 42 42" @click="$router.push('/Gestion_U')">
        <path fill="#00bfff" fill-rule="evenodd"
          d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z" />
      </svg>
      <h3>Asignar Rutinas Personalizadas</h3>
    </div>

    <!-- Selección de cliente -->
    <div class="clientes">
      <label for="cliente">Seleccionar cliente:</label>
      <select id="cliente" v-model="clienteSeleccionado" @change="cargarRutinas">
        <option disabled value="">-- Selecciona un cliente --</option>
        <option v-for="c in clientes" :key="c.id" :value="c.id">
          {{ c.nombre }} {{ c.apellido }}
        </option>
      </select>
    </div>

    <!-- Estado de carga -->
    <div v-if="cargando">
      <p>Cargando información...</p>
    </div>

    <!-- Rutinas del cliente seleccionado -->
    <div v-else-if="clienteSeleccionado && rutinas.length > 0">
      <div class="rutinas">
        <div class="rutina-card" v-for="rutina in rutinas" :key="rutina.id">
          <h4>{{ rutina.titulo }}</h4>
          <p>{{ rutina.instrucciones }}</p>
          <p>Repeticiones: {{ rutina.repeticiones }}</p>
          <div class="acciones">
            <button @click="editarRutina(rutina)">Editar</button>
            <button @click="eliminarRutina(rutina.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Si no hay rutinas -->
    <div v-else-if="clienteSeleccionado">
      <p>No tiene rutinas asignadas aún</p>
    </div>

    <!-- Botón para abrir modal -->
    <div v-if="clienteSeleccionado" class="btn">
      <button class="btn-agregar" @click="abrirModal">Agregar Rutina</button>
    </div>

    <!-- Modal -->
    <div v-if="modalVisible" class="modal-overlay">
      <div class="modal">
        <h4>{{ rutinaEditando ? 'Editar Rutina' : 'Agregar Rutina' }}</h4>
        <input type="text" v-model="rutinaForm.titulo" placeholder="Título de la rutina" />
        <textarea v-model="rutinaForm.instrucciones" placeholder="Instrucciones de la rutina"></textarea>
        <input type="text" v-model="rutinaForm.repeticiones" placeholder="Repeticiones" />

        <div class="modal-actions">
          <button @click="guardarRutinaModal">{{ rutinaEditando ? 'Guardar Cambios' : 'Agregar' }}</button>
          <button @click="cerrarModal">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Navegación inferior -->
    <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/Gestion_U')">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor"
          d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4z"/></svg>
      </button>
      <!-- Otros botones igual que antes -->
    </nav>
  </div>
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

// Cargar lista de clientes
const cargarClientes = async () => {
  try {
    const clientesSnap = await getDocs(collection(db, "usuarios"))
    clientes.value = clientesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error cargando clientes:", error)
  }
}

// Cargar rutinas del cliente seleccionado
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

// Modal
const abrirModal = () => {
  rutinaEditando.value = null
  rutinaForm.value = { titulo: "", instrucciones: "", repeticiones: "" }
  modalVisible.value = true
}
const cerrarModal = () => {
  modalVisible.value = false
}

// Editar rutina
const editarRutina = (rutina) => {
  rutinaEditando.value = rutina
  rutinaForm.value = { ...rutina }
  modalVisible.value = true
}

// Guardar rutina
const guardarRutinaModal = async () => {
  if (!clienteSeleccionado.value) return alert("Selecciona un cliente")
  if (!rutinaForm.value.titulo.trim()) return alert("Ingrese un título")
  try {
    if (rutinaEditando.value) {
      await updateDoc(doc(db, "usuarios", clienteSeleccionado.value, "rutinas", rutinaEditando.value.id), { ...rutinaForm.value })
    } else {
      await addDoc(collection(db, "usuarios", clienteSeleccionado.value, "rutinas"), { ...rutinaForm.value, fecha: new Date() })
    }
    cerrarModal()
    await cargarRutinas()
  } catch (error) {
    console.error("Error guardando rutina:", error)
  }
}

// Eliminar rutina
const eliminarRutina = async (id) => {
  if (!confirm("¿Eliminar esta rutina?")) return
  try {
    await deleteDoc(doc(db, "usuarios", clienteSeleccionado.value, "rutinas", id))
    await cargarRutinas()
  } catch (error) {
    console.error("Error eliminando rutina:", error)
  }
}

// Inicial
onMounted(async () => {
  await cargarClientes()
  cargando.value = false
})
</script>

<style scoped>
/* Puedes usar el mismo estilo que ya tenías, solo agrego el select */
.clientes {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.clientes select {
  padding: 8px;
  border-radius: 6px;
  border: none;
  outline: none;
}
</style>
