import mongoose from "mongoose";

interface WalletAttrs {
  alias: string;
  owner: string;
  authorizedPhonenumber: string;
}

interface WalletModel extends mongoose.Model<IWallet> {
  newWallet(attrs: WalletAttrs): number;
}

interface IWallet extends mongoose.Document {
  alias: string;
  owner: string;
  authorizedPhonenumber: string;
  balance: number;
  createdAt: string;
}

const walletSchema = new mongoose.Schema(
  {
    alias: {
      type: String,
      required: true,
      unique: true,
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
  }
);

walletSchema.statics = {
  newWallet: (attrs: WalletAttrs) => {
    return new Wallet(attrs);
  },
};

const Wallet = mongoose.model<IWallet, WalletModel>("Wallet", walletSchema);

export { Wallet };
