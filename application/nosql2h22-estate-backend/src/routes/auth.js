import express from "express";

import { getDb } from "../db.js";
import {
  respondSuccess,
  respondError,
  getRandomKey,
  dropIfExist,
} from "../utils.js";

export const authRoutes = express.Router();

authRoutes.post("/login", async (req, res) => {
  const key = req.body.key;
  const dbConnection = getDb();

  if (key !== process.env.KEY) {
    respondError(res, Error("Wrong key"));
    return;
  }

  await dropIfExist(dbConnection, "auth");

  const sessionKey = getRandomKey();

  dbConnection
    .collection("auth")
    .insertOne({ sessionKey })
    .then(() => respondSuccess(res, sessionKey))
    .catch((error) => respondError(res, error));
});
