import Joi from "joi";
import { RoleModel } from "./role-model";
import { ValidationError } from "./client-errors";

export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: RoleModel;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }
  private static userValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    firstName: Joi.string().required().min(2).max(35),
    lastName: Joi.string().required().min(2).max(35),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(256),
    roleId: Joi.forbidden(),
  });
  public userValidate(): void {
    const result = UserModel.userValidationSchema.validate(this);
    if (result.error?.message) throw new ValidationError(result.error.message);
  }
}
