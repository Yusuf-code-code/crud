import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/keyConfig.js";


export const verifyTokenCookie = (req, res, next) => {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({message: "Access Denied: Log in required"});

    }
    try{
        const verified = jwt.verify(token, JWT_SECRET);

        req.user = verified

        next();
    }catch(error) {
        res.status(403).json({message: "Invalid or Expired Token"})
    }
};