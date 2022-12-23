import _ from "lodash";
import { parseString } from "@fast-csv/parse";

import { defaultHouse, scheme, csvHeaders as headers } from "./houseScheme.js";
import { logger } from "./logger.js";
import { parse } from "./parsing.js";

export const respondError = (res, error) => {
  res.status(400).json({ status: "error", error: error.message });
  logger.error("Request error: ", error);
};

export const respondSuccess = (res, message) => {
  res.status(200).json({ status: "done", message });
  logger.info("Request success: ", message);
};

export const shortProjection = [
  "street",
  "houseNumber",
  "houseFractionNumber",
  "character",
  "district",
].reduce((res, k) => _.set(res, k, 1), {});

export function parseFinding(key, value) {
  if (key.startsWith("area") && /\d+(.\d+)?-\d+(.\d+)?/.test(value)) {
    const [left, right] = value.split("-").map((v) => +v);

    return (obj) => +obj[key] >= left && +obj[key] <= right;
  }

  const pattern = _.isArray(value)
    ? value.map((str) => `(${str.trim()})`).join("|")
    : value
        .split(",")
        .map((str) => `(${str.trim()})`)
        .join("|");

  if (!key.includes(".")) {
    return (obj) => RegExp(pattern, "i").test(obj[key]);
  }

  const [field, objField] = key.split(".");

  return (obj) =>
    obj[field].some((val) => RegExp(pattern, "i").test(val[objField]));
}

const normaliseBoolean = (house, scheme) => {
  for (const prop of scheme) {
    if (prop.type === "boolean") {
      house[prop.name] = house[prop.name] ? 1 : 0;
    }
  }
};

export function normaliseHouse(object, scheme) {
  _.defaults(object, defaultHouse);

  normaliseBoolean(object, scheme);
}

export const getRandomKey = () => {
  return Date.now().toString(16) + Math.random().toString(16).slice(2);
};

export function isCollectionExist(dbConnection, collectionName) {
  return dbConnection
    .listCollections()
    .toArray()
    .then((res) => res.map((collection) => collection.name))
    .then((collections) => collections.includes(collectionName));
}

export async function validateToken(dbConnection, token) {
  if (!+process.env.REQUIRE_KEY) {
    return true;
  }

  const isExist = await isCollectionExist(dbConnection, "auth");

  return isExist
    ? dbConnection
        .collection("auth")
        .findOne()
        .then((res) => res.sessionKey === token)
        .catch(() => false)
    : false;
}

export async function dropIfExist(dbConnection, collectionName) {
  const isExist = await isCollectionExist(dbConnection, collectionName);

  if (isExist) {
    return dbConnection.collection(collectionName).drop();
  }
}

export const parseDb = (csvString) =>
  new Promise((resolve, reject) => {
    const houses = [];

    parseString(csvString, { headers, skipRows: 1 })
      .on("error", (error) => reject(error))
      .on("data", (house) => houses.push(transformHouse(house)))
      .on("end", () => resolve(houses));

    function transformHouse(house) {
      const flatType = house.flatType
        ? house.flatType.split(",").map((type) => +type.match(/\d+/)[0])
        : null;
      const communeType = house.communeType
        ? house.communeType.split(",").map((type) => +type.match(/\d+/)[0])
        : null;
      const flatCount = house.flatCount
        ? house.flatCount.split(",").map((val) => +val)
        : null;
      const communeCount = house.communeCount
        ? house.communeCount.split(",").map((val) => +val)
        : null;

      const [houseNumbers, houseFractionNumber] = house.house.split("/");
      const houseNumbersSplit = houseNumbers.split("-");

      house.flat = _.zip(flatType, flatCount).map(([roomsCount, count]) => ({
        roomsCount,
        count,
      }));

      house.commune = _.zip(communeType, communeCount).map(
        ([roomsCount, count]) => ({ roomsCount, count })
      );

      house.houseNumber =
        houseNumbersSplit.length === 2
          ? _.range(+houseNumbersSplit[0], +houseNumbersSplit[1] + 1).join(",")
          : houseNumbers;

      house.houseFractionNumber = houseFractionNumber;

      ["flatType", "communeType", "flatCount", "communeCount", "house"].forEach(
        (param) => _.unset(house, param)
      );

      return parseFields(house);
    }

    function parseFields(house) {
      const fieldsToParse = scheme.filter(
        ({ filter, name }) => !filter && !["commune", "flat"].includes(name)
      );

      fieldsToParse.forEach(({ name, type }) =>
        _.set(house, name, parse(house[name], type))
      );

      normaliseHouse(house, scheme);

      return house;
    }
  });

export const createFilter = (req) => {
  const filter = scheme.reduce((filter, { name }) => {
    if (req.query[name]) {
      filter.push(parseFinding(name, req.query[name]));
    }

    return filter;
  }, []);

  filter.satisfies = function (house) {
    return this.every((fn) => fn(house));
  };

  return filter;
};
