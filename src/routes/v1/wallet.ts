import express from "express";

import { createWallet, fetchWallets } from "../../controllers/wallet";
import { newWallet, viewWallets } from "../../utils/walletControllerParams";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router
  .route("/")
  /**
  //    * @public   
  //    * @api {post} v1/wallet 
  //    * @apiDescription Create a wallet
  //    * @apiVersion 1.0.0
  //    * @apiName Create Wallet
  //    * @apiGroup wallet
  //    * @apiPermission public
  //    *
  //    * @apiHeader {String}   Token       Application access token
  //    *
  //    * @apiSuccess {String}  user_id         User's id
  //    * @apiSuccess {String}  phonenumber       User's Phonenumber
  //    * @apiSuccess {String}  alias      Wallet alias
  //    * @apiSuccess {String}  balance    Customer's balance
  //    * @apiSuccess {Date}    createdAt  Timestamp
  //    *
  //    * @apiError (Unauthorized 401) Unauthorized   Only authenticated calls can access the data
  //    * @apiError (Forbidden 500)    Internal Server Error    Server encountered issues
*/
  .post(newWallet, validateRequest, createWallet);

router
  .route("/")
  /**
  //    * @public   
  //    * @api {get} v1/wallet 
  //    * @apiDescription Fetch a Wallet
  //    * @apiVersion 1.0.0
  //    * @apiName Fetch Wallets
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
  .get(viewWallets, validateRequest, fetchWallets);

export default router;
