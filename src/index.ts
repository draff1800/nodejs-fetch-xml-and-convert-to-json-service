import express from 'express';
import fs from 'fs';
import { fetchMakesAsJSON, fetchTypesAsJSON } from './services/xmlService';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const makes = await fetchMakesAsJSON();
    const types = await fetchTypesAsJSON(makes[0].Make_ID);

    fs.writeFileSync('makes.json', JSON.stringify(makes, null, 2));
    fs.writeFileSync('types.json', JSON.stringify(types, null, 2));
  } catch (error) {
    console.error('Error fetching and parsing data:', error);
  }
});
