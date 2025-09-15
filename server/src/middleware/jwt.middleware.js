import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { jwtAccessSecretKey } from "../config/env.config.js";

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Access token missing');
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtAccessSecretKey, (err, decoded) => {
        if (err) {
            throw new ApiError(403, 'Invalid or expired token');
        }
        req.user = decoded;
        next();
    });
};
