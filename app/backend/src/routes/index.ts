import { Router } from 'express';
import teamsRouter from './Team.routes';
import usersRouter from './Login.routes';

const router = Router();

router.use('/login', usersRouter);
router.use('/teams', teamsRouter);

export default router;
