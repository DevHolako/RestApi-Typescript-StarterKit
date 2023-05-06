//* imports  */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AuthRoutes } from "@/routes/authroute";
import { ping } from "@/routes/ping";
import mongoose from "mongoose";
import lg from "./utils/log";
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
  //*  middlewares *//
  /** Log the request */
  app.use((req, res, next) => {
    /** Log the req */
    lg.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the res */
      lg.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(cors());
  app.use(express.json());
  //* middlewares *//

  //* routes */
  app.use(ping);
  app.use("/api", AuthRoutes);
  /** Error handling */
  app.use((req, res, next) => {
    const error = new Error("Not found");
    lg.error(error);
    res.status(404).json({
      message: error.message,
    });
  });
  //* starting the app  */
  app.listen(process.env.PORT, () => {
    lg.info(`app is runing ~ 🚀 on PORT : ${process.env.PORT}`);
  });
};
