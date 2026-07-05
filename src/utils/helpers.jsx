export const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
export const BASE_URL = import.meta.env.VITE_NEWS_BASE_URL || "https://newsapi.org/v2";

// NewsAPI already returns full image URLs (urlToImage), so no path-building needed —
// just handle missing images
export const getArticleImage = (urlToImage) => {
    return urlToImage || "https://placehold.co/500x300?text=No+Image";
}

export const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    return text?.length > maxLength ? `${text?.slice(0, maxLength)}...` : text;
}

export const formatPublishDate = (publishedAt) => {
    if (!publishedAt) return "Date unknown";
    const date = new Date(publishedAt);
    return `${date.toLocaleString("default", { month: "long" })} ${date.getDate()}, ${date.getFullYear()}`;
}