<template>
    <div class="container">
        <header class="header">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 42"
                @click="$router.push('/PantallaPrincipal')" class="back-icon">
                <path fill="#00bfff" fill-rule="evenodd"
                    d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z" />
            </svg>
            <h1>Pagos y Membresías</h1>
        </header>

        <div class="table-content-wrapper">

            <!-- Controles de Búsqueda y Filtro -->
            <div class="search-filter">
                <input type="text" v-model="filtroBusqueda" placeholder="Buscar por email, ID o estado..."
                    class="modern-input half" />
                <select v-model="filtroEstado" class="modern-input half">
                    <option value="todos">Todos los Estados</option>
                    <option value="Activo">Activo</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Vencido">Vencido</option>
                </select>
            </div>

            <!-- Sección Tablas de Pagos -->
            <section class="payment-sections">

                <div v-if="cargandoPagos" class="loading">
                    <div class="loadbar"></div>
                </div>

                <div v-else class="table_sus">
                    <h3>Historial de Pagos ({{ pagosFiltrados.length }})</h3>
                    <div class="table-scroll">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Pago</th>
                                    <th>Usuario</th>
                                    <th>Monto</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="pago in pagosFiltrados" :key="pago.id">
                                    <td>{{ pago.id.substring(0, 6) }}...</td>
                                    <td>{{ pago.usuarioEmail || 'Cargando...' }}</td>
                                    <td>${{ pago.monto }}</td>
                                    <td>{{ formatearFecha(pago.fecha) }}</td>
                                    <td
                                        :class="{ 'status-active': pago.estado === 'Activo', 'status-pending': pago.estado !== 'Activo' }">
                                        {{ pago.estado }}
                                    </td>
                                </tr>
                                <tr v-if="pagosFiltrados.length === 0">
                                    <td colspan="5" class="empty-row">No se encontraron pagos con esos filtros.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>


            <!-- Sección Membresías EDITABLES (Tu código original sin cambios) -->
            <section class="Membresia">
                <h3>Membresías</h3>

                <div class="membresia_list">
                    <div class="cards-grid-membresia">
                        <div v-for="(membresia, index) in membresias" :key="membresia.id" class="membership-card">
                            <div class="card-content">
                                <h4>{{ membresia.nombre }}</h4>
                                <p class="price-duration">${{ membresia.precio }} / {{ membresia.duracion }}</p>
                                <p class="benefits">Beneficios: <span>{{ membresia.beneficios }}</span></p>
                            </div>
                            <div class="card-actions">
                                <button class="update-btn" @click="editarMembresia(index)"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill-opacity="0" fill="#dddddd" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#00bfff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8,8)"><path d="M4,5v22h13.0625l-0.6875,3.46875l-0.3125,1.46875l1.46875,-0.3125l3.53125,-0.6875l0.3125,-0.0625l9.75,-9.75c1.16016,-1.16016 1.16016,-3.08984 0,-4.25c-0.58203,-0.58203 -1.35547,-0.875 -2.125,-0.875c-0.34375,0 -0.67187,0.07031 -1,0.1875v-11.1875zM6,7h20v2h-20zM6,11h20v6.75l-7.25,7.25h-12.75zM9,14v2h2v-2zM13,14v2h10v-2zM9,18v2h2v-2zM13,18v2h6v-2zM29,18c0.25391,0 0.51953,0.08203 0.71875,0.28125c0.39844,0.39844 0.39844,1.00781 0,1.40625l-9.34375,9.34375l-1.78125,0.375l0.375,-1.78125l9.34375,-9.34375c0.19922,-0.19922 0.43359,-0.28125 0.6875,-0.28125z"></path></g></g>
</svg></button>
                                <button class="delete-btn" @click="borrarMembresia(index)"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill-opacity="0" fill="#dddddd" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#ff3030" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,2l-1,1h-4c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1h2h10h2c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1h-4l-1,-1zM5,7v13c0,1.105 0.895,2 2,2h10c1.105,0 2,-0.895 2,-2v-13z"></path></g></g>
</svg></button>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="add-btn" id="nueva-membresia" @click="abrirModal">Nueva Membresía</button>

                <!-- Modal emergente -->
                <div v-if="mostrarModal" class="modal-overlay" @click.self="cerrarModal">
                    <div class="modal-content">
                        <h3>{{ editarIndex !== null ? 'Editar Membresía' : 'Nueva Membresía' }}</h3>
                        <form @submit.prevent="enviarMembresia">
                            <div>
                                <label for="titulo">Título:</label>
                                <input id="titulo" v-model="formMembresia.titulo" required class="modern-input" />
                            </div>
                            <div>
                                <label for="beneficios">Beneficios:</label>
                                <textarea id="beneficios" v-model="formMembresia.beneficios" required
                                    class="modern-input"></textarea>
                            </div>
                            <div>
                                <label for="precio">Precio:</label>
                                <input id="precio" type="number" v-model="formMembresia.precio" required min="0"
                                    class="modern-input" />
                            </div>
                            <div>
                                <label for="duracion">Duración (Ej: Mes / Año):</label>
                                <input id="duracion" v-model="formMembresia.duracion" required class="modern-input" />
                            </div>
                            <div class="modal-actions">
                                <button type="submit" class="btn-enviar">{{ editarIndex !== null ? 'Guardar Cambios' :
                                    'Crear Membresía' }}</button>
                                <button type="button" class="btn-cancelar" @click="cerrarModal">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>

        <!-- Bottom navigation -->
    <nav class="bottom-nav">
      <button class="nav-btn" @click="$router.push('/Gestion_U')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="#000000"><path fill="currentColor" fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3m2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Gestion_P')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/PantallaPrincipal')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 1024 1025"><path fill="currentColor" d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Perfil_U')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Configuracion')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0,0,256,256">
<g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path fill="currentColor" d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"></path></g></g>
</svg></button>
    </nav>
    </div>
</template>


<script setup>
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { ref, onMounted, computed } from 'vue'; // Importar computed
import { db } from '@/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const mostrarModal = ref(false);
const formMembresia = ref({
    titulo: '', beneficios: '', precio: 0, duracion: '', metodos: ''
});
const membresias = ref([]);
const editarIndex = ref(null);
const cargandoPagos = ref(true); // Nuevo estado de carga para pagos
const userMap = ref(new Map()); // Mapa para almacenar datos de usuarios

// --- NUEVOS REFS PARA PAGOS EN TIEMPO REAL ---
const pagos = ref([]); // Lista completa de pagos
const filtroBusqueda = ref("");
const filtroEstado = ref("todos");

// --- LÓGICA DE PAGOS ---
const cargarPagosDeUsuarios = async () => {
    cargandoPagos.value = true;
    try {
        // 1. Cargar todos los usuarios y crear un mapa
        const usuariosSnap = await getDocs(collection(db, "usuarios"));
        const tempUserMap = new Map();
        usuariosSnap.docs.forEach(doc => {
            tempUserMap.set(doc.id, doc.data());
        });
        userMap.value = tempUserMap;

        // 2. Cargar todos los pagos
        const pagosSnap = await getDocs(collection(db, "pagos"));

        // 3. Unir pagos con info de usuario
        const pagosUnidos = pagosSnap.docs.map(doc => {
            const pagoData = doc.data();
            const userInfo = userMap.value.get(pagoData.userId);

            return {
                id: doc.id,
                ...pagoData,
                usuarioEmail: userInfo ? userInfo.email : 'Usuario Desconocido',
                usuarioNombre: userInfo ? userInfo.nombre : 'Usuario'
            };
        });

        pagos.value = pagosUnidos;

    } catch (error) {
        console.error("Error cargando pagos:", error);
    } finally {
        cargandoPagos.value = false;
    }
};

// --- FILTRADO DE PAGOS ---
const pagosFiltrados = computed(() => {
    const busqueda = filtroBusqueda.value.toLowerCase().trim();
    const estado = filtroEstado.value;

    return pagos.value.filter(pago => {
        const matchEstado = (estado === 'todos') || (pago.estado === estado);

        const matchBusqueda = (busqueda === '') ||
            (pago.id.toLowerCase().includes(busqueda)) ||
            (pago.usuarioEmail.toLowerCase().includes(busqueda)) ||
            (pago.estado.toLowerCase().includes(busqueda));

        return matchEstado && matchBusqueda;
    });
});

// --- LÓGICA DE MEMBRESÍAS (Tu código original) ---
function abrirModal() { mostrarModal.value = true; }
function cerrarModal() {
    mostrarModal.value = false;
    formMembresia.value = { titulo: '', beneficios: '', precio: 0, duracion: '', metodos: '' };
    editarIndex.value = null;
}

async function enviarMembresia() {
    try {
        const user = getAuth().currentUser;
        if (!user) {
            alert("Debes iniciar sesión para agregar una membresía");
            return;
        }
        const membresiaRef = collection(db, "membresias");
        if (editarIndex.value !== null) {
            const id = membresias.value[editarIndex.value].id;
            const docRef = doc(db, "membresias", id);
            await updateDoc(docRef, {
                nombre: formMembresia.value.titulo, beneficios: formMembresia.value.beneficios,
                precio: formMembresia.value.precio, duracion: formMembresia.value.duracion,
                metodos: formMembresia.value.metodos, actualizadoPor: user.uid
            });
            membresias.value[editarIndex.value] = {
                id, nombre: formMembresia.value.titulo, beneficios: formMembresia.value.beneficios,
                precio: formMembresia.value.precio, duracion: formMembresia.value.duracion,
                metodos: formMembresia.value.metodos
            };
        } else {
            const docRef = await addDoc(membresiaRef, {
                nombre: formMembresia.value.titulo, beneficios: formMembresia.value.beneficios,
                precio: formMembresia.value.precio, duracion: formMembresia.value.duracion,
                metodos: formMembresia.value.metodos, creadoPor: user.uid,
                fechaCreacion: new Date().toISOString()
            });
            membresias.value.push({
                id: docRef.id, nombre: formMembresia.value.titulo, beneficios: formMembresia.value.beneficios,
                precio: formMembresia.value.precio, duracion: formMembresia.value.duracion,
                metodos: formMembresia.value.metodos
            });
        }
        cerrarModal();
    } catch (error) {
        console.error("Error al guardar membresía:", error);
        alert("Error al guardar membresía: " + error.message);
    }
}

async function cargarMembresias() {
    const membresiaRef = collection(db, "membresias");
    const snapshot = await getDocs(membresiaRef);
    membresias.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

async function borrarMembresia(index) {
    if (!confirm("¿Estás seguro de borrar esta membresía?")) return;
    try {
        const id = membresias.value[index].id;
        await deleteDoc(doc(db, "membresias", id));
        membresias.value.splice(index, 1);
        alert("Membresía eliminada correctamente.");
    } catch (error) {
        console.error("Error al borrar membresía:", error);
        alert("Error al borrar membresía: " + error.message);
    }
}

function editarMembresia(index) {
    const memb = membresias.value[index];
    formMembresia.value = {
        titulo: memb.nombre, beneficios: memb.beneficios,
        precio: memb.precio, duracion: memb.duracion,
        metodos: memb.metodos
    };
    editarIndex.value = index;
    abrirModal();
}

// Formatear fecha (usar toISOString en la escritura y toLocaleDateString en la lectura)
const formatearFecha = (iso) => {
    if (!iso) return 'N/A';
    try { return new Date(iso).toLocaleDateString(); } catch { return iso; }
}

// --------------------------
// Inicializar
// --------------------------
onMounted(() => {
    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            cargarMembresias();
            cargarPagosDeUsuarios(); // Cargar pagos al montar
        }
    });
});
</script>



<style scoped>
/* === BASE STYLES === */
.container {
    background-color: #0d1117;
    min-height: 100vh;
    padding: 20px 20px 100px;
    /* Espacio para el nav */
    box-sizing: border-box;
    color: #c9d1d9;
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #30363d;
}

.back-icon {
    left: 20px;
    margin-right: 15px;
    cursor: pointer;
}

h1 {
    color: #00bfff;
    font-size: 1.3rem;
    /* Ajustado para caber con el icono */
    font-weight: bold;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: 1px;
}

.table-content-wrapper {
    flex: 1;
    max-height: calc(100vh - 210px);
    overflow-y: auto;
    padding-bottom: 20px;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}

/* Hide WebKit scrollbars but keep scrolling functional */
.table-content-wrapper::-webkit-scrollbar {

    background: transparent;
    display: none;
}


/* --- SEARCH & FILTER --- */
.search-filter {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

.search-filter .modern-input.half {
    flex: 1;
}

.modern-input {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #30363d;
    background-color: #0d1117;
    color: white;
    font-size: 0.8rem;
    outline: none;
    box-sizing: border-box;
}

.modern-input:focus {
    border-color: #00bfff;
}

/* --- PAYMENT SECTIONS --- */
.payment-sections {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
}

.table_sus {
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.table_sus h3 {
    margin-top: 0;
    color: #00bfff;
    font-size: 1rem;
    padding-bottom: 10px;
    border-bottom: 1px solid #30363d;
    text-align: center;
}

/* --- TABLE STYLES --- */
.table-scroll {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

table {
    width: 100%;
    border-collapse: collapse;
    min-width: 400px;
}

th,
td {
    padding: 10px;
    text-align: left;
    font-size: 0.65rem;
    color: #c9d1d9;
    white-space: nowrap;
}

th {
    background-color: #0d1117;
    font-weight: 700;
    color: #8b949e;
    text-transform: uppercase;
}

td {
    border-bottom: 1px solid #30363d;
}

tbody tr:hover {
    background-color: #1c2128;
}

.status-active {
    color: #3fb950;
}

.status-pending {
    color: #e3b341;
}

.empty-row {
    text-align: center !important;
    font-style: italic;
    color: #8b949e;
    padding: 15px;
}


/* --- MEMBRESIA CARDS SECTION --- */
.Membresia {
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 16px;
    padding: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.Membresia h3 {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 20px;
}

.cards-grid-membresia {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    width: 100%;
    margin-bottom: 20px;
}

.membership-card {
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.membership-card h4 {
    margin-top: 0;
    margin-bottom: 5px;
    color: #00bfff;
    font-size: 1rem;
}

.price-duration {
    font-size: 0.9rem;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 15px;
}

.benefits {
    font-size: 0.9rem;
    color: #8b949e;
}

.benefits span {
    color: #f7f7f7;
}

.card-actions {
    margin-top: 5px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}

.update-btn,
.delete-btn {
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
 
    transition: all 0.2s;
}

.update-btn {
    background-color: #00bfff00;
    color: #0d1117;
}


.delete-btn {
    background-color: #da363300;
    color: white;
}

.add-btn {
    width: 100%;
    padding: 15px;
    background-color: #00bfff;
    color: #0d1117;
    border: none;
    border-radius: 8px;
    font-weight: 900;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
}

.add-btn:hover {
    box-shadow: 0 4px 12px rgba(110, 109, 109, 0.5);
}

/* --- INPUTS MODAL --- */
.modal-content input,
.modal-content textarea,
.modal-content select {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #30363d;
    background-color: #0d1117;
    color: white;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
    margin-top: 5px;
    margin-bottom: 15px;
}

.modal-content label {
    color: #00bfff;
    margin-bottom: 5px;
    font-weight: 700;
    display: block;
}

.modal-content textarea {
    min-height: 80px;
    resize: vertical;
}

/* --- MODAL --- */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
}

.modal-content {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 16px;
    padding: 30px;
    width: 90%;
    max-width: 350px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.7);
    color: #c9d1d9;
}

.modal-content h3 {
    color: #00bfff;
    margin-bottom: 20px;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
}

.btn-enviar,
.btn-cancelar {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    flex-grow: 1;
}

.btn-enviar {
    background-color: #00bfff;
    color: #0d1117;
}

.btn-cancelar {
    background-color: #da3633;
    color: white;
}


/* --- NAV --- */
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

/* --- LOADING --- */
.loading {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}

.loadbar {
    width: 40px;
    height: 40px;
    border: 4px solid #30363d;
    border-top-color: #00bfff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
