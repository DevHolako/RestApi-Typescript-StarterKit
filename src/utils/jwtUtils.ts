import { I_User, UserModel } from "@/models/User";
import jwt from "jsonwebtoken";
import { get, omit } from "lodash";

interface TokenPayload {
  id: string;
  username: string;
}
export enum TokenExpiration {
  Access = 5 * 60,
  Refresh = 7 * 24 * 60 * 60,
  RefreshIfLessThan = 4 * 24 * 60 * 60,
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    return {
      valid: true,
      expired: false,
      decoded: decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}

export async function verifyRefreshToken(token: string) {
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
  if (!decoded) return false;

  const user = await UserModel.findOne({ username: get(decoded, "username") });
  if (!user) return false;
  return user;
}

export function singAccessToken(paylod: TokenPayload) {
  return jwt.sign(paylod, process.env.TOKEN_SECRET as string, {
    expiresIn: TokenExpiration.Access,
  });
}

export function singRefreshToken(paylod: TokenPayload) {
  return jwt.sign(paylod, process.env.TOKEN_SECRET as string, {
    expiresIn: TokenExpiration.Refresh,
  });
}
