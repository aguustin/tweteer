import { createServer } from "http";
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { port } from "./config.js";
import { dbConnection } from "./db.js";
import tweeterRoutes from "./routes/tweeterRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import cors from "cors";
import { initSocket } from "./sockets/index.js";

dbConnection();
const app = express();
const httpServer = createServer(app);

//settings

const allowedOrigins = [
  process.env.URL_FRONT,
  process.env.URL_FRONT_DEV,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}
app.use(cors(corsOptions));
initSocket(httpServer, corsOptions);

//middlewares
app.use(express.text({ limit: '1mb' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './profiles',
    limits: { fileSize: 10 * 1024 * 1024 }
}))
app.use(morgan('tiny'));

//routes
app.use(tweeterRoutes);
app.use(usersRoutes);
//listening
httpServer.listen(port);

