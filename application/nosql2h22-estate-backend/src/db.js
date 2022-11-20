import mongodb from "mongodb";

import { logger } from "./logger.js";

const connString = process.env.MONGO_CONNSTRING || "mongodb://mongo:27017";
const client = new mongodb.MongoClient(connString);

let dbConnection;

export const connectToServer = async () => {
  client
    .connect()
    .then(() => {
      dbConnection = client.db("db");
      logger.info("Connected to mongodb");
    })
    .catch((err) => {
      logger.error("Could not connect to mongodb");
      logger.error(err);
    });
};

export const getDb = () => dbConnection;
