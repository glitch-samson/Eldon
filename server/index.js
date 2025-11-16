import "dotenv/config";
import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Media endpoints
  app.get("/api/media", (req, res) => {
    const { page = 1, limit = 20, type, search } = req.query;
    let filtered = mockMedia;

    if (type) {
      filtered = filtered.filter((m) => m.type === type);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.caption.toLowerCase().includes(searchLower) ||
          m._id.includes(search),
      );
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const startIdx = (pageNum - 1) * limitNum;
    const endIdx = startIdx + limitNum;

    const paginatedMedia = filtered.slice(startIdx, endIdx);

    res.json({
      media: paginatedMedia,
      total: filtered.length,
      page: pageNum,
      limit: limitNum,
    });
  });

  app.get("/api/media/:id", (req, res) => {
    const media = mockMedia.find((m) => m._id === req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.json(media);
  });

  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";

    if (password === adminPassword) {
      res.json({ token: "mock-admin-token-" + Date.now() });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });

  app.post("/api/admin/logout", (_req, res) => {
    res.json({ message: "Logged out" });
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  return app;
}
