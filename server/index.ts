import express from "express";
import cors from "cors";
import { MemStorage } from "./storage.js";
import { createRoutes } from "./routes.js";

const app = express();
const port = parseInt(process.env.PORT || "5000", 10);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize storage
const storage = new MemStorage();

// API routes
app.use(createRoutes(storage));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});