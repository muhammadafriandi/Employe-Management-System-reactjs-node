import Router from "express"
import { protect } from "../middleware/auth"
import { clockInOut, getAttendance } from "../controller/attendanceController"


const attendanceRouter = Router()

attendanceRouter.post('/', protect, clockInOut)
attendanceRouter.get('/', protect, getAttendance)


export default attendanceRouter
