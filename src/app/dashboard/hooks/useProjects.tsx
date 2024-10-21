import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Profile } from "../types/projects.type";
import { Project } from "@/app/types";
import { validatefield } from "@/formValidatiosn/validateForm";

export default function UseProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProfileID, setselectedProfileID] = useState<string | null>(
    null
  );
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorTitle, setErrorTitle] = useState<string | null>("");
  const [errorDescription, setErrorDescription] = useState<string | null>("");
  useEffect(() => {
    setErrorTitle(validatefield("title", title));
  }, [title]);
  useEffect(() => {
    setErrorDescription(validatefield("description", description));
  }, [description]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select(`
        *,
        creator_profile:profiles!projects_created_by_fkey(name, company),
        assignee_profile:profiles!projects_assigned_to_fkey(name)
      `);
      if (error) {
        setError("Error al cargar los proyectos");
        return;
      }
      setProjects(data || []);
      setLoading(false);
    };

    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name")
        .eq("role", "designer");

      if (error) {
        setError("Error al cargar los perfiles");
        return;
      }
      setProfiles(data || []);
    };

    fetchProjects();
    fetchProfiles();
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

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setselectedProfileID(project.assigned_to || null);
    setTitle(project.title);
    setDescription(project.description);
    setIsModalOpen(true);
  };

  const handleUpdateProject = async () => {
    if (!selectedProject) return;

    const updates = {
      title,
      description,
      assigned_to: selectedProfileID,
    };

    const { error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", selectedProject.id);
    if (error) {
      setError("Error al actualizar el proyecto");
      return;
    }

    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectedProject.id ? { ...project, ...updates } : project
      )
    );

    setIsModalOpen(false);
    setSelectedProject(null);
    setselectedProfileID(null);
    setTitle("");
    setDescription("");
  };

  return {
    projects,
    profiles,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    selectedProject,
    selectedProfileID,
    setselectedProfileID,
    handleDelete,
    openModal,
    handleUpdateProject,
    title,
    setTitle,
    description,
    setDescription,
    errorDescription,
    errorTitle,
  };
}
