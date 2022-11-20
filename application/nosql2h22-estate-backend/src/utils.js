import { logger } from "./logger.js";

export const respondError = (res, err) => {
  res.status(400).json({ status: "error", error: err });
  logger.error("Request error: ", err);
};

export const respondSuccess = (res) => {
  res.status(200).json({ status: "done" });
  logger.info("Request success");
};
