import {
  LoginHandler,
  LogoutHandler,
  // RefreshToken,
  RegisterHandler,
} from "@/controllers/AuthController";
import { Router } from "express";

const AuthRoutes = Router();

AuthRoutes.post("/register", RegisterHandler);
AuthRoutes.post("/login", LoginHandler);
// AuthRoutes.get("/refresh", RefreshToken);
AuthRoutes.post("/logout", LogoutHandler);

export { AuthRoutes };
