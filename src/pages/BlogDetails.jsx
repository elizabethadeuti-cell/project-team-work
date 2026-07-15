import React from "react";
import Layout from "../components/Layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ui/ErrorMessage";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaCopy } from "react-icons/fa";
import usePosts from '../hooks/useBlog';
import PostCard from "../components/PostCard";
import { LogOut } from 'lucide-react';

const BlogDetails = () => {
  const { id } = useParams();
  const { posts, loading, error } = usePosts();

  const blog = posts.find((item) => item.id === id);

  const navigate = useNavigate();
  const { state } = useLocation();

  const article = state?.article;

  const relatedPosts = posts
    .filter((item) => item.id !== id)
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

  // needed for the share links below
  const url = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Layout user={user}>
    <div className="min-h-screen mr-96 max-w-9xl mx-auto p-6 bg-white grid grid-cols-1 md:grid-cols-[350px_1fr] gap-10">
      <button
        onClick={() => navigate(-1)}
        className="flex justify-start gap-2 text-sm font-medium text-teal-600 mb-4"
      >
        <LogOut className="w-4 h-4 scale-x-[-1]" />
        Back To Blog
      </button>

      <div className="w-[200px] md:w-[300px] flex flex-col items-center text-center py-6 bg-white rounded-lg shadow">
        <img
          src={
            urlToImage ||
            "https://placehold.co/400x220?text=No+Image"
          }
          alt={title}
          className="w-full max-w-[280px] h-[190px] object-cover rounded-lg mb-4 mt-[-16px] aspect-square"
        />

        <h1 className="text-lg text-gray-900 font-header font-bold mb-4 leading-tight px-3 hover:text-teal-600 transition">
          {title}
        </h1>

        <p className="text-sm mt-4 text-teal-600 mb-1">
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
              className="mb-4 leading-normal text-base max-w-6xl w-[500px] text-black break-words overflow-visible"
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
    </Layout>
  );
};

export default BlogDetails;