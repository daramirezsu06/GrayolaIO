"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Profile } from "@/app/types";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        console.log("datos obtenidos", data);
        setUsers(data);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId: string, newRole: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user role:", error.message);
      toast.error(`error al actualizar el rol del usuario: ${error.message}`);
    } else {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success("Rol actualizado correctamente");
      setEditingUser(null);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ status: newStatus })
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user status:", error);
      toast.error(
        `error al actualizar el estado del usuario: ${error.message}`
      );
    } else {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === userId ? { ...user, status: newStatus } : user
        )
      );
      toast.success("Estado actualizado correctamente");
      setEditingUser(null);
    }
  };

  if (loading) return <p className="text-gray-500">Cargando usuarios...</p>;

  return (
    <div className="flex flex-col bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Admin Dashboard - Gestión de Usuarios
      </h1>

      <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Usuarios</h2>

        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.user_id}
              className="p-4 bg-gray-50 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {user.name || "Sin nombre"}
                </h3>
                <p className="text-gray-600">
                  <span className="  text-gray-800 font-bold">Email: </span>{" "}
                  {user.email || "Sin email"}
                </p>
                <p className="text-gray-600">
                  <span className="  text-gray-800 font-bold">Role: </span>
                  {user.role || "Sin rol"}
                </p>
                <p
                  className={`${
                    user.status === "active" ? "text-green-500" : "text-red-500"
                  } font-bold`}>
                  <span className="  text-gray-800 font-bold">Status: </span>
                  {user.status || "Sin rol"}
                </p>
              </div>

              <div className="space-x-2">
                {editingUser === user.user_id ? (
                  <div className="flex items-center space-x-2">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="border border-gray-300 p-2 rounded-md">
                      <option value="admin">Admin</option>
                      <option value="customer">Cliente</option>
                      <option value="designer">Diseñador</option>
                      <option value="manager">Manager</option>
                    </select>
                    <button
                      onClick={() => updateUserRole(user.user_id, role)}
                      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
                      Guardar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingUser(user.user_id);
                      setRole(user.role);
                    }}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-colors">
                    Editar Rol
                  </button>
                )}

                {user.status === "Pending" ? (
                  <button
                    onClick={() => updateUserStatus(user.user_id, "active")}
                    className="bg-amber-500 text-white p-2 rounded-md hover:bg-amber-700 transition-colors">
                    Aceptar
                  </button>
                ) : user.status === "active" ? (
                  <button
                    onClick={() => updateUserStatus(user.user_id, "inactive")}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition-colors">
                    Desactivar
                  </button>
                ) : user.status === "inactive" ? (
                  <button
                    onClick={() => updateUserStatus(user.user_id, "active")}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 transition-colors">
                    Activar
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
