require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index"); // will look for views/index.ejs
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;
  //    let createdUser= await userModel.create({
  //         username,
  //         email,
  //         password,
  //         age

  //     })

  bcrypt.genSalt(10, (err, salt) => {
    console.log(salt);
   const hassed= bcrypt.hash(password, salt, async (err, hash) => {
      console.log(hash);
      password=hash;
      let createdUser = await userModel.create({
        username,
        email,
        password,
        age,
      });

      const token = jwt.sign({ email }, "hgqwdhgjjqgj");
      res.cookie("token", token);
      res.send("user singup successfully");
     });
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// app.post("/login", async (req, res) => {
//   const user = await userModel.findOne({
//     email: req.body.email,
//   });
//   console.log(user);

//   if (!user) {
//     res.send("something went wrong");
//   }

//   bcrypt.compare(req.body.password, user.password, (err, result) => {
//     if (result) {
//       res.send("go to the profile page ");
//       const token = jwt.sign(req.body.email, "hgqwdhgjjqgj");
//       res.cookie("token", token);
//       res.send(createdUser);
//     } else {
//       res.send("you can't login");
//     }
//   });
// });

app.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    console.log(user);

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const ans = bcrypt.compare(
      req.body.password,
      user.password,
      (err, result) => {
        // console.log("rrrrrrrrrrrrr" ,result)
        if (err) {
          console.error(err);
          return res.status(500).send("Internal server error");
        }

        if (result) {
          const token = jwt.sign({ email: req.body.email }, "hgqwdhgjjqgj");
          res.cookie("token", token);
          return res.send("Login successful. Redirecting to profile...");
        } else {
          return res.status(401).send("Invalid email or password");
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }


 });



 

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
