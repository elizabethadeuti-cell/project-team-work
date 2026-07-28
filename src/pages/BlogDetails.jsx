import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaCopy } from "react-icons/fa";
import usePosts from '../hooks/useBlog';
import PostCard from "../components/PostCard";
import { ArrowLeft } from 'lucide-react';
import useAuth from "../hooks/useAuth";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();
  const { state } = useLocation();

  const article = state?.article;
  const category = state?.category || "";
  console.log("CATEGORY IS: fashion", category);

    const { posts, loading, error } = usePosts(category);

  const relatedPosts = posts
    .filter((item) => item.url !== article?.url)
    .slice(0, 2);

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

  const url = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6 bg-white">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-teal-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back To Blog
      </button>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">
        {/* Left card: image + title + author - fixed size */}
        <div className="w-[300px] h-[500px] flex flex-col items-center text-left py-6 px-3 bg-white rounded-lg shadow border-2 border-transparent hover:border-teal-600 transition-colors overflow-hidden">
          <img
            src={
              urlToImage ||
              "https://placehold.co/400x220?text=No+Image"
            }
            alt={title}
            className="w-full max-w-[260px] h-[190px] object-cover rounded-lg mb-4 shrink-0"
          />

          <h1 className="text-lg text-gray-900 font-header font-bold mb-2 leading-tight hover:text-teal-600 transition line-clamp-3">
            {title}
          </h1>

          <div className="mt-auto flex flex-col items-center leading-tight">
            <p className="text-sm text-teal-600 leading-none mb-1">Written by</p>
            <p className="font-semibold text-black font-body text-sm leading-none">
              {author || "Unknown Author"}
            </p>
          </div>
        </div>

        {/* Right column: article body */}
        <div className="min-w-0">
          {description
            ?.split("\n")
            .filter(Boolean)
            .map((para, index) => (
              <p
                key={index}
                className="mb-4 leading-normal text-base text-black break-words max-w-[550px]"
              >
                {para}
              </p>
            ))}

          <p className="leading-normal text-base font-body text-black max-w-[550px]">
            {content || "No content available."}
          </p>

          <div className="flex items-center gap-3 mt-6 text-sm font-body text-gray-700">
            <span className="font-medium text-sm">Share Blog:</span>

            <FaCopy
              size={19}
              className="text-teal-600 cursor-pointer"
              onClick={handleCopyLink}
            />

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={19} className="text-teal-600" />
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={19} className="text-teal-600" />
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={19} className="text-teal-600" />
            </a>

            <a
              href="https://www.instagram.com/yourpostlyhandle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={19} className="text-teal-600 cursor-pointer" />
            </a>
          </div>

          <p className="text-sm text-gray-900 font-body mt-6">
            Reading Time: {Math.ceil((content?.length || 500) / 200)} mins
          </p>

          <div className="mt-10">
            <h3 className="font-semibold text-lg mb-4">Related Posts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <PostCard key={post.url} article={post} compact />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;