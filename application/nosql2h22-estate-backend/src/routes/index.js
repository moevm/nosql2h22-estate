import express from "express";

import { housesRoutes } from "./houses.js";
import { statsRoutes } from "./stats.js";

export const routes = express.Router();

routes.use("/houses", housesRoutes);
routes.use("/stats", statsRoutes)