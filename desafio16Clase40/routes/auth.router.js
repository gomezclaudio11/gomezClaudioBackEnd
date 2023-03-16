/*
export const configAuthRouter = (authRouter, passport) => {
    authRouter

      .get("/login", (req, res) => {
      res.render("pages/login"); 
    })
      .post(
        "/login",
        passport.authenticate("login", {
            successRedirect: "/",
            failureRedirect: "/faillogin",
        })
      )

      .get("/faillogin", (req, res) => { 
        res.render("pages/login-error");
      })
      
      .get("/register", (req, res) => {
        res.render("pages/register");
      })

      .post(
        "/register",
        passport.authenticate("signup", {
            successRedirect: "/",
            failureRedirect: "/failregister",
        })
      )

      .get("/failregister", (req, res) => { 
        res.render("pages/register-error"); 
      })
     
      .get("/", (req, res) => {
            res.send({user: req.user })
    })
  };
 */

import UserDTo from "../dto/user.dto.js";

  
export const configAuthRouter = (authRouter, upload, passport) => {
  authRouter
    .post(
      "/login",
      passport.authenticate("login", {
        successRedirect: "http://localhost:3000/",
        failureRedirect: "/login?error",
      })
    )
    .post(
      "/register",
      upload.single("avatar"),
      passport.authenticate("signup", {
        successRedirect: "http://localhost:3000/",
        failureRedirect: "/signup?error",
      })
    )
  .get("/", (req, res) => {
    const user = new UserDTo (req.user)
res.send({user: user })
})
};
