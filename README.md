# Raíces de La Dolo – Backend

Este repositorio contiene el backend del proyecto **Raíces de La Dolo**, desarrollado como proyecto final del bootcamp de desarrollo web full stack en The Bridge.

Se trata de una API RESTful construida con Node.js y Express que gestiona la lógica del vivero digital, incluyendo productos, servicios, publicaciones, actividades, usuarios y mensajes de contacto.

---

## Objetivo

Diseñar e implementar una arquitectura robusta que permita al frontend consumir y administrar datos en tiempo real a través de una API completa, segura, documentada y con pruebas integradas.

El proyecto se conecta con **MongoDB Atlas** como base de datos principal y **Firebase** como sistema de autenticación y gestión de usuarios.

---

## Tecnologías utilizadas

- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- Firebase Admin SDK  
- CORS  
- Dotenv  
- Axios  
- Jest  
- Supertest  
- Swagger UI Express  

---

## Estructura del proyecto

```
vivero-backend/
├── config/                 # Configuración global
│   ├── db.js               # Conexión a MongoDB Atlas
│   └── secrets/            
│       └── serviceAccountKey.json  # Clave privada para Firebase Admin (solo local)
├── controllers/            # Lógica de negocio de cada recurso
├── models/                 # Esquemas de Mongoose
├── routes/                 # Rutas de la API agrupadas por recurso                      
├── tests/                  # Pruebas unitarias e integradas (Jest + Supertest)
├── doc/                    # Configuración de Swagger (documentación API)
│   └── swagger.js
├── index.js                # Punto de entrada principal del servidor
├── .env                    # Variables de entorno (no se sube al repo)
├── package.json            # Dependencias y scripts del proyecto
└── README.md               # Documentación del backend
```

---

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/JuanjoPerNar/vivero-backend
cd vivero-backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear el archivo `.env` con las siguientes variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/vivero
FIREBASE_SERVICE_ACCOUNT={ "type": "service_account", "project_id": "...", ... }
```

⚠️ IMPORTANTE: El valor de `FIREBASE_SERVICE_ACCOUNT` debe ser el contenido JSON completo de la clave, en una sola línea.

4. Iniciar servidor en desarrollo:

```bash
npm run dev
```

---

## Documentación de la API

La documentación Swagger está disponible en:

- Local: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)  
- Producción: [https://vivero-backend.onrender.com/api-docs](https://vivero-backend.onrender.com/api-docs)

---

## Endpoints disponibles

| Recurso        | Endpoint Base     | Métodos                |
|----------------|-------------------|-------------------------|
| Productos      | `/products`       | GET, POST, PUT, DELETE |
| Servicios      | `/services`       | GET, POST, PUT, DELETE |
| Actividades    | `/activities`     | GET, POST, PUT, DELETE |
| Publicaciones  | `/posts`          | GET, POST, PUT, DELETE |
| Contactos      | `/contacts`       | GET, POST, DELETE      |
| Usuarios       | `/users`          | GET, PUT, DELETE (Firestore) |
| Plantas (API)  | `/api/trefle`     | GET                    |

---

## Testing

El backend incluye pruebas automáticas con **Jest** y **Supertest**.

### Ejecutar tests

```bash
npm test
```

- Cada test utiliza una base de datos aislada (o mocks).
- Se limpian los datos al finalizar.
- Las pruebas de usuarios utilizan Firebase Admin SDK y Firestore.

---

## Consideraciones

- Este backend está desplegado en **Render**: [https://vivero-backend.onrender.com](https://vivero-backend.onrender.com)  
- Las rutas de autenticación y gestión de usuarios usan Firebase y Firestore.  
- Las claves y tokens sensibles están ocultos mediante `.env` y `.gitignore`.  
- El backend está preparado para desarrollo local y despliegue en producción.  
- Se incluyen pruebas completas de todos los recursos.  

---

## Autor

Desarrollado por **Juan José Pereira Naranjo**  
Proyecto final del bootcamp **Desarrollo Web Full Stack** en **The Bridge**  
Año: **2025**