<template>
  <div class="container">
    <h3><svg class="icon-back" @click="$router.back()" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0,0,256,256">
<g transform=""><g fill-opacity="0" fill="#008CFF" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#00b1ff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(3.55556,3.55556)"><path d="M36,12c13.255,0 24,10.745 24,24c0,13.255 -10.745,24 -24,24c-13.255,0 -24,-10.745 -24,-24c0,-13.255 10.745,-24 24,-24zM44.391,39c1.657,0 3,-1.343 3,-3c0,-1.657 -1.343,-3 -3,-3h-9.701l1.152,-1.189c1.152,-1.19 1.122,-3.09 -0.068,-4.242c-1.19,-1.152 -3.089,-1.122 -4.242,0.068l-6.077,6.276c-1.126,1.164 -1.126,3.01 0,4.174l6.077,6.276c0.589,0.608 1.371,0.913 2.155,0.913c0.752,0 1.504,-0.281 2.087,-0.845c1.19,-1.152 1.221,-3.052 0.068,-4.242l-1.152,-1.189z"></path></g></g></g>
</svg>Notificaciones</h3>

    <div class="cards">
      <!-- Switch general -->
      <div class="card">
        <h4>Todas las Notificaciones</h4>
        <label class="switch-btn">
          <input type="checkbox" v-model="allEnabled" @change="toggleAll" />
          <span class="slider"></span>
        </label>
      </div>

      <!-- Switch individuales -->
      <div class="card">
        <h4>Notificaciones de Promociones</h4>
        <label class="switch-btn">
          <input type="checkbox" v-model="promotions" @change="checkAllStatus" />
          <span class="slider"></span>
        </label>
      </div>

      <div class="card">
        <h4>Notificaciones de Recordatorios</h4>
        <label class="switch-btn">
          <input type="checkbox" v-model="reminders" @change="checkAllStatus" />
          <span class="slider"></span>
        </label>
      </div>

      <div class="card">
        <h4>Notificaciones de Actualizaciones</h4>
        <label class="switch-btn">
          <input type="checkbox" v-model="updates" @change="checkAllStatus" />
          <span class="slider"></span>
        </label>
      </div>
    </div>
    <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/Rutinas_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#000000"><path fill="#000000" fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3m2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Membresias_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/P_Principal_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Perfil_U_C')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Configuracion_C')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g>
</svg></button>
    </nav>
  </div>

</template>

<script setup>
import { ref } from "vue"

// Estados individuales
const promotions = ref(false)
const reminders = ref(false)
const updates = ref(false)

// Switch principal
const allEnabled = ref(false)

// Si el usuario activa o desactiva el switch principal
const toggleAll = () => {
  promotions.value = allEnabled.value
  reminders.value = allEnabled.value
  updates.value = allEnabled.value
}

// Si los switches individuales cambian, revisamos si todos están activos
const checkAllStatus = () => {
  allEnabled.value =
    promotions.value && reminders.value && updates.value
}


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

.icon-back {
  cursor: pointer;
  vertical-align: middle;
  margin-right: 10px;
  margin-bottom: 3px;
}

h3 {
  text-align: left;
  color: #00bfff;
  font-size: 1.4rem;
  font-weight: 900;
  width: 100%;
  max-width: 470px;
  margin: 0 auto;
  box-sizing: border-box;
  border-bottom: 2px solid #008CFF;
  vertical-align: middle;
  text-transform: uppercase;
}

.cards {
  flex: 1;
  overflow-y: auto;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 20px;
  border: none;
  box-sizing: border-box;
}

.card {
  width: 100%;
  max-width: 400px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 1.5rem;
}

/* Switch Button */
.switch-btn {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.switch-btn input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider::before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

/* Activado */
.switch-btn input:checked+.slider {
  background-color: #401eff;
}

/* Movimiento del círculo */
.switch-btn input:checked+.slider::before {
  transform: translateX(22px);
}

.card h4 {
  margin-bottom: 1rem;
}

.card label {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: block;
  font-weight: 800;
}

.card input,
.card textarea,
.card select {
  width: 100%;
  margin-top: 0.3rem;
  padding: 0.6rem;
  border-radius: 0.8rem;
  border: none;
  outline: none;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  background-color: #00001d;
  color: #fff;
  box-sizing: border-box;
}

.card textarea {
  resize: none;
  min-height: 80px;
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
  color: #008CFF;
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
