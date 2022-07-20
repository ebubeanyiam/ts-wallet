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
    const wallet = await Wallet.newWallet({
      owner,
      authorizedPhonenumber,
      alias,
    }).save();

    res
      .status(status.CREATED)
      .json({ status: true, message: "Wallet Created", data: wallet });
  } catch (error) {
    console.log(error);
  }
};

export const fetchWallets = async (req: Request, res: Response) => {
  const { user_id: owner } = req.query;

  try {
    const wallets = await Wallet.find({
      owner,
    });

    res
      .status(status.OK)
      .json({ status: true, message: "Fetched Wallets", data: wallets });
  } catch (error) {
    console.log(error);
  }
};
