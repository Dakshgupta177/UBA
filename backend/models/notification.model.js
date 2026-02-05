import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ['internal', 'external'],
      required: true,
    },

    createdBy: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      // required: true,
      type: String,
      default: 'System',
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  },
  { timestamps: true },
);

export const Notification = mongoose.model('Notification', notificationSchema);
