import { LoginHandler, RegisterHandler } from "@/controllers/AuthController";
import { createUserSchema } from "@/intrefaces/User";
import validate from "@/middleware/validateUserReq";
import { Router } from "express";

const router = Router();

router.post("/login", LoginHandler);
router.post("/register", validate(createUserSchema), RegisterHandler);

export default router;
