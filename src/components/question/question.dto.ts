import createValidator from '../../helpers/createValidator';

export class QuestionValidator {
  createQuestionValidator  = createValidator(Joi => {
    return {
      title: Joi.string()
      .max(500)
      .error(new Error('Body must not be grater than 500 characters'))
      .required()
      .trim()
      .error(new Error("Title is required")),
      text: Joi.string()
      .required()
      .trim()
      .error(new Error("Text is required")),
    }
  });
}
