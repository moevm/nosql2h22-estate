import express from "express";

import { getDb } from "../db.js";
import { logger } from "../logger.js";
import { respondSuccess, respondError, getRandomKey } from "../utils.js";

export const authRoutes = express.Router();

authRoutes.post("/login", async (req, res) => {
  const key = req.body.key;
  const dbConnection = getDb();

  logger.info("GET /auth/login, key=", key);

  if (key !== process.env.KEY) {
    respondError(res, Error("Wrong key"));
    return;
  }

  const collections = await dbConnection
    .listCollections()
    .toArray()
    .then((res) => res.map((collection) => collection.name));

  if (collections.includes("auth")) {
    await dbConnection.collection("auth").drop();
  }

  const sessionKey = getRandomKey();

  dbConnection
    .collection("auth")
    .insertOne({ sessionKey })
    .then(() => respondSuccess(res, sessionKey))
    .catch((error) => respondError(res, error));
});
