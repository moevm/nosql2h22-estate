import express from "express";
import _ from "lodash";
import { ObjectId } from "mongodb";

import {
  respondSuccess,
  respondError,
  shortProjection,
  normaliseHouse,
  validateToken,
  dropIfExist,
  parseDb,
  createFilter,
} from "../utils.js";
import { getDb } from "../db.js";
import { scheme } from "../houseScheme.js";
import { isValid } from "../validation.js";
import { logger } from "../logger.js";

export const housesRoutes = express.Router();

housesRoutes.get("/count", async (req, res) => {
  getDb()
    .collection("houses")
    .find()
    .count()
    .then((count) => respondSuccess(res, count))
    .catch((err) => respondError(res, err));
});

housesRoutes.get("/download", async (req, res) => {
  getDb()
    .collection("houses")
    .find({}, { _id: 0 })
    .sort({ _id: 1 })
    .toArray()
    .then((houses) => Buffer.from(JSON.stringify(houses)))
    .then((buffer) => res.send(buffer))
    .catch((err) => respondError(res, err));
});

housesRoutes.get("/filter", async (req, res) => {
  const dbConnection = getDb();
  const housesPerPage = +process.env.HOUSES_PER_PAGE || 5;
  const page = _.isInteger(+req.query.page) ? Math.max(+req.query.page, 1) : 1;
  const sortBy = req.query.sort;
  const sortOrder = req.query.order;
  let count = 0;
  const houses = [];
  const skip = (page - 1) * housesPerPage;
  const filter = createFilter(req);
  const sort =
    sortBy &&
    !scheme.find((prop) => prop.name === sortBy).type.startsWith("array")
      ? { [sortBy]: sortOrder }
      : { _id: 1 };

  logger.info("page: ", page);
  logger.info("filter: ", filter);

  dbConnection
    .collection("houses")
    .find()
    .sort(sort)
    .forEach((house) => {
      if (filter.satisfies(house)) {
        count++;
        if (houses.length < housesPerPage && count > skip) {
          houses.push(house);
        }
      }
    })
    .then(() => respondSuccess(res, { count, houses }))
    .catch((err) => respondError(res, err));
});

housesRoutes.get("/short", async (req, res) => {
  const dbConnection = getDb();
  const housesPerPage = +process.env.HOUSES_PER_PAGE || 5;
  const page = _.isInteger(+req.query.page) ? Math.max(+req.query.page, 1) : 1;

  logger.info(`page=${page}`);

  dbConnection
    .collection("houses")
    .find()
    .project(shortProjection)
    .sort({ _id: 1 })
    .skip((page - 1) * housesPerPage)
    .limit(housesPerPage)
    .toArray()
    .then((houses) => respondSuccess(res, houses))
    .catch((err) => respondError(res, err));
});

housesRoutes.get("/:id", async (req, res) => {
  const dbConnection = getDb();

  dbConnection
    .collection("houses")
    .findOne(ObjectId(req.params.id))
    .then((house) => respondSuccess(res, house))
    .catch((err) => respondError(res, err));
});

housesRoutes.get("/", async (req, res) => {
  const dbConnection = getDb();
  const housesPerPage = +process.env.HOUSES_PER_PAGE || 5;
  const page = _.isInteger(+req.query.page) ? Math.max(+req.query.page, 1) : 1;

  logger.info(`page=${page}`);

  dbConnection
    .collection("houses")
    .find()
    .sort({ _id: 1 })
    .skip((page - 1) * housesPerPage)
    .limit(housesPerPage)
    .toArray()
    .then((houses) => respondSuccess(res, houses))
    .catch((err) => respondError(res, err));
});

housesRoutes.post("/csv", async (req, res) => {
  const dbConnection = getDb();

  const isValidToken = await validateToken(dbConnection, req.body.token);

  if (!isValidToken) {
    respondError(res, Error("Invalid token"));
    return;
  }

  if (!req.files.db) {
    const error = Error(`
    No csv file specified
    curl example:
    curl -F'db=@db.csv' -F'token=token' http://127.0.0.1:1337/houses/csv
    `);

    respondError(res, error);
    return;
  }

  const csvString = req.files.db.data.toString();
  const houses = await parseDb(csvString);

  await dropIfExist(dbConnection, "houses");

  dbConnection
    .collection("houses")
    .insertMany(houses)
    .then(() => respondSuccess(res))
    .catch((err) => respondError(res, err));
});

housesRoutes.post("/", async (req, res) => {
  const dbConnection = getDb();

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
    logger.info(`house validated`);

    normaliseHouse(house, scheme);

    dbConnection
      .collection("houses")
      .insertOne(house)
      .then((dbRes) => respondSuccess(res, dbRes.insertedId))
      .catch((err) => respondError(res, err));
  } else {
    respondError(res, Error(validationResult.message));
  }
});
