import express from "express";

import { getDb } from "../db.js";
import { respondSuccess, respondError, createFilter } from "../utils.js";

export const statsRoutes = express.Router();

statsRoutes.get("/districts", async (req, res) => {
  getDb()
    .collection("houses")
    .distinct("district")
    .then((districts) => respondSuccess(res, districts))
    .catch((err) => respondError(res, err));
});

statsRoutes.get("/area", async (req, res) => {
  const dbConnection = getDb();
  const summaryArea = {};
  const filter = createFilter(req);

  dbConnection
    .collection("houses")
    .find()
    .forEach((house) => {
      if (filter.satisfies(house)) {
        summaryArea[house.district] = summaryArea[house.district]
          ? summaryArea[house.district] + house.areaHouse
          : house.areaHouse;
      }
    })
    .then(() => {
      for (const key in summaryArea) {
        summaryArea[key] = Math.round(summaryArea[key] * 100) / 100;
      }
    })
    .then(() => respondSuccess(res, summaryArea))
    .catch((err) => respondError(res, err));
});

statsRoutes.get("/flats", async (req, res) => {
  const dbConnection = getDb();
  const summaryFlats = {};
  const filter = createFilter(req);

  dbConnection
    .collection("houses")
    .find()
    .forEach((house) => {
      if (filter.satisfies(house)) {
        const flatCount = house.flat.reduce((acc, { count }) => acc + count, 0);
        summaryFlats[house.district] = summaryFlats[house.district]
          ? summaryFlats[house.district] + flatCount
          : flatCount;
      }
    })
    .then(() => respondSuccess(res, summaryFlats))
    .catch((err) => respondError(res, err));
});

statsRoutes.get("/residents", async (req, res) => {
  const dbConnection = getDb();
  const summaryLiving = {};
  const filter = createFilter(req);

  dbConnection
    .collection("houses")
    .find()
    .forEach((house) => {
      if (filter.satisfies(house)) {
        summaryLiving[house.district] = summaryLiving[house.district]
          ? summaryLiving[house.district] + house.countLiving
          : house.countLiving;
      }
    })
    .then(() => respondSuccess(res, summaryLiving))
    .catch((err) => respondError(res, err));
});
