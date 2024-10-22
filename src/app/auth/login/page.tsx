"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useGlobalContext } from "@/app/Context/useGlobalContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { userProfile, setUserProfile } = useGlobalContext();
  useEffect(() => {
    if (userProfile) {
      router.push(`/dashboard/${userProfile.role}`);
    }
  }, [userProfile, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: sessionData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const { user } = sessionData;
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError) {
      setError(profileError.message);
    } else {
      console.log("Perfil del usuario:", profileData);
      setUserProfile(profileData);
      router.push(`/dashboard/${profileData.role}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleLogin}>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 mb-2 font-semibold">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-2 font-semibold">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
          Iniciar Sesión
        </button>

        <p className="mt-4 text-gray-600 text-center">
          ¿No tienes una cuenta?{" "}
          <a href="/auth/signup" className="text-blue-500 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
}
