This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
to automatically optimize and load [Geist](https://vercel.com/font), a new font
family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.

## Roles y Funcionalidades

En la aplicación se manejan los siguientes roles:

- **Cliente**: Puede crear proyectos y ver la lista de proyectos que ha creado.
- **Diseñador**: Puede ver los proyectos que le han sido asignados.
- **Manager**: Puede actualizar proyectos y asignar diseñadores.
- **Administrador**: Puede ver todos los usuarios, modificar sus roles y
  estatus, y tiene las mismas capacidades que el manager en cuanto a proyectos.

### Registro de Usuarios

El registro de usuarios está implementado con
`supabase.auth.signUp({ email, password })`. Los usuarios reciben un enlace para
verificar su correo y completar el primer inicio de sesión.

### Estructura de la Base de Datos

- **Profiles**: Relacionado con `auth.user` mediante `user_id`. Contiene la
  información del perfil, como el rol, nombre, número de teléfono, etc.
- **Projects**: Relacionado con `profiles` mediante `created_by` y
  `assigned_to`. Contiene la información del proyecto, como título, descripción
  y archivos asociados.

### Validación de Rutas y Estado de Usuarios

- Las rutas se validan del lado del cliente en función del rol almacenado en el
  perfil del usuario.
- Los usuarios se crean con el estado "pending". El administrador puede cambiar
  su estado a "active" o "inactive". Actualmente, no hay limitantes según el
  estado del usuario.
