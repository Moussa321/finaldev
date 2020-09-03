const express = require("express");
const mongoose = require("mongoose", { useUnifiedTopology: true });

const app = express();
const passport = require("passport");

const bodyparser = require("body-parser");
const users = require("./routes/api/users.js");
const profile = require("./routes/api/profile.js");
const posts = require("./routes/api/posts.js");

const db = require("./config/keys.js").mongoURI;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// app.get("/", function (req, res) {
//   res.send("hello");
// });
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("running on port " + port));
