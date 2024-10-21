export const routesByRole = {
  admin: [
    {
      name: "Dashboard",
      path: "/dashboard/admin",
      description: "Vista general de la plataforma y métricas clave.",
    },
    {
      name: "Usuarios",
      path: "/dashboard/admin/users",
      description: "Gestión de los usuarios del sistema.",
    },
    {
      name: "Crear Usuarios",
      path: "/dashboard/admin/users/create",
      description: "Formulario para añadir nuevos usuarios.",
    },
    {
      name: "Proyectos",
      path: "/dashboard/admin/projects",
      description: "Administración de todos los proyectos.",
    },
  ],
  manager: [
    {
      name: "Dashboard",
      path: "/dashboard/manager",
      description: "Resumen de proyectos y actividades.",
    },
    {
      name: "Proyectos",
      path: "/dashboard/manager/projects",
      description: "Gestión de proyectos a su cargo.",
    },
  ],
  designer: [
    {
      name: "Dashboard",
      path: "/dashboard/designer",
      description: "Espacio de trabajo y progreso de tareas.",
    },
    {
      name: "Proyectos Asignados",
      path: "/dashboard/designer/projects",
      description: "Visualización de proyectos asignados.",
    },
  ],
  customer: [
    {
      name: "Dashboard",
      path: "/dashboard/customer",
      description: "Acceso a proyectos y novedades.",
    },
    {
      name: "Mis Proyectos",
      path: "/dashboard/customer/myOrders",
      description: "Listado de proyectos en los que estoy involucrado.",
    },
    {
      name: "Nuevo Proyecto",
      path: "/dashboard/customer/newOrders",
      description: "Formulario para crear un nuevo proyecto.",
    },
  ],
};
