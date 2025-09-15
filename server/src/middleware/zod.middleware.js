import z, { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
    return async (req, _, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            const errors = JSON.parse(error.message);

            throw new ApiError(400, errors[0].message);
        }
    }
}

export default validate;