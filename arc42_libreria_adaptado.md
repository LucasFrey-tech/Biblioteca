# Documentación de Arquitectura (arc42 - versión adaptada)

## 1. Introducción y Objetivos

### 1.1 Propósito
Este documento describe la arquitectura de un sistema web para una librería/biblioteca en línea. Su objetivo es facilitar la compra, lectura y evaluación de libros digitales y físicos, tanto para usuarios comunes como para administradores.

### 1.2 Metas de Calidad (máximo 5)
- Usabilidad: interfaz clara y amigable para los lectores.
- Escalabilidad: capacidad para manejar un número creciente de usuarios y libros.
- Mantenibilidad: arquitectura modular que facilite futuras mejoras.
- Seguridad: protección de datos personales y acceso controlado a contenido digital.
- Disponibilidad: acceso confiable al sistema en todo momento.

### 1.3 Stakeholders
| Rol                | Expectativas                                                       |
|--------------------|---------------------------------------------------------------------|
| Lectores           | Acceso fácil y rápido a libros, lectura digital fluida, seguridad. |
| Administrador      | Gestión eficiente de usuarios, libros y críticas.                  |
| Desarrolladores    | Código modular, comprensible y fácil de mantener.                  |
| Dueño del producto | Sistema confiable, adaptable y rentable.                           |

## 2. Restricciones

- El sistema debe desarrollarse con Next.js para el frontend y NestJS para el backend.
- La base de datos debe ser PostgreSQL, accedida mediante TypeORM.
- La comunicación entre cliente y servidor debe utilizar REST APIs protegidas por autenticación JWT.
- La solución debe ser compatible con navegadores modernos.

## 3. Contexto y Alcance

### 3.1 Contexto de Negocio
El sistema se encuentra en el centro de una plataforma de venta y lectura de libros. Se comunica con usuarios finales (lectores), quienes interactúan mediante un navegador, y con el administrador, que gestiona el contenido del sitio.

### 3.2 Diagrama de Contexto (texto)
```
[Usuario (Lector)]
    ↕
 [Frontend (Next.js)]
    ↕
 [Backend (NestJS)]
    ↕
 [Base de Datos (PostgreSQL)]
```

### 3.3 Interfaces Externas
- Servicio de autenticación (interno al backend con JWT)
- Servicios de pago (opcional, si se integran en el futuro)

## 4. Estrategia de Solución

- Separación clara entre frontend (Next.js) y backend (NestJS).
- Uso de TypeORM para simplificar la persistencia y mantener el modelo de datos sincronizado.
- JWT para la autenticación y autorización de usuarios.
- Componentización del frontend mediante React, organizando vistas por funcionalidad.
- Backend estructurado en módulos (usuarios, libros, compras, etc.).
- Acceso restringido a funcionalidades de administración mediante roles.

## 5. Vista de Bloques Constructivos

### 5.1 Nivel superior
```
Sistema Web de Librería
├── Frontend (Next.js)
│   ├── Páginas públicas (inicio, catálogo, detalle del libro)
│   ├── Autenticación (login, registro)
│   ├── Área del usuario (lectura, compras, perfil)
│   └── Área admin (gestión de libros, usuarios, reseñas)
│
├── Backend (NestJS)
│   ├── Módulo de Usuarios
│   ├── Módulo de Libros
│   ├── Módulo de Compras
│   ├── Módulo de Lectura
│   ├── Módulo de Críticas
│   └── Autenticación
│
└── Base de Datos (PostgreSQL)
    ├── Tablas: users, books, purchases, reviews, genres, etc.
```

## 6. Vista de Ejecución

### Escenario 1: Compra de libro
1. El lector inicia sesión.
2. Navega al catálogo y selecciona un libro.
3. Elige formato (digital/físico) y lo compra.
4. El backend valida la compra y actualiza la base de datos.
5. Si es digital, queda disponible en su área de lectura.

### Escenario 2: Lectura de libro digital
1. El lector accede a su área de lectura.
2. Selecciona un libro comprado.
3. El frontend carga el lector digital.
4. El backend valida el acceso y envía el contenido.

### Escenario 3: Publicar reseña
1. El lector abre un libro comprado y accede a la sección de críticas.
2. Escribe una reseña y selecciona estrellas.
3. El frontend envía los datos al backend.
4. El backend guarda la crítica en la base de datos.

## 9. Decisiones Arquitectónicas

| ID  | Decisión                          | Justificación                                              |
|-----|----------------------------------|------------------------------------------------------------|
| A1  | Usar Next.js como frontend       | SEO, SSR y SPA combinados; integración rápida.             |
| A2  | Usar NestJS en el backend        | Modularidad, estructura clara, soporte para TypeORM.       |
| A3  | JWT para autenticación           | Ligero, sin estado, compatible con REST.                   |
| A4  | TypeORM para acceso a datos      | Integración con NestJS, facilita migraciones.              |
| A5  | Dividir roles entre usuario/admin| Seguridad y separación de responsabilidades.               |
