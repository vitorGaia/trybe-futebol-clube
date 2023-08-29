import { Router } from 'express';
import teamsRouter from './Team.routes';
import usersRouter from './Login.routes';
import matchesRouter from './Match.routes';

const router = Router();

router.use('/login', usersRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
