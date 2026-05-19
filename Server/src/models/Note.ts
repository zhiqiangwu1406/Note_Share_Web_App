import mongoose, { Schema, Types } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    ref: "User",
  },
});

export const Note = mongoose.model("Note", noteSchema);
