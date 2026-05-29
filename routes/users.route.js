import express from "express";

import {
  createUser,
  getUserById,
  getUserByIdWithProfile,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/index.controller.js";

import { userValidation, updateUserValidation } from '../validations/users.validation.js'

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.get('/:id/profile', getUserByIdWithProfile)
router.post("/", userValidation, createUser);
router.put("/:id", updateUserValidation, updateUser);
router.delete("/:id", deleteUser);

export default router;
