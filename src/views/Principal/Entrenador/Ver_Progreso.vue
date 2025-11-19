<template>
  <div class="container">
    <!-- Header con Botón Volver -->
    <div class="header-actions">
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 42 42"
        @click="$router.push('/P_P_Entrenador')" class="back-icon">
        <path fill="#00bfff" fill-rule="evenodd"
          d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z" />
      </svg>
      <h1>CLIENTES</h1>
    </div>

    <!-- Selección de cliente -->
    <div class="selection-area">
      <label for="cliente">SELECCIONA UN ATLETA:</label>
      <select v-model="clienteSeleccionado" @change="cargarProgresoCompleto">
        <option value="" disabled>-- Seleccionar --</option>
        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
          {{ cliente.nombre || 'Usuario' }} ({{ cliente.email }})
        </option>
      </select>
    </div>

    <!-- Loading State -->
    <div v-if="cargando" class="loading">
      <div class="loadbar"></div>
    </div>

    <!-- Contenido Principal -->
    <div v-else-if="clienteSeleccionado" class="dashboard">

      <!-- Tarjeta de Resumen del Cliente -->
      <div class="client-summary-card">
        <div class="client-avatar">
            <img
              :src="clienteSeleccionadoInfo.photoURL || clienteSeleccionadoInfo.foto || clienteSeleccionadoInfo.imagen"
              alt="Avatar"
            />
        </div>
        <div class="client-details">
          <h2>{{ clienteSeleccionadoInfo.nombre || 'Sin Nombre' }}</h2>
          <p class="detail-item"> {{ clienteSeleccionadoInfo.email }}</p>
          <div class="stats-row">
            <span class="stat"> {{ clienteSeleccionadoInfo.edad || '--' }} años</span>
            <span class="stat"> {{ clienteSeleccionadoInfo.peso || '--' }} kg (Inicial)</span>
            <span class="stat"> {{ clienteSeleccionadoInfo.altura || '--' }} cm</span>
          </div>
        </div>
      </div>

      <!-- Pestañas de Navegación del Dashboard -->
      <div class="dashboard-tabs">
        <button :class="['tab-btn', { active: activeTab === 'rutinas' }]" @click="activeTab = 'rutinas'">🏋️
          Rutinas</button>
        <button :class="['tab-btn', { active: activeTab === 'nutricion' }]" @click="activeTab = 'nutricion'">🍎
          Nutrición</button>
        <!-- <button :class="['tab-btn', { active: activeTab === 'medidas' }]" @click="activeTab = 'medidas'">📉
          Medidas</button> -->
      </div>

      <!-- VISTA 1: PROGRESO DE RUTINAS -->
      <section v-if="activeTab === 'rutinas'" class="tab-pane">
        <div v-if="rutinas.length === 0" class="empty-state">No hay rutinas asignadas a este cliente.</div>
        <div v-else class="cards-grid">
          <article v-for="rutina in rutinas" :key="rutina.id" class="progress-card routine-style">
            <div class="card-header">
              <h3>{{ rutina.titulo }}</h3>
              <span :class="'dificultad-badge ' + rutina.dificultad">{{ rutina.dificultad }}</span>
            </div>
            <div class="progress-section">
              <div class="progress-label">
                <span>Cumplimiento Reciente</span>
                <span>{{ Math.round(calculateCompliance(rutina)) }}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" :style="{ width: calculateCompliance(rutina) + '%' }"></div>
              </div>
            </div>
            <p class="card-date">Asignado: {{ formatearFecha(rutina.fechaAsignacion) }}</p>
          </article>
        </div>
      </section>

      <!-- VISTA 2: PROGRESO DE NUTRICIÓN -->
      <section v-if="activeTab === 'nutricion'" class="tab-pane">
        <div v-if="planesNutricion.length === 0" class="empty-state">No hay planes de nutrición asignados.</div>
        <div v-else class="cards-grid">
          <article v-for="plan in planesNutricion" :key="plan.id" class="progress-card nutrition-style">
            <div class="card-header">
              <h3>{{ plan.titulo }}</h3>
              <span class="icon">🥦</span>
            </div>
            <div class="progress-section">
              <div class="progress-label">
                <span>Adherencia al Plan</span>
                <span>{{ Math.round(calculateCompliance(plan)) }}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill nutrition-fill" :style="{ width: calculateCompliance(plan) + '%' }"></div>
              </div>
            </div>
            <p class="card-date">Asignado: {{ formatearFecha(plan.fechaAsignacion) }}</p>
          </article>
        </div>
      </section>

      <!-- VISTA 3: HISTORIAL DE MEDIDAS (Avances) -->
      <!-- <section v-if="activeTab === 'medidas'" class="tab-pane">
        <div v-if="avances.length === 0" class="empty-state">No hay registros de peso/medidas.</div>
        <div v-else class="measurements-list">
          <div v-for="avance in avances" :key="avance.id" class="measurement-item">
            <div class="measurement-date">
              {{ formatearFechaTimestamp(avance.fecha) }}
            </div>
            <div class="measurement-data">
              <div class="data-point">
                <span class="label">Peso</span>
                <span class="value">{{ avance.peso }} kg</span>
              </div>
              <div class="data-point">
                <span class="label">IMC</span>
                <span class="value">{{ avance.imc || '--' }}</span>
              </div>
            </div>
            <div v-if="avance.observaciones" class="measurement-notes">
              "{{ avance.observaciones }}"
            </div>
          </div>
        </div>
      </section> -->

    </div>

    <!-- Estado Vacío Inicial -->
    <div v-else class="welcome-state">
      <p>Selecciona un cliente para revisar su rendimiento.</p>
    </div>
  </div>

  <!-- Navegación -->
  <nav class="bottom-nav">
    <button class="nav-btn" @click="$router.push('/P_P_Entrenador')">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg>
    </button>
    <button class="nav-btn" @click="$router.push('/Ver_Progreso')">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 32 32"><path fill="currentColor" d="M 15.458984 3.0117188 A 13 13 0 0 0 16 29 A 13.015 13.015 0 0 0 29 16 A 13 13 0 0 0 15.458984 3.0117188 z M 16 5 A 11.013 11.013 0 0 1 27 16 A 11 11 0 1 1 16 5 z M 12.960938 9.9980469 A 0.993 0.993 0 0 0 12.142578 10.484375 L 9.4335938 15 L 7 15 A 1 1 0 0 0 7 17 L 10 17 A 1 1 0 0 0 10.857422 16.515625 L 12.820312 13.242188 L 16.070312 21.371094 A 1 1 0 0 0 16.853516 21.988281 A 0.9 0.9 0 0 0 17 22 A 1 1 0 0 0 17.779297 21.625 L 21.480469 17 L 25 17 A 1 1 0 0 0 25 15 L 21 15 A 1 1 0 0 0 20.21875 15.371094 L 17.291016 19.03125 L 13.929688 10.625 A 1 1 0 0 0 13.080078 10 A 0.993 0.993 0 0 0 12.960938 9.9980469 z"/></svg>
    </button>
    <button class="nav-btn" @click="$router.push('/Perfil_U_E')">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clip-rule="evenodd"/></svg>
    </button>
    <button class="nav-btn" @click="$router.push('/Configuracion_E')">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0,0,256,256"><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path fill="currentColor" d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g></svg>
    </button>
  </nav>
</template>


<script setup>
import { ref, onMounted } from "vue"
import { db } from "@/firebase"
import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore"

const clientes = ref([])
const clienteSeleccionado = ref("")
const clienteSeleccionadoInfo = ref({})
const rutinas = ref([])
const planesNutricion = ref([])
const avances = ref([])
const cargando = ref(false)
const activeTab = ref('rutinas')

// --- Cargar Clientes ---
const cargarClientes = async () => {
  try {
    const snapshot = await getDocs(collection(db, "usuarios"))
    clientes.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(u => !u.rol || u.rol === "cliente")
  } catch (error) {
    console.error("Error cargando clientes:", error)
  }
}

// --- Cargar Datos Completos del Cliente Seleccionado ---
const cargarProgresoCompleto = async () => {
  if (!clienteSeleccionado.value) return
  cargando.value = true

  try {
    const userId = clienteSeleccionado.value

    // 1. Info Básica
    const userDoc = await getDoc(doc(db, "usuarios", userId))
    clienteSeleccionadoInfo.value = userDoc.exists() ? userDoc.data() : {}

    // 2. Rutinas
    const rutinasSnap = await getDocs(collection(db, "usuarios", userId, "rutinas"))
    rutinas.value = rutinasSnap.docs.map(d => ({ id: d.id, ...d.data() }))

    // 3. Planes de Nutrición
    const nutriSnap = await getDocs(collection(db, "usuarios", userId, "planesNutricion"))
    planesNutricion.value = nutriSnap.docs.map(d => ({ id: d.id, ...d.data() }))

    // 4. Avances/Medidas (Ordenados por fecha si es posible)
    // Intenta usar orderBy, si falla por falta de índice, usa sin ordenar y ordena en cliente
    try {
      const qAvances = query(collection(db, "usuarios", userId, "avances"), orderBy("fecha", "desc"));
      const avancesSnap = await getDocs(qAvances);
      avances.value = avancesSnap.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (e) {
      console.warn("Índice faltante para ordenar avances, cargando sin orden:", e);
      const avancesSnap = await getDocs(collection(db, "usuarios", userId, "avances"));
      avances.value = avancesSnap.docs.map(d => ({ id: d.id, ...d.data() }))
    }

  } catch (error) {
    console.error("Error cargando datos del cliente:", error)
  } finally {
    cargando.value = false
  }
}

// --- Utilidades ---
const obtenerIniciales = (nombre) => {
  if (!nombre) return "US";
  return nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

const formatearFecha = (iso) => {
  try { return new Date(iso).toLocaleDateString(); } catch { return ''; }
}

const formatearFechaTimestamp = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return 'Fecha desconocida';
  return new Date(timestamp.seconds * 1000).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

// Cálculo simplificado de cumplimiento para mostrar algo visual
// Se basa en contar cuántos 'checks' verdaderos existen en el historial total
const calculateCompliance = (item) => {
  if (!item.progress) return 0;
  let totalChecks = 0;
  let totalDaysLogged = 0;

  Object.values(item.progress).forEach(day => {
    totalDaysLogged++;
    // Cuenta cuántos true hay en ese día
    totalChecks += Object.values(day).filter(v => v === true).length;
  });

  if (totalDaysLogged === 0) return 0;

  // Estimación rápida: promedio de 3 tareas cumplidas por día registrado = 100%
  // Ajusta este factor según la exigencia real de tus planes
  const score = (totalChecks / (totalDaysLogged * 3)) * 100;
  return Math.min(score, 100);
}

onMounted(() => {
  cargarClientes()
})
</script>

<style scoped>
/* === BASE STYLES === */
.container {
  background-color: #0d1117;
  height: auto;
  min-height: 100vh;
  padding: 20px 20px 100px;
  color: #c9d1d9;
  font-family: 'Segoe UI', sans-serif;
  box-sizing: border-box;
  margin: 0 auto;
}

.header-actions {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  margin-top: 20px;
}

.back-icon {
  cursor: pointer;
  transition: transform 0.2s;
}

.back-icon:hover {
  transform: scale(1.1);
}

.header-actions h1 {
  flex-grow: 1;
  text-align: left;
  color: #00bfff;
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0 20px;
  padding-right: 30px;
}

/* === SELECTION AREA === */
.selection-area {
  background: #161b22;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #30363d;
  margin-bottom: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.selection-area label {
  display: block;
  color: #00bfff;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

select {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: #0d1117;
  color: white;
  border: 1px solid #30363d;
  font-size: 0.75rem;
  outline: none;
  cursor: pointer;
}

select > option {
  background-color: #0f1620;
  color: #e6eef6;
  padding: 8px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
}

/* Estado de marcador/placeholder deshabilitado */
select > option:disabled {
  color: #7a848c;
  font-weight: 500;
}

/* Opción seleccionada (algunos navegadores usan :checked o [selected]) */
select > option:checked,
select > option[selected] {
  background-color: #00bfff;
  color: #0d1117;
  font-weight: 700;
}

/* Efecto hover (puede variar según navegador) */
select > option:hover {
  background-color: rgba(8, 164, 255, 0.08);
  color: #e6f7ff;
}

/* === CLIENT SUMMARY CARD === */
.client-summary-card {
  display: flex;
  align-items: flex-start;
  background: linear-gradient(145deg, #161b22, #1c2128);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #30363d;
  margin-bottom: 25px;
}

.client-avatar {
  width: 100%;
  max-width: 80px;
  aspect-ratio: 1 / 1;
  height: 100%;
  background: #00bfffc5;
  border-radius: 50%;
  border: 3px solid #08a4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #0d1117;
  margin-right: 20px;
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.401);
}
.client-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.client-details h2 {
  margin: 0 0 5px 0;
  color: white;
  font-size: 1.4rem;
}

.detail-item {
  color: #8b949e;
  margin: 0 0 10px 0;
  font-size: 0.9rem;
}

.stats-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.stat {
  background: #0d1117;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid #30363d;
}

/* === DASHBOARD TABS === */
.dashboard {
  margin-top: 10px;
  /* allow vertical scrolling but keep scrollbar invisible while remaining functional */
  max-height: calc(100vh - 240px); /* adjust if needed to fit header/footer space */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}

/* WebKit browsers */
.dashboard::-webkit-scrollbar {
  display: none;
}

.dashboard-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid #30363d;
  padding-bottom: 0;
}

.tab-btn {
  background: none;
  border: none;
  color: #8b949e;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 8px 8px 0 0;
}

.tab-btn.active {
  background-color: #00bfff;
  color: #0d1117;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.4);
}

/* === CARDS GRID (Used for Routines & Nutrition) === */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}

.progress-card {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 15px;
  transition: all 0.3s ease;
}

.progress-card:hover {
  transform: translateY(-3px);
  border-color: #58a6ff;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.card-header h3 {
  margin: 0;
  color: white;
  font-size: 1.1rem;
}

/* Badges & Icons */
.dificultad-badge {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: bold;
}

.dificultad-badge.facil {
  background: #238636;
  color: white;
}

.dificultad-badge.intermedio {
  background: #d29922;
  color: #0d1117;
}

.dificultad-badge.avanzado {
  background: #da3633;
  color: white;
}

.icon {
  font-size: 1.5rem;
}

/* Progress Bars */
.progress-section {
  margin-bottom: 12px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #8b949e;
  margin-bottom: 5px;
}

.progress-track {
  height: 8px;
  background: #0d1117;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #30363d;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00bfff, #58a6ff);
  transition: width 0.5s ease;
}

.nutrition-fill {
  background: linear-gradient(90deg, #238636, #3fb950);
}

.card-date {
  font-size: 0.8rem;
  color: #58a6ff;
  text-align: right;
  margin: 0;
}

/* === MEASUREMENTS LIST === */
.measurements-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.measurement-item {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.measurement-date {
  color: #00bfff;
  font-weight: bold;
  font-size: 0.95rem;
  border-bottom: 1px solid #30363d;
  padding-bottom: 8px;
}

.measurement-data {
  display: flex;
  gap: 20px;
}

.data-point {
  display: flex;
  flex-direction: column;
}

.data-point .label {
  font-size: 0.8rem;
  color: #8b949e;
  text-transform: uppercase;
}

.data-point .value {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.measurement-notes {
  background: #0d1117;
  padding: 10px;
  border-radius: 8px;
  font-style: italic;
  color: #8b949e;
  font-size: 0.9rem;
}

/* === STATES & LOADING === */
.loading {
  display: flex;
  justify-content: center;
  margin-top: 50px;
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

.empty-state,
.welcome-state {
  text-align: center;
  padding: 40px 20px;
  color: #8b949e;
  border: 2px dashed #30363d;
  border-radius: 12px;
  font-size: 1.1rem;
}

.welcome-state {
  margin-top: 20px;
  background: #161b22;
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
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #585b5ea0;
  z-index: 900;
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
  background-color: #00bfff;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 191, 255, 0.3);
}
</style>
