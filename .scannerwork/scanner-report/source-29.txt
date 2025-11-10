<template>
    <div class="container">
        <h2>Membresias</h2>
        <div class="membresia_list">
            <h3>Lista de Membresías</h3>
            <div class="cards">
                <div v-for="(membresia, index) in membresias" :key="index" class="card">
                    {{ membresia.nombre }} - {{ membresia.precio }} - {{ membresia.duracion }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const membresias = ref([]);

function agregarMembresia(nuevaMembresia) {
    membresias.value.push(nuevaMembresia);
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

h2 {
    font-weight: bold;
    text-align: left;
    color: #ffffff;
    font-size: 20px;
    margin-bottom: 1rem;
}

.membresia_list {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 1rem;
    color: white;
}

.cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
}
</style>