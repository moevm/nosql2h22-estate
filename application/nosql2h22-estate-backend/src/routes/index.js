import express from "express";

import { housesRoutes } from "./houses.js";

export const routes = express.Router();

routes.use("/houses", housesRoutes);
