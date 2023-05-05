//* imports  */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//* app & middlewares */
const app = express();
app.use(cors());
app.use(express.json());

//* starting the app & the db connenction */
app.listen(3000, () => {
  console.log("app is runing ~ 🚀");
});

//* routes */
