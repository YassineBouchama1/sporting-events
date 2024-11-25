'use client'
import { useMemo } from "react";
import { HiUsers } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { IconType } from "react-icons";
import { useAuth } from "../providers/AuthProvider"; // Assuming you have this set up
import { usePathname, useRouter } from "next/navigation";
import { MdDashboardCustomize } from "react-icons/md";
import { RiFriendicaFill } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";

// Define the Route interface
interface Route {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}

// Custom hook for routes
const useRoutes = (): Route[] => {

  const pathname = usePathname()

  const routes: Route[] = useMemo(
    () => [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: MdDashboardCustomize,
        active: pathname === "/dashboard",
      },
      {
        label: "Setting",
        href: "/dashboard/setting",
        icon: CiSettings,
        active: pathname === "/dashboard/setting",
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
