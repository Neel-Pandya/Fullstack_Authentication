import { connect } from "mongoose";
import { mongoUri } from "../config/env.config.js";

const connectDB = async () => {
    return await connect(mongoUri, {
        dbName: "FullStackAuth"
    });
}

export default connectDB;