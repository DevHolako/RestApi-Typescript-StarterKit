import { verifyJwt } from "@/utils/jwtUtils";
import { NextFunction, Request, Response } from "express";
const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  const { decoded } = verifyJwt(token);
  if (!decoded) return res.sendStatus(401);
  res.locals.user = decoded;
  next();
};

export { authenticateToken };
