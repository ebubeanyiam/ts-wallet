import status from "http-status";
import { Request, Response } from "express";

import { Transaction } from "../models";

export const fetchTransactions = async (req: Request, res: Response) => {
  const { user_id: owner } = req.query;

  try {
    const transactions = await Transaction.find({
      owner,
    }).populate("wallet");

    res
      .status(status.OK)
      .json({ status: true, message: "Fetched Trx", data: transactions });
  } catch (error) {
    throw error;
  }
};
