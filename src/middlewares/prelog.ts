import lg from "@/utils/log";
import { NextFunction, Request, Response } from "express";
import req_ip from "request-ip";

declare module "express" {
  interface Response {
    body?: any;
  }
}

export const prelog = (req: Request, res: Response, next: NextFunction) => {
  const ip = req_ip.getClientIp(req);
  lg.info(
    `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${ip}]`
  );
  const originalSend = res.send;

  res.send = function (body?: any): Response<any> {
    res.body = body; // Populate res.body with the response body
    return originalSend.apply(res, arguments as any) as Response<any>;
  };

  res.on("finish", () => {
    /** Log the res */
    lg.info(
      `Result - METHOD: [${req.method}] - URL: [${
        req.url
      }] - IP: [${ip}] - STATUS: [${res.statusCode}] - Response : ${
        res ? res.body : "no message was sent"
      }`
    );
  });

  next();
};
