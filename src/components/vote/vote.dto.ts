import createValidator from '../../helpers/createValidator';

export class VoteValidator {
  createAnswerValidator  = createValidator(Joi => {
    return {
      vote: Joi.number()
      .required()
      .error(new Error("Vote is required")),
    }
  });
}
