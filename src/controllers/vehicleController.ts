import { Request, Response } from 'express';
import { getMakesWithTypes } from '../services/vehicleService';

export async function getAllMakesWithTypes(
  req: Request,
  res: Response
): Promise<void> {
  const makesWithTypes = await getMakesWithTypes();
  res.json(makesWithTypes);
}
