import { Router } from "express";
import { body } from "express-validator";
import { registerUser , loginUser, userProfile } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.post(
    "/register",
    [
      body("username")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long."),
        
      body("email")
        .isEmail()
        .withMessage("Please provide a valid email.")
        .isLength({ min: 4 })
        .withMessage("Email must be at least 4 characters long."),
        
      body("password")
        .notEmpty()
        .withMessage("Password is required.")
        .isLength({min : 4})
        .withMessage("Password must be atleast 4 character long"),
    ],
    registerUser
  );

router.post(
  "/login",
  [
    body("email")
      .isEmail() 
      .withMessage("Please provide valid email")
      .notEmpty()
      .withMessage("Email is required.")
      .isLength({min : 4})
      .withMessage("email must be atleast 4 character long"),

    body("username")
      .notEmpty()
      .withMessage("username is required.")
      .isLength({min : 3})
      .withMessage("Username must be atleast 3 character long"),

    body("password")
        .notEmpty()
        .withMessage("password must be required.")
        .isLength({min : 4})
        .withMessage("Password must be atleast 4 character long")
  ],
  loginUser
)

router.get("/profile" , authUser , userProfile)

export default router