import { Request, Response, NextFunction, RequestHandler } from 'express';
import httpStatus from 'http-status';
import logger from '../../logger';
import { CurrentUserType } from '../../shared/types/CurrentUser';
import { QuestionService } from './question.service';


export interface IQuestionController {
  fetchQuestions: RequestHandler,
  createQuestion: RequestHandler,
  subscribeToQuestion: RequestHandler
}

export function QuestionControllerFactory(questionService: QuestionService): IQuestionController {
  return {
  
    /**
     * Fetch stackeroverflow
     */
    async fetchQuestions(
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<any> {
      try {
        const { query: { orderBy, order } }: any = req;
        console.log({ orderBy, order })
        const questions = await questionService.fetchQuestions();
        logger.info(JSON.stringify(questions))
        return res.status(httpStatus.OK).json({
          message: 'Questions successfully fetched',
          status: 'success',
          statusCode: httpStatus.OK,
          data: questions,
        });
      } catch (error) {
        logger.info(JSON.stringify(error))
        next(error);
      }
    },

    /**
     * Create stackeroverflow
     */
    async createQuestion(
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<any> {
      try {
        const { body, user } = req;
        const questions = await questionService.createQuestions(body, { currentUser: user });
        logger.info(JSON.stringify(questions))
        return res.status(httpStatus.OK).json({
          message: 'Questions successfully created',
          status: 'success',
          statusCode: httpStatus.CREATED,
          data: questions,
        });
      } catch (error) {
        logger.info(JSON.stringify(error))
        next(error);
      }
    },

    /**
      * Subscribe to stackoverflow question
      */
    async subscribeToQuestion(
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<any> {
      try {
        const { params }: any = req;
        const questions = await questionService.subscribeToQuestion(params.questionId);
        logger.info(JSON.stringify(questions))
        return res.status(httpStatus.OK).json({
          message: 'Questions subscribed',
          status: 'success',
          statusCode: httpStatus.OK,
        });
      } catch (error) {
        logger.info(JSON.stringify(error))
        next(error);
      }
    },
  }
} 
