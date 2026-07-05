import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import {BiSad} from 'react-icons/bi'


const Movie = () => {
  const navigate = useNavigate();
    const {handleLogout} = useAuth();
  return (
    <main className='max-w-4xl mx-auto px-4 py-10 space-y-10 font-Merriweather+Sans'>
        <div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
          <BiSad className='text-8xl text-teal-600 mx-auto' />
          <h1 className='text-5xl font-bold font-header'>OOPS!</h1>
          <p className='text-gray-500 max-w-sm mb-6 font-body'>Look like the page you are trying to access is under
          serious development construction.</p>
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


export default Movie
