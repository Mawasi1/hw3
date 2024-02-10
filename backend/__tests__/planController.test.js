import request from "supertest";
import { app, startServer } from "../server.js";

let server;
let existingPlanId;

beforeAll(async () => {
  server = startServer();
  const plansRes = await request(app).get("/api/plans");
  if (plansRes.body.length > 0) {
    existingPlanId = plansRes.body[0].id;
  }
});

afterAll((done) => {
  if (server) {
    server.close(done);
  } else {
    done();
  }
});

describe("Plan Controller", () => {
  describe("getPlans", () => {
    it("Should return a 200 status code and an array of plans", async () => {
      const res = await request(app).get("/api/plans");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("getPlanById", () => {
    it("Should return a 200 status code and the plan object when a plan with the specified ID exists", async () => {
      if (!existingPlanId) {
        console.log("No existing plan found for testing getPlanById");
        return;
      }
      const res = await request(app).get(`/api/plans/${existingPlanId}`);
      expect(res.statusCode).toEqual(200);

      expect(res.body).toHaveProperty("id", existingPlanId);
    });
  });

  describe("setPlan", () => {
    let createdPlanId;

    it("Should return a 200 status code and the created plan object when valid data is provided", async () => {
      const newPlan = {
        id: "5001",
        name: "Test Plan",
        location: "somewhere",
        description: "This is a test plan",
      };
      const res = await request(app).post("/api/plans").send(newPlan);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", newPlan.name);

      createdPlanId = res.body.id;
    });

    // Cleanup after the test
    afterEach(async () => {
      if (createdPlanId) {
        await request(app).delete(`/api/plans/${createdPlanId}`);
      }
    });
  });
  describe("updatePlan", () => {
    it("Should return a 200 status code and the updated plan object when the plan exists and valid data is provided", async () => {
      const updatedPlan = {
        id: "5000",
        name: "Updated Test Plan",
        location: "somewhere",
        description: "Updated description",
      };
      const res = await request(app).put("/api/plans/5000").send(updatedPlan);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", updatedPlan.name);
    });
  });

  describe("deletePlan", () => {
    it("Should return a 200 status code and a success message when the plan exists and is successfully deleted", async () => {
      const res = await request(app).delete("/api/plans/1");
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('{"message":"Deleted plan 1"}');
    });
  });
});
