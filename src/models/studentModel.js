import mongoose, { ObjectId, Schema } from "mongoose";

const Student = mongoose.model(
  "Student",
  new Schema({
    studentId: ObjectId,
    name: {
      type: String,
      require: true,
    },
    class: {
      type: String,
      require: true,
    },
    mathScore: {
      type: Number,
      require: true,
      default: 0
    },
    literatureScore: {
      type: Number,
      require: true,
      default: 0
    },
    englishScore: {
      type: Number,
      require: true,
      default: 0
    },

  })
);

export default Student;
