"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useGlobalContext } from "@/app/Context/useGlobalContext";
import { Project } from "@/app/types";
import withRoleProtection from "../../hooks/withRoleProtection";

const AsignedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { userProfile } = useGlobalContext();

  useEffect(() => {
    if (userProfile) {
      const fetchAssignedProjects = async () => {
        const { data, error } = await supabase
          .from("projects")
          .select()
          .eq("assigned_to", userProfile?.id);

        if (error) {
          setError("Error al cargar los proyectos");
          return;
        }

        setProjects(data || []);
        setLoading(false);
      };

      fetchAssignedProjects();
    }
  }, [userProfile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async (projectId: string) => {
    if (!selectedFile) {
      alert("Por favor, selecciona un archivo para cargar.");
      return;
    }

    const { error } = await supabase.storage
      .from("designer_files")
      .upload(`project_files/${projectId}/${selectedFile.name}`, selectedFile);

    if (error) {
      alert("Error al cargar el archivo: " + error.message);
    } else {
      alert("Archivo cargado exitosamente");
    }

    console.log(
      `Cargando archivo ${selectedFile.name} para el proyecto ${projectId}`
    );
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Cargar Archivos de Diseño</h1>
      {loading ? (
        <p>Cargando proyectos...</p>
      ) : (
        <table className="table-auto w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="p-4">Título</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Cargar Archivo</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="p-4">{project.title}</td>
                <td className="p-4">
                  {project.description || "Sin descripción"}
                </td>
                <td className="p-4 flex items-center gap-2">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                    onClick={() => handleFileUpload(project.id)}>
                    Cargar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default withRoleProtection(AsignedProjects, ["designer"]);
