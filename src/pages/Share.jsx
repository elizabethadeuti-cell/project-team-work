import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Share() {
  const url = window.location.href;
  const title = "Check out this news!";

  const navigate= useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white font-body text-2xl">
      <h1 className="text-2xl text-black  mb-1 text-[20px] mr-60 font-header">Share To:</h1>

      <div className="flex gap-4 text-4xl text-teal-700 border-2 border-[#eceff5]">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
        <a href="https://www.instagram.com/yourpostlyhandle" target="_blank" rel="noopener noreferrer">
         <FaInstagram size={19} className="text-teal-600 cursor-pointer" />
      </a>
        </div>

        <div className=' items-center justify-center font-body gap-3'>
            <button
            onClick={() => navigate(-1)}
            className='bg-teal-600 text-white text-sm rounded-md font-medium hover:bg-teal-700 py-2 px-2 mt-3'>
            Go Back
            </button>
        </div>
      </div>
   
  );
}

export default Share;