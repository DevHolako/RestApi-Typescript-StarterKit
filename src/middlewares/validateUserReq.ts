import { Request, Response, NextFunction } from "express";

const validate = (req: Request, _res: Response, next: NextFunction) => {
  const {} = req.body;
};

export default validate;
