import { verifyToken } from "@/utils/jwtUtils";
import { NextFunction, Request, Response } from "express";
const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jwt } = req.cookies;
  if (!jwt) return res.sendStatus(403);
  const user = await verifyToken(jwt);
  console.log(user);
  if (!user) return res.sendStatus(403);
  res.locals.user = user;
  console.log(user);
  next();
};

export { authenticateToken };
