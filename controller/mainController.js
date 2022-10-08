const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const Post = require("../models/post");

const auth = new LocalStrategy((username, password, done) => {
  User.findOne({ username }, async (err, userFound) => {
    if (err) {
      console.log(err);
      return done(err);
    }
    if (!userFound) {
      console.log("Incorrect username");
      return done(null, false, { message: "Incorrect username" });
    }

    const same = await bcrypt.compare(password, userFound.password);

    if (same) {
      console.log("connected");
      return done(null, userFound);
    }

    console.log("incorrect pass");
    return done(null, false, { message: "Incorrect password" });
  });
});

passport.use(auth);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

const registerAccount = async (req, res) => {
  const usernameTaken = await User.findOne({ username: req.body.username });
  if (usernameTaken) {
    res.render("sign-up", { message: "Username already taken" });
    return;
  }
  if (req.body.password != req.body.confirmation) {
    res.render("sign-up", { message: "Different passwords" });
    return;
  }

  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    password: hashedPass,
    member: 0,
    admin: 0,
  });

  await newUser.save();

  res.redirect("/");
};

const login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});

const mainPage = async (req, res) => {
  const posts = await Post.find();
  res.render("index", { posts });
};

module.exports = { registerAccount, login, mainPage };
