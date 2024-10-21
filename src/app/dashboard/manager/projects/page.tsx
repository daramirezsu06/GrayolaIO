"use client";
import ProjectManagerDashboard from "../../components/projectManagerDashboard";
import withRoleProtection from "../../hooks/withRoleProtection";
export default withRoleProtection(ProjectManagerDashboard, ["manager"]);
