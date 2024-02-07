import express from "express";
const router = express.Router();
import {
  getPlans,
  setPlan,
  updatePlan,
  deletePlan,
  getPlanById,
} from "../controllers/planController.js";

router.route("/").get(getPlans).post(setPlan);
router.route("/:id").get(getPlanById).delete(deletePlan).put(updatePlan);

export { router as planRoutes };
