<template>
  <div class="container">
    <h2>Mi Cuenta</h2>
    <div class="perfil-cuenta">
      <div v-if="cargando">
        <p>Cargando información...</p>
      </div>

      <form v-else @submit.prevent="guardarCambios">
        <div class="campo">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" v-model="usuario.email" disabled />
        </div>

        <div class="campo">
          <label for="telefono">Teléfono</label>
          <input type="tel" id="telefono" v-model="usuario.telefono" placeholder="Ej: +503 1234-5678" />
        </div>

        <div class="campo">
          <label for="contrasena">Nueva contraseña</label>
          <input type="password" id="contrasena" v-model="contrasena" placeholder="Dejar vacío si no cambia" />
        </div>

        <div class="campo">
          <label for="confirmar">Confirmar contraseña</label>
          <input type="password" id="confirmar" v-model="confirmarContrasena" placeholder="Confirmar nueva contraseña" />
        </div>

        <div class="acciones">
          <button class="btn" type="submit" :disabled="guardando">Guardar cambios</button>
          <button type="button" class="btn-cancelar" @click="$router.push('/Configuracion')">Cancelar</button>
        </div>

        <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
      </form>
    </div>
  </div>

 <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/Gestion_U')"><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#000000"><path fill="#000000" fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3m2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Gestion_P')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/PantallaPrincipal')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Perfil_U')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Configuracion')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g>
</svg></button>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth, updatePassword } from 'firebase/auth'

const db = getFirestore()
const auth = getAuth()
const usuario = ref({ email: '', telefono: '' })
const contrasena = ref('')
const confirmarContrasena = ref('')
const cargando = ref(true)
const guardando = ref(false)
const mensaje = ref('')
let datosOriginales = {}

const cargarUsuario = async () => {
  try {
    const user = auth.currentUser
    if (!user) throw new Error('Usuario no autenticado')

    usuario.value.email = user.email

    const docRef = doc(db, 'usuarios', user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      usuario.value.telefono = data.telefono || ''
      datosOriginales = { ...usuario.value }
    }
  } catch (error) {
    console.error(error)
    mensaje.value = 'Error al cargar información'
  } finally {
    cargando.value = false
  }
}

const guardarCambios = async () => {
  if (contrasena.value && contrasena.value !== confirmarContrasena.value) {
    mensaje.value = 'Las contraseñas no coinciden'
    return
  }

  guardando.value = true
  mensaje.value = ''

  try {
    const user = auth.currentUser
    const docRef = doc(db, 'usuarios', user.uid)

    // Actualizar teléfono
    await updateDoc(docRef, { telefono: usuario.value.telefono })

    // Cambiar contraseña si se ingresó
    if (contrasena.value) {
      await updatePassword(user, contrasena.value)
    }

    mensaje.value = 'Cambios guardados correctamente'
    contrasena.value = ''
    confirmarContrasena.value = ''
    datosOriginales = { ...usuario.value }
  } catch (error) {
    console.error(error)
    mensaje.value = 'Error al guardar cambios'
  } finally {
    guardando.value = false
  }
}

const cancelarCambios = () => {
  usuario.value = { ...datosOriginales }
  contrasena.value = ''
  confirmarContrasena.value = ''
  mensaje.value = 'Cambios cancelados'
}

onMounted(cargarUsuario)
</script>

<style scoped>
.container {
  background-color: #000a12;
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

h2 {
  font-weight: bold;
  text-align: left;
  color: #00bfff;
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  font-weight: 900;
}

.perfil-cuenta {
  max-width: 300px;
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #02041c;
  border-radius: 10px;
  color: #eee;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.campo {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.campo label {
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.campo input {
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: #1a1a2e;
  color: #fff;
}

.acciones {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background-color: #00bbff;
  color: #000;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  background-color: #008cff;
}

.btn-cancelar {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background-color: #ff4d4d;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-cancelar:hover {
  background-color: #e60000;
}

.mensaje {
  margin-top: 1rem;
  text-align: center;
  font-weight: 600;
  color: #00ff99;
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
