import expressSession from "express-session";

const day = 24 * 60 * 60 * 1000
const session = (app) => {
  app.use(
    expressSession({
      secret: "tatawae",
      resave: false,
      saveUninitialized: false,
      cookie:{
        maxAge: 3 * day
      }
    })
  );
};

export default session;
