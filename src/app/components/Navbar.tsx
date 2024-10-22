"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { useGlobalContext } from "../Context/useGlobalContext";

const authLinks = [
  { href: "/auth/login", label: "Iniciar Sesión" },
  { href: "/auth/signup", label: "Registrarse" },
];

export const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const { userProfile, setUserProfile } = useGlobalContext();

  useEffect(() => {
    const getCurrentSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getCurrentSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error al cerrar sesión:", error);
        return;
      }
      setUserProfile(null);

      router.push("/auth/login");

      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold tracking-wide">
          Grayola.io
        </Link>

        <ul className="flex space-x-6 items-center">
          {session ? (
            <>
              <li>
                <Link
                  href={`/dashboard/${userProfile?.role}`}
                  className="text-white font-medium hover:text-gray-200 transition-colors">
                  Dashboard
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-white font-medium hover:text-gray-200 transition-colors">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              {authLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white font-medium hover:text-gray-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
