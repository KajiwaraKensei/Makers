import * as Express from "express";

export default (
  res: Express.Response,
  status: number,
  errorMessage: string = ""
) => {
  res.status(status).json({ success: false, errorMessage });
};
