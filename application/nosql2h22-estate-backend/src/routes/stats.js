import express from "express";
import _ from "lodash";

import { getDb } from "../db.js";
import { logger } from "../logger.js";
import { respondSuccess, respondError } from "../utils.js";

export const statsRoutes = express.Router();

statsRoutes.get("/districts", async (req, res) => {
  getDb()
    .collection("houses")
    .distinct("district")
    .then(districts => respondSuccess(res, districts))
    .catch(err => respondError(res, err));
});

statsRoutes.get("/area", async (req, res) => {
  const district = req.query.district;
  const dbConnection = getDb();

  logger.info(`district=${district}`);

  dbConnection
    .collection("houses")
    .find({ district })
    .project({ areaHouse: 1, _id: 0 })
    .toArray()
    .then((houses) => houses.reduce((sum, house) => sum + house.areaHouse, 0))
    .then((area) => respondSuccess(res, area))
    .catch((err) => respondError(res, err));
});

statsRoutes.get("/flats", async (req, res) => {
  const district = req.query.district;
  const dbConnection = getDb();

  logger.info(`district=${district}`);

  dbConnection
    .collection("houses")
    .find({ district })
    .project({ flat: 1, _id: 0 })
    .toArray()
    .then((houses) => houses.map((house) => house.flat))
    .then((arr) => _.flatten(arr))
    .then((flats) => flats.map((flat) => flat.count))
    .then((flatCounts) => flatCounts.reduce((sum, v) => sum + v, 0))
    .then((flatCount) => respondSuccess(res, flatCount))
    .catch((err) => respondError(res, err));
});

statsRoutes.get("/residents", async (req, res) => {
  const district = req.query.district;
  const dbConnection = getDb();

  logger.info(`district=${district}`);

  dbConnection
    .collection("houses")
    .find({ district })
    .project({ countLiving: 1, _id: 0 })
    .toArray()
    .then((houses) => houses.reduce((sum, house) => sum + house.countLiving, 0))
    .then((area) => respondSuccess(res, area))
    .catch((err) => respondError(res, err));
});
