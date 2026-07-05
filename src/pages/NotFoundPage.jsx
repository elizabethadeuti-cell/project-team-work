import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import {AlertTriangle} from 'lucide-react'

const NotFoundPage = () => {
 const navigate = useNavigate();
    const {handleLogout} = useAuth(); 
  return (
    <main className='h-screen max-w-4xl mx-auto px-4 py-10 space-y-10 overflow-hidden'>
        <div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
          <AlertTriangle
          size={120} className='text-8xl text-teal-600 mx-auto' />
          <h1 className='text-6xl font-bold mb-2'>404</h1>
          <h2 className='text-3xl font-bold text-[#2d3748] mb-1'>PAGE NOT FOUND</h2>
          <p className='text-[#4d5664] max-w-sm mb-6 text-sm'>Looks like this scene got cut from the script. The page you're looking for doesn't exist..</p>
          <div className='flex gap-3'>
            <button
            onClick={() => navigate(-1)}
            className='bg-teal-600 text-gray-900 px-5 py-2 rounded-md font-medium hover:bg-teal-700'>
            Go Back
            </button>
            <button
            onClick={handleLogout}
            className='bg-gray-200 text-gray-900 px-5 py-2 rounded-md font-medium hover:bg-gray-100'>
             Log out
            </button>
            
        </div>
        </div>
        
     
    </main>
  )
}

export default NotFoundPage
