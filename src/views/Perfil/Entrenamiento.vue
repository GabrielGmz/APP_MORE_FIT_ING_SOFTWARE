<template>
<div class="container">
    <div class="form-container">
        <h2>ENTRENAMIENTO</h2>

        <div class="plan-box">
            <h3>PLANIFICACION<br />PRINCIPIANTE</h3>
        </div>

        <div class="btn_retos">
            <div
                class="retos_item"
                :class="diasCompletados >= 1 ? 'unlocked' : 'locked'"
            >
                <div>
                    <strong>DIA 1</strong>
                    <p>PECHO</p>
                </div>
                <button
                    v-if="diasCompletados < 1"
                    class="btn_comenzar"
                    @click="completarDia(1)"
                >COMENZAR</button>
                <span v-else class="icono_bloqueado">✅</span>
            </div>

            <div
                class="retos_item"
                :class="diasCompletados >= 2 ? 'unlocked' : diasCompletados >= 1 ? 'unlocked' : 'locked'"
            >
                <div>
                    <strong>DIA 2</strong>
                    <p>PIERNA</p>
                </div>
                <button
                    v-if="diasCompletados === 1"
                    class="btn_comenzar"
                    @click="completarDia(2)"
                >COMENZAR</button>
                <span v-else-if="diasCompletados > 1" class="icono_bloqueado">✅</span>
                <span v-else class="icono_bloqueado">🔒</span>
            </div>

            <div
                class="retos_item"
                :class="diasCompletados >= 3 ? 'unlocked' : diasCompletados >= 2 ? 'unlocked' : 'locked'"
            >
                <div>
                    <strong>DIA 3</strong>
                    <p>ESPALDA</p>
                </div>
                <button
                    v-if="diasCompletados === 2"
                    class="btn_comenzar"
                    @click="completarDia(3)"
                >COMENZAR</button>
                <span v-else-if="diasCompletados > 2" class="icono_bloqueado">✅</span>
                <span v-else class="icono_bloqueado">🔒</span>
            </div>

            <div
                class="retos_item"
                :class="diasCompletados >= 4 ? 'unlocked' : diasCompletados >= 3 ? 'unlocked' : 'locked'"
            >
                <div>
                    <strong>DIA 4</strong>
                    <p>HOMBROS</p>
                </div>
                <button
                    v-if="diasCompletados === 3"
                    class="btn_comenzar"
                    @click="completarDia(4)"
                >COMENZAR</button>
                <span v-else-if="diasCompletados > 3" class="icono_bloqueado">✅</span>
                <span v-else class="icono_bloqueado">🔒</span>
            </div>

            <div
                class="retos_item"
                :class="diasCompletados >= 5 ? 'unlocked' : diasCompletados >= 4 ? 'unlocked' : 'locked'"
            >
                <div>
                    <strong>DIA 5</strong>
                    <p>BICEPS</p>
                </div>
                <button
                    v-if="diasCompletados === 4"
                    class="btn_comenzar"
                    @click="completarDia(5)"
                >COMENZAR</button>
                <span v-else-if="diasCompletados > 4" class="icono_bloqueado">✅</span>
                <span v-else class="icono_bloqueado">🔒</span>
            </div>

            <div
                class="retos_item"
                :class="diasCompletados >= 6 ? 'unlocked' : diasCompletados >= 5 ? 'unlocked' : 'locked'"
            >
                <div>
                    <strong>DIA 6</strong>
                    <p>GLUTEOS</p>
                </div>
                <button
                    v-if="diasCompletados === 5"
                    class="btn_comenzar"
                    @click="completarDia(6)"
                >COMENZAR</button>
                <span v-else-if="diasCompletados > 5" class="icono_bloqueado">✅</span>
                <span v-else class="icono_bloqueado">🔒</span>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { db, auth } from '@/firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const diasCompletados = ref(0);
const userId = ref('');
const router = useRouter();

onAuthStateChanged(auth, (user) => {
  if (user) {
    userId.value = user.uid;
    const docRef = doc(db, 'usuarios', user.uid);
    onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        diasCompletados.value = data.diasCompletados || 0;
      }
    });
  } else {
    alert('Usuario no autenticado');
  }
});

async function completarDia(dia) {
  if (!userId.value) {
    alert('No se detectó usuario');
    return;
  }

  try {
    const refUsuario = doc(db, 'usuarios', userId.value);
    await updateDoc(refUsuario, { diasCompletados: dia });
    diasCompletados.value = dia;

    router.push('/DiaPecho');
  } catch (error) {
    console.error('Error al completar el día:', error);
    alert('Error al completar el día. Inténtalo de nuevo más tarde.');
  }
}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: black;
  color: white;
  background-color: #000a12;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(2px);
}

.form-container {
  width: 100%;
  max-width: 320px;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #ffffff20;
  color: white;
  backdrop-filter: blur(4px);
  text-align: center;
}

h2 {
  font-weight: bold;
  margin-bottom: 1rem;
}

.plan-box {
  background-color: #0099ff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: white;
  font-weight: bold;
}

.plan-box h3 {
  margin: 0;
  line-height: 1.4;
}

.btn_retos {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.retos_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 12px 16px;
  color: white;
}

.retos_item.unlocked {
  background-color: #8000ff;
}

.retos_item.locked {
  background-color: #8000ff;
  opacity: 0.7;
}

.retos_item p {
  margin: 4px 0 0;
  font-size: 0.85rem;
}

.btn_comenzar {
  background-color: #f5f5f5;
  color: black;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

.btn_comenzar:hover {
  background-color: #e0e0e0;
}

.icono_bloqueado {
  font-size: 1.6rem;
}
</style>
