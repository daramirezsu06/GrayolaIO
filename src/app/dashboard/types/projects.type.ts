import { Project } from "@/app/types";

export interface ProfileAsigned {
  name: string;
  company?: string | null;
}

export interface Profile {
  id: string;
  name: string;
}

export interface ModalEditProjectsProps {
  profiles: Profile[];
  setIsModalOpen: (isOpen: boolean) => void;
  selectedProject: Project | null;
  selectedProfileID: string | null;
  setselectedProfileID: (profileId: string | null) => void;
  handleUpdateProject: () => Promise<void>;
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  errorDescription: string | null;
  errorTitle: string | null;
}
