import { Profile } from "../types";


export interface GlobalContextType {
  userProfile: Profile | null;
  setUserProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}
