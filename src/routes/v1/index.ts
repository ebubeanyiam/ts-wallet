import express from "express";

import { auth } from "../../middlewares/auth";
import walletRoutes from "./wallet";

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

export default router;
