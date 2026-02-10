import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Links to the User model
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String], // Array of strings for filtering
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
