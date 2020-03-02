import * as Express from "express";
import { addComment, getComment } from "../controllers/commentController";

const router = Express.Router();

router.post("/add", addComment);
router.get("/", getComment);
export default router;
