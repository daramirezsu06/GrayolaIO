"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProjectManagerDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        setError("Error al cargar los proyectos");
        return;
      }
      setProjects(data || []);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);
    if (error) {
      setError("Error al eliminar el proyecto");
      return;
    }

    setProjects(projects.filter((project) => project.id !== projectId));
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Gestión de Proyectos</h1>
      {loading ? (
        <p>Cargando proyectos...</p>
      ) : (
        <div className="overflow-y-auto flex-1">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Título</th>
                <th className="p-4">Descripción</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="p-4">{project.title}</td>
                  <td className="p-4">{project.description}</td>
                  <td className="p-4 flex gap-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                      onClick={() => handleDelete(project.id)}>
                      Eliminar
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                      onClick={() =>
                        router.push(`/dashboard/manager/edit/${project.id}`)
                      }>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
