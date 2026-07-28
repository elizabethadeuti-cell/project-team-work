export default async function handler(req, res) {
  const { type, category, q } = req.query;

  const apiKey = process.env.NEWS_API_KEY;
  const baseUrl = process.env.NEWS_BASE_URL;

  if (!apiKey || !baseUrl) {
    return res.status(500).json({
      error: "Missing NEWS_API_KEY or NEWS_BASE_URL environment variable",
    });
  }

  try {
    const url =
      type === "everything"
        ? `${baseUrl}/everything?q=${encodeURIComponent(q || category)}&pageSize=100&apiKey=${apiKey}`
        : `${baseUrl}/top-headlines?country=us&category=${encodeURIComponent(category)}&pageSize=40&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("News fetch error:", error.message);
    res.status(500).json({ error: error.message });
  }
}