import mongoose from "mongoose";
import { compare, genSalt, hash } from "bcryptjs"
import jwt from "jsonwebtoken";
import { jwtAccessSecretKey } from "../config/env.config.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
});


userSchema.methods.hashPassword = async function (password) {
    const salt = await genSalt(12);
    return await hash(password, salt);
}

userSchema.methods.generateJWT = function (user) {
    return jwt.sign({ user }, jwtAccessSecretKey)
}

userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
}

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await this.hashPassword(this.password);
    next();
})
const User = mongoose.model("User", userSchema);
export default User; 
