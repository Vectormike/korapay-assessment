
import { Router } from "express";
import env from './helpers/env';
import { authRouter } from "./components/auth";
import { answerRouter } from "./components/answer";
import { questionRouter } from "./components/question";
import { voteRouter } from "./components/vote";



const router = Router();

router.get("/", (req, res) => {
  return res.status(200).send({
    message: "Welcome to Stackoverflow",
  });
});

router.get("/welcome", (req, res) => {
  return res.status(200).send({
    message: "Welcome to Stackoverflow",
  });
});

router.use('/api/answers', answerRouter);
router.use('/api/auth', authRouter);
router.use('/api/questions', questionRouter);
router.use('/api/vote', voteRouter);


export default router;


