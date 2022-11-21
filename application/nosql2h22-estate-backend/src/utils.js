import { logger } from "./logger.js";

export const respondError = (res, error) => {
  res.status(400).json({ status: "error", error });
  logger.error("Request error: ", err);
};

export const respondSuccess = (res, message) => {
  res.status(200).json({ status: "done", message });
  logger.info("Request success: ", message);
};

export const shortProjection = ["street", "houseNumber", "houseFractionNumber", "character", "district"].reduce((res, k) => _.set(res, k, 1), {});