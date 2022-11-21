import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import { connectToServer } from "./db.js";
import { routes } from "./routes/index.js";

const app = express();
const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_HOST || "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept,Access-Control-Allow-Origin",
};

app.use(cors(corsOptions));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", express.static("public"));
app.use("/", routes);

connectToServer()
  .then(() => http.createServer(app).listen(+process.env.PORT || 1337))
  .then(() =>
    console.info(`Server launched on port ${process.env.PORT || 1337}`)
  );
