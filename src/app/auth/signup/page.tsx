"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FieldKeys, validatefield } from "@/formValidatiosn/validateForm";
import { signupFormFields } from "../utils/signupFormFields";
import { SignupFormData, SignupFormError } from "./signup.types";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    name: "",
    phone_number: "",
    role: "customer",
    company: "",
  });
  const [formError, setFormError] = useState<SignupFormError>({
    email: "",
    password: "",
    name: "",
    phone_number: "",
    role: "customer",
    company: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const errorMessage = validatefield(name as FieldKeys, value);

    setFormError((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    if (name === "role") {
      if (value === "customer") {
        const companyError = validatefield(
          "company" as FieldKeys,
          formData.company
        );
        setFormError((prevErrors) => ({
          ...prevErrors,
          company: companyError,
        }));
      } else {
        setFormError((prevErrors) => ({
          ...prevErrors,
          company: "",
        }));
      }
    }
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

        router.push("/auth/emailSent");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Hubo un error al intentar registrarse.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Crea tu cuenta</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4">
          {signupFormFields.map((field) => (
            <>
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required={field.required}
              />
              {formError[field.name as keyof typeof formError] && (
                <p className="mt-1 text-red-500 text-sm">
                  {formError[field.name as keyof typeof formError]}
                </p>
              )}
            </>
          ))}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
            <option value="customer">Cliente</option>
            <option value="designer">Diseñador</option>
            <option value="manager">Gerente</option>
          </select>

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

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Crear cuenta
          </button>
        </div>
      </form>

      <p className="mt-4 text-gray-600">
        ¿Ya tienes una cuenta?{" "}
        <a href="/auth/login" className="text-blue-500 hover:underline">
          Iniciar sesión
        </a>
      </p>
    </div>
  );
}
