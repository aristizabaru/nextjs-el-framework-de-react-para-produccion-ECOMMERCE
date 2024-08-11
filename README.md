# Next Js: El framework de React para producción (ECOMMERCE)

## Acerca de

Este es un repositorio personal para ejecución del proyecto del curso **NextJs: El framework de React para producción** de **Fernando Herrera** en la plataforma de Udemy. Para acceder al curso completo puede hacer [clic aquí](https://www.udemy.com/course/nextjs-fh/)

El proyecto desarrollado a continuación explora la creación de una ecommerce completo para aplicar todos los conceptos de NextJs tanto en el desarrollo frontend como backend. Dentro de los conceptos desarrollados se encuentran:

**UI**

- Server Components
- Client Components
- Zustand: manejador de estado minimalista. [Link documentación](https://docs.pmnd.rs/zustand/getting-started/introduction)
- Tailwind. [Link documentación](https://tailwindcss.com/docs/installation)
- CLSX: construye cadenas en className condicionalmente. [Link artículo](https://medium.com/@fortune.nwuneke/an-extensive-tutorial-on-using-clsx-in-react-projects-5e41205df8e2)
- Estructura de directorios
- Layouts anidados
- Componentes reutilizables
- Efectos de Blur con Tailwind
- Efectos con las imágenes de productos
- Rutas de aplicación
- Pantallas de error
- Slideshows (desktop y mobile)
- Navegación
- Redirecciones
- Tablas

**Data Base**

- Docker PostgreSQL
- Docker Compose
- Idea de una semilla (seed)
- Crear enumeraciones de base de datos
- Tablas
  - Productos
  - Categorías
  - Imágenes de productos
- Procedimiento independiente dentro del proyecto de Next

**Paginación**

- Obtener data del servidor
- Paginar resultados
- Añadir condiciones
- Re-utilización de componentes
- Paginación del lado del servidor
- Manejo de SearchParams

**Revalidación y Meta Data**

- Traer información del producto
- Revalidación de data cada 7 días
- Renderizar del lado del cliente únicamente información que cambia constantemente
- Server Actions
- Información OpenGraph (Meta Data)
- Cambiar Metadata
- Detalles a la hora de compartir enlaces en redes sociales

**Carrito de compra**

- Zustand con NextJS App Directory
- Problemas de hidratación
- Manejo de estado del lado del cliente
- Manejo del carrito de compras
- Remover y cambiar cantidad desde la pantalla del carrito de compras
- Formato de moneda sin dependencias

**Autenticación**

- Next Auth
- Custom Login
- Custom SignUp
- Aproximaciones para manejo de server actions
  - Desde Form Actions
  - Desde funciones
- Varios hooks propios de React Dom
- Estado de formularios sin JavaScript
- Validaciones de formularios
- React Hook Form
- Sesiones
- Extensión de sesiones
- Protección de rutas
- Seed de usuarios
- Encriptación de contraseñas
- Validación de usuarios

**Gestión de dirección de entrega**

- Zustand Address Store
- Persistencia
- Almacenar en base de datos la dirección del usuario
- Relaciones uno a uno
- Relaciones uno a muchos
- Server Actions para:
  - Guardar dirección
  - Actualizar la dirección
  - Borrar la dirección
- React Hook Form
- Conectar Zustand con UseForm con Base de datos

**Creación de órdenes**

- Relaciones uno a uno
- Relaciones de uno a muchos
- Transacciones de base de datos
- [Transacciones con Prisma](https://www.prisma.io/docs/orm/prisma-client/queries/transactions#interactive-transactions)
- Manejo de inventario
- Crear ordenes
- Maestro - Detalle
- Server actions
- Consideraciones a la hora de crear la orden basado en un carrito de compras

**Mecanismo para pago con terceros (pasarela de pagos - PayPal)**

- Generar el intento de pago
- Realizar el Cobro en PayPal
- Validar el pago desde el lado de PayPal
- Registrar el pago y la fecha de pago
- Marcar la orden como pagada
- Configuraciones en el Sandbox de PayPal

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

- Levantar la base de datos (docker)

```
docker compose up -d
```

- Copiar `.env.test` a `.env`
- Reemplazar las variables de entorno. Siga las instrucciones en el archivo `.env`
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

- Ejecutar el seed (solo en desarrollo) de la base de datos

```
npm run seed
```

- Limpiar el `LocalStorage` del navegador
- Limpiar `cookies` del navegador
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
