import express from "express";
import {
  getDoctorById,
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/DoctorController.js";
const router = express.Router();

router.get("/doctors", getDoctors);
router.get("/doctors/:id", getDoctorById);
router.post("/doctors", createDoctor);
router.patch("/doctors/:id", updateDoctor);
router.delete("/doctors/:id", deleteDoctor);

export default router;
