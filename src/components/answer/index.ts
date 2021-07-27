
import Guards from '../../shared/guards';
import { AnswerControllerFactory } from './answer.controller';
import { Answer } from './answer.model'
import { AnswerRouter } from './answer.router';
import { AnswerService } from './answer.service';
import { AnswerValidator } from './answer.dto';


export const answerService = new AnswerService(Answer);

export const answerController = AnswerControllerFactory(answerService);

export const answerRouter = AnswerRouter({
  controller: answerController,
  guards: Guards,
  validator: new AnswerValidator()
});
