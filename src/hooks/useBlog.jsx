import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../utils/helpers";

function usePosts(category = "") {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);

            try {
                const postsUrl = category
                    ? `${BASE_URL}/everything?q=${encodeURIComponent(category)}&pageSize=100&apiKey=${API_KEY}`
                    : `${BASE_URL}/top-headlines?country=us&pageSize=100&apiKey=${API_KEY}`;

                const res = await fetch(postsUrl);
                if (!res.ok) throw new Error(`API error: ${res.status}`);

                const data = await res.json();
                setPosts(data.articles);
                setLoading(false);
            } catch (err) {
                setError(err.message || "Failed to load posts. Please try again.");
                setLoading(false);
            }
        };

        fetchPosts();
    }, [category]);

    return { posts, loading, error };
}

export default usePosts;