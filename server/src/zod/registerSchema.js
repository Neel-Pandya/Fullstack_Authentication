import { z } from "zod";
import User from "../models/user.model.js";

const registerSchema = z.object({
    name: z.string({ error: "name is required" }).trim().min(1, { error: "name is required" }).max(50, { error: "name must not be greater than 50 characters" }),
    email: z.email({ error: (issue) => issue.input === undefined || issue.input === null || issue.input === "" ? "Email is required" : "Invalid Email Format" }).refine(async (email) => {
        const user = await User.findOne({ email });
        return !user;
    }, { error: "User already exists" }),
    password: z.string({ error: "password is required" }).trim().min(1, { error: "password is required" }).min(8, { error: "password must contain atleast 8 characters" }).max(16, { error: "Password must not be more than 16 characters" })
}, { error: "All fields are required" });

export default registerSchema;