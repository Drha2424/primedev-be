import express from "express";

import {
  createProfile,
  getProfileById,
  getAllProfiles,
  updateProfile,
  deleteProfile,
  uploadAvatar,
} from "../controllers/index.controller.js";

import { profileValidation, updateProfileValidation, avatarValidation } from '../validations/profiles.validation.js'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.post("/:id/avatar", upload.single('avatar'), avatarValidation, uploadAvatar);
router.post("/", profileValidation, createProfile);
router.put("/:id", updateProfileValidation, updateProfile);
router.delete("/:id", deleteProfile);

export default router;
