import express from "express";

import { fetchTransactions } from "../../controllers/transaction";

import { viewWallets } from "../../utils/walletControllerParams";

import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router
  .route("/all")
  /**
  //    * @public   
  //    * @api {get} v1/wallet/all/balance 
  //    * @apiDescription Fetch total balance for all wallets belonging to a user
  //    * @apiVersion 1.0.0
  //    * @apiName Fetch Wallets Balance
  //    * @apiGroup wallet
  //    * @apiPermission private
  //    *
  //    * @apiHeader {String}   Token       Application access token
  //    *
  //    * @returns {array}
  //    * @apiSuccess {String}  user_id         User's id
  //    * @apiSuccess {String}  phonenumber       User's Phonenumber
  //    * @apiSuccess {String}  alias      Wallet alias
  //    * @apiSuccess {String}  balance    Customer's balance
  //    * @apiSuccess {Date}    createdAt  Timestamp
  //    *
  //    * @apiError (Unauthorized 401) Unauthorized   Only authenticated calls can access the data
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .get(viewWallets, validateRequest, fetchTransactions);

export default router;
