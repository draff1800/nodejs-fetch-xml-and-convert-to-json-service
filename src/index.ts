import express from 'express';
import fs from 'fs';
import { getMakesWithTypes } from './services/vehicleApiService';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const makesWithTypes = await getMakesWithTypes();
    fs.writeFileSync(
      'makesWithTypes.json',
      JSON.stringify(makesWithTypes, null, 2)
    );
  } catch (error) {
    console.error('Error fetching and parsing data:', error);
  }
});
