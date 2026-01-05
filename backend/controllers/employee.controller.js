import Employee from "../models/employee.modal.js";
import XLSX from "xlsx";

const isAlpha = (v) => /^[A-Za-z]+$/.test(v);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isIndianMobile = (v) => /^[0-9]{10}$/.test(v);

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.empId);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.json(employee);
  } catch (err) {
    next(err);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, mobile } = req.body;

    const errors = [];

    if (!firstName || !isAlpha(firstName))
      errors.push("firstName must be valid");

    if (!lastName || !isAlpha(lastName)) errors.push("lastName must be valid");

    if (!username) errors.push("username is required");

    if (!email || !isEmail(email))
      errors.push("email must be a valid email address");

    if (!mobile || !isIndianMobile(String(mobile)))
      errors.push("mobile must be a valid 10-digit Indian number");

    if (errors.length) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const employee = new Employee({
      firstName,
      lastName,
      username,
      email,
      mobile,
    });

    await employee.save();

    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (err) {
    // handle duplicate username/email
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }
    next(err);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const updates = {};
    const errors = [];

    const { firstName, lastName, username, email, mobile } = req.body;

    if (firstName !== undefined) {
      if (!isAlpha(firstName))
        errors.push("firstName must contain alphabetic characters only");
      else updates.firstName = firstName;
    }

    if (lastName !== undefined) {
      if (!isAlpha(lastName))
        errors.push("lastName must contain alphabetic characters only");
      else updates.lastName = lastName;
    }

    if (username !== undefined) {
      updates.username = username;
    }

    if (email !== undefined) {
      if (!isEmail(email)) errors.push("email must be a valid email address");
      else updates.email = email;
    }

    if (mobile !== undefined) {
      if (!isIndianMobile(String(mobile)))
        errors.push("mobile must be a valid 10-digit Indian number");
      else updates.mobile = mobile;
    }

    if (!Object.keys(updates).length) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.empId,
      { $set: updates },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.json({ success: true, data: updatedEmployee });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email or username already exists",
      });
    }
    next(err);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    await Employee.findByIdAndDelete(req.params.empId);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const uploadEmployees = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const requiredColumns = [
      "firstName",
      "lastName",
      "username",
      "email",
      "mobile",
    ];

    const fileColumns = Object.keys(rows[0] || {});
    const missing = requiredColumns.filter((col) => !fileColumns.includes(col));

    if (missing.length) {
      return res.status(400).json({
        message: `Missing required columns: ${missing.join(", ")}`,
      });
    }

    const existingEmployees = await Employee.find({}, "email username");

    const existingEmails = new Set(existingEmployees.map((e) => e.email));
    const existingUsernames = new Set(existingEmployees.map((e) => e.username));

    const validRows = [];
    const invalidRows = [];

    rows.forEach((row, index) => {
      const errors = [];

      if (!isAlpha(row.firstName)) errors.push("Invalid firstName");
      if (!isAlpha(row.lastName)) errors.push("Invalid lastName");
      if (!isEmail(row.email)) errors.push("Invalid email");
      if (!isIndianMobile(String(row.mobile)))
        errors.push("Invalid mobile number");

      if (existingEmails.has(row.email)) errors.push("Email already exists");

      if (existingUsernames.has(row.username))
        errors.push("Username already exists");

      if (errors.length) {
        invalidRows.push({
          rowNumber: index + 2,
          errors,
          data: row,
        });
      } else {
        validRows.push(row);
        existingEmails.add(row.email);
        existingUsernames.add(row.username);
      }
    });

    if (validRows.length) {
      await Employee.insertMany(validRows);
    }

    res.json({
      insertedCount: validRows.length,
      invalidCount: invalidRows.length,
      invalidRows,
    });
  } catch (err) {
    next(err);
  }
};
