import asyncHandler from "express-async-handler"
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    return res.status(200).json(
        new ApiResponse(200, 'Users List', users)
    )
});


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            "Registration Successfull"
        )
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new ApiError(400, 'User does not exists');

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) throw new ApiError(400, 'Invalid Password');

    const token = user.generateJWT({
        _id: user._id,
        name: user.name,
        email: user.email
    });

    return res.status(200).json(new ApiResponse(200, 'Login Successfull', {
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token
    }));
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(
        200, 
        'Profile fetched successfully', 
        req.user
    ))
});

const logout = asyncHandler(async (req, res) => {
    req.user = null;

    res.status(200).json(new ApiResponse(200, 'logout successfully'));
})

export {
    getAllUsers,
    registerUser,
    loginUser, 
    getCurrentUserProfile, 
    logout
}