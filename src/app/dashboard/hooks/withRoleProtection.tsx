"use client";
import { useGlobalContext } from "@/app/Context/useGlobalContext";
import { useRouter } from "next/navigation";

const withRoleProtection = (WrappedComponent, allowedRoles) => {
  return function ProtectedRoute() {
    const router = useRouter();
    const { userProfile } = useGlobalContext();

    if (!userProfile) {
      router.replace("/auth/login");
      return null;
    }

    if (!allowedRoles.includes(userProfile.role)) {
      router.replace("/unauthorized");
      return null;
    }

    return <WrappedComponent />;
  };
};

export default withRoleProtection;
