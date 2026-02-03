import mongoose from "mongoose";

// 1- create a schema
// 2- model based off of that schema

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // createdAt: {
    //     type: Date
    // }
}, { timestamps: true}) // createdAt and updatedAt fields will be added automatically

const Note = mongoose.model("Note", noteSchema);

export default Note;