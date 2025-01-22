import express from "express";
import {
  getPatientById,
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../controllers/PatientController.js";
const router = express.Router();

router.get("/patients", getPatients);
router.get("/patients/:id", getPatientById);
router.post("/patients", createPatient);
router.patch("/patients/:id", updatePatient);
router.delete("/patients/:id", deletePatient);

export default router;
