import React from "react";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import Spinner from "../components/ui/Spinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Blogpost from "../components/ui/Blogpost";
import BlogSearch from "../components/Blog/BlogSearch";

export default function MoviePosts({ category = "movie", user }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchMovie = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/news?type=everything&q=${encodeURIComponent(category)}`);

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Failed to fetch movie articles:", err);
      setError(err.message || "Failed to load movie articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [category]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchMovie} />;

  const filteredArticles = query
    ? articles.filter((a) => a.title.toLowerCase().includes(query.toLowerCase()))
    : articles;

  const spotlight = filteredArticles[0];
  const featured = filteredArticles.slice(1, 4);
  const sponsored = filteredArticles.slice(4);
  const hasMore = filteredArticles.length > 4 + visibleCount;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center px-6 pt-4">
        <BlogSearch onSearch={setQuery} isLoading={loading} />
        {user && (
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900 font-medium"
          >
            Log out
          </button>
        )}
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
        {spotlight && (
          <div className="mb-8">
            <Blogpost article={spotlight} category={category} />
          </div>
        )}

        <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {featured.map((article) => (
            <PostCard key={article.url} article={article} category={category} />
          ))}
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">Sponsored Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sponsored.slice(0, visibleCount).map((article) => (
            <PostCard key={article.url} article={article} category={category} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="bg-teal-600 text-white text-sm rounded-md font-medium hover:bg-teal-700 py-2 px-2 mt-3"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}