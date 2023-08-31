import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();
const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getAllHomeLeaderBoards(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.getAllAwayLeaderBoards(req, res),
);

router.get(
  '/',
  (req: Request, res: Response) => leaderBoardController.getAllLeaderBoards(req, res),
);

export default router;
