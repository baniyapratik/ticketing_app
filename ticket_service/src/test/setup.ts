import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  var signUp: () => Promise<string[]>;
  var signIn: () => string[];
}
global.signIn = () => {
  let x = Math.floor(Math.random() * 100 + 1);
  // Build JWT payload { id, email}
  const payload = {
    id: x,
    email: "test@test.com",
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object {jwt: MY_JWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};

global.signUp = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/sign-up")
    .send({
      email,
      password,
    })
    .expect(201);
  const cookie = response.get("Set-Cookie");
  return cookie;
};

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  mongo = await MongoMemoryServer.create();
  const mongoURI = await mongo.getUri();
  await mongoose.connect(mongoURI);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
