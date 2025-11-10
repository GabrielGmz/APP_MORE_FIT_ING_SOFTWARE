<template>
    <div class="container">
        <h3>Configuración</h3>

        <div class="cards">
            <button class="card" @click="$router.push('/Notificaciones_C')">
                <h4>Notificaciones</h4>
                <p>Configura alertas y avisos dentro de la app</p>
            </button>

            <button class="card" @click="$router.push('/Informacion_C')">
                <h4>Datos de Sesión</h4>
            </button>

            <button class="card cerrar-sesion" @click="logout">
                <h4>Cerrar Sesión</h4>
            </button>
        </div>

        <nav class="bottom-nav">
            <button class="nav-btn" @click="$router.push('/Rutinas_C')"><svg xmlns="http://www.w3.org/2000/svg"
                    width="200" height="200" viewBox="0 0 24 24" fill="#000000">
                    <path fill="#000000" fill-rule="evenodd"
                        d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3m2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z"
                        clip-rule="evenodd" />
                </svg></button>
            <button class="nav-btn" @click="$router.push('/Membresias_C')"><svg xmlns="http://www.w3.org/2000/svg"
                    width="34" height="34" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z" />
                </svg></button>
            <button class="nav-btn" @click="$router.push('/P_Principal_C')"><svg xmlns="http://www.w3.org/2000/svg"
                    width="34" height="34" viewBox="0 0 1024 1025">
                    <path fill="currentColor"
                        d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z" />
                </svg></button>
            <button class="nav-btn" @click="$router.push('/Perfil_U_C')"><svg xmlns="http://www.w3.org/2000/svg"
                    width="34" height="34" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z"
                        clip-rule="evenodd" />
                </svg></button>
            <button class="nav-btn" @click="$router.push('/Configuracion_C')"><svg xmlns="http://www.w3.org/2000/svg"
                    x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
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
    </div>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth()

const logout = () => {
  // Use native <dialog> if available for a lightweight modal
  if (typeof HTMLDialogElement === 'function') {
    if (document.getElementById('logout-confirm-dialog')) return // avoid duplicates

    const dialog = document.createElement('dialog')
    dialog.id = 'logout-confirm-dialog'
    dialog.style.border = 'none'
    dialog.style.background = '#06111a'
    dialog.style.color = '#fff'
    dialog.style.padding = '1.2rem'
    dialog.style.borderRadius = '12px'
    dialog.innerHTML = `
      <form method="dialog" style="display:flex;flex-direction:column;gap:0.8rem;min-width:260px">
        <div style="display:flex;flex-direction:column;gap:0.2rem">
          <strong style="color:#008CFF">Confirmar cierre de sesión</strong>
          <span>¿Estás seguro que deseas cerrar sesión?</span>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:0.5rem;margin-top:0.6rem">
          <button id="logout-cancel" type="button" style="background:#333;color:#fff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer">Cancelar</button>
          <button id="logout-confirm" type="button" style="background:red;color:#fff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer">Cerrar sesión</button>
        </div>
      </form>
    `
    document.body.appendChild(dialog)

    const btnCancel = dialog.querySelector('#logout-cancel')
    const btnConfirm = dialog.querySelector('#logout-confirm')

    const clean = () => {
      try { dialog.close() } catch {}
      dialog.remove()
    }

    btnCancel.addEventListener('click', clean)

    btnConfirm.addEventListener('click', async () => {
      btnConfirm.disabled = true
      btnCancel.disabled = true
      try {
        await signOut(auth)
        console.log('Usuario ha cerrado sesión')
        window.location.href = '/login'
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      } finally {
        clean()
      }
    })

    dialog.showModal()
  } else {
    // Fallback to built-in confirm dialog
    const ok = window.confirm('¿Estás seguro que deseas cerrar sesión?')
    if (!ok) return
    signOut(auth)
      .then(() => {
        console.log('Usuario ha cerrado sesión')
        window.location.href = '/login'
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error)
      })
  }
}
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

h3 {
    text-align: left;
    color: #008CFF;
    font-size: 1.6rem;
    font-weight: 900;
    width: 100%;
    max-width: 470px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: 20px;
}

.cards {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: flex-start;
    margin-top: 40px;
}

.card {
    width: 100%;
    max-width: 400px;
    min-height: 100px;
    padding: 1rem 1.2rem;
    background-color: #02041c;
    backdrop-filter: blur(2px);
    color: white;
    border: none;
    border-radius: 1.5rem;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    text-align: left;
}

.card:hover {
    background-color: rgba(255, 255, 255, 0.25);
}

.card h4 {
    margin: 0;
    font-size: 1.2rem;
}

.card p {
    margin: 5px 0 0;
    font-size: 0.9rem;
    font-weight: normal;
    color: #ddd;
}

.cerrar-sesion {
    background-color: rgba(255, 0, 0, 0.25);
}

.cerrar-sesion:hover {
    background-color: rgba(255, 0, 0, 0.35);
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
    max-width: 430px;
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
