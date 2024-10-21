import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Acceso Denegado</h1>
      <p className="text-lg text-gray-700 mb-8">
        {"No tienes permiso para acceder a esta página."}
      </p>
      <Link href="/">Volver a la página principal</Link>
    </div>
  );
};

export default Unauthorized;
