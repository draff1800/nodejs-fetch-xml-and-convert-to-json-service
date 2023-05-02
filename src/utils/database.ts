import dotenv from 'dotenv';
import {
  MongoClient,
  Collection,
  Document,
  OptionalUnlessRequiredId,
  WithId
} from 'mongodb';

dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER_NAME;
const uri = `mongodb+srv://${user}:${password}@${cluster}.fszttko.mongodb.net/?retryWrites=true&w=majority`;

let client: MongoClient;

export async function connectToDB(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export async function saveMany<T extends Document>(
  collectionName: string,
  data: OptionalUnlessRequiredId<T>[]
): Promise<void> {
  const db = client.db(cluster);
  const collection: Collection<T> = db.collection(collectionName);

  try {
    await collection.insertMany(data);
  } catch (error) {
    console.error(`Error saving to ${collectionName}: ${error}`);
    throw error;
  }
}

export async function getAll<T extends Document>(
  collectionName: string
): Promise<WithId<T>[]> {
  const db = client.db(cluster);
  const collection: Collection<T> = db.collection(collectionName);

  try {
    return await collection.find().toArray();
  } catch (error) {
    console.error(`Error retrieving objects from ${collectionName}: ${error}`);
    throw error;
  }
}

export async function deleteAll(collectionName: string): Promise<void> {
  const db = client.db(cluster);
  const collection: Collection = db.collection(collectionName);

  try {
    await collection.deleteMany({});
  } catch (error) {
    console.error(`Error deleting objects from ${collectionName}: ${error}`);
    throw error;
  }
}
