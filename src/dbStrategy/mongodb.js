import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
    mongoClient.connect();
    db = mongoClient.db("drivencracy");
    
} catch (error) {
    console.log(error);
}

export { db, ObjectId };