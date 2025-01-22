import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import PatientRoute from "./routes/PatientRoute.js";
import DoctorRoute from "./routes/DoctorRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(PatientRoute);
app.use(DoctorRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
