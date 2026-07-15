import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import { FaTshirt, FaRunning, FaBriefcase, FaFilm, FaGraduationCap, FaTv } from 'react-icons/fa';
import { NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.png';
import useAuth  from "../hooks/useAuth";
import {X, LogOut} from 'lucide-react'

const categories = [
    { name: 'Entertainment', icon: <FaTv /> },
  { name: 'Fashion', icon: <FaTshirt /> },
  { name: 'Sport', icon: <FaRunning /> },
  { name: 'Business', icon: <FaBriefcase /> },
  { name: 'Movies', icon: <FaFilm /> },
  { name: 'Education', icon: <FaGraduationCap /> },

]


const SideBar = ({isOpen, onClose }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {handleLogout} = useAuth();

    const isBlogDetailsPage = location.pathname.startsWith('/blog');

  return (
    <>
    {isOpen &&(
      <div className='fixed inset-0 bg-black/40 Z-40 md:hidden'
     onClick={onClose} 
     />
    )}
    <div  className={`w-46 bg-teal-600 min-h-[80vh] flex flex-col py-3 px-0 gap-1 rounded-tr-3xl
        fixed md:sticky top-0 left-0 z-50 h-full md:h-screen
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
   
      
        {/* Close button, mobile only */}
        <button onClick={onClose} className="md:hidden self-end mr-4 text-white">
          <X className="w-5 h-5" />
        </button>

       
        <div className='px-5 mb-6'>
            <img src={logo}
            alt='postly logo'
            className='w-32 object-contain mt-5' />
        </div>
      {categories.map((cat) => (
        <NavLink
          to={`/${cat.name.toLowerCase()}`}
          key={cat.name}
          className={({ isActive }) =>
  `flex items-center gap-3 px-6 py-2 font-nav font-medium text-sm transition
  ${isActive
    ? 'bg-[#eeeff0] text-black border-l-4 border-white'
    : 'text-white hover:bg-white hover:text-teal-600 hover:border-l-4 hover:border-white'
  }`
}
        >
          <span className="text-lg">{cat.icon}</span>
          <span>{cat.name}</span>
        </NavLink>
      ))}
      <div className="mt-auto relative h-10 flex items-center justify-center pb-6 -mx-5">
  <div 
    className="absolute bottom-0 w-46 h-46 bg-teal-600 rounded-full border-20 border-[#d8d8da]" 
    style={{ bottom: '-100px' }}
  />
  
  <button
  onClick={handleLogout}
  className='absolute bottom-1 left-1/2 
  -translate-x-1/2 flex items-center gap-2 bg-white text-black px-2 py-2 rounded-sm font-medium text-xs font-body'>
  <LogOut className='w-3 h-3 scale-x-[-1]' />
  Log out
  </button>
  
</div>
</div>
    
    </>
  );
};

export default SideBar
