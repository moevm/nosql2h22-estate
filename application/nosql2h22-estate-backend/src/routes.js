import _ from "lodash";
import { ObjectId } from "mongodb";
import express from "express";

import { respondSuccess, respondError, shortProjection } from "./utils.js";
import { getDb } from "./db.js";
import { scheme } from "./houseScheme.js";
import { isValid } from "./validation.js";
import { logger } from "./logger.js";

export const routes = express.Router();

routes.get("/houses/short", async (req, res) => {
  const dbConnection = getDb();
  const housesPerPage = process.env.HOUSES_PER_PAGE || 5;

  if (!_.isInteger(+req.query.page)) {
    logger.info("GET /houses/short, no page specified");

    dbConnection
      .collection("houses")
      .find()
      .project(shortProjection)
      .toArray()
      .then(houses => respondSuccess(res, houses))
      .catch(err => respondError(res, err))
    
  } else {
    logger.info(`GET /houses/short', page=${req.query.page}`);

    dbConnection
      .collection("houses")
      .find()
      .project(shortProjection)
      .sort({_id: 1})
      .skip(+req.query.page * housesPerPage)
      .limit(housesPerPage)
      .toArray()
      .then(houses => respondSuccess(res, houses))
      .catch(err => respondError(res, err));
  }
});

routes.get("/houses/:id", async (req, res) => {
  const dbConnection = getDb();

  logger.info(`GET /houses/:id, id=${req.params.id}`)

  dbConnection
    .collection("houses")
    .findOne(ObjectId(req.params.id))
    .then(house => respondSuccess(res, house))
    .catch(err => respondError(res, err))
});

routes.get("/houses", async (req, res) => {
  const dbConnection = getDb();
  const housesPerPage = process.env.HOUSES_PER_PAGE || 5;

  if (!_.isInteger(+req.query.page)) {
    logger.info("GET /houses, no page specified");

    dbConnection
      .collection("houses")
      .find()
      .toArray()
      .then(houses => respondSuccess(res, houses))
      .catch(err => respondError(res, err))
    
  } else {
    logger.info(`GET /houses', page=${req.query.page}`);

    dbConnection
      .collection("houses")
      .find()
      .sort({_id: 1})
      .skip(+req.query.page * housesPerPage)
      .limit(housesPerPage)
      .toArray()
      .then(houses => respondSuccess(res, houses))
      .catch(err => respondError(res, err));
  }
});

routes.post("/houses", async (req, res) => {
  const dbConnection = getDb();

  logger.info(`POST /houses, data=${req.body}`);

  const house = _.pick(
    req.body,
    scheme.map((prop) => prop.name)
  );
  const validationResult = isValid(req.body, scheme);

  if (validationResult.valid) {
    logger.info(`POST /houses, house validated`);

    dbConnection
      .collection("houses")
      .insertOne(house)
      .then(() => respondSuccess(res))
      .catch((err) => respondError(res, err));
  } else {
    respondError(res, validationResult.message);
  }
});
