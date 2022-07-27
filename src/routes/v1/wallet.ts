import express from "express";

import {
  createWallet,
  fetchWallets,
  fetchSingleWallet,
  fetchWalletsBalance,
  creditWallet,
} from "../../controllers/wallet";

import {
  newWallet,
  viewWallets,
  viewWallet,
  trxWallet,
} from "../../utils/walletControllerParams";

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
  //    * @apiHeader {String}   Token         Application access token
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
  //    * @apiDescription Fetch all Wallets
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

router
  .route("/all/balance")
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
  .get(viewWallets, validateRequest, fetchWalletsBalance);

router
  .route("/:walletID")
  /**
  //    * @public   
  //    * @api {get} v1/wallet 
  //    * @apiDescription Fetch a single Wallet
  //    * @apiVersion 1.0.0
  //    * @apiName Fetch Wallets
  //    * @apiGroup wallet
  //    * @apiPermission private
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
  .get(viewWallet, validateRequest, fetchSingleWallet);

router
  .route("/credit")
  /**
  //    * @public   
  //    * @api {post} v1/wallet/credit 
  //    * @apiDescription Create a wallet
  //    * @apiVersion 1.0.0
  //    * @apiName Create Wallet
  //    * @apiGroup wallet
  //    * @apiPermission public
  //    *
  //    * @apiHeader {String}   Token         Application access token
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
  .post(trxWallet, validateRequest, creditWallet);

export default router;
