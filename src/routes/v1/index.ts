import express from "express";

import { auth } from "../../middlewares/auth";
import walletRoutes from "./wallet";
import transactionRoutes from "./transaction";
import subscriptionRoute from "./subscriptions";

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (_, res) => res.send("OK"));

/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

router.use("/wallet", auth, walletRoutes);
router.use("/transaction", auth, transactionRoutes);
router.use("/subscribe", subscriptionRoute);

export default router;
