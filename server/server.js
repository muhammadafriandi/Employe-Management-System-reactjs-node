import express from "express"
import cors from "cors"
import "dotenv/config"
import multer from "multer"
import authRouter from "./Routes/authRoutes.js"
import employeeRouter from "./Routes/employeeRoutes.js"
import profileRouter from "./Routes/profileRoutes.js"
import attendanceRouter from "./Routes/attendanceRoutes.js"
import leaveRouter from "./Routes/leaveRouter.js"
import payslipRouter from "./Routes/payslipRoutes.js"
import dashboardRouter from "./Routes/DashboardRoutes.js"
import connectDB from "./config/db.js"


const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(multer().none())


// Routes
app.get("/", (req, res) => res.send("Server is running"))
app.use("/api/auth", authRouter)
app.use("/api/employees", employeeRouter)
app.use("/api/profile", profileRouter)
app.use("/api/attendance", attendanceRouter)
app.use("/api/leave", leaveRouter)
app.use("/api/payslip", payslipRouter)
app.use('/api/dashboard', dashboardRouter)


await connectDB()

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
