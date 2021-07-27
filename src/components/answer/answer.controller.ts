import { Request, Response, NextFunction, RequestHandler, query } from 'express';
import httpStatus from 'http-status';
import logger from '../../logger';
import { CurrentUserType } from '../../shared/types/CurrentUser';
import { AnswerService } from './answer.service';


export interface IAnswerController {
  fetchAnswers: RequestHandler,
  createAnswer: RequestHandler,
}

export function AnswerControllerFactory(answerService: AnswerService): IAnswerController {
  return {
    /**
     * Fetch all films
     */
    async fetchAnswers(
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<any> {
      try {
        const { params }: any = req;
        const answers = await answerService.fetchAnswers(params.answerId);
        logger.info(JSON.stringify(answers))
        return res.status(httpStatus.OK).json({
          message: 'Answer successfully fetched',
          status: 'success',
          statusCode: httpStatus.OK,
          data: answers,
        });
      } catch (error) {
        logger.info(error)
        next(error);
      }
    },

    /**
     * create comment on film
     */
    async createAnswer(
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<any> {
      const { params, body, user } = req;
      // console.log(req);
      
      try {
        const answer: any = await answerService.createAnswer(params.questionId, body, { currentUser: user });
        return res.status(httpStatus.CREATED).json({
          message: 'Question answered successfully',
          status: 'success',
          statusCode: httpStatus.CREATED,
          data: answer,
        });

      } catch (error) {
        logger.info(error)
        next(error);
      }
    },
  }
}
