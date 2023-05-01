import { Request, Response } from 'express';
import { saveAndGetMakesWithTypes } from '../services/vehicleService';

export async function getAllMakesWithTypes(
  req: Request,
  res: Response
): Promise<void> {
  const makesWithTypes = await saveAndGetMakesWithTypes();
  res.json(makesWithTypes);
}
