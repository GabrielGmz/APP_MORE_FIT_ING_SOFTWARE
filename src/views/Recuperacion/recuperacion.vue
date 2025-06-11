<template>
    <div class="view_recuperacion">
        <h1>+ FIT</h1>
        <div class="recuperacion-container">
            <h2>RECUPERAR CONTRASEÑA</h2>
            <form @submit.prevent="enviarRecuperacion">
                <div class="form_group">
                    <label for="email">CORREO ELECTRÓNICO</label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <p>
                    ENVIAREMOS UN ENLACE A SU CORREO PARA
                    REESTABLECER LA CONTRASEÑA
                </p>
                <button type="submit">ENVIAR ENLACE DE RECUPERACIÓN</button>
                <p v-if="mensaje" :class="{ exito: exito, error: !exito }">{{ mensaje }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

export default {
    name: 'Recuperacion',
    data() {
        return {
            email: '',
            mensaje: '',
            exito: false,
        }
    },
    methods: {
        async enviarRecuperacion() {
            const auth = getAuth()
            const actionCodeSettings = {
                url: 'http://localhost:5173/Nueva_Pass',
                handleCodeInApp: true
            }

            try {
                await sendPasswordResetEmail(auth, this.email, actionCodeSettings)
                this.$router.push('/P_Espera')

                this.mensaje = 'Revisa tu correo para restablecer tu contraseña.'
                this.exito = true
                this.email = ''
            } catch (error) {
                console.error(error)
        if (error.code === 'auth/user-not-found') {
          this.mensaje = 'El correo ingresado no está registrado.'
        } else {
          this.mensaje = 'Error al enviar el correo de recuperación.'
        }
        this.exito = false
      }
    },
  },
}
</script>


<style scoped>
.view_recuperacion {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url('@/assets/Fondo_Gym.jpeg');
    background-size: cover;
    background-position: center;
}

.recuperacion-container {
    width: 100%;
    max-width: 300px;
    margin: 60px auto;
    padding: 2rem;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.7);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    height: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    max-width: 350px;
    margin: 0 auto;
    color: white;
    backdrop-filter: blur(2px);
}

h1 {
    text-align: center;
    font-size: 55px;
    color: #008CFF;
    font-weight: 900;
    padding-top: 60px;
}

h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: bold;
}

.form_group {
    margin-top: 30px;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 15px;
}

input[type="email"] {
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
    border-radius: 23px;
    background-color: #D9D9D9;
    border: 1px solid #ccc;
    font-size: 1rem;
    margin-bottom: 20px;
}

p {
    text-align: center;
    font-size: 0.9rem;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 20px;
}

button {
    width: 100%;
    padding: 0.7rem;
    background-color: #008CFF;
    color: #fff;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 30px;
    max-width: 170px;
    margin: 0 auto;
    transition: background 0.3s ease;
    font-weight: bold;
    font-size: 12px;
    justify-content: center;
    display: flex;
}
button:hover {
    background: #000000;
}
.exito {
  color: green;
  font-weight: bold;
  margin-top: 1rem;
}
.error {
  color: red;
  font-weight: bold;
  margin-top: 1rem;
}
</style>