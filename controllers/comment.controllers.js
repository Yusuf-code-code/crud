import Comments from "../models/comment.model.js";

export async function getComment(req, res) {
    try {
     
        const myComments = await Comments.find({ author: req.user.id })
        .populate("author", "userName image")
        .sort({ createdAt: -1 });

        return res.status(200).json(myComments);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export async function createComment(req, res) {
    try {
        const { comment } = req.body;
        if (!comment || comment.trim() === "") {
            return res.status(400).json({ message: "Comment cannot be empty" });
        }

        const newComment = await Comments.create({
            comment,
            author: req.user.id 
        });

        const populatedComment = await newComment.populate("author", "userName image");
        
        return res.status(201).json({ message: "New comment Created", comment: populatedComment });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export async function editComment(req, res) {
    try {
        const { id } = req.params;
        const { comment } = req.body;

     
        const existingComment = await Comments.findById(id);
        if (!existingComment) return res.status(404).json({ message: "Comment not found" });

        if (existingComment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to edit this comment" });
        }

        const editedComment = await Comments.findByIdAndUpdate(id, { comment }, { new: true });
        res.status(200).json({ message: "Edited successfully", comment: editedComment });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export async function deleteComment(req, res) {
    try {
        const { id } = req.params;

        const existingComment = await Comments.findById(id);
        if (!existingComment) return res.status(404).json({ message: "Comment not found" });

       
        if (existingComment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        await Comments.findByIdAndDelete(id);
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export async function getAllPublicComments(req, res) {
    try {
      
        const comments = await Comments.find()
            .populate("author", "userName image") 
            .sort({ createdAt: -1 }); 

        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}