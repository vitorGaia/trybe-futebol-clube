import { Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UserController();
const router = Router();

router.get(
  '/role',
  (req, res) => userController.findByToken(req, res),
);

router.post(
  '/',
  Validations.validateLogin,
  (req, res) => userController.login(req, res),
);

export default router;
