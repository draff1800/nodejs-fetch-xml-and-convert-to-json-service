import { Router } from 'express';
import { requestHandler } from '../utils/requestHandling/inboundRequests';
import { getAllMakesWithTypes } from '../controllers/vehicleController';

const router = Router();

router.get('/makes', requestHandler(getAllMakesWithTypes));

export default router;
