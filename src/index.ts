import express from 'express';
import schedule from 'node-schedule';
import { createHandler } from 'graphql-http/lib/use/express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import vehicleRoutes from './routes/vehicleRoutes';
import { connectToDB } from './utils/database';
import { refreshMakesWithTypesDB } from './services/vehicleService';
import { resolvers } from './graphql/resolvers';

connectToDB()
  .then(() => {
    const app = express();
    const PORT = process.env.PORT || 3000;
    const typeDefs = readFileSync('./src/graphql/schema.graphql', 'utf-8');
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    app.use('/vehicles', vehicleRoutes);

    app.use(
      '/gql/vehicles/makes',
      createHandler({
        schema
      })
    );

    schedule.scheduleJob('0 0 * * *', refreshMakesWithTypesDB);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
