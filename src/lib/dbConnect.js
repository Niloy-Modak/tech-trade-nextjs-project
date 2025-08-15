import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  userCollection: "user_data",
  productCollection: "products"
};

export default function dbConnect(collectionName) {
  const uri = process.env.DB_URI;

  if (!uri) {
    throw new Error("DB_URI is not set in environment variables");
  }
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client.db(process.env.DB_USERNAME).collection(collectionName);
}
