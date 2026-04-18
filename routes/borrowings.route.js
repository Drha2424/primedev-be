import express from "express";

import {
  createBorrowing,
  getBorrowingById,
  getALLBorrowings,
  returnBook,
  deleteBorrowing,
} from "../controllers/index.controller.js";

const router = express.Router();

router.get("/", getALLBorrowings);
router.get("/:id", getBorrowingById);
router.post("/", createBorrowing);
router.put("/:id", returnBook);
router.delete("/:id", deleteBorrowing);

export default router;