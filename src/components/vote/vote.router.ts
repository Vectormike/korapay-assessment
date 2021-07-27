import { Router } from "express";
import { ComponentRouterOptions } from '../../shared/types/ComponentRouterOptions';
import { IVoteController } from "./vote.controller";
import { VoteValidator } from "./vote.dto";

export function VoteRouter(options: ComponentRouterOptions<IVoteController, VoteValidator>): Router {
    const { controller, guards } = options;
    const router = Router();

    /**
     * @createAnswer - create voting
     */
    router.route("/:answerId")
    .post(guards.AuthGuard({ strict: true }), controller.createVote)
    .post(guards.AuthGuard({ strict: true }), controller.downVote)

    return router;
}
