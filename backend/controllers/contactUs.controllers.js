import { connectDB } from "../db/db.js";
import { ContactUs } from "../models/contactUs.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asynchandler.js";

export const Contact = asyncHandler(async (req, res) => {
  await connectDB();

  const { userEmail, username, reason, description } = req.body;

  if (!userEmail || !username || !reason || !description) {
    throw new ApiError(400, "All fields are required !!");
  }

  // TODO: add email feature later.

  await ContactUs.create({
    userEmail,
    username,
    reason,
    description,
  });

  return res.status(201).json({
    success: true,
    message: "Email send successfully !!",
  });
});

// for admins
export const fetchAllUncompletedContactDetails = asyncHandler(
  async (req, res) => {
    await connectDB();

    const { page } = req.params;
    const pageNumber = Number(page) || 1;
    const total = await ContactUs.countDocuments({ status: false });
    const data = await ContactUs.find({ status: false })
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * 10)
      .limit(10);
    return res.status(200).json({
      success: true,
      total,
      data,
    });
  },
);

export const fetchAllCompletedContactDetails = asyncHandler(
  async (req, res) => {
    await connectDB();
    const { page } = req.params;
    const pageNumber = Number(page) || 1;
    const total = await ContactUs.countDocuments({ status: true });
    const data = await ContactUs.find({ status: true })
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * 10)
      .limit(10);
    return res.status(200).json({
      success: true,
      total,
      data,
    });
  },
);

export const updateContactStatus = asyncHandler(async (req, res) => {
  await connectDB();

  const { id } = req.body;
  const contact = await ContactUs.findById(id);

  if (!contact) {
    throw new ApiError(404, "Document does not exist !!");
  }

  contact.status = !contact.status;

  await contact.save();

  return res.status(200).json({
    success: true,
    message: "Updated Successfully!!",
  });
});
