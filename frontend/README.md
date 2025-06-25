# Biblioteca Online

Plataforma web que simula una biblioteca digital y física, donde los usuarios pueden explorar un catálogo de libros, realizar compras, dejar críticas y puntuar títulos. Además, cuenta con funcionalidades administrativas avanzadas para la gestión de contenido y usuarios.

## Funcionalidades

### Usuarios

- Registro e inicio de sesión con autenticación segura (JWT).
- Búsqueda de libros por nombre, autor o palabra clave.
- Filtros por género, tipo (físico o ebook), orden alfabético o por puntaje.
- Visualización de detalles de libros.
- Compra de libros físicos y ebooks.
- Envío de críticas y puntuaciones para libros leídos.
- Suscripción al servicio para obtener beneficios exclusivos (descuentos, novedades, etc.).

### Administradores

- Asignación o bloqueo de usuarios como administradores.
- Gestión completa del catálogo de libros:
  - Agregar, editar o eliminar libros.
  - Subida de portada y metadatos (género, autor, etc.).
- Visualización de ventas realizadas.
- Administración de novedades literarias y recomendaciones destacadas.
- Configuración del precio de suscripciones y sus respectivos descuentos.

## Tecnologías utilizadas

### Frontend

- Next.js – Framework para React con soporte SSR y rutas automáticas.
- TypeScript – Tipado estático robusto.
- Tailwind CSS – Estilos rápidos y responsivos.
- JWT – Manejo de sesiones stateless.

### Backend

- NestJS – Framework robusto para Node.js.
- TypeORM – ORM para bases de datos relacionales.
- PostgreSQL – Sistema de base de datos principal.
- Swagger – Documentación automática de la API.
- Winston Logger – Gestión de logs del sistema.

### Otros

- PlantUML – Modelado visual de clases y procesos.
- Swagger UI – Interfaz interactiva para la documentación de endpoints.

## Estado del proyecto

En desarrollo – Se siguen integrando nuevas funcionalidades y mejoras en la UI/UX, administración avanzada y rendimiento general.
