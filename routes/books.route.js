import express from "express";
import { authorizeAdmin } from "../middlewares/admin.middleware.js";

import {
  createBook,
  getBookById,
  getBooks,
  updateBook,
  deleteBook,
} from "../controllers/index.controller.js";

import {
  bookValidation,
  updateBookValidation,
} from '../validations/books.validation.js'

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post('/', authorizeAdmin, bookValidation, createBook)
router.put('/:id', authorizeAdmin, updateBookValidation, updateBook)
router.delete("/:id", authorizeAdmin, deleteBook);


export default router;
