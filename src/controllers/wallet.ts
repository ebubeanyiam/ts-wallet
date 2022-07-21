import status from "http-status";
import { Request, Response } from "express";

import { Wallet } from "../models";
import { NotFoundError } from "../errors";

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
    throw error;
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
    throw error;
  }
};

export const fetchSingleWallet = async (req: Request, res: Response) => {
  const { walletID: _id } = req.params;
  const { user_id: owner } = req.query;

  try {
    const wallet = await Wallet.findOne({
      owner,
      _id,
    });

    if (!wallet) {
      throw new NotFoundError("No wallet found");
    }

    res
      .status(status.OK)
      .json({ status: true, message: "Fetched Wallet", data: wallet });
  } catch (error) {
    throw error;
  }
};
