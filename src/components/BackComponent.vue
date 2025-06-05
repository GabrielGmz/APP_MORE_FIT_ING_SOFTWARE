<template>
    <button @click="goBack" class="back-button">
        ← 
    </button>
</template>

<script>
export default {
    name: "BackComponent",
    methods: {
        goBack() {
            this.$router ? this.$router.back() : window.history.back();
        }
    }
};
</script>

<style scoped>
.back-button {
    background: none;
    border: none;
    color: #1976d2;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.5em 1em;
    transition: color 0.2s;
}
.back-button:hover {
    color: #0d47a1;
    text-decoration: underline;
}
</style>