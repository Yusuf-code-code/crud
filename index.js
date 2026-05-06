import express from "express";
import cors from 'cors';
const app = express();
import mongoose from "mongoose";
import { commentRoutes } from "./routes/comment.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

mongoose.connect('mongodb://yusuf143:megalo%40143@ac-tzmo25l-shard-00-00.aw4rdoe.mongodb.net:27017,ac-tzmo25l-shard-00-01.aw4rdoe.mongodb.net:27017,ac-tzmo25l-shard-00-02.aw4rdoe.mongodb.net:27017/?ssl=true&replicaSet=atlas-z4jzv0-shard-0&authSource=admin&appName=Cluster0')
.then(()=>{
    console.log("DB CONNECTED");
})
.catch((err)=>{
    console.log("DB NOT CONNECTED", err)
})

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser())
app.get('/', (req,res)=>{
    res.send("WELCOME TO ROOT ROUTE")
})

commentRoutes(app);
userRoutes(app);
const PORT = 8050;
app.listen(PORT, ()=>{
    console.log(`SERVER CONNECTED AT PORT : ${PORT}`)
})
