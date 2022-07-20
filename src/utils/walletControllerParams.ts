import { body, query } from "express-validator";

export const newWallet = [
  body("user_id")
    .trim()
    .isLength({ min: 4, max: 30 })
    .withMessage("User ID must be valid"),

  body("alias")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Wallet alias must be provided"),

  body("phone_number")
    .trim()
    .isLength({ min: 9, max: 14 })
    .withMessage("Phone number must be provided"),
];

export const viewWallets = [
  query("user_id")
    .trim()
    .isLength({ min: 4, max: 30 })
    .withMessage("User ID must be valid"),
];
