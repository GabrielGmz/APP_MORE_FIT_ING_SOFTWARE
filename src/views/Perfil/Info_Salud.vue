<template>

  <div class="health-profile-screen">
    
    <div class="content-container">
      
      <h2 class="main-title">INFORMACIÓN DE SALUD Y CAPACIDAD</h2>
      
      <div class="section-title">Salud General</div>

      <div class="question-group">
        <p class="question-label">¿Tiene o ha tenido problemas cardíacos (ej. soplos, arritmias)?</p>
        <div class="options-row">
          <button 
            :class="['option-pill', { active: tieneProblemasCardiacos === true }]" 
            @click="tieneProblemasCardiacos = true"
          >
            SÍ
          </button>
          <button 
            :class="['option-pill', { active: tieneProblemasCardiacos === false }]" 
            @click="tieneProblemasCardiacos = false"
          >
            NO
          </button>
        </div>
      </div>
      
      <hr class="separator"/> 

      <div class="question-group">
        <p class="question-label">¿Tiene alguna enfermedad crónica (ej. Diabetes, Asma, Epilepsia)?</p>
        <div class="options-row">
          <button 
            :class="['option-pill', { active: tieneEnfermedadesCronicas === true }]" 
            @click="tieneEnfermedadesCronicas = true"
          >
            SÍ
          </button>
          <button 
            :class="['option-pill', { active: tieneEnfermedadesCronicas === false }]" 
            @click="tieneEnfermedadesCronicas = false"
          >
            NO
          </button>
        </div>
      </div>
      
      <div class="section-title">Capacidades y Movilidad</div>

      <div class="question-group">
        <p class="question-label">¿Tiene alguna discapacidad física o problema de movilidad?</p>
        <div class="options-row">
          <button 
            :class="['option-pill', { active: tieneProblemasDeMovilidad === true }]" 
            @click="tieneProblemasDeMovilidad = true"
          >
            SÍ
          </button>
          <button 
            :class="['option-pill', { active: tieneProblemasDeMovilidad === false }]" 
            @click="tieneProblemasDeMovilidad = false"
          >
            NO
          </button>
        </div>
      </div>
      
      <hr class="separator"/>

      <div class="question-group">
        <p class="question-label">¿Requiere ayuda visual o auditiva significativa?</p>
        <div class="options-row">
          <button 
            :class="['option-pill', { active: tieneDeterioroVisualOAuditivo === true }]" 
            @click="tieneDeterioroVisualOAuditivo = true"
          >
            SÍ
          </button>
          <button 
            :class="['option-pill', { active: tieneDeterioroVisualOAuditivo === false }]" 
            @click="tieneDeterioroVisualOAuditivo = false"
          >
            NO
          </button>
        </div>
      </div>

      <input 
        type="text" 
        placeholder="Especifique discapacidades" 
        v-model="discapacidades" 
        class="input-pill"
      />
      
      <input 
        type="text" 
        placeholder="Medicamentos actuales y dosis" 
        v-model="medicamentosActuales_Dosis" 
        class="input-pill"
      />
      
      <p class="important-note">⚠️ **AVISO DE SEGURIDAD:** Si respondió 'SÍ' a cualquier pregunta de salud, consulte a un médico antes de comenzar o cambiar su rutina de ejercicios.</p>
      
    </div>
    
    <button class="next-button" @click="saveAndContinue">
      GUARDAR Y CONTINUAR
    </button>
    
  </div>
</template>

<script>
// Asegúrate de que este path coincida con donde defines e inicializas Firebase (db, auth)
import { db, auth } from '@/firebase'; 
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'vue-router'; // Importar useRouter para la navegación

export default {
    // Usamos el hook created para inicializar el router
    created() {
        this.router = useRouter();
    },
    data() {
        return {
            // Campos de Salud y Capacidad (Nombres traducidos)
            tieneProblemasCardiacos: null, 
            tieneEnfermedadesCronicas: null,
            tieneProblemasDeMovilidad: null,
            tieneDeterioroVisualOAuditivo: null,
            // Campos de Texto
            discapacidades: '',
            medicamentosActuales_Dosis: '',
            router: null // Propiedad para el router
        };
    },
    methods: {
        async saveAndContinue() {
            // 1. Obtener usuario autenticado (usando la instancia importada)
            const user = auth.currentUser;

            if (!user) {
                console.error("Usuario no autenticado. Deteniendo guardado.");
                // Usamos un div temporal en lugar de alert()
                this.showCustomAlert("No hay usuario autenticado. Por favor, inicia sesión.", '#ff5555');
                return;
            }
            const userId = user.uid;

            // 2. Validar que al menos las respuestas SI/NO hayan sido seleccionadas
            if (this.tieneProblemasCardiacos === null || this.tieneEnfermedadesCronicas === null || 
                this.tieneProblemasDeMovilidad === null || this.tieneDeterioroVisualOAuditivo === null) {
                this.showCustomAlert("Por favor, responde todas las preguntas antes de continuar.", '#ffcc00');
                return;
            }

            // 3. Prepara el objeto de datos
            const healthData = {
                healthProfileCompleted: true,
                tieneProblemasCardiacos: this.tieneProblemasCardiacos,
                tieneEnfermedadesCronicas: this.tieneEnfermedadesCronicas,
                tieneProblemasDeMovilidad: this.tieneProblemasDeMovilidad,
                tieneDeterioroVisualOAuditivo: this.tieneDeterioroVisualOAuditivo,
                discapacidades: this.discapacidades.trim(),
                medicamentosActuales_Dosis: this.medicamentosActuales_Dosis.trim(),
                updatedAt: new Date().toISOString()
            };

            try {
                // *** CORRECCIÓN CLAVE ***
                // Usamos la instancia 'db' importada y la colección 'usuarios'
                const userRef = doc(db, 'usuarios', userId);

                // Guardamos el objeto de salud dentro del documento del usuario
                await setDoc(userRef, { healthProfile: healthData }, { merge: true });

                console.log('Datos de salud guardados en Firestore exitosamente:', healthData);
                this.showCustomAlert('¡Perfil de salud guardado exitosamente!', '#007bff');

                // 4. Navegar a la siguiente vista
                if (this.router) {
                    this.router.push('/P_Principal_C'); // Tu ruta de destino final
                } else {
                    console.warn('Router no disponible para navegación.');
                }
            } catch (error) {
                console.error('Error al guardar en Firestore:', error);
                this.showCustomAlert(`Error al guardar: ${error.message}`, '#ff5555');
            }
        },
        showCustomAlert(message, backgroundColor) {
            const alerta = document.createElement('div');
            alerta.textContent = message;
            Object.assign(alerta.style, {
                position: 'fixed',
                top: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: backgroundColor,
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                zIndex: 9999,
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                transition: 'opacity 0.5s'
            });
            document.body.appendChild(alerta);
            setTimeout(() => {
                alerta.style.opacity = '0';
                setTimeout(() => document.body.removeChild(alerta), 500);
            }, 2500);
        }
    }
};
</script>

<style scoped>
/* Estilos generales de la pantalla */
.health-profile-screen {
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
    align-items: center;
}

.content-container {
    width: 100%;
    max-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    margin-top: 10px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

/* Hide webkit scrollbars */
.content-container::-webkit-scrollbar {
    display: none;
}

/* Títulos y Secciones */
.main-title {
  color: white;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
}

.section-title {
  color: #007bff; /* Color de acento para los títulos de sección */
  font-weight: bold;
  margin: 20px 0 15px 0;
  font-size: 18px;
  text-transform: uppercase;
}

/* Preguntas y Opciones (Píldoras) */
.question-group {
  width: 100%;
  margin-bottom: 15px;
  text-align: center;
}

.question-label {
  color: #ccc; 
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
}

.options-row {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.option-pill {
  /* Píldora no seleccionada */
  background-color: #333; 
  color: #fff;
  border: none;
  border-radius: 25px; 
  padding: 12px 30px;
  width: 45%; 
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); 
  transition: all 0.2s;
}

.option-pill.active {
  /* Píldora seleccionada (Efecto hundido) */
  background-color: #e0e0e0; /* Color gris claro de tus inputs originales */
  color: #333;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5); 
}

.separator {
  width: 80%;
  border: 0;
  height: 1px;
  background-color: #444; 
  margin: 10px 0;
}

/* Campos de Texto (Píldoras) */
.input-pill {
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  background-color: #e0e0e0; 
  border: none;
  border-radius: 25px;
  padding: 15px 20px;
  margin-bottom: 15px;
  text-align: left;
  color: #000000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 12px;
}

/* Botón Siguiente */
.next-button {
  width: 100%;
  max-width: 350px;
  background-color: #007bff; /* Azul vibrante (SIGUIENTE) */
  color: white;
  border: none;
  border-radius: 25px;
  padding: 15px 0;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px; 
  margin-bottom: 50px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4); 
}

/* Nota de Advertencia */
.important-note {
  color: #ffcc00; 
  font-size: 14px;
  text-align: center;
  padding: 15px;
  background-color: rgba(255, 204, 0, 0.1); 
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
    box-sizing: border-box;
}
</style>