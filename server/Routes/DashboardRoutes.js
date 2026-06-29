import { Router } from "express"
import { getDashboard } from "../controller/dashboardController.js"
import { protect } from "../middleware/auth.js "

const dashboardRouter = Router()

dashboardRouter.get('/', protect, getDashboard)


export default dashboardRouter
