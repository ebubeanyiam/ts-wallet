import express, { Request, Response } from "express";
import status from "http-status";
import axios from "axios";

import vars from "../../config/vars";

const router = express.Router();

router
  .route("/")
  /**
   */
  .post((req: Request, res: Response) => {
    const { email } = req.body;
    const data = {
      members: [{ email_address: email, status: "subscribed" }],
    };

    if (!email) return;

    axios
      .post("https://us7.api.mailchimp.com/3.0/lists/fd262e9ab5", data, {
        headers: { Authorization: `auth ${vars.mcSecret}` },
      })
      .then(function (response) {
        res.status(status.OK).json({
          status: true,
          data: response,
        });
      })
      .catch(function (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({
          status: false,
          data: error,
        });
      });
  });

export default router;
