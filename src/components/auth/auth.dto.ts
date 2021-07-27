import createValidator, { IValidator } from '../../helpers/createValidator';

export class AuthValidator {
    CreateAccountDto = createValidator((Joi) => {
        return {
            username: Joi.string()
              .required()
              .trim()
              .error(new Error("Username is required")),
            password: Joi.string()
              .required()
              .error(new Error("Password is required")),
          }
    });

    LoginDto = createValidator((Joi) => {
        return {
            username: Joi.string()
              .required()
              .trim()
              .error(new Error("Username is required")),
            password: Joi.string()
              .required()
              .error(new Error("Password is required")),
        }
    });

    ChangePasswordDto = createValidator((Joi) => {
        return {
            password: Joi.string()
              .required()
              .trim()
              .error(new Error("Please enter a valid password")),
        }
    });

    RefreshTokenDto = createValidator((Joi) => {
      return {
          refreshToken: Joi.string()
            .required()
            .trim()
            .error(new Error("Refresh token is required")),
      }
  });

}
