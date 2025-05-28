// require("dotenv").config();
// const cookieParser = require("cookie-parser");
// const express = require("express");
// const path = require("path");
// const userModel = require("./models/user");
// const bcrypt = require("bcrypt");

// const jwt = require("jsonwebtoken");

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(cookieParser());

// // Set the view engine and views directory
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.get("/", (req, res) => {
//   res.render("index"); // will look for views/index.ejs
// });

// app.post("/create", (req, res) => {
//   let { username, email, password, age } = req.body;
//   //    let createdUser= await userModel.create({
//   //         username,
//   //         email,
//   //         password,
//   //         age

//   //     })

//   bcrypt.genSalt(10, (err, salt) => {
//     console.log(salt);
//    const hassed= bcrypt.hash(password, salt, async (err, hash) => {
//       console.log(hash);
//       password=hash;
//       let createdUser = await userModel.create({
//         username,
//         email,
//         password,
//         age,
//       });

//       const token = jwt.sign({ email }, "hgqwdhgjjqgj");
//       res.cookie("token", token);
//       res.send("user singup successfully");
//      });
//   });
// });

// app.get("/logout", (req, res) => {
//   res.cookie("token", "");
//   res.redirect("/");
// });

// app.get("/login", (req, res) => {
//   res.render("login.ejs");
// });

// // app.post("/login", async (req, res) => {
// //   const user = await userModel.findOne({
// //     email: req.body.email,
// //   });
// //   console.log(user);

// //   if (!user) {
// //     res.send("something went wrong");
// //   }

// //   bcrypt.compare(req.body.password, user.password, (err, result) => {
// //     if (result) {
// //       res.send("go to the profile page ");
// //       const token = jwt.sign(req.body.email, "hgqwdhgjjqgj");
// //       res.cookie("token", token);
// //       res.send(createdUser);
// //     } else {
// //       res.send("you can't login");
// //     }
// //   });
// // });

// app.post("/login", async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     console.log(user);

//     if (!user) {
//       return res.status(401).send("Invalid email or password");
//     }

//     const ans = bcrypt.compare(
//       req.body.password,
//       user.password,
//       (err, result) => {
//         // console.log("rrrrrrrrrrrrr" ,result)
//         if (err) {
//           console.error(err);
//           return res.status(500).send("Internal server error");
//         }

//         if (result) {
//           const token = jwt.sign({ email: req.body.email }, "hgqwdhgjjqgj");
//           res.cookie("token", token);
//           // return res.send({name:user?.name, email:user?.email});
//           return res.json({ name: user?.username, email: user?.email });

//         } else {
//           return res.status(401).send("Invalid email or password");
//         }
//       }
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error");
//   }


//  });


// app.get("/verify", (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).send("No token");

//   try {
//     const decoded = jwt.verify(token, "hgqwdhgjjqgj");
//     return res.status(200).json(decoded);
//   } catch (err) {
//     return res.status(401).send("Invalid token");
//   }
// });

 

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });




// ------------------------------------------token based authentication ----------------------------


// require("dotenv").config();
// const express = require("express");
// const path = require("path");
// const userModel = require("./models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

// // Set the view engine and views directory (optional for API-only use)
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// const JWT_SECRET = "hgqwdhgjjqgj"; // Use env var in production

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.post("/create", (req, res) => {
//   const { username, email, password, age } = req.body;

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return res.status(500).send("Error generating salt");

//     bcrypt.hash(password, salt, async (err, hash) => {
//       if (err) return res.status(500).send("Error hashing password");

//       try {
//         const createdUser = await userModel.create({
//           username,
//           email,
//           password: hash,
//           age,
//         });

//         return res.status(200).send("User signup successful");
//       } catch (err) {
//         console.error(err);
//         return res.status(500).send("User creation failed");
//       }
//     });
//   });
// });

// app.get("/login", (req, res) => {
//   res.render("login.ejs");
// });


// app.post("/login", async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(401).send("Invalid email or password");
//     }

//     bcrypt.compare(req.body.password, user.password, (err, result) => {
//       if (err) return res.status(500).send("Internal server error");

//       if (result) {
//         const token = jwt.sign({ email: user.email }, JWT_SECRET);
//         // ✅ Send token and user info in JSON response
//         return res.json({
//           token,
//           user: {
//             username: user.username,
//             email: user.email,
//             age: user.age,
//           },
//         });
//       } else {
//         return res.status(401).send("Invalid email or password");
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal server error");
//   }
// });

// // ✅ Auth verification using Authorization header
// app.get("/verify", async (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).send("No token provided");
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await userModel.findOne({ email: decoded.email });

//     if (!user) return res.status(404).send("User not found");

//     return res.status(200).json({
//       username: user.username,
//       email: user.email,
//       age: user.age,
//     });
//   } catch (err) {
//     return res.status(401).send("Invalid token");
//   }
// });

// app.get("/logout", (req, res) => {
//   // No need to clear cookies with token-based auth
//   res.send("Logged out (client should delete token)");
// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });



// ----------------------------------------session timming of token ------------------------------------


require("dotenv").config();
const express = require("express");
const path = require("path");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const JWT_SECRET = process.env.JWT_SECRET; // In production, use process.env.JWT_SECRET

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  const { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).send("Error generating salt");

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).send("Error hashing password");

      try {
        const createdUser = await userModel.create({
          username,
          email,
          password: hash,
          age,
        });

        return res.status(200).send("User signup successful");
      } catch (err) {
        console.error(err);
        return res.status(500).send("User creation failed");
      }
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) return res.status(500).send("Internal server error");

      if (result) {
        // ✅ Token expires in 1 hour
        const token = jwt.sign(
          { email: user.email },
          JWT_SECRET,
          { expiresIn: '1h' }
          //  { expiresIn: '2d' }
        );

        return res.json({
          token,
          user: {
            username: user.username,
            email: user.email,
            age: user.age,
          },
        });
      } else {
        return res.status(401).send("Invalid email or password");
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.get("/verify", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) return res.status(404).send("User not found");

    return res.status(200).json({
      username: user.username,
      email: user.email,
      age: user.age,
    });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send("Token expired");
    }
    return res.status(401).send("Invalid token");
  }
});

app.get("/logout", (req, res) => {
  res.send("Logged out (client should delete token)");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
  