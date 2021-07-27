import { NextFunction, Response } from 'express';
import env from '../../helpers/env';
import { BadRequestError, UnauthorizedError, NotFoundError, ForbiddenError } from '../../errors';
import { Question } from './question.model'
import { CreateQuestionInput } from './question.input';
import { ServiceMethodOptions } from '../../shared/types/ServiceMethodOptions';
import { redisClient } from '../../redis.connection';
import logger from '../../logger';


export class QuestionService {
  constructor(
    private readonly questionModel = Question
  ) { }
  /**
   * Fetch questions 
   * 
   */
  async fetchQuestions(): Promise<any> {

    logger.info(`fetch questions`)

    // Check Cache
     return new Promise((resolve, reject) => {
        logger.info("Checking Questions in cache")
        redisClient.GET(`questions`, async (err, result) => {
          logger.info("Internal Server Error")
          if (err) {
            logger.info("Internal Server Error")
            reject(Error("Internal Server Error"));
          }
          if (result) {
            logger.info("questions gotten from cache")
            resolve(JSON.parse(result));
          } else {
            logger.info("Fetch questions from DB")
            const questions = this.questionModel.query().select('title', 'text');
              redisClient.SET(
                'questions',
                JSON.stringify(questions),
                "EX",
                365 * 24 * 60 * 60,
                (err, reply) => {
  
                  if (err) {
                    logger.info("Internal Server Error")
                    reject(new Error("Internal Server Error"));
                  }
                  resolve(questions);
                }
              );
            }
          }
        );
      }).then(async (data: any) => {
       const questions = data
       return questions
      })
  }


  /**
   * Create questions
   * 
   */
  async createQuestions(payload: CreateQuestionInput, options?: ServiceMethodOptions): Promise<any> {
    try {
       const questionPayload ={
        title: payload.title,
        text: payload.text,
        author_id: options.currentUser.id,
      }
      const questionId = await this.questionModel.query().insert(questionPayload)
      return this.questionModel.query().findOne(questionId)
    } catch (error) {
      logger.info(JSON.stringify(error))
      throw error; 
    }
  }

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