//* imports  */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "@/models/db";
import { AuthRoutes } from "@/routes/authroute";
import { healthCheckRoutes } from "@/routes/apicheck";

//* app & middlewares */
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//* starting the app & the db connenction */
app.listen(process.env.PORT, () => {
  console.log(`app is runing ~ 🚀 on PORT : ${process.env.PORT}`);
  connect();
});

//* routes */
app.use(healthCheckRoutes);
app.use("/api", AuthRoutes);
