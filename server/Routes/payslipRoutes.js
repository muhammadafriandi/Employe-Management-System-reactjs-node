import { Router } from "express"
import { createPayslip, getPayslipById } from "../controller/payslipController.js"
import { protect, protectAdmin } from "../middleware/auth.js"

const payslipRouter = Router()

payslipRouter.post("/", protect, protectAdmin, createPayslip)
payslipRouter.get("/", protect, getPayslipById)
payslipRouter.get("/:id", getPayslipById)

export default payslipRouter
