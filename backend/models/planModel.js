import mongoose from "mongoose";

const planSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "An ID that consists of digits only should be entered."],
      unique: true,
    },
    name: {
      type: String,
      required: [true],
    },
    location: {
      type: String,
      required: [false],
    },
    description: {
      type: String,
      required: [false],
    },
  },
  {
    timestamps: true,
  }
);

export const Plan = mongoose.model("Plan", planSchema);
