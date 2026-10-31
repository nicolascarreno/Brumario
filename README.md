# Brumario

Aplicación web para la gestión y consulta de estadísticas históricas de un equipo de fútbol.

Brumario permite consultar información sobre jugadores, partidos, competiciones, resultados, goles, asistencias y diferentes estadísticas históricas del equipo. La aplicación cuenta con un frontend desarrollado en React y un backend basado en Node.js, con MongoDB como base de datos y Redis como sistema de caché.

## Características

* Consulta de jugadores y sus estadísticas.
* Consulta de partidos históricos.
* Información detallada de cada partido.
* Estadísticas de goles y asistencias.
* Ranking de jugadores.
* Consulta de hitos y estadísticas históricas.
* Filtros por año, competición y otras características.
* Caché de consultas mediante Redis para mejorar el rendimiento.
* Carga y actualización de datos históricos a partir de archivos Excel.
* Interfaz responsive para utilizar la aplicación desde PC y dispositivos móviles.

## Tecnologías

### Frontend

* React
* TypeScript
* React Router
* HTML / CSS
* Create React App

### Backend

* Node.js
* TypeScript
* Express
* Mongoose
* MongoDB
* Redis / Upstash Redis

### Otras herramientas

* Git / GitHub
* Excel para almacenamiento y migración de datos históricos
* REST API

## Arquitectura

El backend está organizado siguiendo una separación de responsabilidades inspirada en la **arquitectura hexagonal**.

```text
Frontend
   │
   │ HTTP / REST
   ▼
Controllers
   │
   ▼
Services
   │
   ├──────────────► Redis
   │
   ▼
Repositories
   │
   ▼
MongoDB
```

### Controllers

Reciben las solicitudes HTTP y devuelven las respuestas al frontend.

### Services

Contienen la lógica de negocio de la aplicación. Coordinan las consultas a los repositories, el uso de caché y los cálculos de estadísticas.

### Repositories

Se encargan del acceso a los datos y abstraen las consultas a MongoDB.

### Redis

Se utiliza como caché para almacenar resultados de consultas frecuentes y reducir la cantidad de accesos a MongoDB.

## Estructura del proyecto

```text
Brumario/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── db/
│   │   └── config/
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   └── package.json
│
└── README.md
```

## Autor

**Nicolás Carreño**

Proyecto desarrollado como aplicación personal para la gestión y visualización de estadísticas históricas de fútbol.
