import { I_User, UserModel } from "@/models/User";
import jwt from "jsonwebtoken";
import { get, omit } from "lodash";
import lg from "./log";
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

  const sanitizedUser = omit(user.toObject(), "password");
  console.log(sanitizedUser);
  return sanitizedUser;
}
