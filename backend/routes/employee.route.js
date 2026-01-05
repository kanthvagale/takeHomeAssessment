import express from "express";
import multer from "multer";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  uploadEmployees,
} from "../controllers/employee.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getEmployees);
router.get("/:empId", getEmployee);
router.post("/", createEmployee);
router.put("/:empId", updateEmployee);
router.delete("/:empId", deleteEmployee);

router.post("/upload", upload.single("file"), uploadEmployees);

export default router;
