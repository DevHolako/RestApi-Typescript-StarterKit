import { I_User } from "@/models/User";
import { createUser, findUser, validatePassword } from "@/utils/UserUtils";
import { Request, Response } from "express";
import { TokenExpiration, singToken } from "@/utils/jwtUtils";
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
  const jwt = singToken(paylod);

  res.cookie("jwt", jwt, {
    httpOnly: true,
    maxAge: TokenExpiration.Refresh * 1000,
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ user: paylod }).status(200);
};

const LogoutHandler = async (req: Request, res: Response) => {
  const { jwt } = req.cookies;
  if (!jwt) return res.status(401);
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "logout sucessfly" });
};

export { LoginHandler, RegisterHandler, LogoutHandler };
