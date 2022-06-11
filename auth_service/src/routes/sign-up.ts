import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { validateRequest, BadRequestError } from "@baniyatickets/common_lib";

const router = express.Router();

router.post(
  "/api/users/sign-up",
  [
    body("email").trim().isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters "),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email is in use");
    }
    const user = User.build({ email, password });
    await user.save();
    // generate JWT
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // store it on session object
    req.session = {
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

export { router as signUpRouter };
