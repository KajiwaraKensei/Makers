import * as Express from "express";
import {
  addUser,
  changeUserName,
  getUserInfo
} from "../controllers/accountController";

const router = Express.Router();

router.post("/add", addUser);
router.post("/change_name", changeUserName);
router.post("/", getUserInfo);
export default router;
