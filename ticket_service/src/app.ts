import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { createTicketRouter } from "./routes/new-ticket";
import { showTicketRouter } from "./routes/show-ticket";
import { UpdateTicketRouter } from "./routes/update-ticket";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@baniyatickets/common_lib";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
// routes
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(UpdateTicketRouter);

// routes not found
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// middleware
app.use(errorHandler);

export { app };
