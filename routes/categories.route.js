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

import { categoryValidation, updateCategoryValidation } from '../validations/categories.validation.js'

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.get('/:id/books', getAllBooksByCategoryId)
router.post("/", authorizeAdmin, categoryValidation, createCategory);
router.put("/:id", authorizeAdmin, updateCategoryValidation, updateCategory);
router.delete("/:id", authorizeAdmin, deleteCategory);

export default router;
