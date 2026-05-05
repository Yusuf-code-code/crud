
import { allUsers, cookieLogin, logout, register, updateUser, user } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/uploadImage.js";
import { verifyTokenCookie } from "../middlewares/verifyTokenCookie.js";

export function userRoutes(app){

    app.post('/register', upload.single('avatar'), register)
    app.post('/login', cookieLogin)
    app.get('/allUsers', allUsers)
    app.put('/user/cookieUpdate',  verifyTokenCookie, upload.single('avatar'), updateUser)
    app.post('/logout', logout);
    app.get('/user', verifyTokenCookie, user);
}