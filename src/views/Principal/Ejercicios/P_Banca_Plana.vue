<template>
    <div class="container">
    <div class="press-banca-plana">
        <h1>Press Banca Plana - Pasos</h1>
        <ol>
            <li>
                <strong>Preparación:</strong> Acuéstate boca arriba en un banco plano, asegurando que tus pies estén firmes en el suelo.
            </li>
            <li>
                <strong>Colocación:</strong> Sujeta la barra con las manos un poco más abiertas que el ancho de los hombros.
            </li>
            <li>
                <strong>Inicio:</strong> Saca la barra del soporte y mantenla alineada sobre el pecho, con los brazos extendidos.
            </li>
            <li>
                <strong>Descenso:</strong> Baja la barra lentamente hasta que toque ligeramente la parte media del pecho, controlando el movimiento.
            </li>
            <li>
                <strong>Empuje:</strong> Empuja la barra hacia arriba hasta extender completamente los brazos, sin bloquear los codos.
            </li>
            <li>
                <strong>Repetición:</strong> Repite el movimiento la cantidad de veces indicada en tu rutina.
            </li>
            <li>
                <strong>Finalización:</strong> Coloca la barra de nuevo en el soporte con cuidado.
            </li>
        </ol>
    </div>
    <div class="button">
        <router-link to="/A_Mancuernas" class="button-link">
            <button class="button-next">SIGUIENTE</button>
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
.press-banca-plana {
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