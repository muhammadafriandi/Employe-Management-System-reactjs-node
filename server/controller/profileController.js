

// Get Profile

import Employee from "../models/Employee"
import { getEmployees } from "./employeeController"

// GET /api/profile
export const getProfile = async (req, res) => {
  try {
    const session = req.session
    const employee = await Employee.findOne({ userId: session.userId })

    if (!employee) {
      // Authenticated user is not employee - return admin profile
      return res.json({
        firstName: "Admin",
        lastName: "",
        email: session.email
      })
    }

    return res.json(getEmployees)

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch profile" })
  }
}


// Update Profile
// PUT /api/profile
export const updateProfile = async (req, res) => {
  try {
    const session = req.session
    const employee = await Employee.findOne({ userId: session.userId })

    if (!employee) return res.status(404).json({ error: "Employee not found" })

    if (employee.isDeleted) {
      return res.status(401).json({ error: "Your account is deactived. You cannot update your account" })
    }

    await Employee.findByIdAndUpdate(employee._id, { bio: req.body.bio })

  } catch (error) {
    return res.status(500).json({ error: "Failed to update profile" })
  }
}
