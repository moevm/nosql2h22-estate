import _ from "lodash";
import express from "express";

import { respondSuccess, respondError } from "./utils.js";
import { getDb } from "./db.js";
import { scheme } from "./houseScheme.js";
import { isValid } from "./validation.js";
import { logger } from "./logger.js";

export const routes = express.Router();

routes.post("/houses", async (req, res) => {
  const dbConnection = getDb();
  const house = _.pick(
    req.body,
    scheme.map((prop) => prop.name)
  );
  const validationResult = isValid(req.body, scheme);

  if (validationResult.valid) {
    logger.info("Got valid response, sending request to db");

    dbConnection
      .collection("houses")
      .insertOne(house)
      .then(() => respondSuccess(res))
      .catch((err) => respondError(res, err));
  } else {
    respondError(res, validationResult.message);
  }
});
