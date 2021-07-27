import { Request, Response, NextFunction, RequestHandler } from 'express';
import httpStatus from 'http-status';
import logger from '../../logger';
import { CurrentUserType } from '../../shared/types/CurrentUser';
import { VoteService } from './vote.service';


export interface IVoteController {
  createVote: RequestHandler,
  downVote: RequestHandler,
}

export function VoteControllerFactory(voteService: VoteService): IVoteController {
  return {

    async createVote(
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<any> {
      const { params, body, user } = req;
    //   console.log(req);
      
    try {
        const vote: any = await voteService.upVote(body.vote, params.answerId, { currentUser: user });
        return res.status(httpStatus.CREATED).json({
          message: 'Answer voted successfully',
          status: 'success',
          statusCode: httpStatus.CREATED,
          data: vote,
        });

      } catch (error) {
        logger.info(error)
        next(error);
      }
    },
  



    async downVote(
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<any> {
      const { params, body, user } = req;
    //   console.log(req);
      
    try {
        const vote: any = await voteService.downVote(body.vote, params.answerId, { currentUser: user });
        return res.status(httpStatus.CREATED).json({
          message: 'Answer voted successfully',
          status: 'success',
          statusCode: httpStatus.CREATED,
          data: vote,
        });

      } catch (error) {
        logger.info(error)
        next(error);
      }
    },
  }
}
