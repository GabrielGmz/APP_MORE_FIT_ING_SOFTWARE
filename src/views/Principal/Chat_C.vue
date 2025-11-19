<template>
    <div class="chat-container">

        <!-- Header Fijo -->
        <header class="chat-header">
            <button class="back-btn" @click="$router.go(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z" />
                </svg>
            </button>
            <h1>Comunidad +FIT</h1>
        </header>

        <!-- Área de Mensajes -->
        <div class="messages-area" ref="messagesContainer">
            <div v-if="cargando" class="loading-state">Cargando mensajes...</div>
            <div v-else-if="mensajes.length === 0" class="empty-state">¡Sé el primero en escribir!</div>

            <div v-for="msg in mensajes" :key="msg.id" class="message-row"
                :class="{ 'my-message': msg.uid === currentUser?.uid }">

                <!-- Avatar -->
                <div class="avatar" :class="getRoleClass(msg.rol)" @click="abrirOpcionesUsuario(msg)">
                    {{ obtenerInicial(msg.nombre) }}
                </div>

                <div class="message-content">
                    <div class="message-header">
                        <span class="username" @click="abrirOpcionesUsuario(msg)">
                            {{ msg.nombre }}
                            <span v-if="msg.rol === 'entrenador'" class="badge-trainer">ENTRENADOR</span>
                            <span v-if="msg.rol === 'admin'" class="badge-admin">ADMIN</span>
                        </span>
                        <span class="timestamp">{{ formatearHora(msg.fecha) }}</span>
                    </div>
                    <div class="bubble">
                        {{ msg.texto }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Input Fijo -->
        <div class="input-area">
            <input v-model="nuevoMensaje" type="text" placeholder="Escribe un mensaje..."
                @keyup.enter="enviarMensaje" />
            <button class="send-btn" @click="enviarMensaje" :disabled="!nuevoMensaje.trim()">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z" />
                </svg>
            </button>
        </div>

        <!-- Modal de Opciones de Usuario -->
        <div v-if="usuarioSeleccionado" class="modal-overlay" @click.self="cerrarModal">
            <div class="user-modal">
                <div class="modal-avatar" :class="getRoleClass(usuarioSeleccionado.rol)">
                    {{ obtenerInicial(usuarioSeleccionado.nombre) }}
                </div>
                <h3>{{ usuarioSeleccionado.nombre }}</h3>
                <p class="user-role">{{ usuarioSeleccionado.rol || 'Atleta' }}</p>

                <div class="modal-actions">
                    <button v-if="usuarioSeleccionado.uid !== currentUser?.uid" class="btn-dm"
                        @click="iniciarChatPrivado">
                        Mensaje Directo
                    </button>
                    <button class="btn-cancel" @click="cerrarModal">Cerrar</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { db, auth } from '@/firebase';
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    limit,
    serverTimestamp,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
const router = useRouter();


const currentUser = ref(null);
const mensajes = ref([]);
const nuevoMensaje = ref('');
const cargando = ref(true);
const messagesContainer = ref(null);
const usuarioSeleccionado = ref(null);

// --- Inicialización ---

onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
                currentUser.value = {
                    uid: user.uid,
                    email: user.email,
                    ...userDoc.data()
                };
                cargarMensajes();
            } catch (e) {
                console.error("Error cargando usuario:", e);
            }
        } else {
            cargando.value = false; // Dejar de cargar si no hay usuario
        }
    });
});

const cargarMensajes = () => {
    const q = query(
        collection(db, 'mensajes_comunidad'),
        orderBy('fecha', 'asc'),
        limit(100)
    );

    onSnapshot(q, (snapshot) => {
        mensajes.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        cargando.value = false;
        scrollToBottom();
    }, (error) => {
        console.error("Error al cargar mensajes:", error);
        // Si el error es de permisos, avisa en consola
        if (error.code === 'permission-denied') {
            alert("Error de permisos: No tienes acceso para leer los mensajes de la comunidad.");
        }
    });
};

const enviarMensaje = async () => {
    if (!nuevoMensaje.value.trim()) return;
    if (!currentUser.value) {
        alert("Error: No estás identificado. Recarga la página.");
        return;
    }

    const texto = nuevoMensaje.value;
    nuevoMensaje.value = ''; // Limpiar input inmediatamente

    try {
        await addDoc(collection(db, 'mensajes_comunidad'), {
            texto: texto,
            uid: currentUser.value.uid,
            nombre: currentUser.value.nombre || currentUser.value.email.split('@')[0],
            rol: currentUser.value.rol || 'cliente',
            fecha: serverTimestamp()
        });
        scrollToBottom();
    } catch (error) {
        console.error("Error detallado al enviar:", error);
        if (error.code === 'permission-denied') {
            alert("Error: No tienes permiso para enviar mensajes. Revisa las reglas de Firestore.");
        } else {
            alert("No se pudo enviar el mensaje: " + error.message);
        }
    }
};

// --- Chat Privado ---

const abrirOpcionesUsuario = (msgUser) => {
    usuarioSeleccionado.value = msgUser;
};

const cerrarModal = () => {
    usuarioSeleccionado.value = null;
};

const iniciarChatPrivado = async () => {
    if (!currentUser.value || !usuarioSeleccionado.value) return;

    const miUid = currentUser.value.uid;
    const otroUid = usuarioSeleccionado.value.uid;

    // Crear ID único ordenado alfabéticamente para que sea el mismo para ambos usuarios
    const chatId = [miUid, otroUid].sort().join('_');

    try {
        const chatRef = doc(db, 'chats_privados', chatId);
        const chatSnap = await getDoc(chatRef);

        if (!chatSnap.exists()) {
            await setDoc(chatRef, {
                participantes: [miUid, otroUid],
                nombres: [currentUser.value.nombre, usuarioSeleccionado.value.nombre],
                ultimoMensaje: '',
                fechaActualizacion: serverTimestamp()
            });
        }
        cerrarModal();
        router.push({ name: 'Chat_Privado', params: { id: chatId } });

    } catch (e) {
        console.error("Error iniciando chat privado:", e);
        alert("Error al iniciar chat: " + e.message);
    }
};

// --- Utilidades UI ---

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
    if (!timestamp) return '...';
    // Maneja tanto timestamps de Firebase como fechas JS
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getRoleClass = (rol) => {
    if (rol === 'entrenador') return 'role-trainer';
    if (rol === 'admin') return 'role-admin';
    return 'role-user';
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
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 10;
}

.back-btn {
    background: none;
    border: none;
    color: #00bfff;
    cursor: pointer;
}

.chat-header h1 {
    font-size: 1.2rem;
    margin: 0;
    color: #00bfff;
    font-weight: 700;
}

/* Área de Mensajes */
.messages-area {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    scroll-behavior: smooth;
}

.message-row {
    display: flex;
    gap: 12px;
    align-items: flex-end;
    /* Avatar abajo */
    max-width: 85%;
}

.message-row.my-message {
    align-self: flex-end;
    flex-direction: row-reverse;
}

/* Avatar */
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    border: 2px solid transparent;
}

/* Colores de roles */
.role-user {
    background-color: #30363d;
    border-color: #8b949e;
}

.role-trainer {
    background-color: #d29922;
    border-color: #e3b341;
    color: black;
}

/* Dorado */
.role-admin {
    background-color: #da3633;
    border-color: #f85149;
}

/* Rojo */

/* Contenido del Mensaje */
.message-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.message-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
}

.my-message .message-header {
    justify-content: flex-end;
    /* Nombre a la derecha para mis mensajes */
}

.username {
    color: #8b949e;
    font-weight: bold;
    cursor: pointer;
}

.username:hover {
    text-decoration: underline;
}

.timestamp {
    color: #484f58;
    font-size: 0.7rem;
}

/* Badges */
.badge-trainer,
.badge-admin {
    font-size: 0.6rem;
    padding: 1px 4px;
    border-radius: 4px;
    margin-left: 4px;
    color: white;
}

.badge-trainer {
    background-color: #d29922;
}

.badge-admin {
    background-color: #da3633;
}

/* Burbujas de Chat */
.bubble {
    padding: 12px 16px;
    border-radius: 18px;
    background-color: #21262d;
    color: #e6edf3;
    line-height: 1.4;
    font-size: 0.95rem;
    position: relative;
    border-bottom-left-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.my-message .bubble {
    background-color: #00bfff;

    color: rgb(255, 255, 255);
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 2px;
    /* Pico inverso */
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

.input-area input:focus {
    border-color: #00bfff;
}

.send-btn {
    background-color: #00bfff;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    color: #0d1117;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s;
}

.send-btn:hover:not(:disabled) {
    transform: scale(1.1);
}

.send-btn:disabled {
    opacity: 0.5;
    cursor: default;
}

/* Modal User Options */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    backdrop-filter: blur(3px);
}

.user-modal {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 20px;
    padding: 30px;
    width: 280px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.modal-avatar {
    width: 80px;
    height: 80px;
    margin: 0 auto 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 900;
    color: white;
}

.user-modal h3 {
    margin: 0;
    color: white;
}

.user-role {
    color: #8b949e;
    margin-top: 5px;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: bold;
}

.modal-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 25px;
}

.btn-dm {
    background: #00bfff;
    color: #090c10;
    border: none;
    padding: 12px;
    border-radius: 10px;
    font-weight: 900;
    cursor: pointer;
}

.btn-cancel {
    background: transparent;
    color: #8b949e;
    border: 1px solid #30363d;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
}

/* Helpers */
.loading-state,
.empty-state {
    text-align: center;
    color: #8b949e;
    margin-top: 40px;
    font-style: italic;
}
</style>