<template>
  <div class="container">
    <header class="header">
      <h1>Rutinas</h1>
      <div class="filters">
        <input v-model="search" placeholder="Buscar rutina..." />
        <select v-model="selectedLevel">
          <option value="all">Todos</option>
          <option value="beginner">Facil</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>
      </div>
    </header>

    <section class="sections">
      <div class="section" v-for="group in groupedLevels" :key="group.key">
        <h2>{{ group.label }}</h2>
        <div class="routines-grid">
          <article @click="openRoutine(routine)" v-for="routine in filteredByLevel(group.key)" :key="routine.id"
            class="routine-card">
            <h3>{{ routine.title }}</h3>
            <p>{{ routine.description }}</p>
            <small>Duración: {{ routine.duration }}</small>
          </article>
        </div>
      </div>

      <div class="section">
        <h2>Rutinas sugeridas por tu entrenador</h2>
        <div class="routines-grid">
          <article v-for="rutina in trainerSuggested" :key="rutina.id" class="routine-card"
            @click="openRoutine(rutina)">
            <h3>{{ rutina.titulo }}</h3>
            <p>{{ rutina.dificultad }}</p>
          </article>
        </div>
      </div>
    </section>

    <div v-if="activeRoutine" class="modal" @click.self="closeRoutine">
      <div class="modal-content">
        <header>
          <h3>{{ activeRoutine.titulo }}</h3>
          <button class="btn_close" @click="closeRoutine">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
              <path
                d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z">
              </path>
            </svg>
          </button>
        </header>
        <p>{{ activeRoutine.instrucciones }}</p>
        <h4>Ejercicios:</h4>
        <ul>
          <li v-for="(ex, i) in activeRoutine.ejercicios" :key="i">
            {{ ex.nombre }} - {{ ex.repeticiones }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <nav class="bottom-nav">
    <button class="nav-btn" @click="$router.push('/Rutinas_C')">
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#000000">
        <path fill="#000000" fill-rule="evenodd"
          d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3m2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z"
          clip-rule="evenodd" />
      </svg>
    </button>
    <button class="nav-btn" @click="$router.push('/Membresias_C')">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
        <path fill="currentColor"
          d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z" />
      </svg>
    </button>
    <button class="nav-btn" @click="$router.push('/P_Principal_C')">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025">
        <path fill="currentColor"
          d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z" />
      </svg>
    </button>
    <button class="nav-btn" @click="$router.push('/Perfil_U')">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
        <path fill="currentColor" fill-rule="evenodd"
          d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z"
          clip-rule="evenodd" />
      </svg>
    </button>
    <button class="nav-btn" @click="$router.push('/Configuracion_C')">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
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
import { ref, computed, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const user = ref(null);

// --------------------------------------------------
// Cargar rutinas sugeridas desde Firestore
// --------------------------------------------------
const cargarRutinasSugeridas = async (uid) => {
  try {
    if (!uid) {
      console.warn("No se encontró UID del usuario");
      return;
    }

    // Ruta correcta en tu estructura Firestore
    const rutinasRef = collection(db, "usuarios", uid, "rutinas");
    const snapshot = await getDocs(rutinasRef);

    trainerSuggested.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Rutinas sugeridas cargadas:", trainerSuggested.value);
  } catch (error) {
    console.error("Error cargando rutinas sugeridas:", error);
  }
};

// --------------------------------------------------
// Detectar usuario autenticado y cargar rutinas
// --------------------------------------------------
onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, (u) => {
    if (u) {
      user.value = u; // Guarda el usuario
      cargarRutinasSugeridas(u.uid);
    } else {
      console.log("No hay usuario autenticado");
    }
  });
});

const search = ref("");
const selectedLevel = ref("all");
const activeRoutine = ref(null);

// Rutinas locales / generales
const routines = ref([
  {
    id: 1,
    title: "Rutina de calentamiento",
    level: "beginner",
    duration: "15 Min",
    description: "",
  },
]);


// Rutinas sugeridas por el entrenador (cargadas dinámicamente)
const trainerSuggested = ref([]);

// Agrupación por niveles para mostrar secciones
const groupedLevels = [{ key: "beginner", label: "Instrucciones" }];

// Computed para filtrar rutinas por búsqueda y nivel
const filteredRoutines = computed(() => {
  const q = search.value.toLowerCase().trim();
  return routines.value.filter((r) => {
    const matchesSearch =
      q === "" ||
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    const matchesLevel =
      selectedLevel.value === "all" || r.level === selectedLevel.value;
    return matchesSearch && matchesLevel;
  });
});

// Filtrar rutinas por nivel dentro de cada sección
function filteredByLevel(levelKey) {
  return filteredRoutines.value.filter((r) => r.level === levelKey);
}

// Abrir modal de rutina
function openRoutine(routine) {
  activeRoutine.value = routine;
  document.body.style.overflow = "hidden"; // Bloquea scroll del fondo
}

// Cerrar modal de rutina
function closeRoutine() {
  activeRoutine.value = null;
  document.body.style.overflow = ""; // Restaura scroll
}

// Marcar o desmarcar rutina como favorita
function toggleFavorite(routine) {
  routine.fav = !routine.fav;
}
</script>

<style scoped>
:root {
  --bg-dark: #0d1117;
  --bg-card: #161b22;
  --primary: #238636;
  --accent: #f1c40f;
  --text-color: #c9d1d9;
  --text-muted: #8b949e;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0d1117;
  color: #c9d1d9;
  margin: 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Arial, sans-serif;
  background-color: #0d1117;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  border-bottom: 1px solid #30363d;
  padding-bottom: 10px;
}

.header h1 {
  font-size: 28px;
  color: #0059ff;
}

.filters {
  display: flex;
  gap: 10px;
}

.filters input,
.filters select {
  padding: 8px 10px;
  border: 1px solid #30363d;
  border-radius: 6px;
  background: #161b22;
  color: #c9d1d9;
}

.filters input::placeholder {
  color: #8b949e;
}

.sections {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.section h2 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #0059ff;
  border-left: 4px solid #0059ff;
  padding-left: 10px;
}

.routines-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.routine-card {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 15px;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  text-transform: uppercase;
}

.btn_close>svg {
  fill: #ff0000;
}

.routine-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

.routine-card h3 {
  color: #ffffff;
  font-size: 18px;
}

.routine-card p {
  color: #8b949e;
  font-size: 14px;
}

.routine-card small {
  color: #8b949e;
}

.actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.actions button {
  background: transparent;
  color: #c9d1d9;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.actions button:hover {
  background: #0059ff;
  color: white;
}

.actions .fav {
  color: #f1c40f;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(4px);
  width: 100%;
}

.modal-content {
  background: #161b22;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  color: #c9d1d9;
  overflow-y: auto;
  max-height: 90vh;
}

.modal-content header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #30363d;
  padding-bottom: 8px;
  margin-bottom: 10px;
}

.modal-content button {
  background: #1b6bff00;
  color: white;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.modal-content button:hover {
  opacity: 0.8;
}

.modal-content ul {
  margin-top: 10px;
  list-style-type: disc;
  padding-left: 20px;
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
  color: #008cff;
}

.nav-btn svg {
  width: 34px;
  height: 34px;
}

.nav-btn svg path {
  fill: currentColor;
}

.nav-btn.active {
  color: #008cff;
}

.nav-btn.active svg path {
  fill: #008cff;
}
</style>
