# SportConnect Backend

Backend del proyecto SportConnect desarrollado con Node.js, Express y MongoDB.

---

# Tecnologías utilizadas

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* JWT
* bcrypt
* dotenv

---

# Instalación del proyecto

Clonar repositorio:

```bash id="4mjlwm"
git clone https://github.com/julio-urquiza/SportConnect-Backend.git
```

Entrar al proyecto:

```bash id="mjlwm0"
cd SportConnect-Backend
```

Instalar dependencias:

```bash id="jlwm91"
npm install
```

---

# Variables de entorno

Crear un archivo `.env` utilizando el archivo de ejemplo.

Ejemplo:

```env id="jlwm92"
PORT=8080
MONGO_URL=tu_uri_mongodb
JWT_SECRET=tu_secret
```

---

# Ejecutar backend

Modo desarrollo:

```bash id="jlwm93"
npm run dev
```

Resultado esperado:

```txt id="jlwm94"
MongoDB conectado
Server escuchando: 8080
```

---

# Estructura del proyecto

```txt id="jlwm95"
src/
│
├── config/
├── controllers/
├── daos/
├── middlewares/
├── routes/
├── services/
├── utils/
└── server.js
```

---

# Arquitectura

El backend utiliza arquitectura en capas:

```txt id="jlwm96"
Routes
 ↓
Controllers
 ↓
Services
 ↓
DAOs
 ↓
MongoDB
```

---

# Funcionalidades iniciales

* Registro de usuarios
* Inicio de sesión
* Autenticación JWT

---

# Workflow Git

Cada integrante trabaja en su propia branch para evitar modificaciones directas sobre `main`.
