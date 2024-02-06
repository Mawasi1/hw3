import asyncHandler from "express-async-handler";

// @desc Get plans
// @route GET /api/plans
const getPlans = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get plans" });
});

// @desc Set a plan
// @route POST /api/plans
const setPlan = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field.");
  }
});

// @desc Update a plan
// @route PUT /api/plans/:id
const UpdatePlan = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update plan ${req.params.id}` });
});

// @desc Delete a plan
// @route DELETE /api/plans/:id
const deletePlan = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete plan ${req.params.id}` });
});

export { getPlans, setPlan, UpdatePlan, deletePlan };
