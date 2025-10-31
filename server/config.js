import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 4000;
export const mongoose_uri = process.env.MONGO_URI_DEV;