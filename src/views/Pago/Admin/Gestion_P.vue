<template>
    <div class="container">
        <h2>Gestion de Pagos</h2>
        <div class="search-filter">
            <input type="text" placeholder="Buscar..." />
            <select>
                <option value="">Filtrar por...</option>
                <option value="fecha">Fecha</option>
                <option value="monto">Monto</option>
                <option value="estado">Estado</option>
            </select>
        </div>
        <div class="table-container">
            <div class="table_sus">
                <h3>Suscripciones Activas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pago in pagos" :key="pago.id">
                            <td>{{ pago.id }}</td>
                            <td>{{ pago.usuario }}</td>
                            <td>{{ pago.monto }}</td>
                            <td>{{ pago.fecha }}</td>
                            <td>{{ pago.estado }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table_sus">
                <h3>Pendientes</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pago in pagosPendientes" :key="pago.id">
                            <td>{{ pago.id }}</td>
                            <td>{{ pago.usuario }}</td>
                            <td>{{ pago.estado }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="Membresia">
                <h3>Membresias</h3>
                <div class="membresia_list">
                    <div class="cards">
                        <div v-for="(membresia, index) in membresias" :key="index" class="card">
                            <div>
                                <h3>{{ membresia.nombre }}</h3><br>
                                 ${{ membresia.precio }} /Mes<br>
                                {{ membresia.duracion }}<br>
                                Beneficios <br> {{ membresia.beneficios }}<br>
                            </div>
                            <div class="card-actions">
                                <button class="update-btn" @click="editarMembresia(index)">Actualizar</button>
                                <button class="delete-btn" @click="borrarMembresia(index)">Borrar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Botón para abrir el modal -->
                <button class="add-btn" id="nueva-membresia" @click="abrirModal">Nueva Membresía</button>

                <!-- Modal emergente -->
                <div v-if="mostrarModal" class="modal-overlay">
                    <div class="modal-content">
                        <h3>Nueva Membresía</h3>
                        <form @submit.prevent="enviarMembresia">
                            <div>
                                <label for="titulo">Título:</label>
                                <input id="titulo" v-model="formMembresia.titulo" required />
                            </div>
                            <div>
                                <label for="beneficios">Beneficios:</label>
                                <textarea id="beneficios" v-model="formMembresia.beneficios" required></textarea>
                            </div>
                            <div>
                                <label for="precio">Precio:</label>
                                <input id="precio" type="number" v-model="formMembresia.precio" required min="0" />
                            </div>
                            <div>
                                <label for="duracion">Duración:</label>
                                <input id="duracion" v-model="formMembresia.duracion" required />
                            </div>
                            <div class="modal-actions">
                                <button type="submit" class="add-btn">Guardar</button>
                                <button type="button" class="add-btn cancel-btn" @click="cerrarModal">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom navigation -->
        <nav class="bottom-nav">
                  <button class="nav-btn" @click="$router.push('/Gestion_U')"><svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#000000"><path fill="#000000" fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3m2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2z" clip-rule="evenodd"/></svg></button>
      <button class="nav-btn" @click="$router.push('/Gestion_P')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z"/></svg></button>
            <button class="nav-btn" @click="$router.push('/PantallaPrincipal')"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34"
                    viewBox="0 0 1024 1025">
                    <path fill="currentColor"
                        d="M1004.5 556.5Q985 576 957.5 576T911 557l-15-15v419q0 26-18.5 45t-45.5 19H640V737q0-13-9.5-22.5T608 705H416q-13 0-22.5 9.5T384 737v288H192q-27 0-45.5-19T128 961V542l-15 15q-19 19-46.5 19t-47-19.5t-19.5-47T19 463L463 19q20-20 49-19q29-1 49 19l444 444q19 19 19 46.5t-19.5 47z" />
                </svg></button>
            <button class="nav-btn" @click="$router.push('/Perfil_U')"><svg xmlns="http://www.w3.org/2000/svg"
                    width="34" height="34" viewBox="0 0 24 24">
                    <path fill="currentColor" fill-rule="evenodd"
                        d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8m4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z"
                        clip-rule="evenodd" />
                </svg></button>
            <button class="nav-btn" @click="$router.push('/Configuracion')"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34"
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
    </div>
</template>

<script setup>
import { ref } from 'vue';

const mostrarModal = ref(false);
const formMembresia = ref({
    titulo: '',
    beneficios: '',
    precio: 0,
    duracion: '',
    metodos: ''
});

const membresias = ref([]);

function abrirModal() {
    mostrarModal.value = true;
}

function cerrarModal() {
    mostrarModal.value = false;
    formMembresia.value = { titulo:'', beneficios:'', precio:0, duracion:'', metodos:'' };
}

function enviarMembresia() {
    membresias.value.push({
        nombre: formMembresia.value.titulo,
        beneficios: formMembresia.value.beneficios,
        precio: formMembresia.value.precio,
        duracion: formMembresia.value.duracion,
        metodos: formMembresia.value.metodos
    });
    cerrarModal();
}

function borrarMembresia(index) {
    membresias.value.splice(index, 1);
}

function editarMembresia(index) {
    const memb = membresias.value[index];
    formMembresia.value = {
        titulo: memb.nombre,
        beneficios: memb.beneficios,
        precio: memb.precio,
        duracion: memb.duracion,
        metodos: memb.metodos
    };
    mostrarModal.value = true;

    const originalEnviar = enviarMembresia;
    enviarMembresia = function() {
        membresias.value[index] = {
            nombre: formMembresia.value.titulo,
            beneficios: formMembresia.value.beneficios,
            precio: formMembresia.value.precio,
            duracion: formMembresia.value.duracion,
            metodos: formMembresia.value.metodos
        };
        cerrarModal();
        enviarMembresia = originalEnviar;
    };
}

// Datos de ejemplo
const pagos = [
    { id: 1, usuario: 'Juan Perez', monto: 10, fecha: '2023-01-01', estado: 'Activo' },
];

const pagosPendientes = [
    { id: 1, usuario: 'Juan Perez', estado: 'Pendiente' }
];
</script>

<style scoped>
/* --- Tu CSS original --- */
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
    text-align: left;
     color: #008CFF;
    font-weight: 900;
}

h3 {
    text-align: center;
    color: #ffffff;
    font-size: 18px;
    margin-top: 0px;
    font-weight: 900;
}

.search-filter {
    display: flex;
    justify-content: center;
    padding: 2rem 0 5px;
    gap: 3rem;
    align-content: center;
}

input[type="text"] {
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    margin-right: 0.5rem;
    width: 260px;
    background-color: #011331;
}

.table_sus {
    background-color: #02041c;
    backdrop-filter: blur(2px);
    border-radius: 1.5rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    width: 100%;
    max-width: 400px;
    height: auto;
}

.table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-bottom: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 6px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    font-weight: normal;
}

td {
    border-bottom: 2px solid #00000037;
    background-color: #0000003f;
}

th {
    background-color: #000000a1;
    text-align: center;
    font-weight: bold;
    color: #ffffff;
}

th:first-child {
    border-top-left-radius: 7px;
}

th:last-child {
    border-top-right-radius: 7px;
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

.membresia_list {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 1rem;
    color: white;
}

.Membresia {
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
}

.Membresia > h3 {
    margin-top: 1rem;
}

.add-btn {
    background-color: #008CFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 16px;
    padding: 10px 20px;
}

.add-btn:hover {
    background-color: #0056b3;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 10, 20, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #181c24;
    border-radius: 12px;
    padding: 2rem;
    width: 400px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.7);
    color: #fff;
}

.modal-content h3 {
    color: #fff;
    margin-bottom: 1rem;
}

.modal-content label {
    color: #bfc9db;
    font-weight: 500;
}

.modal-content input,
.modal-content textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 1rem;
    border-radius: 6px;
    border: none;
    background: #232a36;
    color: #fff;
    font-size: 1rem;
}

.modal-content input:focus,
.modal-content textarea:focus {
    outline: 2px solid #008cff;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
}

.cancel-btn {
    background: #aaa;
}

/* --- Estilos para cards de membresía --- */
.card {
    position: relative;
    padding: 1rem;
    margin: 5px;
    margin-bottom: 1rem;
    background: rgb(0, 0, 0);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.5);
}

.card h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #00eeff;
}

.card-actions {
    margin-top: 3rem;
    gap: 0.5rem;
    display: flex;
}
.update-btn {
    padding: 10px;
    width: 50%;
    border-radius: 8px;
    border: 1px solid #0091ff;
    background-color: #0091ff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.update-btn:hover {
    background-color: #006bb3;
}
.delete-btn {
    padding: 10px;
    width: 50%;
    border-radius: 8px;
    border: 1px solid #ff3333;
    color: white;
    background-color: #ff3333;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.delete-btn:hover {
    background-color: #cc0000;
}
</style>
