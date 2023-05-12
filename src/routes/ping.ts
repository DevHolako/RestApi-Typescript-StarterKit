import { Request, Response, Router } from "express";

const router = Router();

router.get("/ping", (req: Request, res: Response) => {
  res.json("pong 🏓").status(200);
});

export const ping = router;
