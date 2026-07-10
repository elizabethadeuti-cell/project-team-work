export default async function handler(req, res) {
  const { type, category } = req.query;
  const apiKey = process.env.VITE_NEWS_API_KEY;
  const baseUrl = process.env.VITE_NEWS_BASE_URL;

  try {
    const url =
      type === "everything"
       ? `${baseUrl}/everything?q=${encodeURIComponent(category)}&pageSize=100&apiKey=${apiKey}`
        : `${baseUrl}/top-headlines?country=us&category=${category}&pageSize=40&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("News fetch error:",error.message);
    res.status(500).json({ error: error.message });
  }
}