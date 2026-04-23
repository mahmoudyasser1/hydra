export default async function handler(req, res) {
  // Allow all query params to pass through
  const params = new URLSearchParams(req.query).toString();
  const targetUrl = `http://hydra.st/player_api.php?${params}`;

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      res.status(response.status).json({ error: `Upstream error: ${response.status}` });
      return;
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: `Proxy failed: ${err.message}` });
  }
}
