// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Route: Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route: Search functionality
app.post("/search", (req, res) => {
  const query = req.body.query;
  // For now, just echo back the search term
  res.json({ message: `You searched for: ${query}` });
});

// Route: Testimonials
app.get("/testimonials", (req, res) => {
  res.json([
    { name: "Client A", feedback: "TGIST keeps our business secure!" },
    { name: "Client B", feedback: "Reliable and professional team." },
  ]);
});

// Route: Book Online (example form submission)
app.post("/book", (req, res) => {
  const { name, email, service } = req.body;
  // Normally you’d save this to a database
  res.json({ message: `Booking confirmed for ${name} (${service})` });
});

// Route: Blog (placeholder)
app.get("/blog", (req, res) => {
  res.json([
    {
      title: "Cybersecurity Trends 2025",
      content: "AI-driven defense is the future...",
    },
    {
      title: "Why Choose TGIST",
      content: "Because we deliver smarter solutions.",
    },
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
