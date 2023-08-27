import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
