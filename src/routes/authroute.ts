import { LoginHandler, RegisterHandler } from "@/controllers/AuthController";
import { createUserSchema } from "@/intrefaces/User";
import validate from "@/middlewares/validateUserReq";
import { Router } from "express";

const AuthRoutes = Router();

AuthRoutes.post("/login", LoginHandler);
AuthRoutes.post("/register", validate(createUserSchema), RegisterHandler);

export { AuthRoutes };
