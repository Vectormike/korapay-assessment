import { Router } from "express";
import { IQuestionController } from "./question.controller";
import { ComponentRouterOptions } from '../../shared/types/ComponentRouterOptions';


export function QuestionRouter(options: ComponentRouterOptions<IQuestionController, {}>): Router {
    const { controller, guards, validator } = options;
    const router = Router();

    /**
     * @fetchFilms - fetch films
     */

    router.route("/")
    .get(guards.AuthGuard({ strict: true }), controller.fetchQuestions)
    .post(guards.AuthGuard({ strict: true }), controller.createQuestion)
    router.route('/:questionId').get(guards.AuthGuard({strict: true}), controller.subscribeToQuestion)

    return router;
}
