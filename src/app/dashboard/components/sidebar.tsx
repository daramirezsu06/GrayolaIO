"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { routesByRole } from "../utils/routesByRole";
import { useGlobalContext } from "@/app/Context/useGlobalContext";

export const Sidebar = () => {
  const [routes, setRoutes] = useState([]);
  const router = useRouter();
  const { userProfile } = useGlobalContext();

  useEffect(() => {
    setRoutes(routesByRole[userProfile?.role] || []);
  }, [userProfile]);

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-purple-500 to-blue-600 text-white shadow-lg flex flex-col justify-between">
      {/* Contenedor flexible que ajusta el espacio para el menú */}
      <div className="flex-grow">
        <ul className="mt-6 space-y-1">
          {routes.length > 0 ? (
            routes.map((route, index) => (
              <li
                key={index}
                className="p-4 hover:bg-blue-700 hover:bg-opacity-75 cursor-pointer transition-colors">
                <span
                  onClick={() => router.push(route.path)}
                  className="font-medium text-lg">
                  {route.name}
                </span>
              </li>
            ))
          ) : (
            <li className="p-4 text-gray-300">No hay rutas disponibles</li>
          )}
        </ul>
      </div>

      {/* Información del usuario siempre en la parte inferior */}
      <div className="p-4 bg-gray-900 bg-opacity-75 pb-20">
        <p className="text-sm text-gray-400">Usuario: {userProfile?.name}</p>
        <p className="text-sm text-gray-400">Rol: {userProfile?.role}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
