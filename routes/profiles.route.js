import express from "express";

import {
  createProfile,
  getProfileById,
  getAllProfiles,
  updateProfile,
  deleteProfile,
} from "../controllers/index.controller.js";

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.post("/", createProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

export default router;
