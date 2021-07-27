import { Response } from 'express';
import { BadRequestError, UnauthorizedError, NotFoundError, ForbiddenError } from '../../errors';
import { Question } from './question.model'
import { ServiceMethodOptions } from '../../shared/types/ServiceMethodOptions';
import logger from '../../logger';
import { redisClient } from '../../redis.connection';



export class SubscriptionService {
  constructor(
    private readonly questionModel = Question
  ) { }

  async subscribeToQuestion(questionId: string): Promise<any> {
    try {
      const answers = await this.questionModel.query().findOne(questionId)

      redisClient.subscribe('answer-notify')
      return answers
    } catch (error) {
      logger.info(JSON.stringify(error))
      throw new BadRequestError('Unable to subscribe.')
    }
  }
}