import { useState, useEffect } from "react";

function usePosts(category = "") {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const BASE_URL = import.meta.env.VITE_NEWS_BASE_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        setPosts([]);

       const postsUrl = category
  ? `${import.meta.env.VITE_NEWS_BASE_URL}/everything?q=${encodeURIComponent(category)}&pageSize=100&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
  : `${import.meta.env.VITE_NEWS_BASE_URL}/top-headlines?country=us&pageSize=40&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`;

        const res = await fetch(postsUrl);

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        setPosts(data.articles);
      } catch (err) {
        setPosts([]);
        setError(err.message || "Failed to load posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, API_KEY, BASE_URL]);

  return { posts, loading, error };
}

export default usePosts;