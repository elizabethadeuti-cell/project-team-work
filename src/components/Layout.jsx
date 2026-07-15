import React, { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { Menu } from "lucide-react";

const Layout = ({ user}) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hiddenOnPaths = ['/login', '/signup'];
  const hideSidebar = hiddenOnPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="flex h-screen overflow-hidden">
      {!hideSidebar && (
        <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}

     <main
        className={`flex-1 overflow-y-auto ${
          hideSidebar ? "" : "md:ml-48"
        }`}
      >
        {!hideSidebar && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-4 text-teal-600"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        {OutLet}
      </main>
    </div>
  );
};

export default Layout;