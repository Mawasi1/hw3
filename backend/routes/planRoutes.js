import express from "express";
const router = express.Router();
import {
  getPlans,
  setPlan,
  UpdatePlan,
  deletePlan,
} from "../controllers/planController.js";

router.route("/").get(getPlans).post(setPlan);
router.route("/:id").delete(deletePlan).put(UpdatePlan);

export { router as planRoutes };
