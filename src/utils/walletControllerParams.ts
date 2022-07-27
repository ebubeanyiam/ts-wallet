import { isValidObjectId } from "mongoose";
import { body, query, param } from "express-validator";

import { TrxType } from "../models/transaction";
import { BadRequestError } from "../errors";

export const newWallet = [
  body("user_id")
    .trim()
    .isLength({ min: 4, max: 100 })
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
    .isLength({ min: 4, max: 100 })
    .withMessage("User ID must be valid"),
];

export const viewWallet = [
  query("user_id")
    .trim()
    .isLength({ min: 4, max: 100 })
    .withMessage("User ID must be valid"),

  param("walletID").customSanitizer((value) => {
    if (!isValidObjectId(value)) {
      throw new BadRequestError([
        {
          field: "Wallet Id",
          issue: "Invalid Wallet Id",
        },
      ]);
    }

    return value;
  }),
];

export const trxWallet = [
  body("user_id")
    .trim()
    .isLength({ min: 4, max: 100 })
    .withMessage("User ID must be valid"),

  body("amount").isLength({ min: 1 }).withMessage("Invalid amount"),

  body("type").customSanitizer((value: TrxType) => {
    if (Object.values(TrxType).includes(value)) {
      throw new BadRequestError([
        {
          field: "type",
          issue: "Invalid Transaction Type",
        },
      ]);
    }

    return value;
  }),

  body("walletID").customSanitizer((value) => {
    if (!isValidObjectId(value)) {
      throw new BadRequestError([
        {
          field: "Wallet ID",
          issue: "Invalid Wallet Id",
        },
      ]);
    }

    return value;
  }),

  body("payment_method")
    .isLength({ min: 3 })
    .withMessage("A valid payment method is required"),
];
