import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import passport from "passport";
import { port } from "./config.js";
import { dbConnection } from "./db.js";
import tweeterRoutes from "./routes/tweeterRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

dbConnection();
const app = express();

//settings

//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './profiles'
}))
app.use(morgan('tiny'));

//routes
app.use(tweeterRoutes);
app.use(usersRoutes);
//listening
app.listen(port, console.log(`Connected to port ${port}`));