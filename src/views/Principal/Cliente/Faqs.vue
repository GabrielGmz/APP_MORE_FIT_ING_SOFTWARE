<template>
    <div class="container">
        <header class="header">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 42"
                @click="$router.push('/Configuracion_C')" class="back-icon">
                <path fill="#00bfff" fill-rule="evenodd"
                    d="M27.066 1L7 21.068l19.568 19.569l4.934-4.933l-14.637-14.636L32 5.933z" />
            </svg>
            <h1>Preguntas Frecuentes</h1>
        </header>

        <div class="content-wrapper">

            <!-- Buscador -->
            <div class="search-box">
                <span class="search-icon">🔍</span>
                <input type="text" v-model="searchQuery" placeholder="¿En qué podemos ayudarte?" class="modern-input" />
            </div>

            <!-- Lista de Preguntas -->
            <div class="faq-list">
                <div v-if="filteredFaqs.length === 0" class="empty-state">
                    <p>No encontramos resultados para tu búsqueda.</p>
                </div>

                <div v-for="(faq, index) in filteredFaqs" :key="index" class="faq-card"
                    :class="{ 'active': activeIndex === index }" @click="toggleFaq(index)">
                    <div class="faq-header">
                        <h4>{{ faq.pregunta }}</h4>
                        <span class="arrow-icon">▼</span>
                    </div>
                    <div class="faq-body" v-show="activeIndex === index">
                        <p>{{ faq.respuesta }}</p>
                    </div>
                </div>
            </div>

            <!-- Sección de Contacto -->
            <div class="contact-section">
                <p>¿No encuentras lo que buscas?</p>
                <button class="contact-btn">Contáctanos</button>
            </div>

        </div>

        <!-- Navegación Inferior -->
        <nav class="bottom-nav">
            <button class="nav-btn" @click="$router.push('/Rutinas_C')">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22l1.43-1.43l1.43 1.43l2.14-2.14l1.43 1.43l1.43-1.43l-1.43-1.43L22 16.29l-1.43-1.43z" />
                </svg>
            </button>
            <button class="nav-btn" @click="$router.push('/Nutricion_C')">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M20 2H10a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Zm1 10a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Zm-3.5-4a1.49 1.49 0 0 0-1 .39a1.5 1.5 0 1 0 0 2.22a1.5 1.5 0 1 0 1-2.61ZM16 17a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4h1a1 1 0 0 0 0-2H3v-1a1 1 0 0 1 1-1a1 1 0 0 0 0-2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1ZM6 18h1a1 1 0 0 0 0-2H6a1 1 0 0 0 0 2Z" />
                </svg>
            </button>
            <button class="nav-btn" @click="$router.push('/P_Principal_C')">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
                </svg>
            </button>
            <button class="nav-btn" @click="$router.push('/Perfil_U_C')">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
            </button>
            <!-- Configuración Activa (ya que FAQs suele ser sub-sección de config) -->
            <button class="nav-btn active" @click="$router.push('/Configuracion_C')">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0,0,256,256">
                    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none"
                        style="mix-blend-mode: normal">
                        <g transform="scale(5.12,5.12)">
                            <path fill="currentColor"
                                d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z" />
                        </g>
                    </g>
                </svg>
            </button>
        </nav>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const activeIndex = ref(null)

const faqs = ref([
    {
        pregunta: "¿Cómo cambio mi plan de entrenamiento?",
        respuesta: "Para cambiar tu plan, comunícate directamente con tu entrenador asignado a través del chat o espera a tu evaluación mensual."
    },
    {
        pregunta: "¿Cómo actualizo mi método de pago?",
        respuesta: "Ve a Configuración > Datos de Sesión. Actualmente los pagos se gestionan directamente en recepción, pero pronto podrás hacerlo en la app."
    },
    {
        pregunta: "¿Qué hago si me lesiono?",
        respuesta: "Detén el ejercicio inmediatamente. Consulta a un médico y notifica a tu entrenador para que ajuste tu rutina mientras te recuperas."
    },
    {
        pregunta: "¿Puedo pausar mi membresía?",
        respuesta: "Sí, puedes congelar tu membresía por razones médicas o de viaje hasta por 30 días al año. Acércate a recepción para más detalles."
    },
    {
        pregunta: "¿Cómo veo mi progreso?",
        respuesta: "En la sección 'Mi Perfil' puedes ver tus estadísticas actuales. Tu entrenador actualiza tus medidas periódicamente."
    }
])

const filteredFaqs = computed(() => {
    if (!searchQuery.value) return faqs.value
    const query = searchQuery.value.toLowerCase()
    return faqs.value.filter(faq =>
        faq.pregunta.toLowerCase().includes(query) ||
        faq.respuesta.toLowerCase().includes(query)
    )
})

const toggleFaq = (index) => {
    if (activeIndex.value === index) {
        activeIndex.value = null // Colapsar si ya está abierto
    } else {
        activeIndex.value = index // Abrir nuevo
    }
}
</script>

<style scoped>
/* === BASE STYLES === */
.container {
    background-color: #0d1117;
    min-height: 100vh;
    padding: 20px 20px 100px;
    box-sizing: border-box;
    color: #c9d1d9;
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    flex-direction: column;
}

.header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #30363d;
    position: relative;
}

.back-icon {
    cursor: pointer;
    transition: transform 0.2s;
    margin-right: 15px;
    color: #00bfff;
}

.back-icon:hover {
    transform: scale(1.1);
}

.header h1 {
    flex-grow: 1;
    text-align: center;
    color: #00bfff;
    font-size: 1.6rem;
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: 1px;
    padding-right: 30px;
    /* Centrado visual */
}

.content-wrapper {
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
    flex-grow: 1;
    overflow-y: auto;
    padding-bottom: 20px;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.content-wrapper::-webkit-scrollbar {
    display: none;
}

/* === SEARCH === */
.search-box {
    position: relative;
    margin-bottom: 25px;
}

.search-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    opacity: 0.7;
}

.modern-input {
    width: 100%;
    padding: 14px 14px 14px 45px;
    /* Padding left para el icono */
    border-radius: 12px;
    border: 1px solid #30363d;
    background-color: #161b22;
    color: white;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
    box-sizing: border-box;
}

.modern-input:focus {
    border-color: #00bfff;
    box-shadow: 0 0 0 2px rgba(0, 191, 255, 0.1);
}

/* === FAQ LIST === */
.faq-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.faq-card {
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.faq-card.active {
    border-color: #00bfff;
    background-color: #1c2128;
}

.faq-header {
    padding: 18px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.faq-header h4 {
    margin: 0;
    color: white;
    font-size: 1rem;
    font-weight: 600;
}

.arrow-icon {
    color: #00bfff;
    transition: transform 0.3s ease;
    font-size: 0.8rem;
}

.faq-card.active .arrow-icon {
    transform: rotate(180deg);
}

.faq-body {
    padding: 0 20px 20px 20px;
    color: #8b949e;
    font-size: 0.95rem;
    line-height: 1.5;
    border-top: 1px solid #30363d;
    margin-top: -5px;
    /* Pequeño ajuste visual */
    padding-top: 15px;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.empty-state {
    text-align: center;
    color: #8b949e;
    padding: 20px;
    border: 1px dashed #30363d;
    border-radius: 12px;
}

/* === CONTACT SECTION === */
.contact-section {
    margin-top: 40px;
    text-align: center;
    padding: 20px;
    background-color: rgba(0, 191, 255, 0.05);
    border-radius: 16px;
    border: 1px solid #30363d;
}

.contact-section p {
    color: #c9d1d9;
    margin-bottom: 15px;
}

.contact-btn {
    background-color: #00bfff;
    color: #0d1117;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 800;
    cursor: pointer;
    font-size: 0.95rem;
    text-transform: uppercase;
    transition: all 0.2s;
}

.contact-btn:hover {
    background-color: #33c9ff;
    box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);
}

/* === NAV === */
.bottom-nav {
    background-color: rgba(22, 27, 34, 0.95);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #30363d;
    z-index: 900;
    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.3);
}

.nav-btn {
    background: none;
    border: none;
    color: #8b949e;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 8px;
    border-radius: 50%;
}

.nav-btn:hover {
    color: #e6edf3;
}

.nav-btn.active {
    color: #00bfff;
    transform: scale(1.1);
}
</style>