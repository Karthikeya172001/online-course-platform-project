import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Health route for Render
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
console.log("🔍 MONGO_URI:", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
