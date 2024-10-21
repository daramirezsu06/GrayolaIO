"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { useGlobalContext } from "../Context/useGlobalContext";

// Arrays de configuración fuera del componente
const navLinks = [{ href: "/dashboard", label: "Dashboard" }];
const authLinks = [
  { href: "/auth/login", label: "Iniciar Sesión" },
  { href: "/auth/signup", label: "Registrarse" },
];
const userLinks = [{ href: "/profile", label: "Perfil" }];

export const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const { setUserProfile } = useGlobalContext();

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
      await supabase.auth.signOut();
      setUserProfile(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-white text-2xl font-bold tracking-wide">
          Grayola.io
        </Link>

        {/* Navegación */}
        <ul className="flex space-x-6 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-white font-medium hover:text-gray-200 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}

          {session ? (
            <>
              {/* Links de usuario autenticado */}
              {userLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white font-medium hover:text-gray-200 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
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
              {/* Links de autenticación */}
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
