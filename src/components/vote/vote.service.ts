import { Response } from 'express';
import env from '../../helpers/env';
import { BadRequestError, UnauthorizedError, NotFoundError, ForbiddenError } from '../../errors';
import { Vote } from './vote.model'
import logger from '../../logger';
import { ServiceMethodOptions } from '../../shared/types/ServiceMethodOptions';


export class VoteService {
  constructor(
    private readonly voteModel = Vote
  ) { }



  /**
   * Up a vote on an answer
   */
  async upVote(vote: number = 1, answerId: string, options?: ServiceMethodOptions): Promise<any> {
      
    try {
      logger.info(`Making an upvote`)

      // Confirm if user has already voted
      const existingVote = await this.voteModel.query().findOne({ userId: options.currentUser.id })
        console.log(existingVote);
          console.log('1');
      
      if (!existingVote) {
        let answerVotes = await this.voteModel.query().findOne({ answerId })
          console.log('2');
        
        if (!answerVotes) {
          console.log('Hi');
          
          const votePayload = {
            userId: options.currentUser.id,
            answerId,
            vote: 0
          }
        console.log(votePayload);

          const voteId = await this.voteModel.query().insert(votePayload);
          logger.info(`Upvote done`)
          return this.voteModel.query().findOne(voteId)
        }

        const votePayload = {
          userId: options.currentUser.id,
          vote: answerVotes.vote += vote
        }
        
        const voteId = await this.voteModel.query().insert(votePayload);
        logger.info(`Upvote done`)
        return this.voteModel.query().findOne(voteId)
      }
      return {
        message: "You can't vote more than once"
      }
    } catch (error) {
      if(error.response?.status == 404) {
        throw new NotFoundError("You can't vote on a question that doesnot exist.")
      } 
    }
  }

  /**
   * Down a vote on an answer
   */
  async downVote(vote: number = -1, answerId: string, options?: ServiceMethodOptions): Promise<any> {
      
    try {
      logger.info(`Making downvote`)

      // Confirm if user has already voted
      const existingVote = await this.voteModel.query().findOne({ userId: options.currentUser.id })
        console.log(existingVote);
          console.log('1');
      
      if (!existingVote) {
        let answerVotes = await this.voteModel.query().findOne({ answerId })
          console.log('2');
        
        if (!answerVotes) {
          console.log('Hi');
          
          const votePayload = {
            userId: options.currentUser.id,
            answerId,
            vote: -1
          }

          const voteId = await this.voteModel.query().insert(votePayload);
          logger.info(`Downvote done`)
          return this.voteModel.query().findOne(voteId)
        }

        const votePayload = {
          userId: options.currentUser.id,
          vote: answerVotes.vote -= vote
        }
        
        const voteId = await this.voteModel.query().insert(votePayload);
        logger.info(`Downvote done`)
        return this.voteModel.query().findOne(voteId)
      }
      return {
        message: "You can't vote more than once"
      }
    } catch (error) {
      if(error.response?.status == 404) {
        throw new NotFoundError("You can't vote on a question that doesnot exist.")
      } 
    }
  }
}