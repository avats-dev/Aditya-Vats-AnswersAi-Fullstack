import express from 'express';
import { authController } from '../../controllers';

const initAuthRoutes = () => {
  const authRoutes = express.Router();

  authRoutes.post('/login', authController.loginUser);
  authRoutes.post('/logout', authController.logoutUser);
  authRoutes.post('/refresh', authController.loginUser);

  return authRoutes;
};

export default initAuthRoutes;
