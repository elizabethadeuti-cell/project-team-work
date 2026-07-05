import React from 'react'

const Spinner = ({message = "Loading..."}) => {
    return (
        <div className='flex flex-col items-center justify-center py-20 gap-4'>

            <div className="w-20 h-20 border-4 border-teal-700 border-t-white rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm">{message}</p>
        </div>
    )
}

export default Spinner
