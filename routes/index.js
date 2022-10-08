const express = require("express");
const router = express.Router();
const controller = require("../controller/mainController");
const session = require("express-session");

router.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", (req, res) => {
  res.render("sign-up", { message: "" });
});

router.get("/log-in", (req, res) => {
  res.render("log-in");
});

router.post("/sign-up", controller.registerAccount);

router.post("/log-in", controller.login);

module.exports = router;
