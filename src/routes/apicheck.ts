import { Request, Response, Router } from "express";

const healthCheckRoutes = Router();

healthCheckRoutes.get("/", (req: Request, res: Response) => {
  res.send("Api is working fine 🚀✅");
});

export { healthCheckRoutes };
