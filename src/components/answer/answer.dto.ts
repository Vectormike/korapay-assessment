import createValidator from '../../helpers/createValidator';

export class AnswerValidator {
  createAnswerValidator  = createValidator(Joi => {
    return {
      text: Joi.string()
      .required()
      .trim()
      .error(new Error("Text body is required")),
    }
  });
}
