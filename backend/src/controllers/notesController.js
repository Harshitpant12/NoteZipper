import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        // Fetch only notes belonging to the logged-in user, sorted by creation date
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notes);

    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: "Note not found" });

        // Ensure the logged-in user owns this note
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content, tags } = req.body;

        // Attach the user ID from the protected route middleware
        const note = new Note({
            user: req.user._id,
            title,
            content,
            tags // Added tags as per your requirement
        });

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content, tags } = req.body;

        // First, find the note to check ownership
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        // Ensure the logged-in user owns this note
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        // Proceed with update since ownership is verified
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, tags },
            { new: true }
        );

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteNote(req, res) {
    try {
        // First, find the note to check ownership
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        // Ensure the logged-in user owns this note before deleting
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Note deleted successfully!" });
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}