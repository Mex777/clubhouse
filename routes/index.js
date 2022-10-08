const express = require("express");
const router = express.Router();
const controller = require("../controller/mainController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

router.post("/sign-up", controller.registerAccount);

module.exports = router;
