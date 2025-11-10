# 🏋️ More_Fit

**More_Fit** es una aplicación móvil administrativa diseñada para la gestión integral de gimnasios. Permite a los administradores y al personal manejar las operaciones diarias desde una plataforma móvil y unificada.

## ✨ Características Principales

* Gestión de Miembros: Creación, edición y visualización de perfiles de miembros.
* Control de Suscripciones: Seguimiento de pagos, fechas de vencimiento y planes de membresía.
* Rutinas de entrenamiento: Entrenador asigna rutinas personalizadas a cada cliente.
* Planes de Nutricion: Entrenador asigna planes de nutricion a cada cliente.
* Notificaciones: Envío de recordatorios y avisos a los miembros.

---

## 🚀 Pila Tecnológica (Stack)

* **Frontend:** **Vue 3**
* **Entorno de Desarrollo:** **Vite**
* **Plataforma Móvil:** **Capacitor** (para compilar a iOS y Android nativo)
* **Backend:** **Node.js**
* **Servicios de Backend (BaaS):** **Firebase** (usado para Autenticación, Firestore Database, Storage, etc.)

---

## 🛠️ Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone [https://github.com/tu-usuario/more_fit.git](https://github.com/tu-usuario/more_fit.git)
cd more_fit
```

### 2. Variables de Entorno (¡Importante!)
#### Este proyecto requiere dos archivos .env para conectar con los servicios de backend y Firebase.

* A. Frontend (Root del proyecto): Crea un archivo .env en la raíz del proyecto y añade tus credenciales de cliente de Firebase.
## Credenciales de Firebase (Client-side)
```bash
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=1:...
VITE_API_BACKEND_URL=http://localhost:3000 # URL de tu backend en Node
```

* B. Backend (en la carpeta /backend): Crea un archivo .env dentro de la carpeta de tu servidor Node.js.
```bash
backend/.env

# Puerto del servidor
PORT=3000

# Credenciales de Firebase Admin (Service Account)
# (Usualmente se carga desde un archivo JSON)
GOOGLE_APPLICATION_CREDENTIALS="ruta/a/tu-service-account.json"
```

### 3. Instalación de Dependencias
#### Este proyecto tiene dos package.json.
```bash
# 1. Instalar dependencias del Frontend (en la raíz)
npm install

# 2. Instalar dependencias del Backend
cd backend
npm install
cd ..
```

# 🏃 Flujo de Trabajo (Desarrollo)
#### Para trabajar en el proyecto, necesitas ejecutar el backend y el frontend simultáneamente.

### 1. Iniciar el Backend (Node.js)
#### Abre una terminal y ejecuta:
```bash
cd backend
npm run dev # O 'npm start', dependiendo de tus scripts
El servidor de Node.js ahora estará activo (ej. en http://localhost:3000).
```

### 2. Iniciar el Frontend (Vite)
#### Abre una segunda terminal y ejecuta:
```bash
# Asegúrate de estar en la raíz del proyecto
npm run dev
Vite iniciará el servidor de desarrollo web (ej. en http://localhost:5173) y se conectará a tu backend.
```

### 3. Desarrollo Móvil (Capacitor)
#### Una vez que la aplicación web funcione como esperas en el navegador, es hora de probarla en un dispositivo o emulador.

#### A. (Primera vez) Añadir plataformas:
```bash
# Añadir plataforma iOS (requiere macOS y Xcode)
npx cap add ios

# Añadir plataforma Android (requiere Android Studio)
npx cap add android
```

#### B. Sincronizar (Compilar y Copiar): Este es el paso más importante. Compila tu app de Vue y copia los archivos a las carpetas nativas.
```bash

# 1. Compilar la app web con Vite
npm run build

# 2. Sincronizar los cambios con las plataformas nativas
npx cap sync
```

#### C. Ejecutar en Emulador/Dispositivo:
```bash
# Ejecutar en un emulador/dispositivo conectado
npx cap run ios
# o
npx cap run android
```

#### Alternativa (Abrir el IDE Nativo): Es altamente recomendable abrir el IDE nativo para manejar permisos, íconos y configuraciones avanzadas.
```bash
npx cap open ios
# o
npx cap open android
```
# 📦 Scripts Principales
#### Estos son los scripts más comunes en el package.json de la raíz.

* npm run dev: Inicia el servidor de desarrollo de Vite.

* npm run build: Compila la aplicación de Vue para producción (en la carpeta dist).

* npx cap sync: Sincroniza el build de dist con ios y android.

* npx cap run [platform]: Ejecuta la app en la plataforma nativa.

# 📁 Estructura de Carpetas
```bash
more_fit/
├── android/            # Proyecto nativo Android (Generado por Capacitor)
├── ios/                # Proyecto nativo iOS (Generado por Capacitor)
├── backend/            # Carpeta del servidor Node.js
│   ├── .env            # Variables de entorno del backend
│   └── package.json    # Dependencias del backend
├── public/             # Archivos estáticos de Vite
├── src/                # Código fuente de Vue 3
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   └── main.js
├── .env                # Variables de entorno del frontend (Vite)
├── capacitor.config.ts # Configuración de Capacitor
├── package.json        # Dependencias de Frontend (Vite + Vue)
└── vite.config.js      # Configuración de Vite
```
# 🔧 Configuración Recomendada del IDE
* VSCode

* Volar (Extensión oficial de Vue).

#### Asegúrate de deshabilitar Vetur si lo tienes instalado para evitar conflictos.

### Personalizar Configuración
#### Consulta la [Referencia de Configuración de Vite.]

# APP REALIZADA POR LAS PERSONAS:

### GABRIEL ALONSO GOMEZ GARCIA
### SCARLETH YADIRA PORTILLO ESTRADA
### OSCAR ULISES ORTIZ CRUZ
### CRISTIAN NOE PEREZ VAZQUES
### IVETTE AZUCENA MENDIOLA REQUENO
