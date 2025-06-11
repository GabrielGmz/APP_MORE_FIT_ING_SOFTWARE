<template>
    <div class="container">
    <div class="apertura-mancuernas">
        <h1>Apertura con Mancuernas - Pasos</h1>
        <ol>
            <li>
                <strong>Preparación:</strong> Acuéstate boca arriba en un banco plano, sosteniendo una mancuerna en cada mano con los brazos extendidos sobre el pecho y las palmas enfrentadas.
            </li>
            <li>
                <strong>Colocación:</strong> Mantén una ligera flexión en los codos durante todo el movimiento.
            </li>
            <li>
                <strong>Descenso:</strong> Abre los brazos hacia los lados en un arco amplio, bajando las mancuernas hasta que estén al nivel del pecho o sientas un estiramiento en el pectoral.
            </li>
            <li>
                <strong>Subida:</strong> Lleva las mancuernas de vuelta a la posición inicial, juntando los brazos sobre el pecho sin chocar las mancuernas.
            </li>
            <li>
                <strong>Repetición:</strong> Repite el movimiento la cantidad de veces indicada en tu rutina.
            </li>
            <li>
                <strong>Finalización:</strong> Baja cuidadosamente las mancuernas al suelo o colócalas sobre tus muslos antes de levantarte.
            </li>
        </ol>
    </div>
    <div class="button">
        <router-link to="/Dominadas" class="button-link">
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
.apertura-mancuernas {
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