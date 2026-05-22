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

import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post('/', authorizeAdmin, upload.single('cover'), bookValidation, createBook)
router.put('/:id', authorizeAdmin, upload.single('cover'), updateBookValidation, updateBook)
router.delete("/:id", authorizeAdmin, deleteBook);


export default router;
