<template>
  <div class="container">
    <header class="header">
      <h1>Notificaciones</h1>
    </header>

    <div class="content-wrapper">

      <div class="notification-card">
        <h4 class="card-title">Enviar notificación</h4>

        <div class="form-group">
          <label for="plantilla">Plantillas rápidas</label>
          <select v-model="plantillaSeleccionada" @change="usarPlantilla" class="modern-input">
            <option value="">-- Selecciona una plantilla --</option>
            <option v-for="(p, index) in plantillas" :key="index" :value="p.mensaje">
              {{ p.titulo }}
            </option>
          </select>
        </div>

        <form @submit.prevent="enviarNotificacion" class="notification-form">

          <div class="form-group">
            <label for="titulo">Título</label>
            <input type="text" v-model="titulo" placeholder="Título de la notificación" required class="modern-input" />
          </div>

          <div class="form-group">
            <label for="mensaje">Mensaje</label>
            <textarea v-model="mensaje" placeholder="Escribe el mensaje..." required class="modern-input"></textarea>
          </div>

          <div class="form-group">
            <label for="usuario">Destinatario</label>
            <select v-model="usuarioSeleccionado" class="modern-input">
              <option value="todos">Todos los Clientes</option>
              <option v-for="u in usuarios" :key="u.uid" :value="u.uid">
                {{ u.nombre || 'Usuario' }} ({{ u.email }})
              </option>
            </select>
            <small class="helper-text">Solo se listan usuarios que no son entrenadores.</small>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-enviar" :disabled="enviando">
              {{ enviando ? 'ENVIANDO...' : 'ENVIAR' }}
            </button>
            <button type="button" class="btn-cancelar" @click="router.back()">
              CANCELAR
            </button>
          </div>
        </form>
      </div>

    </div>

    <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/P_P_Entrenador')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg></button>
        <button class="nav-btn" @click="$router.push('/Ver_Progreso')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 32 32">
<path fill="currentColor" d="M 15.458984 3.0117188 A 13 13 0 0 0 16 29 A 13.015 13.015 0 0 0 29 16 A 13 13 0 0 0 15.458984 3.0117188 z M 16 5 A 11.013 11.013 0 0 1 27 16 A 11 11 0 1 1 16 5 z M 12.960938 9.9980469 A 0.993 0.993 0 0 0 12.142578 10.484375 L 9.4335938 15 L 7 15 A 1 1 0 0 0 7 17 L 10 17 A 1 1 0 0 0 10.857422 16.515625 L 12.820312 13.242188 L 16.070312 21.371094 A 1 1 0 0 0 16.853516 21.988281 A 0.9 0.9 0 0 0 17 22 A 1 1 0 0 0 17.779297 21.625 L 21.480469 17 L 25 17 A 1 1 0 0 0 25 15 L 21 15 A 1 1 0 0 0 20.21875 15.371094 L 17.291016 19.03125 L 13.929688 10.625 A 1 1 0 0 0 13.080078 10 A 0.993 0.993 0 0 0 12.960938 9.9980469 z"></path>
</svg></button>
<button class="nav-btn" @click="$router.push('/Perfil_U_E')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Configuracion_E')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill="#currentColor" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path fill="currentColor" d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g>
</svg></button>
    </nav>
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { db } from "@/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const router = useRouter();

const titulo = ref("");
const mensaje = ref("");
const usuarioSeleccionado = ref("todos");
const usuarios = ref([]);
const plantillaSeleccionada = ref("");
const enviando = ref(false); // Nuevo estado de envío

const plantillas = [
  { titulo: "Membresía por agotarse", mensaje: "Tu membresía está por agotarse, ¡renuévala a tiempo!" },
  { titulo: "Pago pendiente", mensaje: "Tienes un pago pendiente. Por favor regularízalo lo antes posible." },
  { titulo: "Promoción especial", mensaje: "¡Aprovecha nuestra promoción especial de este mes en el gimnasio!" },
  { titulo: "Evento especial", mensaje: "Te invitamos a nuestro evento especial de entrenamiento este fin de semana." },
];

const usarPlantilla = () => {
  if (plantillaSeleccionada.value) {
    // Usar slice(0, 50) para evitar que el título de la plantilla sea demasiado largo
    titulo.value = plantillas.find(p => p.mensaje === plantillaSeleccionada.value)?.titulo || "";
    mensaje.value = plantillaSeleccionada.value;
  }
};

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    // Filtra solo usuarios que no sean entrenadores (asumiendo que 'rol' es 'entrenador' o no existe/es 'cliente')
    usuarios.value = querySnapshot.docs
      .map((doc) => ({ uid: doc.id, ...doc.data() }))
      .filter(u => u.rol !== 'entrenador');
  } catch (error) {
    console.error("Error cargando usuarios:", error);
  }
});

const enviarNotificacion = async () => {
  if (!titulo.value || !mensaje.value) return alert("Completa todos los campos");

  enviando.value = true;
  let destinatarios = [];

  if (usuarioSeleccionado.value === "todos") {
    destinatarios = usuarios.value;
  } else {
    const user = usuarios.value.find(u => u.uid === usuarioSeleccionado.value);
    if (user) destinatarios.push(user);
  }

  try {
    for (const u of destinatarios) {
      await addDoc(collection(db, "notificaciones"), {
        uid: u.uid,
        titulo: titulo.value,
        mensaje: mensaje.value,
        fecha: new Date().toISOString(), // Usar formato ISO para ordenar
      });
    }

    alert("Notificación enviada ✅");
    cancelar(); // Resetear campos
  } catch (error) {
    console.error("Error al enviar notificaciones:", error);
    alert("Error al enviar notificaciones.");
  } finally {
    enviando.value = false;
  }
};

const cancelar = () => {
  titulo.value = "";
  mensaje.value = "";
  usuarioSeleccionado.value = "todos";
  plantillaSeleccionada.value = "";
};
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
  margin-top: 20px;
  margin-bottom: 25px;
  text-align: left;
  justify-content: flex-start;
  border-bottom: 1px solid #30363d;
  padding-bottom: 15px;
}

.header h1 {
  color: #00bfff;
  font-size: 1rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 1px;
}

.content-wrapper {
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

.notification-card {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 24px;
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.card-title {
  color: white;
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #30363d;
}

.notification-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

/* === INPUTS Y SELECTS === */
.modern-input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 12px;
  border: 1px solid #30363d;
  background-color: #0d1117;
  color: rgb(255, 255, 255);
  font-size: 12px;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
  margin-bottom: 5px;
}

.modern-input:focus {
  border-color: #00bfff;
}

.modern-input::-webkit-scrollbar {
  display: none;
}

.modern-input {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.notification-form textarea {
  min-height: 100px;
  resize: vertical;
}

.form-group label {
  color: #00bfff;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.helper-text {
  color: #8b949e;
  font-size: 0.8rem;
  margin-top: 5px;
}


/* === ACTION BUTTONS === */
.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 0;
}

.btn-enviar,
.btn-cancelar {
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-weight: 900;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.2s;
  text-transform: uppercase;
  font-size: 12px;
}

.btn-enviar {
  background-color: #00bfff;
  color: #090c10;
}

.btn-enviar:hover:not(:disabled) {
  background-color: #33c9ff;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.3);
}

.btn-enviar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancelar {
  background-color: #da3633;
  color: white;
}

.btn-cancelar:hover {
  background-color: #b62a27;
}

/* === NAV (Sin cambios) === */
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
