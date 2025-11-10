<template>
    <div class="container">
    <div class="dominadas">
        <h1>Dominadas - Pasos</h1>
        <ol>
            <li>
            <strong>Preparación:</strong> Agárrate a la barra con las palmas mirando hacia adelante y las manos un poco más abiertas que el ancho de los hombros.
            </li>
            <li>
            <strong>Posición inicial:</strong> Cuelga completamente de la barra, con los brazos extendidos y los pies sin tocar el suelo.
            </li>
            <li>
            <strong>Subida:</strong> Tira de tu cuerpo hacia arriba, llevando el pecho hacia la barra y manteniendo el torso recto.
            </li>
            <li>
            <strong>Punto más alto:</strong> Sube hasta que la barbilla supere la barra, evitando balanceos.
            </li>
            <li>
            <strong>Bajada:</strong> Baja de manera controlada hasta extender completamente los brazos.
            </li>
            <li>
            <strong>Repetición:</strong> Repite el movimiento la cantidad de veces indicada en tu rutina.
            </li>
        </ol>
    </div>
    <div class="button">
        <router-link to="/Rutinas" class="button-link">
            <button class="button-next">FINALIZAR</button>
        </router-link>
    </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('@/assets/Fondo_Gym.jpeg');
    background-size: cover;
    background-position: center;
}
.dominadas {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.707);
    border-radius: 23px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    color: #ffffff;
    backdrop-filter: blur(2px);
}
h1 {
    text-align: center;
    margin-bottom: 1rem;
    color: #ffffff;
}
ol {
    padding-left: 1.2rem;
}
li {
    margin-bottom: 1rem;
    font-size: 15px;
}
strong {
    color: #2980b9;
}
.button {
    margin-top: 20px;
    text-align: center;
}
.button-link {
    text-decoration: none;
}
.button-next {
    background-color: #008CFF;
    color: white;
    border: none;
    border-radius: 23px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.button-next:hover {
    background-color: #0056b3;
}
</style>