import request from "supertest";
import { app, startServer } from "../server.js"; // Correct the path as needed

let server;
let existingPlanId; // Variable to store an existing plan ID

beforeAll(async () => {
  server = startServer();
  // Fetch an existing plan to get a valid ID
  const plansRes = await request(app).get("/api/plans");
  if (plansRes.body.length > 0) {
    existingPlanId = plansRes.body[0].id; // Use the correct property for ID
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
    // Additional tests for empty array scenario can be added here
  });

  describe("getPlanById", () => {
    it("Should return a 200 status code and the plan object when a plan with the specified ID exists", async () => {
      // Using dynamically fetched existingPlanId
      if (!existingPlanId) {
        console.log("No existing plan found for testing getPlanById");
        return;
      }
      const res = await request(app).get(`/api/plans/${existingPlanId}`);
      expect(res.statusCode).toEqual(200);
      // Adjust this line according to how your API returns the plan ID
      expect(res.body).toHaveProperty("id", existingPlanId);
    });
    // Add test for 404 if the plan does not exist
  });

  describe("setPlan", () => {
    let createdPlanId; // Variable to store the created plan ID

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

      // Store the created plan ID for cleanup
      createdPlanId = res.body.id; // Adjust according to how the ID is returned
    });

    // Cleanup after the test
    afterEach(async () => {
      if (createdPlanId) {
        await request(app).delete(`/api/plans/${createdPlanId}`);
      }
    });

    // Add test for 400 if required data is missing
  });
  describe("updatePlan", () => {
    it("Should return a 200 status code and the updated plan object when the plan exists and valid data is provided", async () => {
      const updatedPlan = {
        id: "5000",
        name: "Updated Test Plan",
        location: "somewhere",
        description: "Updated description",
      };
      // Assume there's a plan with ID '1' to update for test purposes
      const res = await request(app).put("/api/plans/5000").send(updatedPlan);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", updatedPlan.name);
    });

    // Add test for 404 if the plan does not exist
  });

  describe("deletePlan", () => {
    it("Should return a 200 status code and a success message when the plan exists and is successfully deleted", async () => {
      // Assume there's a plan with ID '1' to delete for test purposes
      const res = await request(app).delete("/api/plans/1");
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('{"message":"Deleted plan 1"}');
    });

    // Add test for 404 if the plan does not exist
  });
});
