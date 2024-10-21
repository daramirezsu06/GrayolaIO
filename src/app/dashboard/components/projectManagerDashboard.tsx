"use client";

import ModalEditProjects from "./Modal";
import UseProjects from "../hooks/useProjects";

export default function ProjectManagerDashboard() {
  const {
    projects,
    loading,
    error,
    isModalOpen,
    handleDelete,
    openModal,
    setIsModalOpen,
    handleUpdateProject,
    selectedProject,
    profiles,
    selectedProfileID,
    setselectedProfileID,
    title,
    setTitle,
    description,
    setDescription,
    errorDescription,
    errorTitle,
  } = UseProjects();

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
                <th className="p-4">Creado por</th>
                <th className="p-4">Compañía</th>
                <th className="p-4">Asignado a</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="p-4">{project.title}</td>
                  <td className="p-4">{project.description}</td>
                  <td className="p-4">
                    {project.creator_profile?.name || "Desconocido"}
                  </td>
                  <td className="p-4">
                    {project.creator_profile?.company || "Sin compañía"}
                  </td>
                  <td className="p-4">
                    {project.assignee_profile?.name || "No asignado"}
                  </td>
                  <td className="p-4 flex gap-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                      onClick={() => handleDelete(project.id)}>
                      Eliminar
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                      onClick={() => openModal(project)}>
                      Editar/Asignar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {isModalOpen && (
        <ModalEditProjects
          profiles={profiles}
          selectedProject={selectedProject}
          selectedProfileID={selectedProfileID}
          setselectedProfileID={setselectedProfileID}
          setIsModalOpen={setIsModalOpen}
          handleUpdateProject={handleUpdateProject}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          errorDescription={errorDescription}
          errorTitle={errorTitle}
        />
      )}
    </div>
  );
}
