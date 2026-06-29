import { Router } from "express";
import { createLeave, getLeaves, updateLeaves } from "../controller/leaveController.js";
import { protect, protectAdmin } from "../middleware/auth.js";


const leaveRouter = Router()

leaveRouter.post('/', protect, createLeave)
leaveRouter.get('/', protect, getLeaves)
leaveRouter.patch('/:id', protect, protectAdmin, updateLeaves)


export default leaveRouter
