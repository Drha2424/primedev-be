import express from "express";
import { authorizeAdmin } from "../middlewares/admin.middleware.js";

import {
  createCategory,
  getCategoryById,
  getAllBooksByCategoryId,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/index.controller.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.get('/:id/books', getAllBooksByCategoryId)
router.post("/", authorizeAdmin, createCategory);
router.put("/:id", authorizeAdmin, updateCategory);
router.delete("/:id", authorizeAdmin, deleteCategory);

export default router;
