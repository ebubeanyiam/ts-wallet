import mongoose from "mongoose";
import status from "http-status";
import { Request, Response } from "express";

import { Wallet, Transaction } from "../models";
import { NotFoundError } from "../errors";
import { getSerializedBalance } from "../helpers/serializeBalance";

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

export const fetchWalletsBalance = async (req: Request, res: Response) => {
  const { user_id: owner } = req.query;

  try {
    const wallets = await Wallet.find({
      owner,
    });

    let totalBalance: number = 0;

    wallets.map((wallet) => (totalBalance += wallet.balance));

    res.status(status.OK).json({
      status: true,
      message: "Fetched Wallets Balance",
      data: {
        totalBalance: getSerializedBalance(`${totalBalance}`),
        totalWallets: wallets.length,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const creditWallet = async (req: Request, res: Response) => {
  const {
    amount,
    type,
    user_id: owner,
    walletID: _id,
    payment_method: paymentMethod,
  } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const wallet = await Wallet.findOne({ _id, owner });
    if (!wallet) {
      throw new NotFoundError("No wallet found");
    }

    // Convert amount to type number if it is of type string
    const newAmount = amount * 1;

    wallet.balance = wallet.balance + newAmount;
    await wallet.save();

    await Transaction.newTrx({
      amount,
      type,
      wallet: _id,
      paymentMethod,
    }).save();

    await session.commitTransaction();

    res.status(status.OK).json({
      status: true,
      message: "Wallet Credited",
      data: wallet,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
