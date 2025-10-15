<!-- Vista: Generando plan -->
<template>
  <div class="container">
    <div class="form-container">
      <h2>
        GENERANDO <br />
        PLAN DE <br />
        ENTRENAMIENTO <br />
        Y <br />
        NUTRICION
      </h2>
    </div>
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '@/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { generarPlanConGemini } from '@/composables/IA'

const router = useRouter()

const objetivo = ''
const planNutricion = ''
const nivel = ''

onMounted(async () => {
  const user = auth.currentUser
  if (!user) {
    alert('Debes iniciar sesión')
    return
  }

  try {
    const planGenerado = await generarPlanConGemini({ objetivo, planNutricion, nivel })

    const docRef = await addDoc(collection(db, 'solicitudesPlan'), {
      userId: user.uid,
      objetivo,
      planNutricion,
      nivel,
      planGenerado,
      estado: 'completado',
      creadoEn: serverTimestamp()
    })

    router.push({ name: 'PlanCompleto', query: { solicitudId: docRef.id } })
  } catch (error) {
    console.error('Error al generar el plan:', error)
    alert('Ocurrió un error al generar el plan.')
  }
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #000a12;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.form-container {
    width: 100%;
    max-width: 300px;
    margin: 80px auto;
    padding: 2rem;
    border-radius: 8px;
    background-color: #ffffff40;
    color: white;
    height: auto;
    backdrop-filter: blur(2px);
}
h2 {
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
}

.loading-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
}

.loading-box {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.spinner {
  margin: 20px auto;
  width: 40px;
  height: 40px;
  border: 5px solid #ccc;
  border-top-color: #008CFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>