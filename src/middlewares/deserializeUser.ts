import { verifyJwt } from "@/utils/jwtUtils";
import lg from "@/utils/log";
import { NextFunction, Request, Response } from "express";
export const deserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies.tokens;
  if (!accessToken) return next();
  lg.warning(accessToken);
  const { decoded, expired, valid } = verifyJwt(accessToken);
  if (!decoded) return next();
  res.locals.user = decoded;
  return next();
};
