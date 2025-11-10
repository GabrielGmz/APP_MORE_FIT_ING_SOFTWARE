<template>
  <div class="container">
    <h2>Membresías del Gimnasio</h2>

    <!-- FORMULARIO PARA AGREGAR NUEVA MEMBRESÍA -->
    <div class="formulario">
      <input v-model="nuevaMembresia.nombre" type="text" placeholder="Nombre de la membresía" />
      <input v-model="nuevaMembresia.precio" type="number" placeholder="Precio ($)" />
      <input v-model="nuevaMembresia.duracion" type="text" placeholder="Duración (ej. 1 mes)" />
      <textarea v-model="nuevaMembresia.descripcion" placeholder="Descripción breve"></textarea>
      <button @click="agregarMembresia">Subir Membresía</button>
    </div>

    <!-- LISTA DE MEMBRESÍAS SUBIDAS -->
    <div class="membresia_list">
      <h3>Lista de Membresías</h3>
      <div class="cards">
        <div v-for="(membresia, index) in membresias" :key="membresia.id" class="card">
          <h4>{{ membresia.nombre }}</h4>
          <p>{{ membresia.descripcion }}</p>
          <p><b>Precio:</b> ${{ membresia.precio }}</p>
          <p><b>Duración:</b> {{ membresia.duracion }}</p>
          <button class="btn-delete" @click="eliminarMembresia(membresia.id)">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { db } from "@/firebase"
import { collection, getDocs, doc, updateDoc, getDoc } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const membresias = ref([])
const membresiaActivaId = ref(null)
const membresiaActiva = ref(null)
const metodoPago = ref(null)
const metodoSeleccionado = ref("")
const userId = ref(null) // ID dinámico del usuario

// 🔹 Cargar membresías globales
const cargarMembresias = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "membresias"))
    membresias.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error("Error al cargar membresías:", error)
  }
}

// 🔹 Cargar datos del usuario autenticado
const cargarUsuario = async (uid) => {
  try {
    const userRef = doc(db, "usuarios", uid)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
      membresiaActivaId.value = userSnap.data().membresiaActivaId || null
      metodoPago.value = userSnap.data().metodoPago || null

      if (membresiaActivaId.value) {
        const membRef = doc(db, "membresias", membresiaActivaId.value)
        const membSnap = await getDoc(membRef)
        if (membSnap.exists()) membresiaActiva.value = membSnap.data()
      }
    }
  } catch (error) {
    console.error("Error al cargar usuario:", error)
  }
}

// 🔹 Activar membresía
const activarMembresia = async (memb) => {
  if (!userId.value) return alert("Debes iniciar sesión para activar una membresía")

  try {
    const userRef = doc(db, "usuarios", userId.value)
    await updateDoc(userRef, {
      membresiaActivaId: memb.id,
      metodoPago: metodoSeleccionado.value
    })
    membresiaActivaId.value = memb.id
    membresiaActiva.value = memb
    metodoPago.value = metodoSeleccionado.value
    alert(`✅ Has activado la membresía ${memb.nombre}`)
  } catch (error) {
    console.error("Error al activar membresía:", error)
  }
}

// 🔹 Cancelar membresía
const cancelarMembresia = async () => {
  if (!userId.value) return

  try {
    const userRef = doc(db, "usuarios", userId.value)
    await updateDoc(userRef, {
      membresiaActivaId: null,
      metodoPago: null
    })
    membresiaActivaId.value = null
    membresiaActiva.value = null
    metodoPago.value = null
    alert("❌ Membresía cancelada.")
  } catch (error) {
    console.error("Error al cancelar membresía:", error)
  }
}

// 🔹 Esperar a que Firebase Auth esté listo
onMounted(() => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId.value = user.uid
      cargarUsuario(user.uid)
    }
    cargarMembresias() // se cargan siempre, logueado o no
  })
})
</script>


<style scoped>
.container {
  background-color: #000a12;
  color: white;
  min-height: 100vh;
  padding: 2rem 1rem;
}

h2, h3 {
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-inline: auto;
}

.formulario input, textarea {
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  outline: none;
  background: #111;
  color: white;
}

.formulario button {
  background: #007bff;
  border: none;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-weight: bold;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.card {
  background: #111;
  padding: 1rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(255,255,255,0.1);
}

.btn-delete {
  background: #ff3b30;
  border: none;
  padding: 0.5rem;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  margin-top: 0.5rem;
}
</style>
