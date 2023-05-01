import express from 'express';
import { getMakesWithTypes } from './services/vehicleApiService';
import { connectToDB, saveToDB } from './utils/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  const dbClient = await connectToDB();
  console.log(`Server is running on port ${PORT}`);

  try {
    const makesWithTypes = await getMakesWithTypes();
    saveToDB(dbClient, 'makesWithTypes', makesWithTypes);
  } catch (error) {
    console.error('Error fetching and parsing data:', error);
  }
});
