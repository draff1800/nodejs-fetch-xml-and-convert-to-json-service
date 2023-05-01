import { saveAndGetMakesWithTypes } from '../services/vehicleService';

export const resolvers = {
  Query: {
    makes: async () => {
      const makesWithTypes = await saveAndGetMakesWithTypes();
      return makesWithTypes;
    }
  }
};
