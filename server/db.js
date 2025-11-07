import mongoose from "mongoose";
import { mongoose_uri } from "./config.js";

export const dbConnection = async () => {
    try {
        await mongoose.connect(mongoose_uri);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}