import { Error } from "@/intrefaces/error";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res
    .status(error.status || 500)
    .json(error.message || "Woops!! somethings went wrong");
};
