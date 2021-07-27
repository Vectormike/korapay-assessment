import { Response } from 'express';
import env from '../../helpers/env';
import { BadRequestError, UnauthorizedError, NotFoundError, ForbiddenError } from '../../errors';
import apiRequest from "../../helpers/axios"
import { Answer } from './answer.model'
import { Question } from '../question/question.model'
import { CreateAnswerInput } from './answer.input';
import { ServiceMethodOptions } from '../../shared/types/ServiceMethodOptions';
import logger from '../../logger';
import { redisClient } from '../../redis.connection';



export class AnswerService {
  constructor(
    private readonly answerModel = Answer,
    private readonly questionModel = Question
  ) { }

  /**
   * fetch Answer
   */
  async fetchAnswers(questionId: string): Promise<any> {
    try {
      const answers = await this.questionModel.query().findOne(questionId)
      return answers
    } catch (error) {
      logger.info(JSON.stringify(error))
      throw new BadRequestError('Unable to fetch Answer')
    }
  }

   /**
   * Create answers
   * 
   */
  async createAnswer(questionId: string, payload: CreateAnswerInput, options?: ServiceMethodOptions): Promise<any> {
    try {
       const answerPayload ={
        text: payload.text,
        author_id: options.currentUser.id,
        question_id: questionId,
       }
      
      const answerId = await this.answerModel.query().insert(answerPayload)
      
      await this.questionModel.query().insert({
        answer_id: answerId.id
      })

      redisClient.publish('answer-notify', JSON.stringify(answerId))

      return this.answerModel.query().findOne(answerId)
    } catch (error) {
      logger.info(JSON.stringify(error))
      throw error; 
    }
     
  }

  /**
  * Remove answers
  * 
  */
  async removeAnswer(answerId: string): Promise<any> {
    try {
      return this.answerModel.query().where({ id: answerId }).del()
    } catch (error) {
      logger.info(JSON.stringify(error))
      throw error; 
    }
     
  }
}