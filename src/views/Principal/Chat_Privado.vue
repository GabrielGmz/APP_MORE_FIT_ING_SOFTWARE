<template>
  <div class="chat-container">
    
    <!-- Header con Nombre del Otro Usuario -->
    <header class="chat-header">
      <button class="back-btn" @click="$router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"/></svg>
      </button>
      
      <div class="header-info">
        <div class="avatar-mini">
           {{ obtenerInicial(nombreOtroUsuario) }}
        </div>
        <h1>{{ nombreOtroUsuario || 'Cargando...' }}</h1>
      </div>
    </header>

    <!-- Área de Mensajes -->
    <div class="messages-area" ref="messagesContainer">
      <div v-if="cargando" class="loading-state">Cargando conversación...</div>
      <div v-else-if="mensajes.length === 0" class="empty-state">
          No hay mensajes aún. <br>¡Saluda a {{ nombreOtroUsuario }}! 👋
      </div>

      <div 
        v-for="msg in mensajes" 
        :key="msg.id" 
        class="message-row"
        :class="{ 'my-message': msg.uid === currentUser?.uid }"
      >
        <div class="bubble">
            <p class="msg-text">{{ msg.texto }}</p>
            <span class="msg-time">{{ formatearHora(msg.fecha) }}</span>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-area">
      <input 
        v-model="nuevoMensaje" 
        type="text" 
        placeholder="Escribe tu mensaje..." 
        @keyup.enter="enviarMensaje"
      />
      <button class="send-btn" @click="enviarMensaje" :disabled="!nuevoMensaje.trim()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"/></svg>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { db, auth } from '@/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const route = useRoute();
const chatId = route.params.id; // El ID del chat (ej: uid1_uid2)

const currentUser = ref(null);
const mensajes = ref([]);
const nuevoMensaje = ref('');
const cargando = ref(true);
const nombreOtroUsuario = ref('');
const messagesContainer = ref(null);
let unsubscribe = null;

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser.value = user;
      await cargarInfoChat();
      cargarMensajes();
    }
  });
});

onUnmounted(() => {
    if (unsubscribe) unsubscribe();
});

// 1. Obtener nombres del chat para el Header
const cargarInfoChat = async () => {
    try {
        const chatRef = doc(db, 'chats_privados', chatId);
        const chatSnap = await getDoc(chatRef);
        
        if (chatSnap.exists()) {
            const data = chatSnap.data();
            // El array 'nombres' tiene [nombre1, nombre2] y 'participantes' [uid1, uid2]
            // Buscamos el índice que NO sea el nuestro
            const myIndex = data.participantes.indexOf(currentUser.value.uid);
            const otherIndex = myIndex === 0 ? 1 : 0;
            
            nombreOtroUsuario.value = data.nombres[otherIndex] || 'Usuario';
        }
    } catch (e) {
        console.error("Error cargando info del chat:", e);
    }
};

// 2. Escuchar mensajes en tiempo real
const cargarMensajes = () => {
    const mensajesRef = collection(db, 'chats_privados', chatId, 'mensajes');
    const q = query(mensajesRef, orderBy('fecha', 'asc'));

    unsubscribe = onSnapshot(q, (snapshot) => {
        mensajes.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        cargando.value = false;
        scrollToBottom();
    });
};

// 3. Enviar Mensaje
const enviarMensaje = async () => {
    if (!nuevoMensaje.value.trim() || !currentUser.value) return;

    const texto = nuevoMensaje.value;
    nuevoMensaje.value = ''; // Limpiar input

    try {
        // A) Agregar mensaje a la subcolección
        const mensajesRef = collection(db, 'chats_privados', chatId, 'mensajes');
        await addDoc(mensajesRef, {
            texto: texto,
            uid: currentUser.value.uid,
            fecha: serverTimestamp()
        });

        // B) Actualizar el documento padre con el último mensaje (para vista de lista de chats)
        const chatRef = doc(db, 'chats_privados', chatId);
        await updateDoc(chatRef, {
            ultimoMensaje: texto,
            fechaActualizacion: serverTimestamp()
        });

        scrollToBottom();
    } catch (error) {
        console.error("Error enviando mensaje:", error);
        alert("Error al enviar.");
    }
};

// --- Utilidades ---
const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
};

const obtenerInicial = (nombre) => {
    return nombre ? nombre.charAt(0).toUpperCase() : '?';
};

const formatearHora = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
.chat-container {
  background-color: #0d1117;
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: #e6edf3;
  font-family: 'Segoe UI', sans-serif;
  margin:auto 0;
  box-sizing: border-box;
}

/* Header */
.chat-header {
  padding: 15px;
  margin-top: 20px;
  background-color: #161b2200;
  border-bottom: 1px solid #30363d;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 10;
}
.back-btn {
    background: none; border: none; color: #00bfff; cursor: pointer;
}

.header-info {
    display: flex;
    align-items: center;
    gap: 12px;
}
.avatar-mini {
    width: 35px; height: 35px;
    background-color: #00bfff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: bold; color: #0d1117;
    font-size: 1.1rem;
}
.chat-header h1 {
  font-size: 1.1rem; margin: 0; color: white; font-weight: 700;
}

/* Área de Mensajes */
.messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    scroll-behavior: smooth;
    background-color: #161b22;
}

.message-row {
    display: flex;
    width: 100%;
}
.message-row.my-message {
    justify-content: flex-end;
}

.bubble {
    max-width: 75%;
    padding: 10px 14px;
    border-radius: 16px;
    background-color: #21262d; /* Mensajes recibidos (Gris oscuro) */
    color: #e6edf3;
    position: relative;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    border-bottom-left-radius: 2px;
}

.my-message .bubble {
    background-color: #005cc5; /* Mensajes enviados (Azul) */
    color: white;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 2px;
}

.msg-text {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.4;
    word-wrap: break-word;
}

.msg-time {
    display: block;
    font-size: 0.65rem;
    text-align: right;
    margin-top: 4px;
    opacity: 0.7;
}

/* Input Area */
.input-area {
    background-color: #161b22;
    padding: 15px;
    border-top: 1px solid #30363d;
    display: flex;
    gap: 10px;
    align-items: center;
}
.input-area input {
    flex: 1;
    padding: 12px 15px;
    border-radius: 25px;
    border: 1px solid #30363d;
    background-color: #0d1117;
    color: white;
    outline: none;
    font-size: 1rem;
}
.input-area input:focus { border-color: #00bfff; }

.send-btn {
    background-color: #00bfff;
    border: none;
    width: 45px; height: 45px;
    border-radius: 50%;
    color: #0d1117;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: transform 0.2s;
}
.send-btn:hover:not(:disabled) { transform: scale(1.1); }
.send-btn:disabled { opacity: 0.5; cursor: default; }

/* Helpers */
.loading-state, .empty-state {
    text-align: center; color: #8b949e; margin-top: 40px; font-style: italic;
}
</style>