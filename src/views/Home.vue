<template>
  <div id="app">
    <header>
      <h1> + FIT </h1>
    </header>

    <main>
      <div class="auth-buttons">
        <router-link to="/login" class="btnlogin">Iniciar Sesión</router-link>
        <router-link to="/signup" class="btnsignup">Registrarse</router-link>
      </div>
    </main>
  </div>
</template>


<style scoped>
#app {
  text-align: center;
  background-image: url("@/assets/Fondo_Gym.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  margin-top: -35px;
}

h1 {
  font-size: 50px;
  color: #008CFF;
  font-weight: 900;
  padding-top: 60px;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
}

.auth-buttons {
  position: absolute;
  background-color: #ffffff40;
  border-radius: 30px;
  width: 100%;
  max-width: 350px;
  display: flex;
  bottom: 140px;
  justify-content: center;
  font-size: 15px;
}

.btnlogin {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  transition: background-color 0.3s ease;
  width: 50%;
}

.btnsignup {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #008CFF;
  color: #ffffff;
  text-decoration: none;
  border-radius: 30px;
  transition: background-color 0.3s ease;
  width: 50%;
}

.btnlogin:hover {
  background-color: #008CFF;
}
.btnsignup:hover {
  background-color: #000000;
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abel&family=Bebas+Neue&family=Geologica:wght@100..900&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poetsen+One&family=Press+Start+2P&family=Quicksand:wght@300..700&family=Varela+Round&display=swap');

*{
  font-family: "Geologica", sans-serif;
  font-weight: 400;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
}
</style>
