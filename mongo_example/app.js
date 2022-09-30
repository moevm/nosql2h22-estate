import { createRequire } from "module";
const require = createRequire(import.meta.url);

const MongoClient = require("mongodb").MongoClient;
const data = require("./data.json")

const mongoClient = new MongoClient("mongodb://localhost:27017/");

async function start(){

  try{
    await mongoClient.connect();

    const db = mongoClient.db("usersdb");
    const collection = db.collection("users");
  
    const count_before = await collection.countDocuments();
    console.log(`В коллекции users ${count_before} документов`);
  
    await collection.insertOne(data);
  
    const count_after = await collection.countDocuments();
    console.log(`В коллекции users ${count_after} документов`);

    const document = await collection.findOne({});
    console.log("document: ", document);
  }catch(err){
    console.log(err);
  }finally{
    await mongoClient.close();
  }
}

start();
