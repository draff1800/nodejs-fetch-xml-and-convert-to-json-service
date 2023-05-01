import express from 'express';
import schedule from 'node-schedule';
import vehicleRoutes from './routes/vehicleRoutes';
import { connectToDB } from './utils/database';
import { saveAndGetMakesWithTypes } from './services/vehicleService';

connectToDB()
  .then(() => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use('/vehicles', vehicleRoutes);

    schedule.scheduleJob('0 0 * * *', saveAndGetMakesWithTypes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
