import express from 'express';
import vehicleRoutes from './routes/vehicleRoutes';
import { connectToDB } from './utils/database';

connectToDB()
  .then(() => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use('/vehicles', vehicleRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
