import { getMakesWithTypes } from '../services/vehicleService';

export const resolvers = {
  Query: {
    makes: async () => {
      const makesWithTypes = await getMakesWithTypes();
      return makesWithTypes;
    }
  }
};
