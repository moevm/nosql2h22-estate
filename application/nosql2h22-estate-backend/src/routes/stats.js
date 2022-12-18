import express from "express";

import { getDb } from "../db.js";
import { respondSuccess, respondError } from "../utils.js";

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

  dbConnection
    .collection("houses")
    .find()
    .project({ district: 1, areaHouse: 1, _id: 0 })
    .forEach(({ district, areaHouse }) => {
      summaryArea[district] = summaryArea[district]
        ? summaryArea[district] + areaHouse
        : areaHouse;
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

  dbConnection
    .collection("houses")
    .find()
    .project({ district: 1, flat: 1, _id: 0 })
    .forEach(({ district, flat }) => {
      const flatCount = flat.reduce((acc, { count }) => acc + count, 0);
      summaryFlats[district] = summaryFlats[district]
        ? summaryFlats[district] + flatCount
        : flatCount;
    })
    .then(() => respondSuccess(res, summaryFlats))
    .catch((err) => respondError(res, err));
});

statsRoutes.get("/residents", async (req, res) => {
  const dbConnection = getDb();
  const summaryLiving = {};

  dbConnection
    .collection("houses")
    .find()
    .project({ district: 1, countLiving: 1, _id: 0 })
    .forEach(({ district, countLiving }) => {
      summaryLiving[district] = summaryLiving[district]
        ? summaryLiving[district] + countLiving
        : countLiving;
    })
    .then(() => respondSuccess(res, summaryLiving))
    .catch((err) => respondError(res, err));
});
