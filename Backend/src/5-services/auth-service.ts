import { OkPacketParams } from "mysql2";
import { CredentialsModel } from "../3-models/credentials-model";
import { RoleModel } from "../3-models/role-model";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";

class AuthService {
  public async register(user: UserModel): Promise<string> {
    user.userValidate();
    const isTaken = await this.isEmailTaken(user.email);
    if (isTaken) throw new ValidationError("Email is already taken.");
    user.password = cyber.hashPassword(user.password);
    user.roleId = RoleModel.User;
    const sql =
      "INSERT INTO users (firstName,lastName,email,password,roleId) VALUES(?,?,?,?,?)";
    const values = [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roleId,
    ];
    const info: OkPacketParams = await dal.execute(sql, values);
    user.id = info.insertId;
    const token = cyber.getNewToken(user);
    return token;
  }

  public async login(credentials: CredentialsModel): Promise<string> {
    credentials.credentialsValidate();
    credentials.password = cyber.hashPassword(credentials.password);
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const values = [credentials.email, credentials.password];
    const users = await dal.execute(sql, values);
    const user = users[0];
    if (!user) throw new UnauthorizedError("Incorrect email or password.");
    const token = cyber.getNewToken(user);
    return token;
  }
  private async isEmailTaken(email: string): Promise<boolean> {
    const sql = `SELECT email FROM users WHERE email = '${email}'`;
    const users = await dal.execute(sql);
    if (users.length === 0) {
      return false;
    }
    return true;
  }
}

export const authService = new AuthService();
