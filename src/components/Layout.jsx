import { useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const Layout = ({user, children }) => {
  const location = useLocation();
 const knownPaths = [ '/entertainment', '/fashion', '/sport', '/business', '/movies', '/education', '/blog' ];
const hideSidebar = !knownPaths.some(path => path === '/' ? location.pathname === '/' : location.pathname.toLowerCase().startsWith(path.toLowerCase()));
  return (
    <div className="flex h-screen overflow-hidden">
      {!hideSidebar && <SideBar />}
      <main className="flex-1 min-h-screen overflow-y-auto">
        
        {children}
      </main>
    </div>
  );
};

export default Layout;