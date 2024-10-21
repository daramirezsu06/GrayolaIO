"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone_number: "",
    role: "customer", // Valor por defecto
    company: "", // Solo si el rol es 'customer'
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      const userId = signUpData?.user?.id;
      if (userId) {
        const { error: profileError } = await supabase.from("profiles").insert({
          user_id: userId,
          name: formData.name,
          phone_number: formData.phone_number,
          role: formData.role,
          company: formData.role === "customer" ? formData.company : null,
        });

        if (profileError) {
          console.error("Error al crear el perfil:", profileError);
          setError("Hubo un error al crear el perfil.");
          return;
        }

        router.push("/auth/login");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Hubo un error al intentar registrarse.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Crea tu cuenta</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Número de teléfono"
            value={formData.phone_number}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* Select para el rol */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
            <option value="customer">Cliente</option>
            <option value="designer">Diseñador</option>
            <option value="manager">Gerente</option>
          </select>

          {/* Mostrar campo 'company' solo si el rol es 'customer' */}
          {formData.role === "customer" && (
            <input
              type="text"
              name="company"
              placeholder="Nombre de la Empresa"
              value={formData.company}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Crear cuenta
          </button>
        </div>
      </form>

      {/* Link to Login */}
      <p className="mt-4 text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <a href="/auth/login" className="text-blue-500 hover:underline">
          Iniciar sesión
        </a>
      </p>
    </div>
  );
}
