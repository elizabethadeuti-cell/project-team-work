import React from "react";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Blogpost from "../components/ui/Blogpost";
import BlogSearch from "../components/Blog/BlogSearch";


export default function EntertainmentPosts({ category = "entertainment" , user}) {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6)


   const { handleLogout } = useAuth();

  const fetchEntertainment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
  `/api/news?type=top-headlines&category=${category}`
);
      
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Failed to fetch entertainment articles:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchEntertainment();
  }, [category]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchEntertainment} />;

  const filteredArticles = query
  ? articles.filter(a => a.title.toLowerCase().includes(query.toLowerCase()))
  : articles;

  const featured = articles.slice(0, 3);
  const sponsored = articles.slice(3);
  const hasMore = articles.length > 3 + visibleCount;

  return (
    <div className="mb-8">
        <BlogSearch onSearch={setQuery} isLoading={loading} />
      
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {featured.map((article) => <PostCard key={article.url} article={article} />)}
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Sponsored Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sponsored.slice(0, visibleCount).map((article) => <PostCard key={article.url} article={article} />)}
      </div>
      {hasMore && (
        <div className="flex justify-end mt-4">
         <button
           onClick={() => setVisibleCount((prev) => prev + 6)} 
            className='bg-teal-600 text-white text-sm rounded-md font-medium hover:bg-teal-700 py-2 px-2 mt-3'>
            Load More
            </button>
        </div>
       
      )}
    </div>
    </div>
  );
}

