<template>
    <div class="container">
        <h2>MI PERFIL</h2>
        <div class="perfil-usuario">

            <div v-if="cargando">
                <p>Cargando datos...</p>
            </div>

            <div v-else-if="perfilExiste">
                <div class="info-perfil">
                    <img v-if="perfil.imagen" :src="perfil.imagen" alt="Foto de perfil" class="foto-perfil" />

                    <p><strong>Nombres <br></strong> {{ perfil.nombre }}</p>
                    <p><strong>Apellidos <br></strong> {{ perfil.apellido }}</p>
                    <p><strong>Edad <br></strong> {{ perfil.edad }} años</p>
                    <p><strong>Sexo <br></strong> {{ perfil.sexo }}</p>
                    <p><strong>Altura <br></strong> {{ perfil.altura }} cm</p>
                    <p><strong>Peso <br></strong> {{ perfil.peso }} kg</p>
                </div>
            </div>

            <div v-else>
                <p>No se encontró información de perfil.</p>
            </div>
        </div>
        <div class="btn">
            <button class="btn_editar" @click="$router.push('/Completar_P')">Editar perfil</button>
        </div>
    </div>
    <nav class="bottom-nav">
        <button class="nav-btn"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z" />
            </svg></button>
        <button class="nav-btn" @click="$router.push('/Rutinas')"><svg xmlns="http://www.w3.org/2000/svg" width="34"
                height="34" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="m20.975 9.025l-6.05-6.05l.425-.425q.575-.575 1.425-.563t1.425.588L21.425 5.8Q22 6.375 22 7.213t-.575 1.412l-.45.4ZM8.65 21.4q-.575.575-1.413.575T5.826 21.4L2.6 18.175q-.575-.575-.575-1.413T2.6 15.35l.4-.4L9.05 21l-.4.4Zm3.625-.7q-.3.3-.7.3t-.7-.3L3.3 13.125q-.3-.3-.3-.7t.3-.7l1.425-1.45q.3-.3.713-.3t.712.3l1.575 1.575l4.15-4.15L10.3 6.125q-.3-.3-.3-.7t.3-.7l1.425-1.45q.3-.3.713-.3t.712.3l7.575 7.575q.3.3.3.713t-.3.712l-1.45 1.425q-.3.3-.7.3t-.7-.3L16.3 12.125l-4.15 4.15l1.575 1.575q.3.3.3.712t-.3.713l-1.45 1.425Z" />
            </svg></button>
        <button class="nav-btn" @click="$router.push('/PantallaPrincipal')"><svg xmlns="http://www.w3.org/2000/svg"
                width="34" height="34" viewBox="0 0 1024 1025">
                <path fill="currentColor"
                    d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z" />
            </svg></button>
        <button class="nav-btn" @click="$router.push('/Perfil_U')"><svg xmlns="http://www.w3.org/2000/svg" width="34"
                height="34" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd"
                    d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z"
                    clip-rule="evenodd" />
            </svg></button>
        <button class="nav-btn"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34"
                viewBox="0,0,256,256">
                <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                    stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                    font-family="none" font-weight="none" font-size="none" text-anchor="none"
                    style="mix-blend-mode: normal">
                    <g transform="scale(5.12,5.12)">
                        <path
                            d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z">
                        </path>
                    </g>
                </g>
            </svg></button>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { db, auth } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const perfil = ref({})
const cargando = ref(true)
const perfilExiste = ref(false)

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const refUsuario = doc(db, 'usuarios', user.uid)
    const docSnap = await getDoc(refUsuario)

    if (docSnap.exists()) {
      perfil.value = docSnap.data()
      perfilExiste.value = true
    } else {
      perfilExiste.value = false
    }
  }
  cargando.value = false
})
</script>


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
    align-items: center;
}

h2 {
    font-weight: bold;
    text-align: left;
    color: #ffffff;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    font-weight: 900;
}

.perfil-usuario {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 300px;
    text-align: center;
    margin: 0 auto;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background: #00000037;
    border-radius: 23px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    color: #fff;
    text-transform: uppercase;
    backdrop-filter: blur(2px);
}

.foto-perfil {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 9999px;
    margin-bottom: 1rem;
}

.info-perfil p {
    font-size: 20px;
    margin: 0.5rem 0;
    font-weight: 600;
}
.btn {
    margin-top: 1rem;
}
.btn_editar {
    background-color: #008CFF;
    color: white;
    border: none;
    border-radius: 23px;
    padding: 0.7rem 1.5rem;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    width: 100%;
    max-width: 300px;
    text-align: center;
    text-transform: uppercase;
}
.btn_editar:hover {
    background-color: #000000;
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
