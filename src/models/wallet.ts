import mongoose from "mongoose";
import { getSerializedBalance } from "../helpers/serializeBalance";

interface WalletAttrs {
  alias: string;
  owner: string;
  authorizedPhonenumber: string;
}

// interface IWalletMethods {
//   getSerializedBalance(): string;
// }

interface WalletModel extends mongoose.Model<IWallet> {
  newWallet(attrs: WalletAttrs): IWallet;
}

interface IWallet extends mongoose.Document {
  alias: string;
  owner: string;
  authorizedPhonenumber: string;
  balance: number;
  createdAt: string;
  updatedAt?: string;
}

const walletSchema = new mongoose.Schema(
  {
    alias: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
      required: true,
    },
    authorizedPhonenumber: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        ret.balance = getSerializedBalance(ret.balance);

        delete ret._id;
        delete ret.updatedAt;
      },
      versionKey: false,
    },
  }
);

walletSchema.virtual("transaction", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "wallet",
});

walletSchema.statics = {
  newWallet: (attrs: WalletAttrs) => {
    return new Wallet(attrs);
  },
};

const Wallet = mongoose.model<IWallet, WalletModel>("Wallet", walletSchema);

export { Wallet };
