import express from 'express';
import { questionController } from '../../controllers';

const initQuestionRoutes = () => {
  const questionRoutes = express.Router();

  questionRoutes.post('/', questionController.genAns);
  questionRoutes.get('/:questionId', questionController.getQue);

  return questionRoutes;
};

export default initQuestionRoutes;
