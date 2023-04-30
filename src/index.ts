import express from 'express';
import fs from 'fs';
import {
  fetchAndParseMakes
  // fetchAndParseVehicleTypes
} from './services/xmlService';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const makes = await fetchAndParseMakes();
    fs.writeFileSync('makes.json', JSON.stringify(makes, null, 2));

    // const types = await fetchAndParseVehicleTypes(makes[0].Make_ID);
    // fs.writeFileSync('types.json', String(makes));
  } catch (error) {
    console.error('Error fetching and parsing data:', error);
  }
});
