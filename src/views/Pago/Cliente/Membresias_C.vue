<template>
  <div class="container">
    <h2 class="title">Planes de Membresía</h2>

    <!-- Si el cliente ya tiene una membresía activa -->
    <div v-if="membresiaActiva" class="active-membership">
      <h3>Membresía activa: {{ membresiaActiva.nombre }}</h3>
      <p>{{ membresiaActiva.descripcion }}</p>
      <p class="price">💳 Método de pago: {{ metodoPago }}</p>
      <button class="cancel-btn" @click="cancelarMembresia">Cancelar membresía</button>
    </div>

    <!-- Lista de membresías -->
    <div class="cards">
      <div
        v-for="memb in membresias"
        :key="memb.id"
        class="card"
        :class="{ active: membresiaActivaId === memb.id }"
      >
        <h3>{{ memb.nombre }}</h3>
        <p>{{ memb.descripcion }}</p>
        <p class="price">${{ memb.precio }} - {{ memb.duracion }}</p>

        <div class="payment">
          <label>Método de pago:</label>
          <div class="payment-buttons">
            <button
              type="button"
              class="card-btn"
              :class="{ selected: metodoSeleccionado === 'Tarjeta' }"
              @click="metodoSeleccionado = 'Tarjeta'"
              :aria-pressed="metodoSeleccionado === 'Tarjeta'"
            >
             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
<linearGradient id="~KJ2hnb4GR~0TcFV~AS13a_MabKibi4OdYM_gr1" x1="20.375" x2="28.748" y1="11.061" y2="40.946" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#32bdef"></stop><stop offset="1" stop-color="#1ea2e4"></stop></linearGradient><path fill="url(#~KJ2hnb4GR~0TcFV~AS13a_MabKibi4OdYM_gr1)" d="M43.125,9H4.875C3.287,9,2,10.287,2,11.875v24.25C2,37.713,3.287,39,4.875,39h38.25	C44.713,39,46,37.713,46,36.125v-24.25C46,10.287,44.713,9,43.125,9z"></path><linearGradient id="~KJ2hnb4GR~0TcFV~AS13b_MabKibi4OdYM_gr2" x1="2" x2="46" y1="16" y2="16" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#45494d"></stop><stop offset="1" stop-color="#6d7479"></stop></linearGradient><rect width="44" height="4" x="2" y="14" fill="url(#~KJ2hnb4GR~0TcFV~AS13b_MabKibi4OdYM_gr2)"></rect><path fill="#a8e7ff" d="M42,24H6c-0.552,0-1-0.448-1-1v-2c0-0.552,0.448-1,1-1h36c0.552,0,1,0.448,1,1v2	C43,23.552,42.552,24,42,24z"></path>
</svg>
            </button>

            <button
              type="button"
              class="paypal-btn"
              :class="{ selected: metodoSeleccionado === 'PayPal' }"
              @click="metodoSeleccionado = 'PayPal'"
              :aria-pressed="metodoSeleccionado === 'PayPal'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
                <path fill="#1565C0" d="M18.7,13.767l0.005,0.002C18.809,13.326,19.187,13,19.66,13h13.472c0.017,0,0.034-0.007,0.051-0.006C32.896,8.215,28.887,6,25.35,6H11.878c-0.474,0-0.852,0.335-0.955,0.777l-0.005-0.002L5.029,33.813l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,0.991,1,0.991h8.071L18.7,13.767z"></path>
                <path fill="#039BE5" d="M33.183,12.994c0.053,0.876-0.005,1.829-0.229,2.882c-1.281,5.995-5.912,9.115-11.635,9.115c0,0-3.47,0-4.313,0c-0.521,0-0.767,0.306-0.88,0.54l-1.74,8.049l-0.305,1.429h-0.006l-1.263,5.796l0.013,0.001c-0.014,0.064-0.039,0.125-0.039,0.194c0,0.553,0.447,1,1,1h7.333l0.013-0.01c0.472-0.007,0.847-0.344,0.945-0.788l0.018-0.015l1.812-8.416c0,0,0.126-0.803,0.97-0.803s4.178,0,4.178,0c5.723,0,10.401-3.106,11.683-9.102C42.18,16.106,37.358,13.019,33.183,12.994z"></path>
                <path fill="#283593" d="M19.66,13c-0.474,0-0.852,0.326-0.955,0.769L18.7,13.767l-2.575,11.765c0.113-0.234,0.359-0.54,0.88-0.54c0.844,0,4.235,0,4.235,0c5.723,0,10.432-3.12,11.713-9.115c0.225-1.053,0.282-2.006,0.229-2.882C33.166,12.993,33.148,13,33.132,13H19.66z"></path>
              </svg>
            </button>

            <button
              type="button"
              class="cash-btn"
              :class="{ selected: metodoSeleccionado === 'Efectivo' }"
              @click="metodoSeleccionado = 'Efectivo'"
              :aria-pressed="metodoSeleccionado === 'Efectivo'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
<path fill="#a5d6a7" d="M4 21H42V41H4z"></path><path fill="#388e3c" d="M3,42h40V20H3V42z M41,22v18H5V22H41z"></path><path fill="#388e3c" d="M11 29A2 2 0 1 0 11 33 2 2 0 1 0 11 29zM23 24A7 7 0 1 0 23 38 7 7 0 1 0 23 24zM8.221 21H4v4.221C4.532 25.7 5.228 26 6 26c1.657 0 3-1.343 3-3C9 22.228 8.7 21.532 8.221 21zM8.221 41C8.7 40.468 9 39.772 9 39c0-1.657-1.343-3-3-3-.772 0-1.468.3-2 .779V41H8.221zM42 41v-4.221C41.468 36.3 40.772 36 40 36c-1.657 0-3 1.343-3 3 0 .772.3 1.468.779 2H42z"></path><path fill="#ff9800" d="M35.5 12A9.5 9.5 0 1 0 35.5 31A9.5 9.5 0 1 0 35.5 12Z"></path><path fill="#ffcc80" d="M35.5 14.111A7.389 7.389 0 1 0 35.5 28.889A7.389 7.389 0 1 0 35.5 14.111Z"></path><path fill="#ffc107" d="M29 4A11 11 0 1 0 29 26A11 11 0 1 0 29 4Z"></path><path fill="#81c784" d="M33 31c0-.115.015-.225.034-.335-1.223-.328-2.347-.892-3.322-1.644C29.897 29.649 30 30.312 30 31c0 .195-.013.387-.029.578 1.387.764 2.948 1.242 4.606 1.375C33.676 32.759 33 31.959 33 31zM37 31c0 1.047-.808 1.897-1.833 1.983C35.279 32.986 35.388 33 35.5 33c1.991 0 3.865-.51 5.5-1.404v-2.36c-1.169.833-2.534 1.403-4.013 1.636C36.99 30.915 37 30.956 37 31z"></path><path fill="#2e7d32" d="M42 28.415c-.314.296-.648.57-1 .821v2.36c.345-.189.677-.397 1-.619.349-.24.68-.503 1-.779v-2.882C42.695 27.709 42.361 28.075 42 28.415zM37 31c0-.044-.01-.085-.013-.128C36.501 30.949 36.007 31 35.5 31c-.854 0-1.679-.123-2.466-.335C33.015 30.775 33 30.885 33 31c0 .959.676 1.759 1.577 1.953.195.016.392.024.59.03C36.192 32.897 37 32.047 37 31z"></path><path fill="#81c784" d="M20.233,24.571c0.764-0.329,1.599-0.52,2.475-0.556c-0.818-0.572-1.558-1.247-2.193-2.015h-2.452 C18.673,22.95,19.404,23.811,20.233,24.571z"></path><path fill="#2e7d32" d="M20.515 22c-.506-.613-.939-1.286-1.304-2h-2.208c.293.702.654 1.367 1.06 2H20.515zM29.712 29.021c-.41-.316-.793-.665-1.147-1.043-.602-.644-1.115-1.369-1.52-2.162-.863-.155-1.691-.407-2.472-.751-.658-.29-1.282-.643-1.865-1.051-.876.036-1.711.227-2.475.556 1.545 1.417 3.429 2.462 5.52 3.002 1.043 1.667 2.492 3.054 4.219 4.006C29.987 31.387 30 31.195 30 31 30 30.312 29.897 29.649 29.712 29.021z"></path><path fill="#ffe082" d="M29 6A9 9 0 1 0 29 24A9 9 0 1 0 29 6Z"></path><path fill="#ffc107" d="M25.429,15.24L26.249,10h5.608v1.761h-3.879l-0.406,2.169c0.168-0.096,0.765-0.359,1.838-0.359 c1.015,0,1.796,0.289,2.341,0.869c0.546,0.581,0.821,1.199,0.821,2.246c0,0.632-0.146,1.205-0.439,1.719 c-0.294,0.514-0.704,0.907-1.233,1.181C30.369,19.862,29.746,20,29.024,20c-0.641,0-1.244-0.129-1.805-0.383 c-0.562-0.254-1.002-0.604-1.321-1.049c-0.318-0.445-0.475-0.866-0.47-1.425h2.143c0.024,0.362,0.144,0.564,0.359,0.777 c0.216,0.212,0.729,0.318,1.081,0.318c0.796,0,1.418-0.569,1.418-1.705C30.429,15.481,29.975,15,29,15 c-0.552,0-1.157,0.371-1.429,0.714L25.429,15.24z"></path>
</svg>
            </button>
          </div>
        </div>

        <button
          class="choose-btn"
          :disabled="!metodoSeleccionado || membresiaActivaId === memb.id"
          @click="activarMembresia(memb)"
        >
          {{ membresiaActivaId === memb.id ? "Activa" : "Elegir Plan" }}
        </button>
      </div>
    </div>
  </div>
    <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/Rutinas_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#000000"><path fill="currentColor" fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3m2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Membresias_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/P_Principal_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Perfil_U_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Configuracion_C')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill="currentColor" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g>
</svg></button>
    </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, getDocs, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Variables
const membresias = ref([]);
const membresiaActivaId = ref(null);
const membresiaActiva = ref(null);
const metodoPago = ref(null);
const metodoSeleccionado = ref("");

// Cargar membresías desde la colección global
const cargarMembresias = async () => {
  const snapshot = await getDocs(collection(db, "membresias"));
  membresias.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Cargar datos del usuario (membresía activa)
const cargarUsuario = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "usuarios", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    membresiaActivaId.value = userSnap.data().membresiaActivaId || null;
    metodoPago.value = userSnap.data().metodoPago || null;

    if (membresiaActivaId.value) {
      const membRef = doc(db, "membresias", membresiaActivaId.value);
      const membSnap = await getDoc(membRef);
      if (membSnap.exists()) membresiaActiva.value = membSnap.data();
    }
  }
};

// Activar membresía
const activarMembresia = async (memb) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return alert("Debes iniciar sesión.");

  const userRef = doc(db, "usuarios", user.uid);
  await setDoc(
    userRef,
    {
      membresiaActivaId: memb.id,
      metodoPago: metodoSeleccionado.value,
    },
    { merge: true }
  );

  membresiaActivaId.value = memb.id;
  membresiaActiva.value = memb;
  metodoPago.value = metodoSeleccionado.value;

  alert(`✅ Has activado la membresía: ${memb.nombre}`);
};

// Cancelar membresía
const cancelarMembresia = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "usuarios", user.uid);
  await updateDoc(userRef, {
    membresiaActivaId: null,
    metodoPago: null,
  });

  membresiaActivaId.value = null;
  membresiaActiva.value = null;
  metodoPago.value = null;
  alert("❌ Membresía cancelada.");
};

// Cargar al iniciar
onMounted(() => {
  cargarMembresias();
  cargarUsuario();
});
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Arial, sans-serif;
background-color: #0d1117;
  min-height: 100vh;
}
.title {
  font-size: 1.4rem;
  color: #00bfff;
  text-align: left;
  width: 100%;
  border-bottom: 2px solid #00bfff;
  padding-bottom: 10px;
  text-transform: uppercase;
  font-weight: bold;
}

.active-membership {
  background: #0225595d;
  border: 1px solid #00bfff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  color: white;
  max-width: 320px;
  margin: 0 auto 20px auto;
  text-align: center;

}

.active-membership .price {
  font-weight: bold;
  color: #ffdd57;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}
.card {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 15px;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  text-transform: uppercase;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  color: white;
}

.card > h3 {
  margin-bottom: 10px;
  color: #58a6ff;
}

.card > .price {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 5px;
  color: #ffffff;
}

.card.active {
  border-color: #4caf50;
  background: #171b18;
}
.price {
  font-weight: bold;
  color: #333;
}
.payment {
  margin: 10px 0;
  text-align: center; 
  width: 100%;
  padding: 10px 0;
  border-top: 1px solid #eee;
}
.payment-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

.card-btn, .paypal-btn, .cash-btn {
  background: #000000;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.card-btn.selected, .paypal-btn.selected,
.cash-btn.selected {
  background: #ffffff;
  transition: all 0.3s ease;
}


.choose-btn,
.cancel-btn {
  background: #007bff;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.cancel-btn {
  background: #e53935;
}

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
