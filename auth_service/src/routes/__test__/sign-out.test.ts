import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/sign-up")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/sign-out")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
});
