import React from 'react'
import { X } from 'lucide-react'

const ErrorMessage = ({ message = "ERR_INTERNET_DISCONNECTED", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 gap-4 mt-10 font-body">
        <h1 className="text-2xl font-bold text-grey-900 pr-4 -mt-6 pl-11">Error</h1>
        <div className= 'w-20 h-20  items-center justify-center'>
            <X className='w-50 h-50 pr-20 text-red-500 mx-auto mb-[-18]items-center -mt-9' />
            </div>

            <div className='text-sm text-gray-700 text-left pl-9 font-body'>
                <p className= 'mb-1'>try:</p>
                <ul className='list-disc list-inside space-y-1'>
                    <li>Checking the network cables, modem, and router</li>
                    <li>Reconnecting to Wi-Fi</li>
                    <li>Running Windows Network Diagnostics</li>
                </ul>
            </div>
            <p className='text-xs font-body text-gray-800 pl-18'>{message}</p>
            <button onClick={onRetry} className='bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded transition-colors'>
                Retry
            </button>
        </div>
   
    
  )
}

export default ErrorMessage
