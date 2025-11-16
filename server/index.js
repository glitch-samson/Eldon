import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";

// In-memory mock data for media
const mockMedia = [
  {
    _id: "1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=900&fit=crop",
    type: "image",
    caption: "Wedding ceremony",
    uploadedAt: new Date(),
  },
  {
    _id: "2",
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=900&fit=crop",
    type: "image",
    caption: "Reception",
    uploadedAt: new Date(),
  },
  {
    _id: "3",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=900&fit=crop",
    type: "image",
    caption: "First dance",
    uploadedAt: new Date(),
  },
  {
    _id: "4",
    url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&h=900&fit=crop",
    type: "image",
    caption: "Bouquet",
    uploadedAt: new Date(),
  },
  {
    _id: "5",
    url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=900&fit=crop",
    type: "image",
    caption: "Bride and groom",
    uploadedAt: new Date(),
  },
  {
    _id: "6",
    url: "https://images.unsplash.com/photo-1505252585461-04db1267ae5b?w=800&h=900&fit=crop",
    type: "image",
    caption: "Details",
    uploadedAt: new Date(),
  },
];

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
          m._id.includes(search)
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
