import { Router } from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controller.js";

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
        .withMessage("Password is required."),
    ],
    registerUser
  );

export default router