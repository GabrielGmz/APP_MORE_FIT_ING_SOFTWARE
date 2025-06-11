<template>
<div class="container">
    <div class="form-container">
        <h2>RUTINA PARA PECHO</h2>
        <p>4 EJERCICIOS</p>
        <div class="series">
            <div class="serie">
                <h3>PRESS BANCA
INCLINADO</h3>
                <p>4 SERIES x 8 REPS</p>
            </div>
            <div class="serie">
                <h3>PRESS BANCA PLANA</h3>
                <p>4 SERIES X 8 REPS</p>
            </div>
            <div class="serie">
                <h3>APERTURA CON MANCUERNAS</h3>
                <p>4 SERIES X 8 REPS</p>
            </div>
            <div class="serie">
                <h3>DOMINADAS</h3>
                <p>4 SERIES X 8 REPS</p>
            </div>
        </div>
        <div class="btn_reto">
            <button class="btn_comenzar" @click="$router.push('/P_Banca')">COMENZAR</button>
        </div>
    </div>
</div>
</template>


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url("@/assets/Fondo_Gym.jpeg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
p {
    text-align: center;
    font-weight: bold;
    color: white;
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
    text-align: center;
}
.series {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.serie {
    background-color: rgb(0, 0, 0);
    padding: 0.8rem;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    text-align: center;
}
.serie h3 {
    margin: 0;
    font-size: 1.2rem;
}
.serie p {
    margin: 0.5rem 0 0;
    font-size: 1rem;
}
.btn_reto {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.btn_comenzar {
    width: 100%;
    padding: 0.7rem;
    background-color: #008CFF;
    color: white;
    border: none;
    border-radius: 23px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
}
.btn_comenzar:hover {
    background-color: #000000;
    color: white;
}

</style>