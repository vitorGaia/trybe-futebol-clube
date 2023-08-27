import { Router } from 'express';
import teamsRouter from './Team.routes';
import usersRouter from './Login.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);

export default router;
