import React from 'react'
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

const Blogpost = ({isloading, children,isError,onRetry}) => {
  return (
    <div className= 'relative'>
        <div className={isloading ? "opacity-30 blur-[2px] pointed-events-none transition-all duration-300" : "transition-all duration-300"}>
            {children}
        </div>
        {isloading && (
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/30'>
                <Spinner />
            </div>
        )}
        {!isloading &&  isError &&(
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/30'>
                <ErrorMessage message="ERR_INTERNET_DISCONNECTED" onRetry={onRetry} />
            </div>
        )}

    </div>
      
    
  )
}

export default Blogpost
