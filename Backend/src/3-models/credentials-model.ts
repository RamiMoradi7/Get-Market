import Joi from "joi";
import { ValidationError } from "./client-errors";

export class CredentialsModel {
  public email: string;
  public password: string;

  public constructor(credentials: CredentialsModel) {
    this.email = credentials.email;
    this.password = credentials.password;
  }

  private static credentialsValidationSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(256),
  });

  public credentialsValidate(): void {
    const result = CredentialsModel.credentialsValidationSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
}
