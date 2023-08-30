import { Router } from 'express';
import teamsRouter from './Team.routes';
import usersRouter from './Login.routes';
import matchesRouter from './Match.routes';
import leaderBoardsRouter from './LeaderBoard.routes';

const router = Router();

router.use('/login', usersRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardsRouter);

export default router;
