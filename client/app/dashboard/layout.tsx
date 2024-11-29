
import { Metadata } from "next";
import SideBar from "@/components/SideBar";

export const metadata: Metadata = {
  title: "Event Manage | Dashboard",
  description: "Event dahsboard for managment ",
};
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="relative  bg-gray-900 h-full flex items-center justify-center">
      <div className="bg-gray-800 flex-1  min-h-screen h-auto w-full flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10   sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
        <SideBar />

        {children}
      </div>
    </div>
  );
}
