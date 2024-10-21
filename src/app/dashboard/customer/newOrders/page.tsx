"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/Context/useGlobalContext";
import { validatefield } from "@/formValidatiosn/validateForm";
import withRoleProtection from "../../hooks/withRoleProtection";

const CreateProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { userProfile } = useGlobalContext();
  const [errorTitle, setErrorTitle] = useState<string | null>("");
  const [errorDescription, setErrorDescription] = useState<string | null>("");
  useEffect(() => {
    setErrorTitle(validatefield("title", title));
  }, [title]);
  useEffect(() => {
    setErrorDescription(validatefield("description", description));
  }, [description]);

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userProfile) {
      setError("Usuario no encontrado.");
      return;
    }

    try {
      const { error: projectError } = await supabase.from("projects").insert({
        title,
        description,
        created_by: userProfile.id,
      });

      if (projectError) {
        setError("Error al crear el proyecto.");
        console.log("Error al crear el proyecto.", projectError);
        return;
      }
      router.push("/dashboard/customer/myOrders");
    } catch (error) {
      setError("Error inesperado al crear el proyecto.");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-md shadow-md flex-1 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Crear Proyecto</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleCreateProject}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Título del proyecto
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-red-500 text-sm">{errorTitle}</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-red-500 text-sm">{errorDescription}</p>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200">
            Crear Proyecto
          </button>
        </form>
      </div>
    </div>
  );
};


export default withRoleProtection(CreateProjectForm, ["customer"]);