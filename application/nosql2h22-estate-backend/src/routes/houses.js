import express from "express";
import _ from "lodash";
import { ObjectId } from "mongodb";

import {
  respondSuccess,
  respondError,
  shortProjection,
  parseFinding,
  normaliseHouse,
  validateToken,
} from "../utils.js";
import { getDb } from "../db.js";
import { scheme } from "../houseScheme.js";
import { isValid } from "../validation.js";
import { logger } from "../logger.js";

export const housesRoutes = express.Router();

housesRoutes.get("/filter", async (req, res) => {
  const dbConnection = getDb();
  const filter = scheme.reduce((filter, { name }) => {
    if (req.query[name]) {
      filter.push(parseFinding(name, req.query[name]));
    }

    return filter;
  }, []);

  logger.info("GET /houses/filter, filter: ", filter);

  dbConnection
    .collection("houses")
    .find({ $where: filter.join("&&") })
    .toArray()
    .then((houses) => respondSuccess(res, houses))
    .catch((err) => respondError(res, err));
});

housesRoutes.get("/short", async (req, res) => {
  const dbConnection = getDb();
  const housesPerPage = +process.env.HOUSES_PER_PAGE || 5;

  if (!_.isInteger(+req.query.page)) {
    logger.info("GET /houses/short, no page specified");

    dbConnection
      .collection("houses")
      .find()
      .project(shortProjection)
      .toArray()
      .then((houses) => respondSuccess(res, houses))
      .catch((err) => respondError(res, err));
  } else {
    logger.info(`GET /houses/short', page=${req.query.page}`);

    dbConnection
      .collection("houses")
      .find()
      .project(shortProjection)
      .sort({ _id: 1 })
      .skip(+req.query.page * housesPerPage)
      .limit(housesPerPage)
      .toArray()
      .then((houses) => respondSuccess(res, houses))
      .catch((err) => respondError(res, err));
  }
});

housesRoutes.get("/:id", async (req, res) => {
  const dbConnection = getDb();

  logger.info(`GET /houses/:id, id=${req.params.id}`);

  dbConnection
    .collection("houses")
    .findOne(ObjectId(req.params.id))
    .then((house) => respondSuccess(res, house))
    .catch((err) => respondError(res, err));
});

housesRoutes.get("/", async (req, res) => {
  const dbConnection = getDb();
  const housesPerPage = +process.env.HOUSES_PER_PAGE || 5;

  if (!_.isInteger(+req.query.page)) {
    logger.info("GET /houses, no page specified");

    dbConnection
      .collection("houses")
      .find()
      .toArray()
      .then((houses) => respondSuccess(res, houses))
      .catch((err) => respondError(res, err));
  } else {
    logger.info(`GET /houses', page=${req.query.page}`);

    dbConnection
      .collection("houses")
      .find()
      .sort({ _id: 1 })
      .skip(+req.query.page * housesPerPage)
      .limit(housesPerPage)
      .toArray()
      .then((houses) => respondSuccess(res, houses))
      .catch((err) => respondError(res, err));
  }
});

housesRoutes.post("/", async (req, res) => {
  const dbConnection = getDb();

  logger.info("POST /houses, data=", req.body);

  const isValidToken = await validateToken(dbConnection, req.body.token);

  if (!isValidToken) {
    respondError(res, Error("Invalid token"));
    return;
  }

  const house = _.pick(
    req.body,
    scheme.map((prop) => prop.name)
  );

  const validationResult = isValid(req.body, scheme);

  if (validationResult.valid) {
    logger.info(`POST /houses, house validated`);

    normaliseHouse(house, scheme);

    dbConnection
      .collection("houses")
      .insertOne(house)
      .then((dbRes) => respondSuccess(res, dbRes.insertedId))
      .catch((err) => respondError(res, err));
  } else {
    respondError(res, validationResult.message);
  }
});
