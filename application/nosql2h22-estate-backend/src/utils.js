import _ from "lodash";

import { logger } from "./logger.js";

export const respondError = (res, error) => {
  res.status(400).json({ status: "error", error });
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
  const pattern = value.split(',').map(str => `(${str.trim()})`).join('|');

  if (!key.includes('.')) {
    return `/${pattern}/.test(this.${key})`;
  }

  const [field, objField] = key.split('.');

  return `this.${field}.some(obj => /${pattern}/.test(obj.${objField}))`;
}
