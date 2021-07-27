
import { VoteService } from './vote.service';
import { VoteControllerFactory } from './vote.controller';
import { VoteRouter } from './vote.router';
import Guards from '../../shared/guards';



export const voteService = new VoteService();

export const voteController = VoteControllerFactory(voteService);


export const voteRouter = VoteRouter({
  controller: voteController,
  guards: Guards,
});
