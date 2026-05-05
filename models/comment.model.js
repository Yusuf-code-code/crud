import mongoose, { mongo } from "mongoose";

const commentSchema = new mongoose.Schema({
    userName:  String,
    comment: {
        type: String,
        required: true,

    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
},{timestamps: true});

const Comments = mongoose.model('Comments', commentSchema)
export default Comments;