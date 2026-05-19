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

```bash
git clone https://github.com/julio-urquiza/SportConnect-Backend.git
```

Entrar al proyecto:

```bash
cd SportConnect-Backend
```

Instalar dependencias:

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` utilizando el archivo de ejemplo.

Ejemplo:

```env
PORT=8080
MONGO_URL=tu_uri_mongodb
JWT_SECRET=tu_secret
```

---

# Ejecutar backend

Modo desarrollo:

```bash
npm run dev
```

Resultado esperado:

```txt
MongoDB conectado
Server escuchando: 8080
```

---

# Estructura del proyecto

```txt
src/
│
├── config/
│   └── dataBase.js
├── controllers/
│   └── user.controller.js
├── daos/
│   └── user.dao.js
├── models/
│   └── user.model.js
├── middlewares/
├── routes/
│   └── user.routes.js
├── services/
│   └── user.service.js
├── utils/
│   └── user-bcrypt.js
├── app.js
└── server.js
```

---

# Arquitectura

El backend utiliza arquitectura en capas:

```txt
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

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| Routes | `routes/user.routes.js` | Define los endpoints y los asocia a su controller |
| Controllers | `controllers/user.controller.js` | Recibe la request, llama al service y devuelve la response |
| Services | `services/user.service.js` | Contiene la lógica de negocio (ej: hashear contraseña) |
| DAOs | `daos/user.dao.js` | Único punto de contacto con la base de datos |
| Models | `models/user.model.js` | Define la estructura del documento en MongoDB |
| Utils | `utils/user-bcrypt.js` | Herramientas reutilizables (ej: funciones de bcrypt) |

---

# Flujo de trabajo

### Registro de usuario (`POST /api/users/register`)

```txt
Cliente (Postman / Frontend)
        │
        │  POST /api/users/register
        │  { email, password }
        ▼
     app.js
        │  Redirige a /api/users
        ▼
  user.routes.js
        │  Detecta POST /register → llama a register()
        ▼
  user.controller.js
        │  Extrae req.body
        │  Llama a registerUser()
        │
        ├──────────────────────────────────┐
        ▼                                  ▼
  user.service.js                   (si hay error)
        │  Llama a createHash()      res.status(500)
        │  Obtiene password hasheado  .json({ message, error })
        │  Llama a createUser()
        ▼
   user.dao.js
        │  Llama a User.create()
        ▼
  user.model.js
        │  Valida la estructura
        │  Persiste en MongoDB
        ▼
     MongoDB
        │
        ▼
  user.controller.js
        │  res.status(201)
        │  .json({ message: "Usuario creado", user })
        ▼
Cliente recibe respuesta
```

### Detalle por capa

**1. `app.js`** — recibe todas las requests y las redirige al router correspondiente:
```js
app.use("/api/users", userRouter)
```

**2. `routes/user.routes.js`** — mapea la URL al controller:
```js
router.post("/register", register)
```

**3. `controllers/user.controller.js`** — coordina la request y la response:
```js
const user = await registerUser(req.body)
res.status(201).json({ message: "Usuario creado", user })
```

**4. `services/user.service.js`** — aplica la lógica de negocio:
```js
const hashedPassword = createHash(password)
return await createUser({ email, password: hashedPassword })
```

**5. `utils/user-bcrypt.js`** — hashea la contraseña con bcrypt:
```js
bcrypt.hashSync(password, bcrypt.genSaltSync(10))
```

**6. `daos/user.dao.js`** — persiste el dato en MongoDB:
```js
return await User.create(userData)
```

---

# Endpoints

### Usuarios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/users/register` | Registrar nuevo usuario | No |

#### POST `/api/users/register`

Body:
```json
{
  "email": "usuario@email.com",
  "password": "miContraseña123"
}
```

✅ Respuesta exitosa `201`:
```json
{
  "message": "Usuario creado",
  "user": {
    "_id": "...",
    "email": "usuario@email.com",
    "password": "$2b$10$..."
  }
}
```

❌ Respuesta de error `500`:
```json
{
  "message": "Error al crear usuario",
  "error": {}
}
```

> ⚠️ La contraseña **nunca** se almacena en texto plano. Siempre se guarda como hash bcrypt.

---

# Seguridad de contraseñas

Las contraseñas se hashean con **bcrypt** (salt rounds: 10) antes de guardarse en MongoDB.

```js
// Hashear
createHash('miContraseña')            // → "$2b$10$..."

// Validar
isValidPassword('miContraseña', hash) // → true / false
```

---

# Funcionalidades iniciales

* Registro de usuarios con contraseña hasheada (bcrypt)
* Inicio de sesión
* Autenticación JWT

---

# Workflow Git

Cada integrante trabaja en su propia branch para evitar modificaciones directas sobre `main`.

---

# Tareas completadas

| ID | Tarea | Sprint | Fecha |
|----|-------|--------|-------|
| EDD-11 | Backend - hash de contraseña | Sprint 1 | 19/05/2026 |
| EDD-17 | Backend - Respuesta del servidor | Sprint 1 | 19/05/2026 |