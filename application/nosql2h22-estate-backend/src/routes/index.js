import express from "express";

import { housesRoutes } from "./houses.js";
import { statsRoutes } from "./stats.js";
import { authRoutes } from "./auth.js";
import { logger } from "../logger.js";

export const routes = express.Router();

routes.use("/", (req, res, next) => {
  logger.info(req.method, req.url);
  logger.info("Query:", req.query);
  logger.info("Files:", req.files);
  logger.info("Body:", req.body);
  next();
});

routes.use("/houses", housesRoutes);
routes.use("/stats", statsRoutes);
routes.use("/auth", authRoutes);
