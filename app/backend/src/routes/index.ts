import { Router } from 'express';
import teamsRouter from './TeamRoutes.routes';

const router = Router();

router.use('/teams', teamsRouter);

export default router;
