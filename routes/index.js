const express = require("express");
const router = express.Router();
const controller = require("../controller/mainController");
const passport = require("passport");
const session = require("express-session");
const User = require("../models/user");

router.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get("/", loggedIn, controller.mainPage);

router.get("/sign-up", notLoggedIn, (req, res) => {
  res.render("sign-up", { message: "" });
});

router.get("/log-in", notLoggedIn, (req, res) => {
  res.render("log-in");
});

router.post("/sign-up", controller.registerAccount);

router.post("/log-in", controller.login);

router.post("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function loggedIn(req, res, next) {
  if (req.user) next();
  else res.redirect("/log-in");
}

function notLoggedIn(req, res, next) {
  if (req.user) res.redirect("/");
  else next();
}

module.exports = router;
