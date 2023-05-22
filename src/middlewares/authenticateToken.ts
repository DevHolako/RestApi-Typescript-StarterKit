import { verifyToken } from "@/utils/jwtUtils";
import lg from "@/utils/log";
import { NextFunction, Request, Response } from "express";
const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jwt } = req.cookies;
  lg.warning(jwt);
  if (!jwt) return res.sendStatus(403);
  const user = await verifyToken(jwt);
  if (!user) return res.sendStatus(403);
  res.locals.user = user;
  res.locals.jwt = jwt;
  next();
};

export { authenticateToken };
