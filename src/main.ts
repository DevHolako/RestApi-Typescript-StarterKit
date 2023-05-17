//* imports  */
import express, { Request, Response } from "express";
import lg from "@/utils/log";
//** routes imposrts */
import mongoose from "mongoose";
import { AuthRoutes } from "@/routes/authroute";
import { ping } from "@/routes/ping";
//* middlewats imports */
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { prelog } from "@/middlewares/prelog";
import { errorHandler } from "@/middlewares/errors";
import { authenticateToken } from "@/middlewares/authenticateToken";
import { notfound } from "@/middlewares/notefound";
import cookieParser from "cookie-parser";
import { requestLimter } from "@/middlewares/requestLimiter";

dotenv.config();
const app = express();
//** connect to db *//
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    lg.info("🚀✅ - database connected");
    StartServer();
  })
  .catch((e) => lg.error(e));

/** Start Server  */
const StartServer = () => {
  //* starting the app  */
  app.listen(process.env.PORT, () => {
    lg.info(`app is runing ~ 🚀 on PORT : ${process.env.PORT}`);
  });

  //*  middlewares *//
  // app.use(deserializeUser);
  app.use(cookieParser());
  app.use(prelog);
  app.use(helmet());
  lg.info(`env => ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === "development") {
    app.use(
      cors({
        origin: process.env.FRONTEND_URL as string,
        credentials: true,
      })
    );
  } else {
    app.use(
      cors({
        origin: (origin, callback) => {
          if (origin === (process.env.FRONTEND_URL as string)) {
            callback(null, true);
          }
          callback(new Error("Not Allowed By cores"));
        },
        credentials: true,
      })
    );
  }
  app.use(express.json());
  app.use(requestLimter);
  //* middlewares *//

  //*  routes *//
  app.get("/", (_req: Request, res: Response) => {
    res.json({ message: "use /api to access this" });
  });

  app.get("/protected", authenticateToken, (_req: Request, res: Response) => {
    const userInfo = res.locals.user;
    res.json(userInfo);
  });
  app.use(ping);
  app.use("/api", AuthRoutes);
  //*  routes *//

  /** Error  handling */
  app.use(notfound);
  app.use(errorHandler);
};
