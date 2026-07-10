import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "./ui/Spinner";
import ErrorMessage from "./ui/ErrorMessage";



export default function PostCard({ article }) {

  const fallbackImage = "https://via.placeholder.com/400x220?text=No+Image";
  return (
    <div className="bg-[#eceff5] rounded-lg shadow-sm p-3 border border-[#eceff5] group hover:ring-2 hover:ring-teal-500 transition-all duration-200">
    
      <img
        src={article.urlToImage || fallbackImage}
        alt={article.title}
        loading="lazy"
        className="w-full h-48 object-cover rounded-md mb-4  group-hover:scale-105 transition-transform duration-300"
        onError={(e) => (e.target.src = fallbackImage)}
      />
      <h3 className="font-header font-bold text-base text-gray-900 mb-2 leading-snug text-[16px]">
        {article.title}
      </h3>
      <p className="font-body text-sm text-gray-600 leading-relaxed mb-3 text-[12px]">
        {article.description ? article.description.slice(0, 110) : "No description available."}
        {"... "}
             {article.description ? (
  <Link
    to="/blog"
    state={{ article }}
    className="text-teal-600 font-medium hover:underline font-body"
  >
    Read More
  </Link>
) : (
  <a
    href={article.url}
    target="_blank"
    rel="noreferrer"
    className="text-teal-600 font-medium hover:underline font-body"
  >
    Read More
  </a>
)}
</p>
      <div className="font-body flex justify-between items-center text-xs pt-2 border-t border-gray-100">
        <span className="text-gray-400">
          {new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" })}
        </span>
        <span className="text-teal-600 font-semibold font-body">
          {article.source?.name
    ? article.source.name.length > 18
      ? article.source.name.slice(0, 12) + "..."
      : article.source.name
    : "Unknown"}
        </span>
      </div>
    </div>
  );
}