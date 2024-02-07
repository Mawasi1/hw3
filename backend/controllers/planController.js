import asyncHandler from "express-async-handler";

import { Plan } from "../models/planModel.js";
import { response } from "express";

// @desc Get all plans
// @route GET /api/plans
const getPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find();
  res.status(200).json(plans);
});

// @desc Get a single plan by ID
// @route GET /api/plans/:id
const getPlanById = asyncHandler(async (req, res) => {
  const plan = await Plan.findOne({ id: req.params.id });

  if (plan) {
    res.status(200).json(plan);
  } else {
    res.status(404).json({ message: "Plan does not exist" });
  }
});

// @desc Set a plan
// @route POST /api/plans
const setPlan = asyncHandler(async (req, res) => {
  const { id, name, location, description } = req.body;
  const plan = await Plan.create({ id, name, location, description });
  const result = {
    ...plan.toObject(),
  };

  res.status(200).json(result);
});

// @desc Update a plan
// @route PUT /api/plans/:id
const updatePlan = asyncHandler(async (req, res) => {
  const updatedPlan = await Plan.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    {
      new: true,
    }
  );

  if (updatedPlan) {
    res.status(200).json(updatedPlan);
  } else {
    res.status(404).json({ message: "Plan does not exist." });
  }
});

// @desc Delete a plan
// @route DELETE /api/plans/:id
const deletePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.deleteOne({ id: req.params.id });

  plan
    ? res.status(200).json({ message: `Deleted plan ${req.params.id}` })
    : res.status(404).json({ message: "Plan does not exist" });
});

export { getPlans, getPlanById, setPlan, updatePlan, deletePlan };
