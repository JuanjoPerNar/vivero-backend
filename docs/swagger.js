const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Raíces de La Dolo API",
    version: "1.0.0",
    description: "Documentación de la API del vivero digital Raíces de La Dolo"
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local"
    }
  ],
  paths: {
    "/products": {
      get: {
        summary: "Obtener todos los productos",
        responses: {
          200: {
            description: "Lista de productos"
          }
        }
      },
      post: {
        summary: "Crear un nuevo producto",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  image: { type: "string" },
                  category: { type: "string" },
                  size: { type: "string" },
                  price: { type: "number" }
                },
                required: ["name", "description", "image", "category", "price"]
              }
            }
          }
        },
        responses: {
          201: {
            description: "Producto creado"
          }
        }
      }
    },
    "/products/{id}": {
      get: {
        summary: "Obtener un producto por ID",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Producto encontrado" },
          404: { description: "Producto no encontrado" }
        }
      },
      put: {
        summary: "Actualizar un producto",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  image: { type: "string" },
                  category: { type: "string" },
                  size: { type: "string" },
                  price: { type: "number" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Producto actualizado" },
          404: { description: "Producto no encontrado" }
        }
      },
      delete: {
        summary: "Eliminar un producto",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "string" } }
        ],
        responses: {
          200: { description: "Producto eliminado" },
          404: { description: "Producto no encontrado" }
        }
      }
    },
    "/services": {
      get: { summary: "Obtener todos los servicios", responses: { 200: { description: "Lista de servicios" } } },
      post: { summary: "Crear un nuevo servicio", responses: { 201: { description: "Servicio creado" } } }
    },
    "/services/{id}": {
      get: { summary: "Obtener un servicio por ID", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Servicio encontrado" }, 404: { description: "Servicio no encontrado" } } },
      put: { summary: "Actualizar un servicio", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Servicio actualizado" }, 404: { description: "Servicio no encontrado" } } },
      delete: { summary: "Eliminar un servicio", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Servicio eliminado" }, 404: { description: "Servicio no encontrado" } } }
    },
    "/activities": {
      get: { summary: "Obtener todas las actividades", responses: { 200: { description: "Lista de actividades" } } },
      post: { summary: "Crear una nueva actividad", responses: { 201: { description: "Actividad creada" } } }
    },
    "/activities/{id}": {
      get: { summary: "Obtener una actividad por ID", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Actividad encontrada" }, 404: { description: "Actividad no encontrada" } } },
      put: { summary: "Actualizar una actividad", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Actividad actualizada" }, 404: { description: "Actividad no encontrada" } } },
      delete: { summary: "Eliminar una actividad", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Actividad eliminada" }, 404: { description: "Actividad no encontrada" } } }
    },
    "/posts": {
      get: { summary: "Obtener todas las publicaciones", responses: { 200: { description: "Lista de publicaciones" } } },
      post: { summary: "Crear una nueva publicación", responses: { 201: { description: "Publicación creada" } } }
    },
    "/posts/{id}": {
      get: { summary: "Obtener una publicación por ID", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Publicación encontrada" }, 404: { description: "Publicación no encontrada" } } },
      put: { summary: "Actualizar una publicación", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Publicación actualizada" }, 404: { description: "Publicación no encontrada" } } },
      delete: { summary: "Eliminar una publicación", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Publicación eliminada" }, 404: { description: "Publicación no encontrada" } } }
    },
    "/contacts": {
      get: { summary: "Obtener todos los mensajes de contacto", responses: { 200: { description: "Lista de mensajes" } } },
      post: { summary: "Crear un nuevo mensaje de contacto", responses: { 201: { description: "Mensaje creado" } } }
    },
    "/contacts/{id}": {
      delete: { summary: "Eliminar un mensaje de contacto", parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }], responses: { 200: { description: "Mensaje eliminado" }, 404: { description: "Mensaje no encontrado" } } }
    },
    "/users": {
      get: { summary: "Obtener todos los usuarios", responses: { 200: { description: "Lista de usuarios" } } }
    },
    "/users/{uid}": {
      get: { summary: "Obtener un usuario por UID", parameters: [{ in: "path", name: "uid", required: true, schema: { type: "string" } }], responses: { 200: { description: "Usuario encontrado" }, 404: { description: "Usuario no encontrado" } } },
      put: { summary: "Actualizar rol de usuario", parameters: [{ in: "path", name: "uid", required: true, schema: { type: "string" } }], responses: { 200: { description: "Rol actualizado" }, 404: { description: "Usuario no encontrado" } } },
      delete: { summary: "Eliminar usuario", parameters: [{ in: "path", name: "uid", required: true, schema: { type: "string" } }], responses: { 200: { description: "Usuario eliminado" }, 404: { description: "Usuario no encontrado" } } }
    }
  }
}

export default swaggerDocument;
