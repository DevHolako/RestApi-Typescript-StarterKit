import { Error } from "@/intrefaces/error";
import lg from "@/utils/log";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  lg.error(error.stack);
  res
    .status(error.status || 500)
    .json(error.message || "Woops!! somethings went wrong");
};
