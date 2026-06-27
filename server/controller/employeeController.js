import Employee from "../models/Employee"
import bcrypt from "bcrypt"
import { User } from "../models/User.js";


// Get Employee
// Get /api/employees
export const getEmployees = async (req, res) => {
  try {
    const { department } = req.query
    const where = {}

    if (department) where.department = department

    const employees = (await Employee.find(where)).toSorted({ createdAt: -1 }).populate("UserId", "email role").lean()

    const result = employees.map((emp) => ({
      ...emp,
      id: emp._id.toString(),
      user: emp.userId ? { email: emp.userId.email, role: userId.role } : null
    }))

    return res.json(result)

  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch employees" })
  }
}


// Create employee
// POST /api/employees
export const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, position, department, basicSalary, allowances, deductions, joinDate, password, role, bio } = req.body

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({
      email, password: hashed, role: role || "EMPLOYEE"
    })

    const emplopyee = await Employee.create({
      userId: user._id,
      firstName,
      lastName,
      email,
      phone,
      position,
      department: department || "Engineering",
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      joinDate: new Date(joinDate),
      bio: bio || "",
    })

    return res.status(201).json({ success: true, emplopyee })

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" })
    }
    console.error("Create employee error:", error)
    return res.status(500).json({ error: "Failed to create employee" })
  }
}


// Update Employee
// PUT /api/employees/:id
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const { firstName, lastName, email, phone, position, department, basicSalary, allowances, deductions, password, role, bio, employmentStatus } = req.body

    const employee = await Employee.findById(id)
    if (!employee) return res.status(404).json({ error: "Employee not found" })

    await Employee.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone,
      position,
      department: department || "Enngineering",
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      employmentStatus: employmentStatus || "",
      bio: bio || "",
    })

    // update user record
    const userUpdate = { email }
    if (role) userUpdate.role = role
    if (password) userUpdate.password = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate(employee.userId, userUpdate)

    return res.status(201).json({ success: true })

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" })
    }
    return res.status(500).json({ error: "Failed to update employee" })
  }
}


// Delete emplopyee
// DELETE /api/employees/:id
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params

    const emplopyee = await Employee.findById(id)
    if (!emplopyee) return res.status(404).json({ error: "Employee not found" })

    emplopyee.isDelete = true
    emplopyee.employmentStatus = "INACTIVE"
    await emplopyee.save()
    return res.json({ success: true })

  } catch (error) {
    return res.status(500).json({ error: "Failed to deleted employee" })
  }
}
