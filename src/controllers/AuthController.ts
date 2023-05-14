import { I_User } from "@/models/User";
import { createUser, findUser, validatePassword } from "@/utils/UserUtils";
// import { verifyJwt } from "@/utils/jwtUtils";
// import lg from "@/utils/log";
import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import {
  TokenExpiration,
  singAccessToken,
  singRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwtUtils";
import lg from "@/utils/log";

const RegisterHandler = async (req: Request<{}, {}, I_User>, res: Response) => {
  try {
    const isExisted = await findUser(req.body.username);
    if (isExisted)
      return res.status(490).json({
        message: "user already exists try login ?!",
      });
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    lg.error(e.message);
    return res.status(409).send(e.message);
  }
};

const LoginHandler = async (req: Request<{}, {}, I_User>, res: Response) => {
  const { username, password } = req.body;
  const user = await validatePassword({ username, password });
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  const paylod = {
    id: user._id as string,
    username: user.username,
  };

  const accessToken = singAccessToken(paylod);
  const refreshToken = singRefreshToken(paylod);

  res.cookie("refreshToken", refreshToken, {
    maxAge: TokenExpiration.Refresh,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  res.json({ accessToken }).status(200);
};

const RefreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
  const user = await verifyRefreshToken(refreshToken);
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  const payload = { id: user._id as string, username: user.username as string };
  const accessToken = singAccessToken(payload);
  return res.json({ accessToken });
};

const LogoutHandler = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  res.json({ message: "logout sucessfly" });
};

export { LoginHandler, RegisterHandler, RefreshToken, LogoutHandler };
