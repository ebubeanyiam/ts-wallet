import { Request, Response } from "express";
import status from "http-status";

import { Wallet } from "../models";

export const createWallet = async (req: Request, res: Response) => {
  const {
    user_id: owner,
    phone_number: authorizedPhonenumber,
    alias,
  } = req.body;

  try {
    const wallet = Wallet.newWallet({
      owner,
      authorizedPhonenumber,
      alias,
    });

    res
      .status(status.CREATED)
      .json({ status: true, message: "Wallet Created", data: wallet });
  } catch (error) {
    console.log(error);
  }
};
