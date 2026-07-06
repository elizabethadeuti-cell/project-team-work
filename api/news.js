export default async function handler(req, res) {
  const { type, category } = req.query;
  const apiKey = process.env.VITE_NEWS_API_KEY;
  const baseUrl = process.env.VITE_NEWS_BASE_URL;

  try {
    const url =
      type === "everything"
        ? `${baseUrl}/everything?q=${encodeURIComponent(category)}&pageSize=100&apiKey=${apiKey}`
        : `${baseUrl}/top-headlines?country=us&pageSize=100&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}