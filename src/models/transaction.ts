import mongoose from "mongoose";
import { getSerializedBalance } from "../helpers/serializeBalance";

export enum TrxType {
  CREDIT = "credit",
  DEBIT = "debit",
  TRANSFER = "transfer",
}

interface TrxAttrs {
  amount: number;
  type: string;
  wallet: mongoose.Schema.Types.ObjectId;
  paymentMethod: string;
}

interface TransactionModel extends mongoose.Model<ITransaction> {
  newTrx(attrs: TrxAttrs): ITransaction;
}

interface ITransaction extends mongoose.Document {
  amount: number;
  type: string;
  wallet: mongoose.Schema.Types.ObjectId;
  paymentMethod: string;
  createdAt: string;
  updatedAt?: string;
}

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Wallet",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        ret.amount = getSerializedBalance(ret.amount);

        delete ret._id;
        delete ret.updatedAt;
      },
      versionKey: false,
    },
  }
);

transactionSchema.statics = {
  newTrx: (attrs: TrxAttrs) => {
    return new Transaction(attrs);
  },
};

const Transaction = mongoose.model<ITransaction, TransactionModel>(
  "Transaction",
  transactionSchema
);

export { Transaction };
