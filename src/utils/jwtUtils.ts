import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import lg from "./log";
import { findUser } from "./UserUtils";

interface TokenPayload {
  id: string;
  username: string;
}

interface UserPayload extends JwtPayload {
  id: string;
  username: string;
  __v: number;
}
export enum TokenExpiration {
  Access = 600,
  Refresh = 864000,
  RefreshIfLessThan = 4 * 24 * 60 * 60,
}

// ** v(1) **/
// export function verifyJwt(token: string) {
//   try {
//     const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
//     return {
//       valid: true,
//       expired: false,
//       decoded: decoded,
//     };
//   } catch (error: any) {
//     return {
//       valid: false,
//       expired: error.message === "jwt expired",
//       decoded: null,
//     };
//   }
// }

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as UserPayload;
    if (!decoded) return false;
    const { id } = decoded;
    const user = await findUser(id);
    if (!user) return false;
    return user;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      lg.warning("token expired");
      return "token expired";
    } else {
      lg.error("Token verification failed");
      return "server error";
    }
  }
}

export function singToken(paylod: TokenPayload) {
  return jwt.sign(paylod, process.env.TOKEN_SECRET as string, {
    expiresIn: TokenExpiration.Refresh,
  });
}
