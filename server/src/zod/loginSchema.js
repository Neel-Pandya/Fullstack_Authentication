import z from "zod";
import User from "../models/user.model.js";

const loginSchema = z.object({
    email: z.email({ error: (issue) => issue.input === undefined || issue.input === null || issue.input === "" ? "Email is required" : "Invalid Email Format" }),
    password: z.string({ error: "Password is required" }).trim().min(8, { error: "Password must contain atleast 8 characters" }).max(16, { error: "Password must be less than 16 characters" })
}, { error: "All Fields are required" }); 


export default loginSchema;