"use client";


import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Avatar from "./Avatar";
import { FaUsers } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";

export default function SideBar() {

  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();


  function onlogout() {
    logout();
    router.push("/auth");
  }

  const ACTIVE_ROUTE =
    "bg-gray-800 text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover";
  const INACTIVE_ROUTE =
    " text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover";



  return (
    <div className="bg-gray-900 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
      <nav className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
        <Link
          className={pathname === "/dashboard" ? ACTIVE_ROUTE : INACTIVE_ROUTE}
          href="#"
        >

          <MdDashboard className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>

        <Link
          className={pathname === "/participans" ? ACTIVE_ROUTE : INACTIVE_ROUTE}
          href="/participans"
        >
          <FaUsers className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
      </nav>
      <div className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">

        <button
          className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
          onClick={() => onlogout()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <Avatar />
        <p className="text-white">


        </p>
      </div>
    </div>
  );
}
