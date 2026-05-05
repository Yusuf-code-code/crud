import { verifyTokenCookie } from "../middlewares/verifyTokenCookie.js";
import { createComment, deleteComment, editComment, getAllPublicComments, getComment } from "../controllers/comment.controllers.js";

export function commentRoutes(app) {

    app.get('/comments', verifyTokenCookie, getComment);
    app.post('/comment', verifyTokenCookie, createComment);
    app.put('/comments/:id', verifyTokenCookie, editComment);
    app.delete('/comments/:id', verifyTokenCookie, deleteComment);
    app.get('/all-comments', getAllPublicComments);
    
    
}