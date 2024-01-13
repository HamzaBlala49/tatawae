import express from "express";
import env from "dotenv";
import mongoose, { set } from "mongoose";
import { logger, session } from "./middlewares/index.js";
import {
  membersRouter,
  volunteerRouter,
  membershipRequestRouter,
  foundationRouter,
  foundationEventsRouter,
  foundationEventsRequestRouter,
  foundationHomeRoute,
} from "./routes/foundation/index.js";

import { volunteerEventsRouter,VolunteerNotificationRouter,VolunteerProfileRouter } from "./routes/volunteer/index.js";

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

app.get("/", (req, res) => res.send("landing page"));

// routes
app.use("/auth", authRouter);
// foundation
app.use("/foundation", foundationHomeRoute);
app.use("/foundation/members", membersRouter);
app.use("/foundation/invitation", membershipRequestRouter);
app.use("/foundation/profile", foundationRouter);
app.use("/foundation/events", foundationEventsRouter);
app.use("/foundation/requests", foundationEventsRequestRouter);
app.use("/volunteer", volunteerRouter);

//volunteer
app.use("/volunteer/events",volunteerEventsRouter);
app.use("/volunteer/requests",VolunteerNotificationRouter);
app.use("/volunteer/profile", VolunteerProfileRouter);


// 404 route
