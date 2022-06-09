import express from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "../../../common_lib/src/middlewares/current-user";

const router = express.Router();

router.get("/api/users/current-user", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };