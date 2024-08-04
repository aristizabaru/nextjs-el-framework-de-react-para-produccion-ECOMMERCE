# Next Js: El framework de React para producción (ECOMMERCE)

## Acerca de

Este es un repositorio personal para ejecución del proyecto del curso **NextJs: El framework de React para producción** de **Fernando Herrera** en la plataforma de Udemy. Para acceder al curso completo puede hacer [clic aquí](https://www.udemy.com/course/nextjs-fh/)

El proyecto desarrollado a continuación explora la creación de una ecommerce completo para aplicar todos los conceptos de NextJs tanto en el desarrollo frontend como backend. Dentro de los conceptos desarrollados se encuentran:

- Server Components
- Client Components
- Zustand (Manejador de estado)
- Tailwind
- CLSX
- Estructura de directorios
- Layouts anidados
- Componentes reutilizables
- Efectos de Blur con Tailwind
- Efectos con las imágenes de productos
- Rutas de aplicación

## Requerimientos

- Node v20.15.0 LTS

## Instalación del proyecto

Para instalar el proyecto siga los siguientes pasos

Instalar módulos o dependencias

```
npm install
```

## Ejecución del proyecto

Para ejecutar el proyecto se deben seguir los siguientes pasos:

1. Ejecutar en entorno de desarrollo

- Levantar la base de datos

```
docker compose up -d
```

- Renombrar el `.env.test` a `.env`
- Reemplazar las variables de entorno
- Generar nueva migración (Prisma ORM)

```
npx prisma migrate dev
```

- Enviar modelo a BD sin generar migración (opcional - Prisma ORM)

```
npx prisma db push
```

- Generar Prisma client (Prisma ORM)

```
npx prisma generate
```

- levantar el proyecto

```
npm run dev
```

2. Ejecutar en entorno de producción

```
npm build
npm start
```

### Información adicional

Para aprender más acerca de Next.js, visite los siguientes recursos:

- [Documentación oficial de Next.js](https://nextjs.org/docs) - aprenda acerca de las características de Next y su API.
- [Aprenda Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.
