import {
  MongoClient,
  Collection,
  Document,
  OptionalUnlessRequiredId
} from 'mongodb';
import dotenv from 'dotenv';

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
  client: MongoClient,
  collectionName: string,
  data: OptionalUnlessRequiredId<T>[]
): Promise<void> {
  const db = client.db(cluster);
  const collection: Collection<T> = db.collection(collectionName);
  await collection.insertMany(data);
}

export async function deleteAll(
  client: MongoClient,
  collectionName: string
): Promise<void> {
  const db = client.db(cluster);
  const collection: Collection = db.collection(collectionName);
  await collection.deleteMany({});
}
