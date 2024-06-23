import express from 'express';
import verifyToken from '../../middlewares';
import initAuthRoutes from './authRoutes';
import initUserRoutes from './userRoutes';
import initQuestionRoutes from './questionRoutes';


const initApiRoutes = () => {
  const Router = express.Router();

  Router.use('/questions', verifyToken, initQuestionRoutes());
  Router.use('/users', initUserRoutes());
  Router.use('/auth', initAuthRoutes());
  return Router;
};

export default initApiRoutes;
