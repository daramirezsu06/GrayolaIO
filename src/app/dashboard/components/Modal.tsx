"use client";

import { ModalEditProjectsProps } from "../types/projects.type";


const ModalEditProjects = ({
  profiles,
  setIsModalOpen,
  selectedProject,
  selectedProfileID,
  setselectedProfileID,
  handleUpdateProject,
  title,
  setTitle,
  description,
  setDescription,
}: ModalEditProjectsProps) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Editar Proyecto</h2>
        <p className="mb-4">
          Edita los detalles del proyecto "{selectedProject?.title}"
        </p>
        <div className="mb-4">
          <label className="block mb-2">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="Título del proyecto"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="Descripción del proyecto"
            rows={4}
          />
        </div>
        <select
          className="border border-gray-300 p-2 mb-4 w-full rounded"
          value={selectedProfileID || ""}
          onChange={(e) => setselectedProfileID(e.target.value)}>
          <option value="">Selecciona un perfil</option>
          {profiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
            onClick={handleUpdateProject}>
            Guardar Cambios
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
            onClick={() => setIsModalOpen(false)}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditProjects;
