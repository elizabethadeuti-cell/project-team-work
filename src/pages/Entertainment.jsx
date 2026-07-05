import React from "react";
import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../utils/helpers";
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

   const { handleLogout } = useAuth();

  const fetchEntertainment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
     
  `https://newsapi.org/v2/top-headlines?country=us&category=${category}&PageSize=40&apiKey=27ed58be48434ce08ac861453f560dd5`
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
        {sponsored.map((article) => <PostCard key={article.url} article={article} />)}
      </div>
    </div>
    </div>
  );
}

