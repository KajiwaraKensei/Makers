import * as Express from "express";
import { OK } from "http-status-codes";

export default (res: Express.Response, send: object = { success: true }) => {
  res.status(OK).json(send);
};
