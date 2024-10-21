"use client";
import RoleDashboardPage from "../components/roleDashboardPage";
import withRoleProtection from "../hooks/withRoleProtection";
export default withRoleProtection(RoleDashboardPage, ["manager"]);
