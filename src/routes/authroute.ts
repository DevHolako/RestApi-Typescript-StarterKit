import {
  LoginHandler,
  LogoutHandler,
  RefreshToken,
  RegisterHandler,
} from "@/controllers/AuthController";
import { createUserSchema } from "@/intrefaces/User";
import validate from "@/middlewares/validateUserReq";
import { Router } from "express";

const AuthRoutes = Router();

AuthRoutes.post("/register", validate(createUserSchema), RegisterHandler);
AuthRoutes.post("/login", LoginHandler);
AuthRoutes.get("/refresh", RefreshToken);
AuthRoutes.post("/logout", LogoutHandler);

export { AuthRoutes };
