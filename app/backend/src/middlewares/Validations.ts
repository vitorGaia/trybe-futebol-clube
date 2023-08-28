import { NextFunction, Request, Response } from 'express';

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length < 6 || !emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
