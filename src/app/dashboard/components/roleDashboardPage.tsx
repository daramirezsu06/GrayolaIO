"use client";
import { useGlobalContext } from "@/app/Context/useGlobalContext";
import { routesByRole } from "../utils/routesByRole";
import Link from "next/link";

const RoleDashboardPage = () => {
  const { userProfile } = useGlobalContext();
  const routes = routesByRole[userProfile?.role] || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Bienvenido, {userProfile?.name}
      </h1>
      <p className="mt-4 text-gray-600">
        Tienes acceso a las siguientes funcionalidades:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {routes.map((route) => (
          <div
            key={route.path}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-gray-800">
              {route.name}
            </h2>
            <p className="text-gray-600 mt-2">{route.description}</p>
            <Link href={route.path}>Ir a {route.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleDashboardPage;
