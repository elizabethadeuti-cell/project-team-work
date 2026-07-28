import React from 'react'
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { UserCircle, Search } from 'lucide-react';

function BlogSearch({ onSearch, isLoading = false }) {
  const { user, authError } = useAuth();

  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter the title of your headline to search.");
      return;
    }
    setError("");
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    setError("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-5 px-4 sm:px-10 w-full max-w-4xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for headline..."
            className="w-full bg-white border border-teal-700 rounded-lg pl-10 pr-10 py-2.5 text-black placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                       transition-all duration-200"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-black transition"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-teal-500 text-[16px] text-white px-8 py-2.5 rounded-lg hover:bg-teal-700 font-body"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>

        <div className="flex flex-col items-center justify-center gap-2 text-center w-full sm:ml-30 sm:w-40 font-body">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user?.displayName || "User"}
              className="w-8 h-8 rounded-full object-cover text-2xl"
            />
          ) : (
            <UserCircle className="w-10 h-10 text-teal-600 text-3xl" />
          )}
          <span className="text-sm font-medium text-black leading-tight font-body">
            {user?.displayName || "Guest"}
          </span>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm px-10 font-body">{error}</p>}
    </form>
  );
}

export default BlogSearch