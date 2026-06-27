import { Router } from "express";
import { protect } from "../middleware/auth";
import { getProfile, updateProfile } from "../controller/profileController";


const profileRouter = Router()

profileRouter.get("/", protect, getProfile)
profileRouter.post("/", protect, updateProfile)


export default profileRouter
