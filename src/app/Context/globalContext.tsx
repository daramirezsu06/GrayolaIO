"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { GlobalContextType } from "./context.types";
import { Profile } from "../types";

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("profile", JSON.stringify(userProfile));
    } else {
      localStorage.removeItem("profile");
    }
  }, [userProfile]);

  return (
    <GlobalContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </GlobalContext.Provider>
  );
};
