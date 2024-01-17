import express from "express";
import env from "dotenv";
import mongoose, { set } from "mongoose";
import { logger, session, checkRole } from "./middlewares/index.js";
import {
  membersRouter,
  volunteerRouter,
  membershipRequestRouter,
  foundationRouter,
  foundationEventsRouter,
  foundationEventsRequestRouter,
  foundationHomeRoute,
} from "./routes/foundation/index.js";

import {
  volunteerEventsRouter,
  VolunteerNotificationRouter,
  VolunteerProfileRouter,
  volunteerHomeRouter,
  volunteerFoundationRouter,
} from "./routes/volunteer/index.js";

import authRouter from "./routes/authRoute.js";

//env configuration
env.config();
// app express
const app = express();
// if the port of environment  not unavailable take 3000
const port = process.env.PORT || 3000;

// database connection with url come form .env file
mongoose
  .connect(process.env.dbUrl)
  .then(() => {
    // run the server
    app.listen(port, () =>
      console.log(`app is listening on http://localhost:3000/`)
    );
  })
  .catch((err) => console.log(err));

// event error on database
mongoose.connection.on("error", (error) => {
  console.log("============Error From Database============");
  console.log(error);
});

// middlewares
session(app);
logger(app);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.static("public"));

app.get("/", (req, res) => res.render("index"));

// routes
app.use("/auth", authRouter);
// foundation
app.use(
  "/foundation",
  (req, res, next) => {
    checkRole(0, req, res, next);
  },
  foundationHomeRoute
);
app.use(
  "/foundation/members",
  (req, res, next) => {
    checkRole(0, req, res, next);
  },
  membersRouter
);
app.use(
  "/foundation/invitation",
  (req, res, next) => {
    checkRole(0, req, res, next);
  },
  membershipRequestRouter
);
app.use(
  "/foundation/profile",
  (req, res, next) => {
    checkRole(0, req, res, next);
  },
  foundationRouter
);
app.use(
  "/foundation/events",
  (req, res, next) => {
    checkRole(0, req, res, next);
  },
  foundationEventsRouter
);
app.use(
  "/foundation/requests",
  (req, res, next) => {
    checkRole(0, req, res, next);
  },
  foundationEventsRequestRouter
);
app.use(
  "/foundation/volunteer",
  (req, res, next) => {
    checkRole(0, req, res, next);
  },
  volunteerRouter
);

//volunteer
app.use(
  "/volunteer",
  (req, res, next) => {
    checkRole(1, req, res, next);
  },
  volunteerHomeRouter
);
app.use(
  "/volunteer/events",
  (req, res, next) => {
    checkRole(1, req, res, next);
  },
  volunteerEventsRouter
);
app.use(
  "/volunteer/requests",
  (req, res, next) => {
    checkRole(1, req, res, next);
  },
  VolunteerNotificationRouter
);
app.use(
  "/volunteer/profile",
  (req, res, next) => {
    checkRole(1, req, res, next);
  },
  VolunteerProfileRouter
);
app.use(
  "/volunteer/foundation",
  (req, res, next) => {
    checkRole(1, req, res, next);
  },
  volunteerFoundationRouter
);

// 404 route
