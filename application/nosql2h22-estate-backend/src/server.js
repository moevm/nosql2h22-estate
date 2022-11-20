import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import { connectToServer } from "./db.js";
import { routes } from "./routes.js";

const app = express();
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
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

connectToServer().then(() => http.createServer(app).listen(1337))
