"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const VerificationComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setError("Token no encontrado.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "email",
      });

      if (error) {
        setError("Error verificando el correo electrónico. Intenta de nuevo.");
      } else {
        setVerified(true);
      }
      console.log(token);

      setLoading(false);
    };

    verifyEmail();
  }, [searchParams]);

  if (loading) return <div className="text-center">Verificando...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Verificación de Correo Electrónico
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {verified ? (
          <div className="text-center">
            <p className="mb-4">
              ¡Tu correo electrónico ha sido verificado con éxito!
            </p>
            <p>Ahora puedes iniciar sesión en tu cuenta.</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Ir a Iniciar Sesión
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p>
              La verificación de tu correo electrónico ha fallado. Por favor,
              verifica que el enlace que seguiste sea correcto.
            </p>
            <button
              onClick={() => router.push("/signup")}
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Regresar al Registro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrap the component in Suspense to handle useSearchParams correctly
export default function VerificationPage() {
  return (
    <Suspense fallback={<div className="text-center">Cargando...</div>}>
      <VerificationComponent />
    </Suspense>
  );
}
