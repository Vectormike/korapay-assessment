"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./components/auth");
var answer_1 = require("./components/answer");
var question_1 = require("./components/question");
var vote_1 = require("./components/vote");
var router = express_1.Router();
router.get("/", function (req, res) {
    return res.status(200).send({
        message: "Welcome to Stackoverflow",
    });
});
router.get("/welcome", function (req, res) {
    return res.status(200).send({
        message: "Welcome to Stackoverflow",
    });
});
router.use('/api/answers', answer_1.answerRouter);
router.use('/api/auth', auth_1.authRouter);
router.use('/api/questions', question_1.questionRouter);
router.use('/api/vote', vote_1.voteRouter);
exports.default = router;
//# sourceMappingURL=routes.js.map