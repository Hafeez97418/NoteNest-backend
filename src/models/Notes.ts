import mongoose, { Mongoose, Schema } from "mongoose";

const { Types } = Schema;
const NotesSchema = new Schema({
  title: {
    type: Types.String,
    required: true,
    unique: true,
    minlength: [1, "title must be at least 1 character long"],
    maxlength: [100, "title must be less than 100 characters"],
  },
  body: {
    type: Types.String,
    required: true,
  },
  createdAt: {
    type: Types.Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Types.Date,
    default: Date.now(),
  },
  userId: { type: Types.ObjectId, required: true },
  color: { type: Types.ObjectId, required: true },
  tag: { type: Types.String, default: "all" },
});

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;