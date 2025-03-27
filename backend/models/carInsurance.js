const mongoose = require("mongoose");

const CarInsuranceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to user
  licenseNo: String, // License number
  chassisNo: String, // Chassis number
  vehicleNo: String, // Vehicle registration number
  status: String, // Policy status (Active/Expired/Pending)
  expiryDate: Date, // Expiry date of insurance
  totalAmount: Number, // Total insured amount
  currentAmount: Number, // Amount currently paid
  remainingAmount: Number, // Amount remaining to be paid
  createdAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model("CarInsurance", CarInsuranceSchema);
