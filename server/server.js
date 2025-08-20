import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/coursesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema + Model
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
});

const Course = mongoose.model("Course", courseSchema);

// ✅ Get all courses
app.get("/api/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// ✅ Add course
app.post("/api/courses", async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json(newCourse);
});

// ✅ Delete course
app.delete("/api/courses/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
