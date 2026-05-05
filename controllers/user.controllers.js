import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/keyConfig.js";
import bcrypt from "bcrypt";

export const register = async(req,res) =>{
    try{
        const {userName, email, password, bio, hobby} = req.body;

        if(!req.file) {
            return res.status(400).json({message: "Profile picture is required"})
        }
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            bio,
            hobby,

            image: req.file.path

        })

        await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            user: {
                userName: newUser.userName,
                email: newUser.email,
                image: newUser.image
            }
        })
    }catch (error) {
        res.status(500).json({message: error.message});
    }
}

export async function allUsers(req, res){
    try{
        const allUsers = await User.find();
        return res.status(200).json(allUsers)
    }catch(err){
        return res.status(500).json({message: err.message})
    }

}

export const updateUser = async(req,res) => {
    try{
        const{userName, bio, hobby,} = req.body;

         const updateData = {
            userName,
            bio,
            hobby,
         };
          if(req.file){
            updateData.image = req.file.path;
        }
    
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            {new:true, runValidators: true}
        )
      
       
        if(!updatedUser) return res.status(404).json({message: "User not found"});

        res.status(200).json({message:"Profile updated", updateUser})
    }catch(error) {
        res.status(500).json({message: error.message})
    }

}

export const cookieLogin = async(req, res) =>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user)  return  res.status(404).json({message:"User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn:"1h"})

        res.status(200)
        .cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 3600000,
        })
        .json({
            message: "Logged in successfully",
            user: {
                id: user._id,
                userName: user.userName,
                image: user.image,
                bio: user.bio
            }
        });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expiresIn: new Date(0),
        sameSite: "strict",
    }).status(200).json({message: "Logged out successfully"})
};

export const user = async(req, res) => {
    try{
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({message: "User not found"});
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

