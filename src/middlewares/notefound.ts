import { NextFunction, Request, Response } from "express";

export const notfound = (_req: Request, res: Response, next: NextFunction) => {
  const error = new Error("route Not found");
  res.status(404).json({
    message: error.message,
  });
  next();
};
