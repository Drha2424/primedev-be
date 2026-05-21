import express from "express";
import { authorizeAdmin } from "../middlewares/admin.middleware.js";

import {
  createCategorie,
  getCategorieById,
  getAllBooksByCategoryId,
  getAllCategories,
  updateCategorie,
  deleteCategorie,
} from "../controllers/index.controller.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategorieById);
router.get('/:id/books', getAllBooksByCategoryId)
router.post("/", authorizeAdmin, createCategorie);
router.put("/:id", authorizeAdmin, updateCategorie);
router.delete("/:id", authorizeAdmin, deleteCategorie);

export default router;
