import { useContext } from "react";
import { GlobalContextType } from "./context.types";
import { GlobalContext } from "./globalContext";

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
