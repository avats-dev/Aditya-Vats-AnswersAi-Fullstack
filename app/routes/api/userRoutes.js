import express from 'express';
import { userController } from '../../controllers';
import verifyToken from '../../middlewares';

const initUserRoutes = () => {
  const userRoutes = express.Router();

  userRoutes.post('/', userController.createUser);
  userRoutes.get('/:userId', verifyToken, userController.getUser);
  userRoutes.get('/:userId/questions', verifyToken, userController.getUserQuestions)

  return userRoutes;
};

export default initUserRoutes;
