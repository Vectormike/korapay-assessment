import { Router } from "express";
import { IAnswerController } from "./answer.controller";
import { ComponentRouterOptions } from '../../shared/types/ComponentRouterOptions';
import { AnswerValidator } from "./answer.dto";

export function AnswerRouter(options: ComponentRouterOptions<IAnswerController, AnswerValidator>): Router {
    const { controller, guards, validator } = options;
    const router = Router();

    /**
     * @fetchFilms - fetch answers
     */
    router.get("/",guards.AuthGuard({ strict: true }), controller.fetchAnswers);

    router.route("/:questionId")
    .post(validator.createAnswerValidator.validate, guards.AuthGuard({ strict: true }), controller.createAnswer)

    return router;
}
