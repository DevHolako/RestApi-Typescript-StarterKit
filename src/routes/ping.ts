import { Request, Response, Router } from "express";

const router = Router();

router.get("/ping", (_req: Request, res: Response) => {
  res.json({ message: "pong 🏓" });
});

export const ping = router;
