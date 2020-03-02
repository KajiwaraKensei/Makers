import * as Express from "express";
import {
  addTemplate,
  getTemplate,
  updateTemplate,
  showTemplates,
  countUpTemplate
} from "../controllers/templateController";
const router = Express.Router();

router.get("/", showTemplates);
router.post("/execution", countUpTemplate);
router.post("/add", addTemplate);
router.post("/get", getTemplate);
router.post("/save", updateTemplate);

export default router;
