
import Guards from '../../shared/guards';
import { QuestionControllerFactory } from './question.controller';
import { QuestionRouter } from './question.router';
import { QuestionService } from './question.service';



export const questionService = new QuestionService();

export const questionController = QuestionControllerFactory(questionService);

export const questionRouter = QuestionRouter({
  controller: questionController,
  guards: Guards,
});
