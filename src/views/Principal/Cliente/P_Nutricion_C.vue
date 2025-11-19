<template>
  <div class="container">
    <header class="header">
      <h1>Mis Planes</h1>
    </header>

    <div v-if="loading" class="loading">
      <div class="loadbar"></div>
    </div>

    <section v-else class="content-wrapper">
      <div v-if="planes.length === 0" class="empty-state">
        <p>Aún no tienes planes de nutrición asignados.</p>
      </div>

      <div v-else class="plans-grid">
        <article
          v-for="plan in planes"
          :key="plan.id"
          class="plan-card"
          @click="abrirPlan(plan)"
        >
          <div class="card-header">
            <h3>{{ plan.titulo }}</h3>
            <span class="icon">🍎</span>
          </div>
          <p class="card-summary">
            {{
              plan.instrucciones
                ? plan.instrucciones.substring(0, 60) + "..."
                : "Ver detalles"
            }}
          </p>

          <!-- Barra de progreso semanal -->
          <div class="mini-progress">
            <div class="progress-text">Progreso Semanal</div>
            <div class="progress-track">
              <div
                class="progress-bar"
                :style="{ width: calculateWeeklyProgress(plan) + '%' }"
              ></div>
            </div>
          </div>

          <div class="card-footer">
            <span class="date" v-if="plan.fechaAsignacion"
              >Asignado: {{ formatearFecha(plan.fechaAsignacion) }}</span
            >
          </div>
        </article>
      </div>
    </section>

    <!-- MODAL DE SEGUIMIENTO SEMANAL -->
    <div
      v-if="modalVisible && activePlan"
      class="modal"
      @click.self="cerrarModal"
    >
      <div class="modal-content">
        <header class="modal-header">
          <h2>{{ activePlan.titulo }}</h2>
        </header>

        <div class="modal-body">
          <!-- Pestañas de Información vs Seguimiento -->
          <div class="tabs">
            <button
              :class="['tab-btn', { active: activeTab === 'info' }]"
              @click="activeTab = 'info'"
            >
              Plan
            </button>
            <button
              :class="['tab-btn', { active: activeTab === 'track' }]"
              @click="activeTab = 'track'"
            >
              Seguimiento
            </button>
          </div>

          <!-- VISTA 1: INFORMACIÓN DEL PLAN -->
          <div v-if="activeTab === 'info'" class="tab-content">
            <div class="info-group">
              <label>Instrucciones Generales</label>
              <div class="info-box">
                {{ activePlan.instrucciones || "Sin instrucciones." }}
              </div>
            </div>
            <div class="info-group">
              <label>Plan de Comidas</label>
              <div class="info-box meals-box">
                {{ activePlan.comidas || "Sin detalles de comidas." }}
              </div>
            </div>
          </div>

          <!-- VISTA 2: SEGUIMIENTO SEMANAL -->
          <div v-if="activeTab === 'track'" class="tab-content">
            <!-- Selector de Días de la Semana -->
            <div class="week-selector">
              <button
                v-for="day in weekDays"
                :key="day.iso"
                class="day-btn"
                :class="{
                  active: selectedDayISO === day.iso,
                  'is-today': day.iso === getTodayISO(),
                }"
                @click="selectedDayISO = day.iso"
              >
                <span class="day-name">{{ day.name }}</span>
                <span class="day-num">{{ day.num }}</span>
                <!-- Puntito indicador si hay algo marcado ese día -->
                <span
                  v-if="hasProgressForDay(day.iso)"
                  class="day-indicator"
                ></span>
              </button>
            </div>

            <div class="daily-checklist">
              <h3>
                Registro para:
                <span class="highlight">{{
                  formatDateLong(selectedDayISO)
                }}</span>
              </h3>

              <div class="checklist-container">
                <div
                  v-for="mealType in mealTypes"
                  :key="mealType"
                  class="checklist-item"
                  :class="{
                    'is-checked': isMealDone(selectedDayISO, mealType),
                  }"
                  @click="toggleDailyMeal(selectedDayISO, mealType)"
                >
                  <div class="checkbox">
                    <span v-if="isMealDone(selectedDayISO, mealType)">✓</span>
                  </div>
                  <span class="meal-text">{{ mealType }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="modal-footer">
          <button class="close-btn" @click="cerrarModal">CERRAR</button>
        </footer>
      </div>
    </div>

    <!-- Navegación Inferior -->
    <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/Rutinas_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#000000"><path fill="currentColor" fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3m2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Membresias_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/P_Principal_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Perfil_U_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Configuracion_C')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill="currentColor" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g>
</svg></button>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { db, auth } from "@/firebase";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const planes = ref([]);
const loading = ref(true);
const modalVisible = ref(false);
const activePlan = ref(null);
const activeTab = ref("track"); // 'info' o 'track'
const selectedDayISO = ref("");

// Tipos de comida estándar para el checklist
const mealTypes = ["Desayuno", "Almuerzo", "Cena", "Snack"];

// --- GENERACIÓN DE DÍAS DE LA SEMANA ---
const getTodayISO = () => new Date().toISOString().split("T")[0];

// Genera los 7 días de la semana actual (Lunes a Domingo)
const weekDays = computed(() => {
  const curr = new Date();
  // Ajustar para que la semana empiece el lunes (si hoy es domingo (0), restar 6 días)
  const first = curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1);

  const days = [];
  for (let i = 0; i < 7; i++) {
    let next = new Date(curr.setDate(first + i));
    days.push({
      iso: next.toISOString().split("T")[0],
      name: next.toLocaleDateString("es-ES", { weekday: "short" }).slice(0, 3),
      num: next.getDate(),
    });
  }
  return days;
});

// --- LÓGICA DE FIREBASE ---
const cargarPlanesAsignados = (uid) => {
  loading.value = true;
  const planesRef = collection(db, "usuarios", uid, "planesNutricion");

  onSnapshot(
    planesRef,
    (snapshot) => {
      planes.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      loading.value = false;

      // Actualizar plan activo si está abierto el modal
      if (activePlan.value) {
        const updated = planes.value.find((p) => p.id === activePlan.value.id);
        if (updated) activePlan.value = updated;
      }
    },
    (e) => {
      console.error(e);
      loading.value = false;
    }
  );
};

// --- MANEJO DEL CHECKLIST DIARIO ---
const isMealDone = (dayISO, mealType) => {
  if (!activePlan.value?.progress?.[dayISO]) return false;
  return activePlan.value.progress[dayISO][mealType] === true;
};

const hasProgressForDay = (dayISO) => {
  if (!activePlan.value?.progress?.[dayISO]) return false;
  // Retorna true si alguna comida de ese día está marcada como true
  return Object.values(activePlan.value.progress[dayISO]).some(
    (val) => val === true
  );
};

const toggleDailyMeal = async (dayISO, mealType) => {
  if (!activePlan.value) return;
  const planId = activePlan.value.id;
  const userId = auth.currentUser.uid;

  // Copia profunda del progreso actual o crea nuevo objeto
  const newProgress = { ...(activePlan.value.progress || {}) };
  if (!newProgress[dayISO]) newProgress[dayISO] = {};

  // Alternar estado
  newProgress[dayISO][mealType] = !newProgress[dayISO][mealType];

  // Optimistic UI update (se actualiza solo por el onSnapshot, pero para respuesta instantánea visual podemos forzarlo si queremos, aunque onSnapshot es rápido)

  try {
    await updateDoc(doc(db, "usuarios", userId, "planesNutricion", planId), {
      progress: newProgress,
    });
  } catch (error) {
    console.error("Error guardando progreso diario:", error);
    alert("Error de conexión al guardar.");
  }
};

// --- UTILIDADES Y UI ---
const calculateWeeklyProgress = (plan) => {
  if (!plan.progress) return 0;
  // Calculamos el total de checks hechos en toda la historia del plan (o podrías limitarlo a esta semana)
  let totalChecks = 0;
  const days = Object.values(plan.progress);
  days.forEach((day) => {
    totalChecks += Object.values(day).filter((v) => v === true).length;
  });
  // Supongamos una meta arbitraria de 28 comidas por semana para la barra visual (7 días * 4 comidas)
  // O simplemente mostramos un % basado en un máximo esperado.
  // Para simplificar, normalizamos a 100% si supera cierto número, o lo hacemos relativo a la semana actual.
  return Math.min((totalChecks / 28) * 100, 100);
};

const abrirPlan = (plan) => {
  activePlan.value = plan;
  selectedDayISO.value = getTodayISO(); // Al abrir, selecciona el día de hoy
  activeTab.value = "track"; // Abrir directamente en seguimiento
  modalVisible.value = true;
  document.body.style.overflow = "hidden";
};

const cerrarModal = () => {
  modalVisible.value = false;
  activePlan.value = null;
  document.body.style.overflow = "";
};

const formatearFecha = (iso) => {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "";
  }
};
const formatDateLong = (iso) => {
  try {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(iso).toLocaleDateString("es-ES", options);
  } catch {
    return iso;
  }
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) cargarPlanesAsignados(user.uid);
    else loading.value = false;
  });
});
</script>

<style scoped>
/* === ESTILOS BASE (Oscuro Moderno) === */
.container {
  background-color: #0d1117;
  min-height: 100vh;
  padding: 20px 20px 100px;
  box-sizing: border-box;
  color: #c9d1d9;
  font-family: "Segoe UI", sans-serif;
}
.header {
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 1px solid #30363d;
  padding-bottom: 15px;
}
.header h1 {
  color: #00bfff;
  font-size: 1.4rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  margin-top: 20px;
  text-align: left;
  letter-spacing: 1px;
}

/* === LOADING/EMPTY === */
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
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #8b949e;
  border: 2px dashed #30363d;
  border-radius: 12px;
}

/* === CARDS === */
.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.plan-card {
  background-color: #161b22;
  border: 1px solid #30363d;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.plan-card:hover {
  transform: translateY(-5px);
  border-color: #00bfff;
  box-shadow: 0 12px 24px rgba(0, 191, 255, 0.15);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.card-header h3 {
  color: #ffffff;
  font-size: 1.3rem;
  margin: 0;
  font-weight: 700;
}
.card-header .icon {
  font-size: 1.5rem;
}
.card-summary {
  color: #8b949e;
  font-size: 0.95rem;
  line-height: 1.5;
  flex-grow: 1;
  margin-bottom: 15px;
}
.card-footer {
  padding-top: 12px;
  border-top: 1px solid #30363d;
  font-size: 0.8rem;
  color: #58a6ff;
  text-align: right;
}

/* Mini Progress Semanal */
.mini-progress {
  margin-top: auto;
  margin-bottom: 15px;
}
.progress-text {
  font-size: 0.75rem;
  color: #8b949e;
  margin-bottom: 5px;
}
.progress-track {
  height: 6px;
  background-color: #30363d;
  border-radius: 3px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #238636, #2ea043);
  transition: width 0.5s ease;
}

/* === MODAL === */
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}
.modal-content {
  background: #161b22;
  border: 1px solid #00bfff;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 30px rgba(0, 191, 255, 0.2);
  animation: slideUp 0.3s ease-out;
}
@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.modal-header {
  padding: 20px 25px;
  border-bottom: 1px solid #30363d;
}
.modal-header h2 {
  margin: 0;
  color: #00bfff;
  text-transform: uppercase;
}
.modal-body {
    padding: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* === TABS === */
.tabs {
  display: flex;
  border-bottom: 1px solid #30363d;
  background-color: #0d1117;
}
.tab-btn {
  flex: 1;
  padding: 15px;
  background: none;
  border: none;
  color: #8b949e;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}
.tab-btn.active {
  color: #00bfff;
  border-bottom-color: #00bfff;
  background-color: #161b22;
}
.tab-content {
  padding: 25px;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* === INFO VISTA === */
.info-group {
  margin-bottom: 25px;
}
.info-group label {
  display: block;
  color: #58a6ff;
  font-weight: bold;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: 0.9rem;
}
.info-box {
  background-color: #0d1117;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #30363d;
  line-height: 1.6;
  white-space: pre-wrap;
  color: #e6edf3;
}
.meals-box {
  border-left: 3px solid #00bfff;
}

/* === WEEK SELECTOR === */
.week-selector {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  background-color: #0d1117;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #30363d;
}
.day-btn {
  background: none;
  border: none;
  color: #8b949e;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  position: relative;
}
.day-btn.active {
  background-color: #00bfff;
  color: #0d1117;
}
.day-btn.is-today {
  border: 1px solid #00bfff;
} /* Resaltar hoy si no está activo */
.day-btn.active.is-today {
  border: none;
} /* Si está activo y es hoy, gana el estilo activo */
.day-name {
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.day-num {
  font-size: 1.1rem;
  font-weight: 900;
}
.day-indicator {
  position: absolute;
  bottom: 4px;
  width: 4px;
  height: 4px;
  background-color: #238636;
  border-radius: 50%;
} /* Puntito verde si hay progreso */
.day-btn.active .day-indicator {
  background-color: #0d1117;
} /* Puntito oscuro si el fondo es brillante */

/* === DAILY CHECKLIST === */
.daily-checklist h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: #c9d1d9;
}
.daily-checklist .highlight {
  color: #00bfff;
}
.checklist-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.checklist-item {
  background-color: #0d1117;
  border: 1px solid #30363d;
  padding: 15px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.checklist-item:hover {
  border-color: #58a6ff;
  background-color: #1c2128;
}
.checklist-item.is-checked {
  background-color: #121d17;
  border-color: #238636;
} /* Fondo verde muy oscuro */
.checklist-item.is-checked .meal-text {
  color: #8b949e;
  text-decoration: line-through;
}
.checkbox {
  width: 26px;
  height: 26px;
  border: 2px solid #00bfff;
  border-radius: 6px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  transition: all 0.2s;
}
.is-checked .checkbox {
  background-color: #238636;
  border-color: #238636;
}
.meal-text {
  font-size: 1.1rem;
  font-weight: 500;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #30363d;
  text-align: right;
  background-color: #161b22;
  border-radius: 0 0 20px 20px;
}
.close-btn {
  background-color: #da3633;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
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
