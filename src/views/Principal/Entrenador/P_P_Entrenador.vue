<template>
  <div class="container">
    <h3>+ FIT</h3>
    <button class="btn_chat" @click="$router.push('/Chat_C')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g transform=""><g fill-opacity="0" fill="#dddddd" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#00bfff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M15.3457,12.07031c-2.262,0 -4.16127,0.39922 -5.69727,1.19922c-1.536,0.8 -2.69456,1.96791 -3.47656,3.50391c-0.781,1.536 -1.17187,3.41758 -1.17187,5.64258v7.05664c0,2.225 0.39183,4.10462 1.17383,5.64063c0.782,1.536 1.93861,2.70391 3.47461,3.50391c1.536,0.8 3.23605,1.20117 5.49805,1.20117v1v4.49023c0,0.956 0.23413,1.71439 0.70313,2.27539c0.469,0.561 1.136,0.8418 2,0.8418c0.607,0 1.1583,-0.16142 1.6543,-0.48242c0.497,-0.322 1.12295,-0.82291 1.87695,-1.50391l7.39258,-6.62109h5.9668c2.262,0 4.16127,-0.40117 5.69727,-1.20117c1.536,-0.8 2.69261,-1.96791 3.47461,-3.50391c0.781,-1.536 1.17383,-3.41563 1.17383,-5.64062v-7.05664c0,-2.226 -0.39183,-4.10658 -1.17383,-5.64258c-0.782,-1.536 -1.93861,-2.70391 -3.47461,-3.50391c-1.536,-0.8 -3.43527,-1.19922 -5.69727,-1.19922zM47.93945,20.07031c0.1,0.75 0.15039,1.52961 0.15039,2.34961v7.05078c0,2.69 -0.51,5.05 -1.5,7c-1.07,2.1 -2.66953,3.71859 -4.76953,4.80859c-1.96,1.02 -4.34008,1.54102 -7.08008,1.54102h-4.82031l-4.98047,4.44922c1.19,0.37 2.54055,0.55078 4.06055,0.55078h5.96094l7.39844,6.61914c0.75,0.68 1.38109,1.18 1.87109,1.5c0.5,0.32 1.05016,0.48047 1.66016,0.48047c0.86,0 1.53,-0.27984 2,-0.83984c0.47,-0.56 0.69922,-1.31953 0.69922,-2.26953v-5.49023c2.27,0 3.96,-0.40117 5.5,-1.20117c1.54,-0.8 2.69047,-1.96977 3.48047,-3.50977c0.78,-1.53 1.16992,-3.40867 1.16992,-5.63867v-7.05078c0,-2.23 -0.38992,-4.11039 -1.16992,-5.65039c-0.79,-1.53 -1.94047,-2.7 -3.48047,-3.5c-1.54,-0.8 -3.42922,-1.19922 -5.69922,-1.19922z"></path></g></g></g>
</svg></button>
    <div class="cards">
      <button class="card" @click="$router.push('/A_Rutina')">ASIGNAR RUTINAS</button>
      <button class="card" @click="$router.push('/A_P_Nutricion')">ASIGNAR PLAN DE NUTRICIÓN</button>
      <button class="card" @click="$router.push('/Ver_Progreso')">VER PROGRESO DE CLIENTES</button>
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

<script setup></script>

<style scoped>
.container {
  background-image: url('@/assets/Fondo_Gym.jpeg');
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

h3 {
  text-align: left;
  color: #00bfff;
  font-size: 2rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-weight: 900;
  width: 100%;
    max-width: 470px;
    box-sizing: border-box;
    
}

.btn_chat {
  position: fixed;
  top: 2.2rem;
  right: 1rem;
  background-color: rgba(0, 191, 255, 0);
  border: 2px solid #00bfff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: color 0.3s ease;
    z-index: 101;
}

.btn_chat:hover {
  color: rgb(255, 255, 255);
}

.cards {
  flex: 1;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.card {
  width: 100%;
  max-width: 400px;
  height: 120px;
  padding: 1rem;
  background-color: rgba(86, 86, 86, 0.15);
  backdrop-filter: blur(2px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1.5rem;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.card:hover {
  background-color: rgba(0, 0, 0, 0.25);
}

.card h4 {
  margin: 0;
  font-size: 1.3rem;
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
