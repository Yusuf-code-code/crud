import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: "Please enter a valid email address"
        }
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]

    },
    bio: {
        type: String,
        maxLength: [160, "Bio cannot exceed 160 characters"],
        default: "Hey there! I am using this app."
    },
    hobby:{
        type: String,
        default: "I like to use this app"
    },
    image: {
        type: String,
        required: [true, "Profile picture is required"],

        default: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"

    }, 
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;