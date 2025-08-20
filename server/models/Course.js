import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
});

export default mongoose.model("Course", courseSchema);
