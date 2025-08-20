import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/coursesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/api/courses", courseRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
