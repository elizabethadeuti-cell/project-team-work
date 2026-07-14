import { useState } from 'react';
import SideBar from './SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Layout = ({ user, children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const knownPaths = ['/entertainment', '/fashion', '/sport', '/business', '/movies', '/education'];
  const hideSidebar = !knownPaths.some(path => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && (
        <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <main className="flex-1 min-h-screen">
        {!hideSidebar && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-4 text-teal-600"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        {children}
      </main>
    </div>
  );
};

export default Layout;