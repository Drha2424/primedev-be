import express from "express";

import {
  createUser,
  getUserById,
  getUserByIdWithProfile,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/index.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.get('/:id/profile', getUserByIdWithProfile)
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
