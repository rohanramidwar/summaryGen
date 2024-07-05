import express from "express";
import { getAllSmmries, saveSmmry } from "../controllers/history.js";

const router = express.Router();

router.post("/", saveSmmry);
router.get("/:uid", getAllSmmries);

export default router;
