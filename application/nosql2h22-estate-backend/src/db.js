import mongodb from "mongodb";

const client = new mongodb.MongoClient("mongodb://mongo:27017");

let dbConnection;

export const connectToServer = async () => {
    client.connect()
        .then(() => {
            dbConnection = client.db("db");
            console.log("Connected to mongodb");
        })
        .catch((err) => {
            console.error("Could not connect to mongodb");
            console.error(err);
        });
};

export const getDb = () => dbConnection;
