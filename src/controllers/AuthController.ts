import { CreateUserInput } from "@/intrefaces/User";
import { I_User } from "@/models/User";
import { createUser, findUser, validatePassword } from "@/utils/UserUtils";
// import { verifyJwt } from "@/utils/jwtUtils";
// import lg from "@/utils/log";
import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { verifyRefreshToken } from "@/utils/jwtUtils";
import { omit } from "lodash";

const RegisterHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    const isExisted = await findUser(req.body.username);
    if (isExisted)
      return res.status(490).json({
        message: "user already exists try login ?!",
      });
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    console.log(e);
    return res.status(409).send(e.message);
  }
};

const LoginHandler = async (req: Request<{}, {}, I_User>, res: Response) => {
  const { username, password } = req.body;
  const user = await validatePassword({ username, password });
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  const accessToken = JWT.sign(
    { ...user },
    process.env.TOKEN_SECRET as string,
    {
      expiresIn: "10m",
    }
  );

  const refreshToken = JWT.sign(
    { ...user },
    process.env.TOKEN_SECRET as string,
    { expiresIn: "15d" }
  );

  res.cookie("jwt", refreshToken, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  res.json({ accessToken }).status(200);
};

const RefreshToken = async (req: Request, res: Response) => {
  const { jwt } = req.cookies;
  if (!jwt) return res.status(401).json({ message: "Unauthorized" });
  const user = await verifyRefreshToken(jwt);
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  const accessToken = JWT.sign(
    { ...user },
    process.env.TOKEN_SECRET as string,
    { expiresIn: "10m" }
  );
  return res.json({ accessToken });
};

const LogoutHandler = async (req: Request, res: Response) => {
  const { jwt } = req.cookies;
  if (!jwt) return res.status(401).json({ message: "Unauthorized" });
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
  res.json({ message: "logut sucessfly" });
};

export { LoginHandler, RegisterHandler, RefreshToken, LogoutHandler };
