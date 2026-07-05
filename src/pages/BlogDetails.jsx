import React from "react";
import Layout from "../components/Layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaCopy} from "react-icons/fa";
import usePosts from '../hooks/useBlog';
import PostCard from "../components/PostCard";

const BlogDetails = () => {
    const{ id } = useParams();
    const {posts, loading, error} = usePosts();

    const blog = posts.find((item) => item.id === id);

  const navigate = useNavigate();
  const { state } = useLocation();

  const article = state?.article;

   const relatedPosts = posts
    .filter((item) => item.id !== id)
    .slice(0, 2)

    console.log("relatedPosts:", relatedPosts);

  if (!article) {
    return (
      <ErrorMessage
        message="Article not found."
        onRetry={() => navigate("/entertainment")}
      />
    );
  }

  const {
    title,
    description,
    content,
    urlToImage,
    publishedAt,
    author,
  } = article;

  return (
    <div className=" h-screen-[80px]  max-w-9xl mx-auto p-6 bg-white grid grid-cols-1 md:grid-cols-[350px_1fr] gap-4 group
      min-h-screen mr-96">

      <div className=' w-[200px] md:w-[300px] flex flex-col items-center text-center py-6 bg-white rounded-lg shadow-sm  hover:ring-2 hover:ring-teal-500 transition-all duration-200'>
        <img
          src={
            urlToImage ||
            "https://via.placeholder.com/400x220?text=No+Image"
          }
          alt={title}
          className="w-full max-w-[280px] h-[190px] object-cover rounded-lg mb-4 mt-[-16px] aspect-square  group  group-hover:scale-105 transition-transform duration-300"
        />

        <h1 className="text-lg text-gray-900 font-header font-bold mb-4 leading-tight px-3 hover:text-teal-600 transition-colors duration-300">
          {title}
        </h1>

        <p className="text-sm mt-46 text-teal-600 mb-1">
          Written by
        </p>

        <p className="font-semibold text-black font-body text-sm mb-1">
          {author || "Unknown Author"}
        </p>

      </div>

      <div>
        {description
          ?.split("\n")
          .filter(Boolean)
          .map((para, index) => (
            <p
              key={index}
              className="mb-4 leading-normal text-base max-w-6xl w-[500px] text-black break-words overflow-visible font-body  drop-shadow-sm"
            >
              {para}
            </p>
          ))}

        <p className="leading-normal text-base font-body text-black">
          {content || "No content available."}
        </p>

        <div className="flex items-center gap-2 mt-6 text-sm font-body text-gray-700">
          <span className="font-medium text-sm">Share Blog:</span>
          <FaCopy
           size={19} 
           className="text-teal-600 cursor-pointer" 
           onClick={() => {
             navigate("/share") }}  />
          <FaFacebook size={19} className="text-teal-600" />
          <FaTwitter size={19} className="text-teal-600" />
          <FaLinkedin size={19} className="text-teal-600" />
          <FaInstagram size={19} className="text-teal-600" />
        </div>

        <p className="text-sm text-gray-900 font-body mt-6">
          Reading Time:{" "}
          {Math.ceil((content?.length || 500) / 200)} mins
        </p>

          <div className="mt-10">
        <h3 className="font-semibold text-lg mb-4"></h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        </div>

       
      </div>

    </div>
  );
};

export default BlogDetails;