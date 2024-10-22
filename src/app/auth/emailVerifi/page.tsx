"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useGlobalContext } from "@/app/Context/useGlobalContext";

const VerificationComponent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {setUserProfile } = useGlobalContext();

  useEffect(() => {
    const verifyAndRedirect = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData?.session?.user) {
        setError("Error obteniendo la sesión del usuario.");
        setLoading(false);
        return;
      }

      const user = sessionData.session.user;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileError) {
        setError("Error obteniendo el perfil del usuario.");
        setLoading(false);
        return;
      }
      setUserProfile(profileData);

      if (profileData?.role) {
        router.push(`/dashboard/${profileData.role}`);
      } else {
        setError("No se encontró el rol del usuario.");
      }

      setLoading(false);
    };

    verifyAndRedirect();
  }, [router, setUserProfile]);

  if (loading) return <div className="text-center">Verificando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"></div>
  );
};

export default VerificationComponent;
