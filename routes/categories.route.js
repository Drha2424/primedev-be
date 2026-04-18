import express from "express";

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
router.post("/", createCategorie);
router.put("/:id", updateCategorie);
router.delete("/:id", deleteCategorie);

export default router;
